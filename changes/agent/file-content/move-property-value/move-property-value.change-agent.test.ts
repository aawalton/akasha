import { expect, test } from "bun:test"
import {
  movePropertyValue,
  runChange,
} from "akasha/changes/agent/file-content/move-property-value/move-property-value.change-agent.code.ts"
import { runChange as moveValue } from "akasha/changes/mechanical/file-content/move/move-property-value/move-property-value.change-mechanical-file-content.code.ts"
import { refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  worldFor,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ADDRESS = "change-mechanical-file-content/move-property-value"

const RUNS: Reaching = async (world, at, given) => {
  if (at === ADDRESS) {
    return await Promise.resolve(moveValue(world, given as Parameters<typeof moveValue>[1]))
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

const AT = "changes/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const FIRST = '{ invariantKind: "departure", statement: "the first" }'

const SECOND = '{ invariantKind: "gap", statement: "the second" }'

const THIRD = '{ invariantKind: "absence", statement: "the third" }'

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  invariants: [
    ${FIRST},
    ${SECOND},
    ${THIRD},
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, RUNS)
}

const KEY = "invariants"

test("a value named by a field is carried onto the value already holding the place", async () => {
  const said = await runChange(worldTold(), {
    at: AT,
    key: KEY,
    where: "statement",
    is: "the third",
    onto: "the first",
  })

  expect(said.refused).toBeNull()
  const left = bodyOf(said, () => BODY)
  expect(left.indexOf(THIRD)).toBeLessThan(left.indexOf(FIRST))
})

test("a value named by its place is carried to the place named", async () => {
  const said = await runChange(worldTold(), { at: AT, key: KEY, from: "1", to: "3" })

  expect(said.refused).toBeNull()
  const left = bodyOf(said, () => BODY)
  expect(left.indexOf(FIRST)).toBeGreaterThan(left.indexOf(THIRD))
})

test("the value carried keeps the indent the values around it have", async () => {
  const said = await runChange(worldTold(), { at: AT, key: KEY, from: "1", to: "3" })

  expect(bodyOf(said, () => BODY)).toContain(`    ${SECOND},\n    ${THIRD},\n    ${FIRST},`)
})

test("a call naming the value both ways is refused", async () => {
  const said = await runChange(worldTold(), {
    at: AT,
    key: KEY,
    from: "1",
    where: "statement",
    is: "the first",
    to: "2",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/each name a value/)
})

test("a call naming the place it goes to neither way is refused", async () => {
  const said = await runChange(worldTold(), { at: AT, key: KEY, from: "1" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names that place one way/)
})

test("`onto` said without a field to read it under is refused", async () => {
  const said = await runChange(worldTold(), { at: AT, key: KEY, from: "1", onto: "the first" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/says `where` and `is` as well/)
})

test("a place that is no whole number is refused before the page is read", async () => {
  const said = await runChange(worldTold(), { at: AT, key: KEY, from: "first", to: "3" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/is no whole number/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { key: KEY, from: "1", to: "3" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at` names what this change is handed/)
})

test("the arguments are handed to the change reached at the address that change names", async () => {
  const reached: string[] = []
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, at) => {
      reached.push(at)
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await movePropertyValue(seeing, { at: AT, key: KEY, from: 1, to: 3 })

  expect(reached).toEqual([ADDRESS])
})

test("nothing here works out a body of its own", async () => {
  const seeing: World = {
    ...worldTold(),
    reaching: () => Promise.resolve(NOTHING_OVER),
  }

  const said = await movePropertyValue(seeing, { at: AT, key: KEY, from: 1, to: 3 })

  expect(said.edits).toEqual([])
})
