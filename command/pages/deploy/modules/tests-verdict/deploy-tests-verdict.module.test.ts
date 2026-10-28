import { expect, test } from "bun:test"
import type { Told } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import {
  handedIn,
  handedOf,
  judgedFrom,
  type Naming,
  namedFor,
  pathOf,
  takenFrom,
  verdictAsked,
  verdictFor,
} from "akasha/command/pages/deploy/modules/tests-verdict/deploy-tests-verdict.module.code.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const LATER = "fedcba9876543210fedcba9876543210fedcba98"

const CLEAN: Told = { refusals: [], unrun: [], unanswered: [], broken: null, said: [] }

const FAILING = "one/one.module.test.ts — 1 test file failed: one/one.module.test.ts"

const SLOW =
  "two/two.module.test.ts — Measured at now. a test file is given 5 processor seconds and 60 seconds on the clock, and 1 test file went past that"

const NO_INDEX: Naming = {
  importersOf: () => [],
  importsReaching: () => [],
  listedAt: () => [],
  namersAt: () => [],
  fileKeysAt: () => new Map(),
  typesCarrying: () => new Set(),
}

test("a clean verdict refuses nothing", () => {
  expect(takenFrom(CLEAN, COMMIT)).toEqual({ verdict: { commit: COMMIT, refusals: [] } })
})

test("a refusal in the verdict is kept as the check wrote it, without the check's name", () => {
  const told = { ...CLEAN, refusals: [`tests-pass at ${COMMIT} — ${FAILING}`] }
  expect(takenFrom(told, COMMIT)).toEqual({ verdict: { commit: COMMIT, refusals: [FAILING] } })
})

test("a verdict that never came back refuses the deploy", () => {
  const taken = takenFrom({ ...CLEAN, broken: "nothing is listening" }, COMMIT)
  expect("broken" in taken && taken.broken).toContain("nothing is listening")
})

test("a commit no round answered for refuses the deploy", () => {
  const taken = takenFrom({ ...CLEAN, unanswered: ["tests-pass"] }, COMMIT)
  expect("broken" in taken && taken.broken).toContain("no round answered")
})

test("a round that could not run the tests refuses the deploy", () => {
  const taken = takenFrom({ ...CLEAN, unrun: ["tests-pass"] }, COMMIT)
  expect("broken" in taken && taken.broken).toContain("could not run the tests")
})

test("asking that throws refuses the deploy rather than passing it", async () => {
  const taken = await verdictAsked(".", COMMIT, async () => {
    throw new Error("the port is gone")
  })
  expect("broken" in taken && taken.broken).toContain("the port is gone")
})

test("the workstation asks the audit service, and the run in the cluster never does", async () => {
  let asked = 0
  const asking = async (): Promise<Told> => {
    asked += 1
    return CLEAN
  }
  expect(await verdictFor(".", COMMIT, asking, false)).toEqual({
    verdict: { commit: COMMIT, refusals: [] },
  })
  const there = await verdictFor(".", COMMIT, asking, true)
  expect("broken" in there && there.broken).toContain("handed none")
  expect(asked).toBe(1)
})

test("a verdict handed to the run in the cluster reads back whole", () => {
  const verdict = { commit: COMMIT, refusals: [FAILING] }
  expect(handedIn(handedOf(verdict), COMMIT)).toEqual({ verdict })
})

test("a verdict handed for another commit refuses the run", () => {
  const taken = handedIn(handedOf({ commit: LATER, refusals: [] }), COMMIT)
  expect("broken" in taken && taken.broken).toContain(LATER)
})

test("a handed verdict that reads as nothing refuses the run", () => {
  const taken = handedIn("not a verdict", COMMIT)
  expect("broken" in taken && taken.broken).toContain("no verdict")
})

test("a refusal names the file before its reason", () => {
  expect(pathOf(FAILING)).toBe("one/one.module.test.ts")
})

test("a refusal refuses the deploy only where its judging would run that test", () => {
  const named = new Set(["one/one.module.test.ts"])
  expect(judgedFrom([FAILING, "three/three.module.test.ts — failed"], named)).toEqual([
    { path: "one/one.module.test.ts", reason: "1 test file failed: one/one.module.test.ts" },
  ])
})

test("a refusal over what a test file cost is said to be about cost", () => {
  const [judged] = judgedFrom([SLOW], new Set(["two/two.module.test.ts"]))
  expect(judged?.slow).toBe(true)
})

test("the tests a deploy names are those beside the files it judges", () => {
  const named = namedFor(["one/one.module.code.ts"], (path) => path.endsWith(".ts"), NO_INDEX)
  expect([...named]).toEqual(["one/one.module.test.ts"])
})

test("a test the commit does not hold is named by nothing", () => {
  expect(namedFor(["one/one.module.code.ts"], () => false, NO_INDEX).size).toBe(0)
})
