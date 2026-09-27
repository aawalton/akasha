import { expect, test } from "bun:test"
import {
  COMMAND_TREE,
  DOMAIN_TREE,
  descentMoved,
  type Filing,
  PAGE_TREE,
  turnedIn,
  WORLD_TREE,
} from "akasha/alan/harness/code-editor/data-interface/modules/tree-turning/tree-turning.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const BYTES = new TextEncoder()

const EVERY = [COMMAND_TREE, DOMAIN_TREE, PAGE_TREE]

const DOMAINS = [COMMAND_TREE, DOMAIN_TREE]

const UNDER_DOMAIN: ReadonlySet<string> = new Set(["module", "command"])

const underDomain: Filing = (pageType) => UNDER_DOMAIN.has(pageType)

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
  const turned = turnedIn(changeOver(new Map([[path, [was, now] as Sides]])), underDomain)
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

test("a gap stated moves no picture a landing carries", () => {
  const was = bodyOf(`  id: "a",\n  decisions: [${DEPARTURE}],`)
  const now = bodyOf(`  id: "a",\n  decisions: [${DEPARTURE}, ${GAPPED}],`)

  expect(turnedOver("x/one.module.ts", was, now)).toEqual([])
})

test("a part named moves every picture the domains carry", () => {
  const was = bodyOf(`  id: "a",\n  parts: [],`)
  const now = bodyOf(`  id: "a",\n  parts: ["module/two"],`)

  expect(turnedOver("x/one.module.ts", was, now)).toEqual([COMMAND_TREE, DOMAIN_TREE])
})

test("a page type declaring another property moves the page picture alone", () => {
  const was = bodyOf(`  id: "a",\n  properties: [],`)
  const now = bodyOf(`  id: "a",\n  properties: ["text-property/two"],`)

  expect(turnedOver("x/one.page-type.ts", was, now)).toEqual([PAGE_TREE])
})

test("a finding stating another domain moves no picture a landing carries", () => {
  const was = bodyOf(`  id: "a",\n  domain: "domain/one",`)
  const now = bodyOf(`  id: "a",\n  domain: "domain/two",`)

  expect(turnedOver("x/one.finding.ts", was, now)).toEqual([])
})

test("a command defined again moves the command picture alone", () => {
  const was = bodyOf(`  id: "a",\n  definition: "one",`)
  const now = bodyOf(`  id: "a",\n  definition: "two",`)

  expect(turnedOver("x/one.command.ts", was, now)).toEqual([COMMAND_TREE])
})

test("a page of a kind under domain that came moves the pictures the domains carry", () => {
  const now = bodyOf(`  id: "a",`)

  expect(turnedOver("x/one.module.ts", null, now)).toEqual(DOMAINS)
})

test("a page of a kind under domain that went moves the pictures the domains carry", () => {
  const was = bodyOf(`  id: "a",`)

  expect(turnedOver("x/one.module.ts", was, null)).toEqual(DOMAINS)
})

test("a page type that came moves every picture", () => {
  const now = bodyOf(`  id: "a",\n  slug: "one",`)

  expect(turnedOver("x/one.page-type.ts", null, now)).toEqual(EVERY)
})

test("a persona that came moves the pictures the domains carry", () => {
  const now = bodyOf(`  id: "a",`)

  expect(turnedOver("x/one.persona.ts", null, now)).toEqual(DOMAINS)
})

test("a message that came moves no picture", () => {
  const now = bodyOf(`  id: "a",\n  to: "seat/one",`)

  expect(turnedOver("x/message-a.agent-message.ts", null, now)).toEqual([])
  expect(turnsWorlds("x/message-a.agent-message.ts", null, now)).toBe(false)
})

test("a message that went moves no picture", () => {
  const was = bodyOf(`  id: "a",\n  to: "seat/one",`)

  expect(turnedOver("x/message-a.agent-message.ts", was, null)).toEqual([])
})

test("a page of no kind under domain asks for the kinds, and one under it does not ask", () => {
  const asked: string[] = []
  const filing: Filing = (pageType) => {
    asked.push(pageType)
    return false
  }
  const now = bodyOf(`  id: "a",`)
  turnedIn(changeOver(new Map([["x/one.agent-message.ts", [null, now] as Sides]])), filing)
  turnedIn(changeOver(new Map([["x/one.persona.ts", [null, now] as Sides]])), filing)

  expect(asked).toEqual(["agent-message"])
})

function turnsWorlds(path: string, was: string | null, now: string | null): boolean {
  return turnedIn(changeOver(new Map([[path, [was, now] as Sides]])), underDomain).has(WORLD_TREE)
}

test("a world retitled moves the world picture", () => {
  const was = bodyOf(`  id: "a",\n  title: "One",`)
  const now = bodyOf(`  id: "a",\n  title: "Two",`)

  expect(turnsWorlds("x/one.world.ts", was, now)).toBe(true)
})

test("a story naming another world moves the world picture", () => {
  const was = bodyOf(`  id: "a",\n  world: "world/one",`)
  const now = bodyOf(`  id: "a",\n  world: "world/two",`)

  expect(turnsWorlds("x/one.story-read.ts", was, now)).toBe(true)
})

test("a page naming no world moves no world picture", () => {
  const now = bodyOf(`  id: "a",`)

  expect(turnsWorlds("x/one.module.ts", null, now)).toBe(false)
})

test("a data interface that came moves the picture it names", () => {
  const now = bodyOf(`  slug: "world-tree",`)

  expect(turnsWorlds("x/world-tree.code-editor-data-interface.ts", null, now)).toBe(true)
})

const REFERENCES = "x/one.module.referenced-by.jsonl"

const IMPORTED =
  '{"propertySlug":"import","fileName":"one.module.code.ts","path":"x/two.ts","typed":false,"deferred":false}\n'

const SENT = '{"propertySlug":"agent-message-to","path":"x/m.agent-message.ts","id":"m"}\n'

const CHAMPIONED = '{"propertySlug":"championed-domain","path":"x/p.persona.ts","id":"p"}\n'

const EXTENDED = '{"propertySlug":"extends-type","path":"x/t.page-type.ts","id":"t"}\n'

test("a file recording a champion moves the pictures the domains carry", () => {
  expect(turnedOver(REFERENCES, IMPORTED, `${IMPORTED}${CHAMPIONED}`)).toEqual(DOMAINS)
})

test("a file recording a type extended moves the pictures the domains carry", () => {
  expect(turnedOver(REFERENCES, null, EXTENDED)).toEqual(DOMAINS)
})

test("a file recording only imports and messages moves no picture", () => {
  expect(turnedOver(REFERENCES, IMPORTED, `${IMPORTED}${SENT}`)).toEqual([])
  expect(turnedOver(REFERENCES, null, `${CHAMPIONED}${SENT}`)).toEqual(DOMAINS)
})

function descends(was: string | null, now: string | null): boolean {
  return descentMoved(changeOver(new Map([[REFERENCES, [was, now] as Sides]])))
}

test("a file recording a type extended moves the descent, and one recording anything else does not", () => {
  expect(descends(IMPORTED, `${IMPORTED}${EXTENDED}`)).toBe(true)
  expect(descends(IMPORTED, `${IMPORTED}${CHAMPIONED}${SENT}`)).toBe(false)
})
