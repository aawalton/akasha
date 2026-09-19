import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { plannedEvery } from "akasha/infrastructure/service/workstation/modules/service-putting-up/service-putting-up.module.code.ts"

const ROOT = rootOf(import.meta.dir)

test("a plan reaches every workstation service rather than one", () => {
  const planned = plannedEvery(ROOT)

  expect("plan" in planned).toBe(true)
  expect(planned.report[0]).toContain("service(s)")
})

test("a plan names a unit to write for more than one service", () => {
  const planned = plannedEvery(ROOT)

  expect(planned.report.filter((one) => one.startsWith("write\t")).length).toBeGreaterThan(1)
})
