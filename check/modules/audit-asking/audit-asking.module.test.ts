import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  asked,
  refusalsIn,
  unrunIn,
  type Verdicts,
  verdictsWith,
} from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import type { Answered } from "akasha/check/modules/audit-calling/audit-calling.module.code.ts"
import type { Verdict } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { runGit } from "akasha/git/modules/answering/git-answering.module.code.ts"
import { scratchWorld } from "akasha/util/fs/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const NOW = "2026-09-11T00:00:00.000Z"

const CLEAN: Verdict = { commit: "a", ranAt: NOW, refusals: [], unrun: false }

const ONE = ["typecheck"]

function holding(verdict?: Verdict): Map<string, Verdict> {
  return verdict === undefined ? new Map() : new Map([["typecheck", verdict]])
}

function answering(verdict: Verdict): Answered {
  return { ran: [{ check: "typecheck", verdict, ran: true }] }
}

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
  const held = holding({ ...CLEAN, commit: made[0] ?? "" })
  let rounds = 0
  const told = await asked({
    root,
    checks: ONE,
    commit: made[0] ?? "",
    verdicts: () => held,
    round: () => {
      rounds += 1
      return Promise.resolve({ ran: [] })
    },
  })
  expect(rounds).toBe(0)
  expect(told.unanswered).toEqual([])
})

test("a verdict at an ancestor of the commit asked answers for nothing", async () => {
  const { root, made } = await repoOf(2)
  const held = holding({ ...CLEAN, commit: made[0] ?? "" })
  let rounds = 0
  const told = await asked({
    root,
    checks: ONE,
    commit: made[1] ?? "",
    verdicts: () => held,
    round: () => {
      rounds += 1
      return Promise.resolve({ ran: [] })
    },
  })
  expect(rounds).toBe(1)
  expect(told.unanswered).toEqual(ONE)
})

test("the verdict a round answered is read from what came back rather than from a log", async () => {
  const { root, made } = await repoOf(1)
  const told = await asked({
    root,
    checks: ONE,
    commit: made[0] ?? "",
    verdicts: holding,
    round: () =>
      Promise.resolve(answering({ ...CLEAN, commit: made[0] ?? "", refusals: ["one.ts — no"] })),
  })
  expect(told.unanswered).toEqual([])
  expect(told.refusals).toEqual([`typecheck at ${made[0] ?? ""} — one.ts — no`])
})

test("a round that would not start leaves every check it was owed unanswered", async () => {
  const { root, made } = await repoOf(1)
  let rounds = 0
  const told = await asked({
    root,
    checks: ONE,
    commit: made[0] ?? "",
    verdicts: holding,
    round: () => {
      rounds += 1
      return Promise.resolve({ refused: "nothing is listening at `http://127.0.0.1:8788/round`" })
    },
  })
  expect(rounds).toBe(1)
  expect(told.broken).toContain("nothing is listening")
  expect(told.unanswered).toEqual(ONE)
})

test("a check owed a round is named in the round asked for", async () => {
  const { root, made } = await repoOf(1)
  let named: readonly string[] = []
  await asked({
    root,
    checks: ONE,
    commit: made[0] ?? "",
    verdicts: holding,
    round: (checks) => {
      named = checks
      return Promise.resolve(answering({ ...CLEAN, commit: made[0] ?? "" }))
    },
  })
  expect(named).toEqual(ONE)
})

test("a round is asked for once however many checks are left unanswered", async () => {
  const { root, made } = await repoOf(2)
  let rounds = 0
  const told = await asked({
    root,
    checks: ONE,
    commit: made[1] ?? "",
    verdicts: () => holding({ ...CLEAN, commit: made[0] ?? "" }),
    round: () => {
      rounds += 1
      return Promise.resolve({ ran: [] })
    },
  })
  expect(rounds).toBe(1)
  expect(told.unanswered).toEqual(ONE)
})

test("a round handed no reading reads each check's own audit log", async () => {
  const told = await asked({
    root: process.cwd(),
    checks: [],
    commit: "HEAD",
    round: () => Promise.reject(new Error("a round was asked for where no check was owed one")),
  })
  expect(told.broken).toBeNull()
  expect(told.unanswered).toEqual([])
})

test("a round that ran is named on the list the caller hands in", async () => {
  const { root, made } = await repoOf(2)
  const done: string[] = []
  await asked({
    root,
    checks: ONE,
    commit: made[1] ?? "",
    done,
    verdicts: () => holding({ ...CLEAN, commit: made[0] ?? "" }),
    round: () => Promise.resolve(answering({ ...CLEAN, commit: made[1] ?? "" })),
  })
  expect(done).toEqual(["typecheck"])
})

test("a round that threw names nothing on that list", async () => {
  const { root, made } = await repoOf(2)
  const done: string[] = []
  await expect(
    asked({
      root,
      checks: ONE,
      commit: made[1] ?? "",
      done,
      verdicts: () => holding({ ...CLEAN, commit: made[0] ?? "" }),
      round: () => Promise.reject(new Error("the round died mid-flight")),
    })
  ).rejects.toThrow("the round died mid-flight")
  expect(done).toEqual([])
})

test("what a round answered is laid over what the logs said", () => {
  const held: Verdicts = new Map([["typecheck", CLEAN]])
  const said = verdictsWith(held, [
    { check: "typecheck", verdict: { ...CLEAN, commit: "b" }, ran: true },
    { check: "lint-clean", verdict: CLEAN, ran: false },
  ])
  expect(said.get("typecheck")?.commit).toBe("b")
  expect(said.get("lint-clean")).toEqual(CLEAN)
})

test("a refusal is named with the check that refused it and the commit it is at", () => {
  const verdicts: Verdicts = new Map([
    ["typecheck", { ...CLEAN, refusals: ["one.ts — no"] }],
    ["lint-clean", { ...CLEAN, refusals: ["two.ts — no"] }],
  ])
  expect(refusalsIn(verdicts, ["typecheck", "lint-clean"])).toEqual([
    "typecheck at a — one.ts — no",
    "lint-clean at a — two.ts — no",
  ])
})

test("a check that could not run is named apart from a check that refused", () => {
  const verdicts: Verdicts = new Map([
    ["typecheck", { ...CLEAN, refusals: ["one.ts — no"] }],
    ["lint-clean", { ...CLEAN, unrun: true }],
  ])
  expect(unrunIn(verdicts, ["typecheck", "lint-clean"])).toEqual(["lint-clean"])
})
