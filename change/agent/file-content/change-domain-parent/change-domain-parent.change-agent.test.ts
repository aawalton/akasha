import { expect, test } from "bun:test"
import {
  changeDomainParent,
  runChange,
} from "akasha/change/agent/file-content/change-domain-parent/change-domain-parent.change-agent.code.ts"
import { changeDomainParent as changeDomainParentMechanical } from "akasha/change/mechanical/file-content/change/change-domain-parent/change-domain-parent.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { command } from "akasha/command/command.page-type.ts"
import { namespace } from "akasha/command/namespace/namespace.page-type.ts"
import { imessageContactList } from "akasha/command/pages/imessage/contact-list/imessage-contact-list.command.ts"
import { imessage } from "akasha/command/pages/imessage/imessage.namespace.ts"

const PAGE = `${command.slug}/${imessageContactList.slug}` as const

const TO = `${namespace.slug}/${imessage.slug}` as const

const CHANGE_DOMAIN_PARENT =
  `${changeMechanicalFileContent.slug}/${changeDomainParentMechanical.slug}` as const

test("the reparenting is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await changeDomainParent(worldRecording(carried), { page: PAGE, to: TO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(CHANGE_DOMAIN_PARENT)
  expect(carried.given).toEqual({ page: PAGE, to: TO })
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const world = worldRecording({ at: "", given: null })
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { page: PAGE })

  expect(neither.refused ?? "").toContain("`page`")
  expect(noTo.refused ?? "").toMatch(/`to` names what this change is handed/)
})
