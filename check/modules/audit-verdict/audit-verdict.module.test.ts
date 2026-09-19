import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  answerLine,
  atOrAfter,
  cleanAt,
  cleanly,
  commitHeld,
  loggedLine,
  measured,
  type Verdict,
  verdictLogged,
  verdictOver,
  verdictRowIn,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import {
  type Cost,
  recordCost,
  recorded,
} from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CLEAN = { commit: "a", ranAt: "2026-09-11T00:00:00.000Z", refusals: [], unrun: false }

const LOGS = "audit.logs"

const PAGE = "one.check-code.ts"

const COST: Cost = {
  runId: "01a0a634-03d5-7000-baec-1b80de61d1d8",
  ranAt: "2026-09-11T00:00:00.000Z",
  phase: "audit",
  ran: "typecheck",
  wallMs: 4686,
  cpuSeconds: 0,
  childCpuSeconds: 1.29,
  peakBytes: 588693504,
  residentBeforeBytes: 0,
  peakAddedBytes: 588693504,
  peakMeasured: true,
  readCalls: 0,
  writeCalls: 0,
  readBytes: 0,
  pathsChanged: 0,
  refusals: 1,
}

function pageIn(): string {
  const root = scratch.rootFor("akasha-audit-verdict-log-")
  writeFileSync(join(root, PAGE), "export const one = {}\n", "utf8")
  return root
}

function rowOf(verdict: Verdict): Record<string, unknown> {
  return JSON.parse(loggedLine(COST, verdict)) as Record<string, unknown>
}

async function repoOf(commits: number): Promise<{ root: string; made: readonly string[] }> {
  const root = scratch.rootFor("akasha-audit-verdict-")
  await runGit(["init", "-q", "-b", "main"], root)
  await runGit(["config", "user.email", "verdict@example.com"], root)
  await runGit(["config", "user.name", "verdict"], root)
  const made: string[] = []
  for (let at = 0; at < commits; at += 1) {
    writeFileSync(join(root, "one.txt"), `${at}\n`, "utf8")
    await runGit(["add", "one.txt"], root)
    await runGit(["commit", "-q", "-m", `${at}`], root)
    made.push((await runGit(["rev-parse", "HEAD"], root)).stdout)
  }
  return { root, made }
}

test("a row naming no commit carries no verdict", () => {
  expect(verdictRowIn("{ this is no json")).toBeNull()
  expect(verdictRowIn(JSON.stringify({ ranAt: "now", refused: [] }))).toBeNull()
  expect(verdictRowIn(JSON.stringify({ commit: "", ranAt: "now", refused: [] }))).toBeNull()
})

test("a row recording a cost alone carries no verdict", () => {
  expect(verdictRowIn(JSON.stringify({ ...COST, ran: "typecheck" }))).toBeNull()
})

test("a row recording a verdict is read back whole", () => {
  const said = JSON.stringify({ commit: "a", ranAt: CLEAN.ranAt, refused: ["one.ts — no"] })
  expect(verdictRowIn(said)).toEqual({ ...CLEAN, refusals: ["one.ts — no"] })
})

test("the verdict a log holds is the one on its newest verdict-bearing row", () => {
  const root = pageIn()
  const first = answerLine("typecheck", { ...CLEAN, refusals: ["one.ts — no"] })
  recorded(root, PAGE, `${first}\n`, LOGS)
  recorded(root, PAGE, `${loggedLine(COST, { ...CLEAN, commit: "b" })}\n`, LOGS)
  recordCost(root, PAGE, COST, LOGS)
  const found = verdictLogged(root, PAGE, LOGS)
  expect(found?.commit).toBe("b")
  expect(found?.refusals).toEqual([])
})

test("a page whose log is not there yet holds no verdict", () => {
  expect(verdictLogged(pageIn(), PAGE, LOGS)).toBeNull()
})

test("a verdict is clean where the check ran and refused nothing", () => {
  expect(cleanly(CLEAN)).toBe(true)
  expect(cleanly({ ...CLEAN, refusals: ["one refused"] })).toBe(false)
  expect(cleanly({ ...CLEAN, unrun: true })).toBe(false)
})

test("a verdict is measured where the check ran, whatever that check refused", () => {
  expect(measured(CLEAN)).toBe(true)
  expect(measured({ ...CLEAN, refusals: ["one refused"] })).toBe(true)
  expect(measured({ ...CLEAN, unrun: true })).toBe(false)
})

test("a commit is at or after itself and at or after every commit it descends from", async () => {
  const { root, made } = await repoOf(3)
  const [first, , last] = made
  expect(await atOrAfter(root, last ?? "", last ?? "")).toBe(true)
  expect(await atOrAfter(root, first ?? "", last ?? "")).toBe(true)
  expect(await atOrAfter(root, last ?? "", first ?? "")).toBe(false)
})

test("a clean verdict answers for the commit it ran at and every ancestor of it", async () => {
  const { root, made } = await repoOf(2)
  const [first, last] = made
  const held = { ...CLEAN, commit: last ?? "" }
  expect(await cleanAt(root, held, first ?? "")).toBe(true)
  expect(await cleanAt(root, held, last ?? "")).toBe(true)
  expect(await cleanAt(root, null, first ?? "")).toBe(false)
})

test("a verdict that refused answers for no commit at all", async () => {
  const { root, made } = await repoOf(1)
  const [only] = made
  const held = { ...CLEAN, commit: only ?? "", refusals: ["one refused"] }
  expect(await cleanAt(root, held, only ?? "")).toBe(false)
})

test("a verdict over what a check judged names each path and says whether it ran", () => {
  const found: readonly Judged[] = [
    { path: "one.ts", reason: "one refused" },
    { path: "two.ts", reason: "two threw", threw: true },
  ]
  expect(verdictOver(found, "abc", CLEAN.ranAt)).toEqual({
    commit: "abc",
    ranAt: CLEAN.ranAt,
    refusals: ["one.ts — one refused", "two.ts — two threw"],
    unrun: true,
  })
})

test("a root holding no commit reads as no commit rather than throwing", () => {
  expect(commitHeld(scratch.rootFor("akasha-audit-verdict-bare-"))).toBe("")
})

test("a row carries what the run cost beside the verdict that run took", () => {
  const row = rowOf({ ...CLEAN, refusals: ["one.ts — no"] })
  expect(row["ran"]).toBe("typecheck")
  expect(row["phase"]).toBe("audit")
  expect(row["childCpuSeconds"]).toBe(1.29)
  expect(row["refusals"]).toBe(1)
  expect(row["commit"]).toBe("a")
  expect(row["refused"]).toEqual(["one.ts — no"])
  expect(row["unrun"]).toBe(false)
})

test("a refusal too long for a row is shortened rather than written whole", () => {
  const whole = `many files failed:\n${"a/b.test.ts\n".repeat(4000)}`
  const refused = rowOf({ ...CLEAN, refusals: [whole] })["refused"] as readonly string[]
  expect(refused[0]?.length).toBeLessThan(whole.length)
  expect(refused[0]).toContain("many files failed:")
})

test("more refusals than a row holds are left off, and the row says how many there were", () => {
  const many = Array.from({ length: 1000 }, (_, at) => `akasha/${at}.ts — ${"no ".repeat(90)}`)
  const refused = rowOf({ ...CLEAN, refusals: many })["refused"] as readonly string[]
  expect(refused.length).toBeLessThan(many.length)
  expect(refused[refused.length - 1]).toContain("1000 refusals in all")
})

test("every refusal a check with hundreds of them found is on the row", () => {
  const many = Array.from({ length: 200 }, (_, at) => `akasha/${at}.ts — ${"no ".repeat(60)}`)
  expect((rowOf({ ...CLEAN, refusals: many })["refused"] as readonly string[]).length).toBe(
    many.length
  )
})
