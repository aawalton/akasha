import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { changeDomainParent, runChange } from "./change-domain-parent.change-agent.code.ts"

const PAGE = "command/imessage-contacts"

const TO = "namespace/imessage"

const CHANGE_DOMAIN_PARENT = "change-mechanical-file-content/change-domain-parent"

type Carried = { at: string; given: unknown }

function worldOf(carried: Carried): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("the reparenting is left to the change reached at its address", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await changeDomainParent(worldOf(carried), { page: PAGE, to: TO })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(CHANGE_DOMAIN_PARENT)
  expect(carried.given).toEqual({ page: PAGE, to: TO })
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const world = worldOf({ at: "", given: null })
  const neither = await runChange(world, {})
  const noTo = await runChange(world, { page: PAGE })

  expect(neither.refused ?? "").toContain("`page`")
  expect(noTo.refused ?? "").toMatch(/`to` names what this change is handed/)
})
