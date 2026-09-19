import { expect, test } from "bun:test"
import {
  removePropertyRecord,
  runChange,
} from "akasha/change/agent/file-content/remove-property-record/remove-property-record.change-agent.code.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyRecord as removePropertyRecordMechanical } from "akasha/change/mechanical/file-content/remove/remove-property-record/remove-property-record.change-mechanical-file-content.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  worldFor,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDRESS =
  `${changeMechanicalFileContent.slug}/${removePropertyRecordMechanical.slug}` as const

const AT = "change/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const FIRST = '{ decisionKind: "departure", statement: "the first" }'

const SECOND = '{ decisionKind: "gap", statement: "the second" }'

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  decisions: [
    ${FIRST},
    ${SECOND},
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, running)
}

const ASKED = { at: AT, key: "decisions", where: "statement", is: "the first" }

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
  expect(said.refused ?? "").toMatch(/no record under `decisions` states that text/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "decisions", where: "statement" })

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
