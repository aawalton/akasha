import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  TELLER_STEM,
  unitAt,
} from "akasha/infrastructure/service/workstation/modules/service-bundling/service-bundling.module.code.ts"
import {
  changedAmong,
  notPutUpAt,
  plannedEvery,
  sharedUnitsIn,
} from "akasha/infrastructure/service/workstation/modules/service-putting-up/service-putting-up.module.code.ts"
import { TELLING_TEMPLATE } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const HOME = "/home/one"

const BUNDLE = `${HOME}/.local/state/workstation-services/${TELLER_STEM}/${"a".repeat(40)}.js`

const WAS = "b".repeat(40)

const NOW = "c".repeat(40)

const STAGED = mkdtempSync("/var/tmp/service-putting-up-")

afterAll(() => rmSync(STAGED, { recursive: true, force: true }))

function unitNaming(slug: string, commit: string): undefined {
  const unit = unitAt(STAGED, slug)
  const at = `${STAGED}/.local/state/workstation-services/${slug}/${commit}.js`
  mkdirSync(dirname(unit), { recursive: true })
  writeFileSync(unit, `[Service]\nExecStart=/usr/bin/env bun ${at}\n`)
}

test("a service whose unit already names this commit is put up by nothing again", () => {
  unitNaming("up-to-date", NOW)
  unitNaming("behind", WAS)
  const found = notPutUpAt(new Set(["up-to-date", "behind"]), NOW, STAGED)
  expect([...found]).toEqual(["behind"])
})

test("a service whose unit names no bundle is one to put up", () => {
  expect([...notPutUpAt(new Set(["never-up"]), NOW, STAGED)]).toEqual(["never-up"])
})

test("a home nothing states leaves every service to be put up", () => {
  expect([...notPutUpAt(new Set(["behind"]), NOW, null)]).toEqual(["behind"])
})

function bundleHolding(slug: string, commit: string, text: string): string {
  const at = `${STAGED}/.local/state/workstation-services/${slug}/${commit}.js`
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
  return at
}

test("a service whose new bundle holds the bytes it runs now is restarted by nothing", () => {
  unitNaming("same", WAS)
  bundleHolding("same", WAS, "one\n")
  const fresh = bundleHolding("same", NOW, "one\n")
  expect([...changedAmong(new Set(["same"]), new Map([["same", fresh]]), STAGED)]).toEqual([])
})

test("a service whose new bundle holds other bytes is restarted", () => {
  unitNaming("moved", WAS)
  bundleHolding("moved", WAS, "one\n")
  const fresh = bundleHolding("moved", NOW, "two\n")
  expect([...changedAmong(new Set(["moved"]), new Map([["moved", fresh]]), STAGED)]).toEqual([
    "moved",
  ])
})

test("a service whose running bundle cannot be read is restarted", () => {
  unitNaming("lost", WAS)
  const fresh = bundleHolding("lost", NOW, "one\n")
  expect([...changedAmong(new Set(["lost"]), new Map([["lost", fresh]]), STAGED)]).toEqual(["lost"])
})

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
