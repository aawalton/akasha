import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  asked,
  refusalsIn,
  unrunIn,
} from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import {
  type Verdict,
  type Verdicts,
  verdictsWrite,
} from "akasha/checks/modules/audit-verdict/audit-verdict.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { runGit } from "akasha/git/answering/git-answering.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const NOW = "2026-09-11T00:00:00.000Z"

const CLEAN: Verdict = { commit: "a", ranAt: NOW, refusals: [], unrun: false }

const ONE = ["typecheck"]

async function repoOf(commits: number): Promise<{ root: string; made: readonly string[] }> {
  const root = scratch.rootFor("akasha-audit-asking-")
  await runGit(["init", "-q", "-b", "main"], root)
  await runGit(["config", "user.email", "asking@example.com"], root)
  await runGit(["config", "user.name", "asking"], root)
  const made: string[] = []
  for (let at = 0; at < commits; at += 1) {
    writeFileSync(join(root, "one.txt"), `${at}\n`, "utf8")
    await runGit(["add", "one.txt"], root)
    await runGit(["commit", "-q", "-m", `${at}`], root)
    made.push((await runGit(["rev-parse", "HEAD"], root)).stdout)
  }
  return { root, made }
}

test("a check every verdict already answers for is owed no round", async () => {
  const { root, made } = await repoOf(1)
  const home = scratch.rootFor("akasha-audit-asking-home-")
  verdictsWrite(home, { typecheck: { ...CLEAN, commit: made[0] ?? "" } })
  let rounds = 0
  const told = await asked({
    root,
    home,
    checks: ONE,
    commit: made[0] ?? "",
    round: () => {
      rounds += 1
      return null
    },
  })
  expect(rounds).toBe(0)
  expect(told.unanswered).toEqual([])
})

test("a verdict at an ancestor of the commit asked answers for nothing", async () => {
  const { root, made } = await repoOf(2)
  const home = scratch.rootFor("akasha-audit-asking-home-")
  verdictsWrite(home, { typecheck: { ...CLEAN, commit: made[0] ?? "" } })
  let rounds = 0
  const told = await asked({
    root,
    home,
    checks: ONE,
    commit: made[1] ?? "",
    round: () => {
      rounds += 1
      return null
    },
  })
  expect(rounds).toBe(2)
  expect(told.unanswered).toEqual(ONE)
})

test("a round whose verdict answers ends the asking", async () => {
  const { root, made } = await repoOf(1)
  const home = scratch.rootFor("akasha-audit-asking-home-")
  let rounds = 0
  const told = await asked({
    root,
    home,
    checks: ONE,
    commit: made[0] ?? "",
    round: () => {
      rounds += 1
      verdictsWrite(home, {
        typecheck: { ...CLEAN, commit: made[0] ?? "", refusals: ["one.ts — no"] },
      })
      return null
    },
  })
  expect(rounds).toBe(1)
  expect(told.unanswered).toEqual([])
  expect(told.refusals).toEqual(["typecheck — one.ts — no"])
})

test("a round that would not start leaves every check it was owed unanswered", async () => {
  const { root, made } = await repoOf(1)
  const home = scratch.rootFor("akasha-audit-asking-home-")
  let rounds = 0
  const told = await asked({
    root,
    home,
    checks: ONE,
    commit: made[0] ?? "",
    round: () => {
      rounds += 1
      return "the unit would not start"
    },
  })
  expect(rounds).toBe(1)
  expect(told.broken).toBe("the unit would not start")
  expect(told.unanswered).toEqual(ONE)
})

test("a refusal is named with the check that refused it", () => {
  const verdicts: Verdicts = {
    typecheck: { ...CLEAN, refusals: ["one.ts — no"] },
    "lint-clean": { ...CLEAN, refusals: ["two.ts — no"] },
  }
  expect(refusalsIn(verdicts, ["typecheck", "lint-clean"])).toEqual([
    "typecheck — one.ts — no",
    "lint-clean — two.ts — no",
  ])
})

test("a check that could not run is named apart from a check that refused", () => {
  const verdicts: Verdicts = {
    typecheck: { ...CLEAN, refusals: ["one.ts — no"] },
    "lint-clean": { ...CLEAN, unrun: true },
  }
  expect(unrunIn(verdicts, ["typecheck", "lint-clean"])).toEqual(["lint-clean"])
})
