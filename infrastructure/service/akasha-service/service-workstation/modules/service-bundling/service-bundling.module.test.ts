import { expect, test } from "bun:test"
import {
  bundleAt,
  stubFor,
  TELLER_STEM,
  unitAt,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import { TELLING_TEMPLATE } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"

const HOME = "/home/one"

const RUNNING = "/repo/one/running.code.ts"

const COMMIT = "a".repeat(40)

test("a stub awaits the run the caller names, handed nothing by default", () => {
  expect(stubFor(RUNNING)).toBe(`import { runService } from "${RUNNING}"\n\nawait runService()\n`)
})

test("a stub hands its run what the caller spells", () => {
  expect(stubFor(RUNNING, "runServiceTelling", "process.argv[2]")).toBe(
    `import { runServiceTelling } from "${RUNNING}"\n\nawait runServiceTelling(process.argv[2])\n`
  )
})

test("the teller's bundle is filed under the stem of the template that starts it", () => {
  expect(`${TELLER_STEM}.service`).toBe(TELLING_TEMPLATE)
  expect(bundleAt(HOME, TELLER_STEM, COMMIT)).toBe(
    `${HOME}/.local/state/workstation-services/${TELLER_STEM}/${COMMIT}.js`
  )
  expect(unitAt(HOME, TELLER_STEM)).toBe(
    `${HOME}/.local/state/workstation-services/${TELLING_TEMPLATE}`
  )
})
