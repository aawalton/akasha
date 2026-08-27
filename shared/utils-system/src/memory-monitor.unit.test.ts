import { describe, expect, test } from "bun:test"
import { assessMemoryKill, MAX_RSS_GB } from "./memory-monitor/per-process"
import { assessTreeKills, MAX_TREE_RSS_GB, selectTopmostSupervisors } from "./memory-monitor/per-tree"
import { isContainerCgroup, type PidSnapshot, resolvePositiveEnvOverride } from "./memory-monitor/shared"

const KB_PER_GB = 1024 * 1024
const thresholdKb = MAX_RSS_GB * KB_PER_GB
const treeThresholdKb = MAX_TREE_RSS_GB * KB_PER_GB

function snap(pid: number, ppid: number, rssGb: number, name = `proc-${pid}`): PidSnapshot {
  return { pid, ppid, vmRssKb: Math.round(rssGb * KB_PER_GB), name }
}

describe("assessMemoryKill", () => {
  test("does not kill when RSS is well below threshold", () => {
    const result = assessMemoryKill({
      rssKb: 6 * KB_PER_GB,
      thresholdKb,
      kindLabel: "process (next-server)",
      pid: 1000,
    })
    expect(result.kill).toBe(false)
  })

  test("does not kill when RSS exactly equals threshold (strict greater-than)", () => {
    const result = assessMemoryKill({
      rssKb: thresholdKb,
      thresholdKb,
      kindLabel: "process (claude)",
      pid: 1001,
    })
    expect(result.kill).toBe(false)
  })

  test("kills when RSS is one KiB over threshold", () => {
    const result = assessMemoryKill({
      rssKb: thresholdKb + 1,
      thresholdKb,
      kindLabel: "process (claude)",
      pid: 1002,
    })
    expect(result.kill).toBe(true)
  })

  test("kills when RSS is well over threshold", () => {
    const result = assessMemoryKill({
      rssKb: 2 * thresholdKb,
      thresholdKb,
      kindLabel: "process (next-server)",
      pid: 1003,
    })
    expect(result.kill).toBe(true)
  })

  test("kill reason names the kind label, pid, RSS GB, and threshold GB", () => {
    const result = assessMemoryKill({
      rssKb: 30 * KB_PER_GB,
      thresholdKb,
      kindLabel: "process (claude)",
      pid: 42,
    })
    expect(result.kill).toBe(true)
    expect(result.reason).toContain("process (claude)")
    expect(result.reason).toContain("42")
    expect(result.reason).toContain("30")
    expect(result.reason).toContain(MAX_RSS_GB.toFixed(1))
  })

  test("no-kill reason names the kind label, pid, and RSS GB", () => {
    const result = assessMemoryKill({
      rssKb: 4 * KB_PER_GB,
      thresholdKb,
      kindLabel: "process (next-server)",
      pid: 1234,
    })
    expect(result.kill).toBe(false)
    expect(result.reason).toContain("process (next-server)")
    expect(result.reason).toContain("1234")
    expect(result.reason).toContain("4")
  })
})

describe("assessTreeKills", () => {
  test("returns one entry per supervisor with sum of subtree RSS", () => {
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 1),
      snap(200, 100, 2),
      snap(300, 200, 0.5),
      snap(400, 1, 3),
    ]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100, 400],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    const byRoot = new Map(results.map((r) => [r.rootPid, r]))
    expect(byRoot.get(100)?.treeRssKb).toBe(Math.round(3.5 * KB_PER_GB))
    expect(byRoot.get(100)?.descendantPids.toSorted()).toEqual([200, 300])
    expect(byRoot.get(400)?.treeRssKb).toBe(Math.round(3 * KB_PER_GB))
    expect(byRoot.get(400)?.descendantPids).toEqual([])
  })

  test("does not kill when subtree sum is at or below threshold", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 12), snap(200, 100, 12)]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results[0]?.decision.kill).toBe(false)
  })

  test("kills when subtree sum exceeds threshold", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 4), snap(200, 100, 8), snap(300, 200, 13)]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results[0]?.decision.kill).toBe(true)
    expect(results[0]?.descendantPids.toSorted()).toEqual([200, 300])
    expect(results[0]?.decision.reason).toContain("100")
    expect(results[0]?.decision.reason).toContain("25")
  })

  test("walks descendants several levels deep", () => {
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 0),
      snap(200, 100, 6),
      snap(300, 200, 6),
      snap(400, 300, 6),
      snap(500, 400, 7),
    ]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results[0]?.decision.kill).toBe(true)
    expect(results[0]?.descendantPids.toSorted((a, b) => a - b)).toEqual([200, 300, 400, 500])
  })

  test("two supervisors get disjoint trees", () => {
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 1),
      snap(110, 100, 2),
      snap(200, 1, 1),
      snap(210, 200, 2),
    ]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100, 200],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    const byRoot = new Map(results.map((r) => [r.rootPid, r]))
    expect(byRoot.get(100)?.descendantPids).toEqual([110])
    expect(byRoot.get(200)?.descendantPids).toEqual([210])
  })

  test("supervisor with no descendants returns its own RSS only", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 0.5)]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results[0]?.treeRssKb).toBe(Math.round(0.5 * KB_PER_GB))
    expect(results[0]?.descendantPids).toEqual([])
    expect(results[0]?.decision.kill).toBe(false)
  })

  test("orphan with ppid=1 is not attributed to any supervisor tree", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 4), snap(200, 100, 4), snap(900, 1, 10)]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results[0]?.descendantPids).toEqual([200])
    expect(results[0]?.treeRssKb).toBe(Math.round(8 * KB_PER_GB))
    expect(results[0]?.decision.kill).toBe(false)
  })

  test("nested wrapper+supervisor is ONE tree, ONE kill — the 2026-07-16 24.4 GiB double-count (#15587)", () => {
    const W = 3230726
    const S = 3230743
    const grandchildren = [4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008]
    const snapshots: PidSnapshot[] = [
      snap(W, 1, 0.1, "bun"),
      snap(S, W, 0.3, "bun"),
      ...grandchildren.map((pid) => snap(pid, S, 2.7)),
    ]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [W, S],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results).toHaveLength(1)
    expect(results[0]?.rootPid).toBe(W)
    expect(results[0]?.descendantPids).toHaveLength(10)
    expect(results[0]?.decision.kill).toBe(true)
    expect(results.some((r) => r.rootPid === S)).toBe(false)
  })
})

describe("selectTopmostSupervisors", () => {
  test("drops a supervisor that is a strict PPid-descendant of another supervisor", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 0.1), snap(110, 100, 0.3), snap(120, 110, 2)]
    expect(selectTopmostSupervisors([100, 110], snapshots)).toEqual([100])
  })

  test("keeps both when neither is an ancestor of the other (distinct agents)", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 0.1), snap(200, 1, 0.1)]
    expect(selectTopmostSupervisors([100, 200], snapshots).toSorted()).toEqual([100, 200])
  })

  test("keeps only the outermost across a 3-deep supervisor chain", () => {
    const snapshots: PidSnapshot[] = [snap(100, 1, 0.1), snap(110, 100, 0.1), snap(120, 110, 0.1)]
    expect(selectTopmostSupervisors([100, 110, 120], snapshots)).toEqual([100])
  })
})

describe("isContainerCgroup", () => {
  test("true for a rootless-podman container cgroup v2 path", () => {
    const cgroup =
      "0::/user.slice/user-1000.slice/user@1000.service/user.slice/libpod-3f9a1b2c4d.scope/container\n"
    expect(isContainerCgroup(cgroup)).toBe(true)
  })

  test("true for the conmon monitor scope", () => {
    const cgroup =
      "0::/user.slice/user-1000.slice/user@1000.service/libpod-conmon-3f9a1b2c4d.scope\n"
    expect(isContainerCgroup(cgroup)).toBe(true)
  })

  test("false for a normal user-session process (no container)", () => {
    const cgroup = "0::/user.slice/user-1000.slice/session-3.scope\n"
    expect(isContainerCgroup(cgroup)).toBe(false)
  })

  test("false for a supervisor/agent app.slice process", () => {
    const cgroup = "0::/user.slice/user-1000.slice/user@1000.service/app.slice/app-bun.scope\n"
    expect(isContainerCgroup(cgroup)).toBe(false)
  })
})

describe("resolvePositiveEnvOverride", () => {
  const ENV = "TEST_AGENT_MEM_OVERRIDE_GB"
  function withEnv(value: string | undefined, fn: () => void): undefined {
    if (value === undefined) delete process.env[ENV]
    else process.env[ENV] = value
    try {
      fn()
    } finally {
      delete process.env[ENV]
    }
    return undefined
  }

  test("returns the fallback when the env var is unset", () => {
    withEnv(undefined, () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(62))
  })

  test("returns the fallback when the value is blank or whitespace", () => {
    withEnv("", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(62))
    withEnv("   ", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(62))
  })

  test("parses a valid positive integer override", () => {
    withEnv("80", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(80))
  })

  test("parses a valid fractional override", () => {
    withEnv("48.5", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(48.5))
  })

  test("falls back on a non-numeric value", () => {
    withEnv("lots", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(62))
  })

  test("falls back on a non-positive value", () => {
    withEnv("0", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(62))
    withEnv("-10", () => expect(resolvePositiveEnvOverride(ENV, 62)).toBe(62))
  })
})

const LARGEST_LEGITIMATE_PROCESS_GB = 3.3

describe("per-process / per-tree leg composition", () => {
  test("the per-process ceiling is strictly below the per-tree ceiling, so the narrow leg is reachable", () => {
    expect(MAX_RSS_GB).toBeLessThan(MAX_TREE_RSS_GB)
  })

  test("the per-process ceiling clears the largest legitimate process with at least 2x headroom", () => {
    expect(MAX_RSS_GB).toBeGreaterThanOrEqual(LARGEST_LEGITIMATE_PROCESS_GB * 2)
  })

  test("a runaway over the per-process ceiling dies alone — its tree is spared", () => {
    const runaway = 300
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 0.3, "bun"),
      snap(200, 100, 0.6, "claude"),
      snap(runaway, 200, MAX_RSS_GB + 1, "ugrep"),
    ]
    const perProcess = assessMemoryKill({
      rssKb: Math.round((MAX_RSS_GB + 1) * KB_PER_GB),
      thresholdKb,
      kindLabel: "process (ugrep)",
      pid: runaway,
    })
    expect(perProcess.kill).toBe(true)
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [runaway],
    })
    expect(results[0]?.decision.kill).toBe(false)
  })

  test("the tree is spared however much the runaway grew between ticks", () => {
    const runaway = 300
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 0.3, "bun"),
      snap(200, 100, 0.6, "claude"),
      snap(runaway, 200, MAX_TREE_RSS_GB * 10, "ugrep"),
    ]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [runaway],
    })
    expect(results[0]?.decision.kill).toBe(false)
  })

  test("a tree bloated with no single runaway still dies", () => {
    const members = [200, 300, 400, 500, 600]
    const eachGb = MAX_TREE_RSS_GB / members.length + 0.2
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 0.3, "bun"),
      ...members.map((pid) => snap(pid, 100, eachGb, "bun")),
    ]
    expect(eachGb).toBeLessThan(MAX_RSS_GB)
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [],
    })
    expect(results[0]?.decision.kill).toBe(true)
  })

  test("a victim's children keep counting — a runaway cannot hide behind its own children", () => {
    const runaway = 200
    const snapshots: PidSnapshot[] = [
      snap(100, 1, 0.5, "bun"),
      snap(runaway, 100, MAX_RSS_GB + 1, "ugrep"),
      snap(300, runaway, MAX_TREE_RSS_GB, "bun"),
    ]
    const results = assessTreeKills({
      snapshots,
      supervisorPids: [100],
      perTreeThresholdKb: treeThresholdKb,
      perProcessKillPids: [runaway],
    })
    expect(results[0]?.decision.kill).toBe(true)
    expect(results[0]?.descendantPids.toSorted()).toEqual([runaway, 300])
  })
})
