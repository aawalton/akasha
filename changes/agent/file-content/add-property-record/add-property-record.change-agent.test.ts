import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { runChange as addRecord } from "../../../mechanical/file-content/add/add-property-record/add-property-record.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  worldFor,
} from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { addPropertyRecord, runChange } from "./add-property-record.change-agent.code.ts"

const ADDRESS = "change-mechanical-file-content/add-property-record"

const RUNS: Reaching = async (world, at, given) => {
  if (at === ADDRESS) {
    return await Promise.resolve(addRecord(world, given as Parameters<typeof addRecord>[1]))
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

const AT = "changes/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "the first" },
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, RUNS)
}

const RECORD = '{ invariantKind: "gap", statement: "the second" }'

test("a record is put in as the body spells it rather than quoted", async () => {
  const said = await addPropertyRecord(worldTold(), {
    at: AT,
    key: "invariants",
    record: RECORD,
  })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toContain(RECORD)
})

test("text parsing as no record is refused", async () => {
  const said = await addPropertyRecord(worldTold(), {
    at: AT,
    key: "invariants",
    record: "the second",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/parses as no record/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "invariants" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`record` names what this change is handed/)
})

test("the record is handed to the change reached at the address that change names", async () => {
  const reached: string[] = []
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, at) => {
      reached.push(at)
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await addPropertyRecord(seeing, { at: AT, key: "invariants", record: RECORD })

  expect(reached).toEqual([ADDRESS])
})

test("`after` is left out where the caller states no `after`", async () => {
  let handed: unknown = null
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, _at, given) => {
      handed = given
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await runChange(seeing, { at: AT, key: "invariants", record: RECORD })

  expect(handed).toEqual({ at: AT, key: "invariants", record: RECORD })
})

test("`after` is handed on where the caller states `after`", async () => {
  let handed: unknown = null
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, _at, given) => {
      handed = given
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await runChange(seeing, { at: AT, key: "invariants", record: RECORD, after: "code" })

  expect(handed).toEqual({ at: AT, key: "invariants", record: RECORD, after: "code" })
})
