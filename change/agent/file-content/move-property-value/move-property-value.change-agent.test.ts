import { expect, test } from "bun:test"
import {
  movePropertyValue,
  runChange,
} from "akasha/change/agent/file-content/move-property-value/move-property-value.change-agent.code.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { movePropertyValue as movePropertyValueMechanical } from "akasha/change/mechanical/file-content/move/move-property-value/move-property-value.change-mechanical-file-content.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  worldFor,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDRESS = `${changeMechanicalFileContent.slug}/${movePropertyValueMechanical.slug}` as const

const AT = "change/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const FIRST = '{ decisionKind: "departure", statement: "the first" }'

const SECOND = '{ decisionKind: "gap", statement: "the second" }'

const THIRD = '{ decisionKind: "absence", statement: "the third" }'

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  decisions: [
    ${FIRST},
    ${SECOND},
    ${THIRD},
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, running)
}

const KEY = "decisions"

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
