import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { knownOf } from "../../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { runChange } from "./change-domain-parent.change-mechanical-file-content.code.ts"

const COMMAND = "01a07932-2568-72a6-8b8e-314ac44c417b"

const NAMESPACE = "01a07932-2568-72a6-8b8e-314ac44c417c"

const PACKAGE = "01a07932-2568-72a6-8b8e-314ac44c417d"

const ADDS = "change-mechanical-file-content/add-property-value"

const PUTS = "change-mechanical-file-content/add-page-property"

const REMOVES = "change-mechanical-file-content/remove-property-value"

const HELD = "imessage/imessage.workspace-package.ts"

const UNDER = "command-system/namespaces/pages/imessage.namespace.ts"

const PATHS: Readonly<Record<string, string>> = {
  [COMMAND]: "imessage/commands/contacts/imessage-contacts.command.ts",
  [NAMESPACE]: UNDER,
  [PACKAGE]: HELD,
}

const LISTED: Readonly<Record<string, string>> = {
  "command/imessage-contacts": COMMAND,
  "namespace/imessage": NAMESPACE,
  "domain/imessage": PACKAGE,
}

const PARENT: Value = {
  id: PACKAGE,
  pageTypeSlug: "workspace-package",
  slug: "imessage",
  parts: ["module/imessage-host", "command/imessage-contacts"],
}

const BARE: Value = {
  id: PACKAGE,
  pageTypeSlug: "workspace-package",
  slug: "imessage",
  parts: ["module/imessage-host"],
}

const EMPTY: Value = {
  id: NAMESPACE,
  pageTypeSlug: "namespace",
  slug: "imessage",
}

type Told = {
  readonly namers: readonly string[]
  readonly page?: Value | null
  readonly under?: Value
}

function pageAt(told: Told, at: string): Value | null | undefined {
  if (at === UNDER && told.under !== undefined) return told.under
  return "page" in told ? told.page : PARENT
}

function listedAt(id: string): { readonly path: string; readonly id: string } | null {
  const path = PATHS[id]
  return path === undefined ? null : { path, id }
}

function worldTold(told: Told): World {
  const known = knownOf({
    admitting: () => ["command", "namespace", "workspace-package"],
    filed: (address) => {
      const id = "id" in address ? address.id : LISTED[`${address.pageTypeSlug}/${address.value}`]
      const found = id === undefined ? null : listedAt(id)
      return found === null ? [] : [found]
    },
  })
  return {
    root: "/nowhere",
    index: {
      idsNaming: () => told.namers,
      knownIn: () => known,
      pageByPath: (at: string) => pageAt(told, at),
    } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const ASKED = { page: "command/imessage-contacts", to: "namespace/imessage" }

type Reached = { readonly at: string; readonly given: unknown }

function watching(world: World, kept: Reached[]): World {
  return {
    ...world,
    reaching: (_world, at, given) => {
      kept.push({ at, given })
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("the value is taken out of the parent naming it and put into the parent named", async () => {
  const kept: Reached[] = []

  const said = await runChange(watching(worldTold({ namers: [PACKAGE] }), kept), ASKED)

  expect(kept.map((one) => one.at)).toEqual([REMOVES, ADDS])
  expect(said.refused).toBeNull()
})

test("both mechanical changes are handed the parts key and the spelling that was there", async () => {
  const kept: Reached[] = []

  await runChange(watching(worldTold({ namers: [PACKAGE] }), kept), ASKED)

  expect(kept[0]?.given).toEqual({
    at: HELD,
    key: "parts",
    value: "command/imessage-contacts",
  })
  expect(kept[1]?.given).toEqual({
    at: UNDER,
    key: "parts",
    value: "command/imessage-contacts",
  })
})

test("a parent stating no parts gains the list rather than being refused", async () => {
  const kept: Reached[] = []

  const said = await runChange(
    watching(worldTold({ namers: [PACKAGE], under: EMPTY }), kept),
    ASKED
  )

  expect(said.refused).toBeNull()
  expect(kept.map((one) => one.at)).toEqual([REMOVES, PUTS])
  expect(kept[1]?.given).toEqual({
    at: UNDER,
    key: "parts",
    value: `["command/imessage-contacts"]`,
  })
})

test("a page no page names among its parts is refused", async () => {
  const said = await runChange(worldTold({ namers: [] }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    "no page names `command/imessage-contacts` among its parts, so `add-property-value` puts it under one"
  )
})

test("a page more than one page names among its parts is refused, naming each", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE, NAMESPACE] }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    `\`command/imessage-contacts\` is a part of \`${HELD}\`, \`${UNDER}\`, so which parent goes is not settled`
  )
})

test("a page already a part of the parent named is refused", async () => {
  const said = await runChange(worldTold({ namers: [NAMESPACE] }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(`\`command/imessage-contacts\` is a part of \`${UNDER}\` already`)
})

test("a page the index reaches nothing for is refused by the key naming it", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE] }), {
    page: "command/nowhere",
    to: "namespace/imessage",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    "no `command` carries the slug `nowhere`, so `page` names no page"
  )
})

test("a parent whose parts do not spell the page is refused", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE], page: BARE }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(`\`${HELD}\` states \`command/imessage-contacts\` among no parts`)
})
