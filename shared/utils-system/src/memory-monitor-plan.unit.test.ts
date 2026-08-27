import { describe, expect, test } from "bun:test"
import { recordedTreeKills, snapshotsFromRecord } from "./_reaper-real-kills-test-helpers"
import { MAX_RSS_GB } from "./memory-monitor/per-process"
import { MAX_TREE_RSS_GB } from "./memory-monitor/per-tree"
import { planReaperKills } from "./memory-monitor/plan"
import { type PidSnapshot } from "./memory-monitor/shared"

const KB_PER_GB = 1024 * 1024
const thresholdKb = MAX_RSS_GB * KB_PER_GB
const treeThresholdKb = MAX_TREE_RSS_GB * KB_PER_GB

function snap(pid: number, ppid: number, rssGb: number, name = `proc-${pid}`): PidSnapshot {
  return { pid, ppid, vmRssKb: Math.round(rssGb * KB_PER_GB), name }
}

const plan = (snapshots: readonly PidSnapshot[], supervisorPids: readonly number[]) =>
  planReaperKills({
    snapshots,
    supervisorPids,
    selfPid: 999_999,
    perProcessThresholdKb: thresholdKb,
    perTreeThresholdKb: treeThresholdKb,
    globalTarget: null,
  })

describe("which leg wins is decided by the planner, not by the caller", () => {
  test("the TREE leg wins: bloat with no single runaway takes the whole tree", () => {
    const members = [200, 300, 400, 500, 600]
    const eachGb = MAX_TREE_RSS_GB / members.length + 0.2
    expect(eachGb).toBeLessThan(MAX_RSS_GB)
    const result = plan([snap(100, 1, 0.3), ...members.map((pid) => snap(pid, 100, eachGb))], [100])
    expect(result.treeKills.map((t) => t.rootPid)).toEqual([100])
    expect(result.treeKills[0]?.leg).toBe("per-tree")
    expect(result.procKills).toEqual([])
    expect(result.sparedTrees).toEqual([])
  })

  test("the PER-PROCESS leg wins: one runaway dies alone and its tree is spared", () => {
    const result = plan(
      [snap(100, 1, 0.3), snap(200, 100, 0.6), snap(300, 200, MAX_RSS_GB + 1, "ugrep")],
      [100]
    )
    expect(result.procKills.map((p) => p.pid)).toEqual([300])
    expect(result.procKills[0]?.leg).toBe("per-process")
    expect(result.treeKills).toEqual([])
    expect(result.sparedTrees.map((s) => s.rootPid)).toEqual([100])
    expect(result.sparedTrees[0]?.reclaimedPids).toEqual([300])
  })

  test("both legs fire: the runaway is taken AND the residue still breaches", () => {
    const bulk = [300, 400, 500, 600].map((pid) => snap(pid, 100, MAX_RSS_GB - 1))
    const result = plan(
      [snap(100, 1, 0.3), snap(200, 100, MAX_RSS_GB + 1, "ugrep"), ...bulk],
      [100]
    )
    expect(result.treeKills.map((t) => [t.rootPid, t.disposition])).toEqual([[100, "signalled"]])
    expect(result.procKills.map((p) => [p.pid, p.disposition])).toEqual([
      [200, "covered-by-tree-kill"],
    ])
    expect(result.sparedTrees).toEqual([])
  })

  test("a tree containing the planner's own pid is refused, and a kill inside it stays refused", () => {
    const bulk = [300, 400, 500, 600].map((pid) => snap(pid, 100, MAX_RSS_GB - 1))
    const result = planReaperKills({
      snapshots: [snap(100, 1, 0.3), snap(200, 100, MAX_RSS_GB + 1, "ugrep"), ...bulk],
      supervisorPids: [100],
      selfPid: 600,
      perProcessThresholdKb: thresholdKb,
      perTreeThresholdKb: treeThresholdKb,
      globalTarget: null,
    })
    expect(result.treeKills.map((t) => [t.rootPid, t.disposition])).toEqual([
      [100, "refused-contains-self"],
    ])
    expect(result.procKills.map((p) => [p.pid, p.disposition])).toEqual([
      [200, "covered-by-tree-kill"],
    ])
  })

  test("the global leg's target joins the same plan and is deduped against it", () => {
    const result = planReaperKills({
      snapshots: [snap(100, 1, 0.3), snap(200, 100, 0.6)],
      supervisorPids: [100],
      selfPid: 999_999,
      perProcessThresholdKb: thresholdKb,
      perTreeThresholdKb: treeThresholdKb,
      globalTarget: { kind: "tree", rootPid: 100, descendantPids: [200], treeRssKb: 1 },
    })
    expect(result.treeKills.map((t) => t.rootPid)).toEqual([100])
    expect(result.treeKills[0]?.leg).toBe("host-global")
    expect(result.procKills).toEqual([])
  })
})

describe("the four real per-tree kills, replayed through the composition", () => {
  test("the frozen population is the record: member sums match the reaper's own total", () => {
    expect(recordedTreeKills.length).toBe(4)
    for (const record of recordedTreeKills) {
      expect(record.procs.length).toBe(record.treeSize)
      expect(record.procs.reduce((sum, p) => sum + p.rssKb, 0)).toBe(record.totalRssKb)
      expect(record.totalRssKb).toBeGreaterThan(treeThresholdKb)
    }
  })

  test("under the ceilings that were live at the time, all four trees die", () => {
    for (const record of recordedTreeKills) {
      const result = planReaperKills({
        snapshots: snapshotsFromRecord(record),
        supervisorPids: [record.rootPid],
        selfPid: 999_999,
        perProcessThresholdKb: treeThresholdKb,
        perTreeThresholdKb: treeThresholdKb,
        globalTarget: null,
      })
      expect(result.treeKills.map((t) => t.rootPid)).toEqual([record.rootPid])
      expect(result.procKills).toEqual([])
    }
  })

  test("under today's ceilings, all four trees are spared and the runaway dies alone", () => {
    for (const record of recordedTreeKills) {
      const result = planReaperKills({
        snapshots: snapshotsFromRecord(record),
        supervisorPids: [record.rootPid],
        selfPid: 999_999,
        perProcessThresholdKb: thresholdKb,
        perTreeThresholdKb: treeThresholdKb,
        globalTarget: null,
      })
      expect(result.treeKills).toEqual([])
      expect(result.sparedTrees.map((s) => s.rootPid)).toEqual([record.rootPid])
      expect(result.procKills.length).toBeGreaterThan(0)
      expect(result.procKills.map((p) => p.pid)).not.toContain(record.rootPid)
    }
  })

  test("the subject the alert would name disagrees with argv on all four", () => {
    for (const record of recordedTreeKills) {
      const heaviest = record.procs.toSorted((a, b) => b.rssKb - a.rssKb)[0]
      expect(heaviest?.argv0).toBe("ugrep")
      expect(heaviest?.name).not.toBe("ugrep")
    }
  })
})
