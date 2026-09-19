import { expect, test } from "bun:test"
import {
  changePropertyRecordField,
  runChange,
} from "akasha/change/agent/file-content/change-property-record-field/change-property-record-field.change-agent.code.ts"
import { changePropertyRecordField as changePropertyRecordFieldMechanical } from "akasha/change/mechanical/file-content/change/change-property-record-field/change-property-record-field.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  worldFor,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDRESS =
  `${changeMechanicalFileContent.slug}/${changePropertyRecordFieldMechanical.slug}` as const

const AT = "change/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  decisions: [
    {
      decisionKind: "departure",
      statement: "the first",
    },
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, running)
}

const ASKED = {
  at: AT,
  key: "decisions",
  where: "statement",
  is: "the first",
  field: "decisionKind",
  to: "gap",
}

test("one field of the record a match names is stated anew", async () => {
  const said = await changePropertyRecordField(worldTold(), ASKED)

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toContain(`decisionKind: "gap"`)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "decisions" })

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
