import { expect, test } from "bun:test"
import { harnessSettings } from "akasha/agent/settings/properties/harness-settings.file-property.ts"
import { telling } from "akasha/agent/settings/properties/telling.module-property-group.ts"
import {
  changeFileCommand,
  passages,
} from "akasha/change/agent/file-content/change-file/change-file.change-agent.code.ts"
import { changeFileContentOfAnyKind } from "akasha/change/mechanical/file-content/change/change-file-content-of-any-kind/change-file-content-of-any-kind.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { type Answer, replayed } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { modulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import {
  passagesIn,
  readingIn,
} from "akasha/command/modules/argument-reading/argument-reading.module.code.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT = "akasha/one.held.ts"

const NO_PAGES = { pageTypesIn: () => new Set<string>() } as never

function worldOf(held: Readonly<Record<string, string>>, index: World["index"] = NO_PAGES): World {
  return {
    root: "/nowhere",
    index,
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: running,
  }
}

function landedIn(held: Readonly<Record<string, string>>, said: Answer): string {
  const after = replayed(said, (path) => held[path] ?? null)
  if ("refused" in after) throw new Error(after.refused)
  const body = after.get(AT)
  return typeof body === "string" ? body : ""
}

test("the arguments naming a path and two passages are answered as one edit", async () => {
  const said = await changeFileCommand(worldOf({ [AT]: "one two\n" }), {
    at: AT,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "replace", path: AT, contentFrom: "two", contentTo: "four" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { old: "two", new: "four" })

  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no passage are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { at: AT, new: "four" })

  expect(said.refused ?? "").toMatch(/`old`/)
})

test("arguments saying nothing the passage becomes are refused by the name of the argument", async () => {
  const said = await changeFileCommand(worldOf({}), { at: AT, old: "two" })

  expect(said.refused ?? "").toMatch(/`new`/)
})

test("the passage this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await changeFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, old: "two", new: "four" }
  )

  expect(reached).toBe(`${changeMechanicalFileContent.slug}/${changeFileContentOfAnyKind.slug}`)
  expect(said.refused).toBeNull()
})

function fenced(text: string): Readonly<Record<string, string>> | string {
  const read = readingIn(text)
  if ("refused" in read) throw new Error(read.refused)
  return passagesIn(read.given, read.fenced, passages)
}

async function changedBy(held: Readonly<Record<string, string>>, text: string): Promise<Answer> {
  const given = fenced(text)
  if (typeof given === "string") throw new Error(given)
  return await changeFileCommand(worldOf(held), given)
}

test("a fenced passage ending mid-line matches with no modifier and lands", async () => {
  const held = { [AT]: "export const one = { a: 1, b: 2 }\n" }
  const said = await changedBy(held, `at: ${AT}\nold ~~~\na: 1\n~~~\nnew ~~~\na: 9\n~~~`)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "a: 1", contentTo: "a: 9" },
  ])
  expect(landedIn(held, said)).toBe("export const one = { a: 9, b: 2 }\n")
})

test("fenced passages of whole lines swap those lines with the lines around them kept", async () => {
  const held = { [AT]: "one\ntwo\nthree\nfour\n" }
  const said = await changedBy(held, `at: ${AT}\nold ~~~\ntwo\nthree\n~~~\nnew ~~~\n2\n3\n~~~`)

  expect(said.refused).toBeNull()
  expect(landedIn(held, said)).toBe("one\n2\n3\nfour\n")
})

test("a fenced passage ending with a blank line matches the newline after it", async () => {
  const held = { [AT]: "two\ntwofold\n" }
  const said = await changedBy(held, `at: ${AT}\nold ~~~\ntwo\n\n~~~\nnew ~~~\n2\n\n~~~`)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: AT, contentFrom: "two\n", contentTo: "2\n" },
  ])
  expect(landedIn(held, said)).toBe("2\ntwofold\n")
})

test("a passage held twice is refused with the way to widen it or take the newline", async () => {
  const held: Readonly<Record<string, string>> = { [AT]: "two\ntwofold\n" }
  const said = await changedBy(held, `at: ${AT}\nold ~~~\ntwo\n~~~\nnew ~~~\n2\n~~~`)
  const after = replayed(said, (path) => held[path] ?? null)
  const why = said.refused ?? ("refused" in after ? after.refused : "")

  expect(why).toContain("twice or more")
  expect(why).toContain("blank line")
})

test("a passage whose fence closes with no-newline is refused by its key", () => {
  const said = fenced(`at: ${AT}\nold ~~~ no-newline\na: 1\n~~~\nnew ~~~\na: 9\n~~~`)

  expect(typeof said === "string" ? said : "").toContain("`old` is a passage")
})

test("a replacement whose fence closes with no-newline is refused by its key", () => {
  const said = fenced(`at: ${AT}\nold ~~~\na: 1\n~~~\nnew ~~~ no-newline\na: 9\n~~~`)

  expect(typeof said === "string" ? said : "").toContain("`new` is a passage")
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

test("a passage on a file a group writes is refused rather than dropped", async () => {
  const said = await changeFileCommand(worldOf({ [BESIDE]: "one two\n" }, GROUPS), {
    at: WRITTEN,
    old: "two",
    new: "four",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(BESIDE)
  expect(said.refused ?? "").toContain("bodyIn")
})

test("a passage on the code a group writes from is edited as any other body is", async () => {
  const said = await changeFileCommand(worldOf({ [BESIDE]: "one two\n" }, GROUPS), {
    at: BESIDE,
    old: "two",
    new: "four",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    { kind: "replace", path: BESIDE, contentFrom: "two", contentTo: "four" },
  ])
})
