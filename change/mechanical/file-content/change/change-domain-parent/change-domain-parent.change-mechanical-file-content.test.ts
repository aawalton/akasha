import { expect, test } from "bun:test"
import { imessage as imessageDomain } from "akasha/alan/harness/imessage/imessage.domain.ts"
import { imessageHost } from "akasha/alan/harness/imessage/modules/host/imessage-host.module.ts"
import { addPageProperty } from "akasha/change/mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.ts"
import { addPropertyValue } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { runChange } from "akasha/change/mechanical/file-content/change/change-domain-parent/change-domain-parent.change-mechanical-file-content.code.ts"
import { COMMAND_AT } from "akasha/change/mechanical/file-content/change/change-domain-parent/change-domain-parent.change-mechanical-file-content.test-fixtures.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyValue } from "akasha/change/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { knownOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { command } from "akasha/command/command.page-type.ts"
import { namespace } from "akasha/command/namespace/namespace.page-type.ts"
import { imessageContactList } from "akasha/command/pages/imessage/contact-list/imessage-contact-list.command.ts"
import { imessage } from "akasha/command/pages/imessage/imessage.namespace.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const COMMAND = "01a07932-2568-72a6-8b8e-314ac44c417b"

const NAMESPACE = "01a07932-2568-72a6-8b8e-314ac44c417c"

const PACKAGE = "01a07932-2568-72a6-8b8e-314ac44c417d"

const ADDS = `${changeMechanicalFileContent.slug}/${addPropertyValue.slug}` as const

const PUTS = `${changeMechanicalFileContent.slug}/${addPageProperty.slug}` as const

const REMOVES = `${changeMechanicalFileContent.slug}/${removePropertyValue.slug}` as const

const PAGE_AT = `${command.slug}/${imessageContactList.slug}` as const

const TO_AT = `${namespace.slug}/${imessage.slug}` as const

const DOMAIN_AT = `${domain.slug}/${imessageDomain.slug}` as const

const HOST_AT = `${module.slug}/${imessageHost.slug}` as const

const HELD = "imessage/imessage.workspace-package.ts"

const UNDER = "command-system/namespaces/pages/imessage.namespace.ts"

const PATHS: Readonly<Record<string, string>> = {
  [COMMAND]: COMMAND_AT,
  [NAMESPACE]: UNDER,
  [PACKAGE]: HELD,
}

const LISTED: Readonly<Record<string, string>> = {
  [PAGE_AT]: COMMAND,
  [TO_AT]: NAMESPACE,
  [DOMAIN_AT]: PACKAGE,
}

const PARENT: Value = {
  id: PACKAGE,
  pageTypeSlug: "workspace-package",
  slug: "imessage",
  parts: [HOST_AT, PAGE_AT],
}

const BARE: Value = {
  id: PACKAGE,
  pageTypeSlug: "workspace-package",
  slug: "imessage",
  parts: [HOST_AT],
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
  readonly valued?: ReadonlyMap<string, Value>
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
      valuesByPath: () => told.valued ?? new Map<string, Value>(),
    } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const ASKED = { page: PAGE_AT, to: TO_AT }

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

  expect(kept[0]?.given).toEqual({ at: HELD, key: "parts", value: PAGE_AT })
  expect(kept[1]?.given).toEqual({ at: UNDER, key: "parts", value: PAGE_AT })
})

test("a parent stating no parts gains the list rather than being refused", async () => {
  const kept: Reached[] = []

  const said = await runChange(
    watching(worldTold({ namers: [PACKAGE], under: EMPTY }), kept),
    ASKED
  )

  expect(said.refused).toBeNull()
  expect(kept.map((one) => one.at)).toEqual([REMOVES, PUTS])
  expect(kept[1]?.given).toEqual({ at: UNDER, key: "parts", value: `["${PAGE_AT}"]` })
})

const NAMESPACES = new Map<string, Value>([
  [
    "command-system/namespaces/pages/other.namespace.ts",
    { id: NAMESPACE, pageTypeSlug: "namespace", slug: "other", parts: [], definition: "one" },
  ],
])

test("the parts key gained is written where the pages of that type write it", async () => {
  const kept: Reached[] = []

  await runChange(
    watching(worldTold({ namers: [PACKAGE], under: EMPTY, valued: NAMESPACES }), kept),
    ASKED
  )

  expect(kept[1]?.given).toEqual({
    at: UNDER,
    key: "parts",
    value: `["${PAGE_AT}"]`,
    after: "slug",
  })
})

test("a page no page names among its parts is refused", async () => {
  const said = await runChange(worldTold({ namers: [] }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    `no page names \`${PAGE_AT}\` among its parts, so \`add-property-value\` puts it under one`
  )
})

test("a page more than one page names among its parts is refused, naming each", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE, NAMESPACE] }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    `\`${PAGE_AT}\` is a part of \`${HELD}\`, \`${UNDER}\`, so which parent goes is not settled`
  )
})

test("a page already a part of the parent named is refused", async () => {
  const said = await runChange(worldTold({ namers: [NAMESPACE] }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(`\`${PAGE_AT}\` is a part of \`${UNDER}\` already`)
})

test("a page the index reaches nothing for is refused by the key naming it", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE] }), {
    page: "command/nowhere",
    to: TO_AT,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    "no `command` carries the slug `nowhere`, so `page` names no page"
  )
})

test("a parent whose parts do not spell the page is refused", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE], page: BARE }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(`\`${HELD}\` states \`${PAGE_AT}\` among no parts`)
})

const TWICE: Value = {
  id: PACKAGE,
  pageTypeSlug: "workspace-package",
  slug: "imessage",
  parts: [PAGE_AT, COMMAND],
}

test("a parent spelling the page among its parts more than once is refused", async () => {
  const said = await runChange(worldTold({ namers: [PACKAGE], page: TWICE }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    `\`${HELD}\` spells \`${PAGE_AT}\` among its parts more than once`
  )
})

test("that refusal does not turn on which spelling is written first", async () => {
  const flipped: Value = { ...TWICE, parts: [COMMAND, PAGE_AT] }

  const said = await runChange(worldTold({ namers: [PACKAGE], page: flipped }), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toBe(
    `\`${HELD}\` spells \`${PAGE_AT}\` among its parts more than once`
  )
})
