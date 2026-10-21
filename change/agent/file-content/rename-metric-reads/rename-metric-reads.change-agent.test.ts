import { expect, test } from "bun:test"
import {
  renameMetricReads,
  runChange,
} from "akasha/change/agent/file-content/rename-metric-reads/rename-metric-reads.change-agent.code.ts"
import type { Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const AT = "temper/held"

const ONE = "temper/held/one/one.temper-metric.formula.ts"

const TWO = "temper/held/two/two.temper-metric.formula.ts"

const ASKED = { at: AT, of: "flame", to: "flame-own" }

function worldHolding(held: Readonly<Record<string, string>>): World {
  const paths = Object.keys(held)
  return { ...worldOf(held), under: (at) => paths.filter((path) => path.startsWith(`${at}/`)) }
}

function leftAt(held: Readonly<Record<string, string>>, path: string): string {
  const said = renameMetricReads(worldHolding(held), ASKED)
  const only: Said = {
    ...said,
    edits: said.edits.filter((one) => "path" in one && one.path === path),
  }
  return bodyOf(only, (at) => held[at] ?? null)
}

test("a metric a formula reads is read as the other metric", () => {
  const left = leftAt({ [ONE]: `const f = { type: "metric-refs", metricIds: ["flame"] }\n` }, ONE)

  expect(left).toBe(`const f = { type: "metric-refs", metricIds: ["flame-own"] }\n`)
})

test("a read among others in one list is renamed and the others are kept", () => {
  const left = leftAt({ [ONE]: `metricIds: [\n  "base",\n  "flame",\n  "flame-staff",\n]\n` }, ONE)

  expect(left).toBe(`metricIds: [\n  "base",\n  "flame-own",\n  "flame-staff",\n]\n`)
})

test("every formula under the folder reading the metric is renamed", () => {
  const held = {
    [ONE]: `metricIds: ["flame"]\n`,
    [TWO]: `metricIds: ["base"]\nmetricIds: ["flame"]\n`,
  }

  expect(leftAt(held, ONE)).toBe(`metricIds: ["flame-own"]\n`)
  expect(leftAt(held, TWO)).toBe(`metricIds: ["base"]\nmetricIds: ["flame-own"]\n`)
})

test("the metric named outside a list of reads is left as it is", () => {
  const body = `metricIds: ["flame"]\nconst g = { type: "sum-for-metric", metricId: "flame" }\n`

  expect(leftAt({ [ONE]: body }, ONE)).toBe(
    `metricIds: ["flame-own"]\nconst g = { type: "sum-for-metric", metricId: "flame" }\n`
  )
})

test("a body that is no metric formula is passed over", () => {
  const held = { "temper/held/one/one.module.code.ts": `metricIds: ["flame"]\n` }
  const said = renameMetricReads(worldHolding(held), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/no formula under/)
})

test("a folder whose formulas never read the metric is refused", () => {
  const said = renameMetricReads(worldHolding({ [ONE]: `metricIds: ["base"]\n` }), ASKED)

  expect(said.refused ?? "").toMatch(/reads `flame`/)
})

test("an argument this change was handed no value for is refused by the key", () => {
  const said = runChange(worldHolding({ [ONE]: `metricIds: ["flame"]\n` }), { at: AT, of: "flame" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`to` names what this change is handed/)
})
