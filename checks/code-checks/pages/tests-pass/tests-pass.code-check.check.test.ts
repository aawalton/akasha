import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { testsPass } from "./tests-pass.code-check.check.code.ts"
import {
  FAILS,
  PASSES,
  repo,
  scratch,
  withoutGuard,
} from "./tests-pass.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a file the index files a test beside is input to the check", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const shadow = shadowAt(root)
  const taken = ["akasha/one.module.ts", "akasha/one.module.code.ts", "akasha/one.module.test.ts"]
  expect(taken.map((path) => testsPass.isInput(path, shadow))).toEqual([true, true, true])
})

test("a file the index files no test beside is no input to the check", () => {
  const root = repo({ "akasha/one.module.code.ts": "", "akasha/held.md": "held" })
  const shadow = shadowAt(root)
  const asleep = ["akasha/one.module.code.ts", "akasha/one.module.ts", "akasha/held.md"]
  expect(asleep.map((path) => testsPass.isInput(path, shadow))).toEqual([false, false, false])
})

test("a test is input to the check by standing beside itself", () => {
  const root = repo({})
  expect(testsPass.isInput("akasha/new.module.test.ts", shadowAt(root))).toBe(true)
})

test("a change whose tests are green is not refused", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const said = withoutGuard(() =>
    testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said).toEqual([])
})

test("a change whose tests fail is refused, and the reason says how many", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = withoutGuard(() =>
    testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})
