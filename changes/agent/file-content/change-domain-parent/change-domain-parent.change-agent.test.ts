import { expect, test } from "bun:test"
import {
  changeDomainParent,
  runChange,
} from "akasha/changes/agent/file-content/change-domain-parent/change-domain-parent.change-agent.code.ts"
import {
  type Carried,
  worldRecording,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const PAGE = "command/imessage-contact-list"

const TO = "namespace/imessage"

const CHANGE_DOMAIN_PARENT = "change-mechanical-file-content/change-domain-parent"

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
