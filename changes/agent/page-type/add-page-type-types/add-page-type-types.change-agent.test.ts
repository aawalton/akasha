import { expect, test } from "bun:test"
import { refusing, stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Reaching, World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import { addPageTypeTypes, runChange } from "./add-page-type-types.change-agent.code.ts"

const AT = "held/ones/one.page-type.ts"

const TO = "held/ones/one.page-type.types.ts"

const STATED = "change-mechanical-file-content/add-page-property"

const MOVED = "change-mechanical/move-code-export"

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

function catching(seen: Reached[]): Reaching {
  return (_world, at, given) => {
    seen.push({ at, given: given as Record<string, unknown> })
    return Promise.resolve(stating([]))
  }
}

function refusingAt(seen: Reached[], address: string): Reaching {
  return (_world, at, given) => {
    seen.push({ at, given: given as Record<string, unknown> })
    if (at === address) return Promise.resolve(refusing(`\`${at}\` would not`))
    return Promise.resolve(stating([]))
  }
}

const BODY = `export type One = {
  name: Name
}
`

const LISTED = `export type One = {
  names: readonly Name[]
}
`

function worldFor(
  reaching: Reaching,
  page: Record<string, string> | null,
  body: string = BODY
): World {
  return {
    ...worldOf({}),
    index: { pageByPath: () => page } as never,
    textOf: () => body,
    reaching,
  }
}

test("the page type gains the key and hands its type on, in that order", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }),
    {
      at: AT,
    }
  )

  expect(said.refused).toBeNull()
  expect(seen.map((one) => one.at)).toEqual([STATED, MOVED])
})

test("the key stated names the file beside the page type under the extension it holds", async () => {
  const seen: Reached[] = []

  await addPageTypeTypes(worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }), {
    at: AT,
  })

  expect(seen[0]?.given).toEqual({ at: AT, key: "types", value: '"ts"' })
})

test("the type handed on is the one named for the page type's slug, landing beside the page", async () => {
  const seen: Reached[] = []

  await addPageTypeTypes(worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }), {
    at: AT,
  })

  expect(seen[1]?.given).toEqual({ from: AT, to: TO, of: "One" })
})

test("a slug of more than one word names the type that spelling makes", async () => {
  const seen: Reached[] = []

  await addPageTypeTypes(
    worldFor(
      catching(seen),
      { pageTypeSlug: "page-type", slug: "page-property-entry" },
      "export type PagePropertyEntry = {\n  name: Name\n}\n"
    ),
    { at: "held/ones/page-property-entry.page-type.ts" }
  )

  expect(seen[1]?.given).toMatchObject({ of: "PagePropertyEntry" })
})

test("a path naming no page is refused, and nothing is reached", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(worldFor(catching(seen), null), { at: AT })

  expect(said.refused ?? "").toMatch(/names no page/)
  expect(seen).toEqual([])
})

test("a page that is no page type is refused, and nothing is reached", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(catching(seen), { pageTypeSlug: "record-property", slug: "one" }),
    { at: "held/ones/one.record-property.ts" }
  )

  expect(said.refused ?? "").toMatch(/is no page type/)
  expect(seen).toEqual([])
})

test("a page type stating no slug is refused, and nothing is reached", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(worldFor(catching(seen), { pageTypeSlug: "page-type" }), {
    at: AT,
  })

  expect(said.refused ?? "").toMatch(/states no slug/)
  expect(seen).toEqual([])
})

test("a refusal from the change stating the key leaves the type where it is", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(refusingAt(seen, STATED), { pageTypeSlug: "page-type", slug: "one" }),
    { at: AT }
  )

  expect(said.refused ?? "").toMatch(/add-page-property/)
  expect(seen.map((one) => one.at)).toEqual([STATED])
})

test("a refusal from the change moving the type is answered rather than the key alone", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(refusingAt(seen, MOVED), { pageTypeSlug: "page-type", slug: "one" }),
    { at: AT }
  )

  expect(said.refused ?? "").toMatch(/move-code-export/)
})

test("a page type whose type spells a list of another type is refused, naming the key", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }, LISTED),
    { at: AT }
  )

  expect(said.refused ?? "").toMatch(/`names`/)
  expect(seen).toEqual([])
})

const UNIONED = `export type One = {
  name: Name | null
}
`

test("a page type whose type spells a key as a union is refused, naming the key", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }, UNIONED),
    { at: AT }
  )

  expect(said.refused ?? "").toMatch(/`name`/)
  expect(said.refused ?? "").toMatch(/a union of other types/)
  expect(seen).toEqual([])
})

const ABOVE_AT = "held/twos/two.page-type.ts"

const ABOVE_LISTED = `export type Two = {
  names: readonly Name[]
}
`

function worldAbove(reaching: Reaching): World {
  const pages: Record<string, Record<string, unknown>> = {
    [AT]: { pageTypeSlug: "page-type", slug: "one", extends: ["page-type/two"] },
    [ABOVE_AT]: { pageTypeSlug: "page-type", slug: "two" },
  }
  const bodies: Record<string, string> = { [AT]: BODY, [ABOVE_AT]: ABOVE_LISTED }
  return {
    ...worldOf({}),
    index: {
      pageByPath: (path: string) => pages[path] ?? null,
      listedAt: () => [{ path: ABOVE_AT }],
    } as never,
    textOf: (path: string) => bodies[path] ?? null,
    reaching,
  }
}

test("a list spelled in a type the page type extends is refused, naming that file", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(worldAbove(catching(seen)), { at: AT })

  expect(said.refused ?? "").toMatch(/`names`/)
  expect(said.refused ?? "").toContain(ABOVE_AT)
  expect(seen).toEqual([])
})

test("a page type whose keys each name one type is turned over", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }),
    { at: AT }
  )

  expect(said.refused).toBeNull()
  expect(seen).toHaveLength(2)
})

test("a page type declaring no such type gains the key alone", async () => {
  const seen: Reached[] = []

  const said = await addPageTypeTypes(
    worldFor(catching(seen), { pageTypeSlug: "page-type", slug: "one" }, "export const one = 1\n"),
    { at: AT }
  )

  expect(said.refused).toBeNull()
  expect(seen.map((one) => one.at)).toEqual([STATED])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await runChange(worldFor(catching([]), null), {})

  expect(said.refused ?? "").toMatch(/`at`/)
})
