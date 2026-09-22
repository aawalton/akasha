import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { TELLER_STEM } from "akasha/infrastructure/service/workstation/modules/service-bundling/service-bundling.module.code.ts"
import {
  plannedEvery,
  sharedUnitsIn,
} from "akasha/infrastructure/service/workstation/modules/service-putting-up/service-putting-up.module.code.ts"
import { TELLING_TEMPLATE } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const HOME = "/home/one"

const BUNDLE = `${HOME}/.local/state/workstation-services/${TELLER_STEM}/${"a".repeat(40)}.js`

test("the teller every unit names on failing is among the units written", () => {
  const shared = sharedUnitsIn(ROOT)
  expect("refused" in shared).toBe(false)
  if ("refused" in shared) return
  expect(shared.get(TELLING_TEMPLATE)).toContain("ExecStart=/usr/bin/env bun ")
  expect(plannedEvery(ROOT).report).toContain(`write\t${TELLING_TEMPLATE}`)
})

test("the teller's unit names the bundle this call built, and the failed unit after it", () => {
  const shared = sharedUnitsIn(ROOT, "", new Map([[TELLER_STEM, BUNDLE]]))
  expect("refused" in shared).toBe(false)
  if ("refused" in shared) return
  expect(shared.get(TELLING_TEMPLATE)).toContain(`ExecStart=/usr/bin/env bun ${BUNDLE} %i`)
})

test("the teller is enabled by nothing, no service accounting for it", () => {
  const planned = plannedEvery(ROOT)
  expect("plan" in planned).toBe(true)
  if (!("plan" in planned)) return
  expect(planned.plan.enable).not.toContain(TELLING_TEMPLATE)
  expect(planned.plan.remove).not.toContain(TELLING_TEMPLATE)
})

test("a plan reaches every workstation service rather than one", () => {
  const planned = plannedEvery(ROOT)

  expect("plan" in planned).toBe(true)
  expect(planned.report[0]).toContain("service(s)")
})

test("a plan names a unit to write for more than one service", () => {
  const planned = plannedEvery(ROOT)

  expect(planned.report.filter((one) => one.startsWith("write\t")).length).toBeGreaterThan(1)
})
