import { afterAll, expect, test } from "bun:test"
import { existsSync, rmSync } from "node:fs"
import { join } from "node:path"
import { testsPass } from "akasha/check/code/pages/tests-pass/tests-pass.check-code.check.code.ts"
import {
  FAILS,
  PASSES,
  repo,
  scratch,
  withoutGuard,
} from "akasha/check/code/pages/tests-pass/tests-pass.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { change } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a file a test file sits beside is input to the check", () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const shadow = shadowAt(root)
  const taken = ["akasha/one.module.ts", "akasha/one.module.code.ts", "akasha/one.module.test.ts"]
  expect(taken.map((path) => testsPass.isInput(path, shadow))).toEqual([true, true, true])
})

test("a file no test file sits beside is no input to the check", () => {
  const root = repo({ "akasha/one.module.code.ts": "", "akasha/held.md": "held" })
  const shadow = shadowAt(root)
  const asleep = ["akasha/one.module.code.ts", "akasha/one.module.ts", "akasha/held.md"]
  expect(asleep.map((path) => testsPass.isInput(path, shadow))).toEqual([false, false, false])
})

test("a test is input to the check by standing beside itself", () => {
  const root = repo({})
  expect(testsPass.isInput("akasha/new.module.test.ts", shadowAt(root))).toBe(true)
})

test("a change whose tests are green is not refused", async () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const said = await withoutGuard(
    async () => await testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said).toEqual([])
})

test("a test file taken away after the check read it is judged on the body that read got", async () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": PASSES,
  })
  const at = join(root, "akasha/one.module.test.ts")
  const disk = onDisk(root)
  const racing: Change = {
    root,
    changed: ["akasha/one.module.code.ts", "akasha/one.module.test.ts"],
    before: disk,
    after: (path) => {
      const bytes = disk(path)
      rmSync(at, { force: true })
      return bytes
    },
  }
  const said = await withoutGuard(async () => await testsPass(racing, shadowAt(root)))
  expect(existsSync(at)).toBe(false)
  expect(said).toEqual([])
})

test("a change whose tests fail is refused, and the reason says how many", async () => {
  const root = repo({
    "akasha/one.module.code.ts": "",
    "akasha/one.module.test.ts": FAILS,
  })
  const said = await withoutGuard(
    async () => await testsPass(change(root, ["akasha/one.module.code.ts"]), shadowAt(root))
  )
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.module.test.ts")
  expect(said[0]?.reason).toContain("1 of 1 tests failed")
})
