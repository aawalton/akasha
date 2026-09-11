import { expect, test } from "bun:test"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { putUpEvery } from "akasha/infrastructure/services/workstations/service-putting-up/service-putting-up.module.code.ts"

const ROOT = rootOf(import.meta.dir)

test("a dry run reaches every workstation service rather than one", () => {
  const put = putUpEvery(ROOT, true)

  expect(put.code).toBe(0)
  expect(put.report[0]).toContain("service(s)")
})

test("a dry run writes nothing and says so", () => {
  const put = putUpEvery(ROOT, true)

  expect(put.report.at(-1)).toContain("nothing was written")
})

test("a dry run plans a unit for more than one service", () => {
  const put = putUpEvery(ROOT, true)

  expect(put.report.filter((one) => one.startsWith("write\t")).length).toBeGreaterThan(1)
})
