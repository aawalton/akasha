import { expect, test } from "bun:test"
import { harnessSettings } from "akasha/agent/settings/properties/harness-settings.file-property.ts"
import { telling } from "akasha/agent/settings/properties/telling.module-property-group.ts"
import { addFileCommand } from "akasha/change/agent/file/add-file/add-file.change-agent.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { modulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT = "akasha/one.held.ts"

const PLAIN = "akasha/one/notes.md"

const REACHES = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: running(REACHES),
  }
}

test("the arguments naming a path and a body are answered as one edit", async () => {
  const said = await addFileCommand(worldOf({}), { at: PLAIN, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: PLAIN, content: "alpha\n" }])
})

test("a body keeps the newline its fence left on the last line", async () => {
  const said = await addFileCommand(worldOf({}), { at: PLAIN, body: "alpha\nbeta\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "add", path: PLAIN, content: "alpha\nbeta\n" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await addFileCommand(worldOf({}), { body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no body are refused by the name of the argument", async () => {
  const said = await addFileCommand(worldOf({}), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`body`/)
})

test("the arguments this change hands on are reached through the runner the world carries", async () => {
  let reached = ""
  let carried: unknown = null
  const said = await addFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at, given) => {
        reached = at
        carried = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, body: "alpha\n", id: "auto" }
  )

  expect(reached).toBe(REACHES)
  expect(carried).toEqual({ at: AT, body: "alpha\n", id: "auto", old: undefined })
  expect(said.refused).toBeNull()
})

const PAGE = "akasha/one.held-settings.ts"

const WRITTEN = "akasha/one.held-settings.harness-settings.json"

const BESIDE = "akasha/one.held-settings.telling.code.ts"

const PROPERTY = "akasha/harness-settings.file-property.ts"

const GROUP = "akasha/telling.module-property-group.ts"

const TELLING = `${modulePropertyGroup.slug}/${telling.slug}` as const

const HARNESS_SETTINGS = `${fileProperty.slug}/${harnessSettings.slug}` as const

const SAYING: ReadonlyMap<string, Value> = new Map([
  [PROPERTY, { propertySlug: harnessSettings.slug, writtenBy: TELLING }],
  [GROUP, { slug: "telling", propertySlug: "telling" }],
])

const GROUPS = {
  pageTypesIn: () => new Set<string>(),
  kindsUnder: (of: string) => (of === "file-property" ? ["file-property"] : []),
  everyOfType: (kind: string) => {
    if (kind === "file-property") return [{ path: PROPERTY }]
    if (kind === "module-property-group") return [{ path: GROUP }]
    return []
  },
  pageByPath: (path: string) => SAYING.get(path) ?? null,
  carryingOf: (named: string) =>
    named === HARNESS_SETTINGS
      ? { carrying: [{ pageTypeSlug: "held-settings", path: PAGE, id: "held", within: null }] }
      : { refused: "no page property carries the slug" },
} as never

test("a body at a path a group writes is refused rather than dropped", async () => {
  const said = await addFileCommand(
    { ...worldOf({ [BESIDE]: "one two\n" }), index: GROUPS },
    { at: WRITTEN, body: "{}\n" }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(BESIDE)
  expect(said.refused ?? "").toContain("bodyIn")
})

test("the body a caller composed against is handed on beside the body written", async () => {
  let carried: unknown = null
  await addFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, _at, given) => {
        carried = given
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, body: "beta\n", old: "alpha\n" }
  )

  expect(carried).toEqual({ at: AT, body: "beta\n", id: undefined, old: "alpha\n" })
})
