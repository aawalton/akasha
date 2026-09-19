import { expect, test } from "bun:test"
import {
  addPropertyToPageType,
  runChange,
} from "akasha/change/agent/page-type/add-property-to-page-type/add-property-to-page-type.change-agent.code.ts"
import { addPropertyToPageType as addPropertyToPageTypeMechanical } from "akasha/change/mechanical/page-type/add/add-property-to-page-type/add-property-to-page-type.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import type { Reaching, World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { listing } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { webDirectory } from "akasha/code/ios-app/properties/web-directory.build-folder-property.ts"
import { buildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.ts"

const OWNER_AT = "thrumming/moots/moot.page-type.ts"

const PROPERTY = `${buildFolderProperty.slug}/${webDirectory.slug}` as const

const RUNG = `${changeMechanicalPageType.slug}/${addPropertyToPageTypeMechanical.slug}` as const

const REACHED: string[] = []

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

function worldFor(reaching: Reaching): World {
  return { ...worldOf({}), reaching }
}

test("a page type is handed to the mechanical change declaring a property on one", async () => {
  const seen: Reached[] = []

  const said = await addPropertyToPageType(worldFor(catching(seen)), {
    at: OWNER_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.refused).toBeNull()
  expect(seen[0]?.at).toBe(RUNG)
  expect(seen[0]?.given).toEqual({
    at: OWNER_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })
})

test("no change but that one rung is reached", async () => {
  REACHED.length = 0

  await addPropertyToPageType(worldFor(listing(REACHED)), {
    at: OWNER_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(REACHED).toEqual([RUNG])
})

test("`required` and `many` are handed in as text and handed on as truths", async () => {
  const seen: Reached[] = []

  await runChange(worldFor(catching(seen)), {
    at: OWNER_AT,
    property: PROPERTY,
    required: "true",
    many: "no",
  })

  expect(seen[0]?.given).toMatchObject({ required: true, many: false })
})

test("the count is handed in named `max-count` and handed on named `maxCount`", async () => {
  const seen: Reached[] = []

  await runChange(worldFor(catching(seen)), {
    at: OWNER_AT,
    property: PROPERTY,
    required: "false",
    many: "true",
    "max-count": "30",
  })

  expect(seen[0]?.given).toMatchObject({ many: true, maxCount: "30" })
})

test("a run told no count hands none on", async () => {
  const seen: Reached[] = []

  await runChange(worldFor(catching(seen)), {
    at: OWNER_AT,
    property: PROPERTY,
    required: "false",
    many: "true",
  })

  expect(seen[0]?.given).not.toHaveProperty("maxCount")
})

test("a refusal from that change is the refusal this act gives", async () => {
  const said = await addPropertyToPageType(worldFor(refusingAt([], RUNG)), {
    at: OWNER_AT,
    property: PROPERTY,
    required: false,
    many: false,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(RUNG)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldFor(catching([])), { at: OWNER_AT, property: PROPERTY })

  expect(said.refused ?? "").toContain("required")
})
