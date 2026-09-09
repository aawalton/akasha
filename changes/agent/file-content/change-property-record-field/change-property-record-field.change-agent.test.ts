import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { runChange as changeField } from "../../../mechanical/file-content/change/change-property-record-field/change-property-record-field.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { bodyOf, worldFor } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  changePropertyRecordField,
  runChange,
} from "./change-property-record-field.change-agent.code.ts"

const ADDRESS = "change-mechanical-file-content/change-property-record-field"

const RUNS: Reaching = async (world, at, given) => {
  if (at === ADDRESS) {
    return await Promise.resolve(changeField(world, given as Parameters<typeof changeField>[1]))
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
    {
      invariantKind: "departure",
      statement: "the first",
    },
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, RUNS)
}

const ASKED = {
  at: AT,
  key: "invariants",
  where: "statement",
  is: "the first",
  field: "invariantKind",
  to: "gap",
}

test("one field of the record a match names is stated anew", async () => {
  const said = await changePropertyRecordField(worldTold(), ASKED)

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toContain(`invariantKind: "gap"`)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "invariants" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`where` names what this change is handed/)
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

  await changePropertyRecordField(seeing, ASKED)

  expect(reached).toEqual([ADDRESS])
})

test("nothing here works out a body of its own", async () => {
  const seeing: World = {
    ...worldTold(),
    reaching: () => Promise.resolve(NOTHING_OVER),
  }

  const said = await changePropertyRecordField(seeing, ASKED)

  expect(said.edits).toEqual([])
})
