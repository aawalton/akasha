import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { runChange as removeRecord } from "../../../mechanical/file-content/remove/remove-property-record/remove-property-record.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { bodyOf, worldFor } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { removePropertyRecord, runChange } from "./remove-property-record.change-agent.code.ts"

const ADDRESS = "change-mechanical-file-content/remove-property-record"

const RUNS: Reaching = async (world, at, given) => {
  if (at === ADDRESS) {
    return await Promise.resolve(removeRecord(world, given as Parameters<typeof removeRecord>[1]))
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

const AT = "changes/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const FIRST = '{ invariantKind: "departure", statement: "the first" }'

const SECOND = '{ invariantKind: "gap", statement: "the second" }'

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  invariants: [
    ${FIRST},
    ${SECOND},
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, RUNS)
}

const ASKED = { at: AT, key: "invariants", where: "statement", is: "the first" }

test("the record a match names is taken out", async () => {
  const said = await removePropertyRecord(worldTold(), ASKED)

  expect(said.refused).toBeNull()
  const left = bodyOf(said, () => BODY)
  expect(left).not.toContain(FIRST)
  expect(left).toContain(SECOND)
})

test("text no record states is refused", async () => {
  const said = await removePropertyRecord(worldTold(), { ...ASKED, is: "the third" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/no record under `invariants` states that text/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "invariants", where: "statement" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`is` names what this change is handed/)
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

  await removePropertyRecord(seeing, ASKED)

  expect(reached).toEqual([ADDRESS])
})

test("nothing here works out a body of its own", async () => {
  const seeing: World = {
    ...worldTold(),
    reaching: () => Promise.resolve(NOTHING_OVER),
  }

  const said = await removePropertyRecord(seeing, ASKED)

  expect(said.edits).toEqual([])
})
