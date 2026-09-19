import { expect, test } from "bun:test"
import {
  COMMAND_TREE,
  DOMAIN_TREE,
  FINDING_TREE,
  GAP_TREE,
  PAGE_TREE,
  turnedIn,
} from "akasha/alan/harness/code-editor/data-interface/modules/tree-turning/tree-turning.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const BYTES = new TextEncoder()

const EVERY = [COMMAND_TREE, DOMAIN_TREE, FINDING_TREE, GAP_TREE, PAGE_TREE]

type Sides = readonly [string | null, string | null]

function changeOver(bodies: ReadonlyMap<string, Sides>): Change {
  const sideOf = (path: string, side: 0 | 1): Uint8Array | null => {
    const held = bodies.get(path)
    const body = held === undefined ? null : held[side]
    return body === null ? null : BYTES.encode(body)
  }
  return {
    root: "/nowhere",
    changed: [...bodies.keys()],
    before: (path) => sideOf(path, 0),
    after: (path) => sideOf(path, 1),
  }
}

function bodyOf(fields: string): string {
  return `export const one = {\n${fields}\n} as const\n`
}

function turnedOver(path: string, was: string | null, now: string | null): readonly string[] {
  const turned = turnedIn(changeOver(new Map([[path, [was, now] as Sides]])))
  return EVERY.filter((slug) => turned.has(slug))
}

const DEPARTURE = '{ decisionKind: "decision-kind/departure", statement: "one" }'

const GAPPED = '{ decisionKind: "decision-kind/gap", statement: "two" }'

test("a path naming no page of its own moves no picture", () => {
  const said = turnedOver("x/one.module.code.ts", "was", "now")

  expect(said).toEqual([])
})

test("a decision of no gap kind moves no picture", () => {
  const was = bodyOf(`  id: "a",\n  decisions: [${DEPARTURE}],`)
  const now = bodyOf(
    `  id: "a",\n  decisions: [{ decisionKind: "decision-kind/departure", statement: "other" }],`
  )

  expect(turnedOver("x/one.module.ts", was, now)).toEqual([])
})

test("a gap stated moves the gap picture alone", () => {
  const was = bodyOf(`  id: "a",\n  decisions: [${DEPARTURE}],`)
  const now = bodyOf(`  id: "a",\n  decisions: [${DEPARTURE}, ${GAPPED}],`)

  expect(turnedOver("x/one.module.ts", was, now)).toEqual([GAP_TREE])
})

test("a part named moves every picture the domains carry", () => {
  const was = bodyOf(`  id: "a",\n  parts: [],`)
  const now = bodyOf(`  id: "a",\n  parts: ["module/two"],`)

  expect(turnedOver("x/one.module.ts", was, now)).toEqual([
    COMMAND_TREE,
    DOMAIN_TREE,
    FINDING_TREE,
    GAP_TREE,
  ])
})

test("a page type declaring another property moves the page picture alone", () => {
  const was = bodyOf(`  id: "a",\n  properties: [],`)
  const now = bodyOf(`  id: "a",\n  properties: ["text-property/two"],`)

  expect(turnedOver("x/one.page-type.ts", was, now)).toEqual([PAGE_TREE])
})

test("a finding stating another domain moves the finding picture alone", () => {
  const was = bodyOf(`  id: "a",\n  domain: "domain/one",`)
  const now = bodyOf(`  id: "a",\n  domain: "domain/two",`)

  expect(turnedOver("x/one.finding.ts", was, now)).toEqual([FINDING_TREE])
})

test("a command defined again moves the command picture alone", () => {
  const was = bodyOf(`  id: "a",\n  definition: "one",`)
  const now = bodyOf(`  id: "a",\n  definition: "two",`)

  expect(turnedOver("x/one.command.ts", was, now)).toEqual([COMMAND_TREE])
})

test("a page that came moves every picture", () => {
  const now = bodyOf(`  id: "a",`)

  expect(turnedOver("x/one.module.ts", null, now)).toEqual(EVERY)
})

test("a page that went moves every picture", () => {
  const was = bodyOf(`  id: "a",`)

  expect(turnedOver("x/one.module.ts", was, null)).toEqual(EVERY)
})

test("a file recording what names a page moves the pictures the domains carry", () => {
  const said = turnedOver("x/one.module.referenced-by.jsonl", "was", "now")

  expect(said).toEqual([COMMAND_TREE, DOMAIN_TREE, FINDING_TREE, GAP_TREE])
})
