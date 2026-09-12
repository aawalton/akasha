import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  atOrAfter,
  cleanAt,
  cleanly,
  verdictIn,
  verdictKept,
  verdictsAt,
  verdictsIn,
  verdictsRead,
  verdictsWrite,
} from "akasha/checks/modules/audit-verdict/audit-verdict.module.code.ts"
import { runGit } from "akasha/git/answering/git-answering.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const CLEAN = { commit: "a", ranAt: "2026-09-11T00:00:00.000Z", refusals: [], unrun: false }

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

test("a verdict written is read back whole", () => {
  const home = scratch.rootFor("akasha-audit-verdict-home-")
  verdictsWrite(home, { typecheck: CLEAN })
  expect(verdictsRead(home)).toEqual({ typecheck: CLEAN })
})

test("a home with no file yet holds no verdict", () => {
  expect(verdictsRead(scratch.rootFor("akasha-audit-verdict-home-"))).toEqual({})
})

test("a file that will not parse holds no verdict rather than throwing", () => {
  const home = scratch.rootFor("akasha-audit-verdict-home-")
  verdictsWrite(home, {})
  writeFileSync(verdictsAt(home), "{ this is no json", "utf8")
  expect(verdictsRead(home)).toEqual({})
})

test("an entry naming no commit is dropped rather than carried", () => {
  expect(verdictIn({ ranAt: "now", refusals: [], unrun: false })).toBeNull()
  expect(verdictIn({ commit: "", ranAt: "now", refusals: [] })).toBeNull()
  expect(verdictsIn({ one: CLEAN, two: { ranAt: "now" } })).toEqual({ one: CLEAN })
})

test("a verdict is clean where the check ran and refused nothing", () => {
  expect(cleanly(CLEAN)).toBe(true)
  expect(cleanly({ ...CLEAN, refusals: ["one refused"] })).toBe(false)
  expect(cleanly({ ...CLEAN, unrun: true })).toBe(false)
})

test("keeping a verdict leaves the verdicts beside it as they were", () => {
  const held = verdictKept({ one: CLEAN }, "two", { ...CLEAN, commit: "b" })
  expect(held.one).toEqual(CLEAN)
  expect(held.two?.commit).toBe("b")
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
  const verdicts = { typecheck: { ...CLEAN, commit: last ?? "" } }
  expect(await cleanAt(root, verdicts, "typecheck", first ?? "")).toBe(true)
  expect(await cleanAt(root, verdicts, "typecheck", last ?? "")).toBe(true)
  expect(await cleanAt(root, verdicts, "lint-clean", first ?? "")).toBe(false)
})

test("a verdict that refused answers for no commit at all", async () => {
  const { root, made } = await repoOf(1)
  const [only] = made
  const verdicts = { typecheck: { ...CLEAN, commit: only ?? "", refusals: ["one refused"] } }
  expect(await cleanAt(root, verdicts, "typecheck", only ?? "")).toBe(false)
})
