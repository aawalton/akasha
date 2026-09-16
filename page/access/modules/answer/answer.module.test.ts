import { expect, test } from "bun:test"
import {
  answerPages,
  answerPageTypes,
  listedKeys,
  type PagesDeps,
  type PageTypeReading,
  type PageTypesDeps,
  withDefinitions,
} from "akasha/page/access/modules/answer/answer.module.code.ts"
import { RosterUnreachable } from "akasha/page/access/modules/file-backed-roster/file-backed-roster.module.code.ts"
import type { PropertyDefinition } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"

const AT = "https://alanwalton.com/api/pages/readout"

const ROSTER_AT = "https://alanwalton.com/api/page-types"

function depsRostering(roster: PageTypesDeps["roster"]): PageTypesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    roster,
  }
}

function depsReading(readPageType: PagesDeps["readPageType"]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    ask: async () => ({ rows: [], n: 0 }),
    readPageType,
    definitionsFor: async () => [],
  }
}

function depsAsking(ask: PagesDeps["ask"]): PagesDeps {
  return {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    ask,
    readPageType: async () => ({ pageTypeId: "one", definitions: [] }),
    definitionsFor: async () => [],
  }
}

function rowFor(slug: string | null): Parameters<typeof withDefinitions>[0][number] {
  return {
    id: slug ?? "none",
    page_type_id: "one",
    title: null,
    icon: null,
    attributes: { displayName: "To Do" },
    page_type_slug: "page-type",
    unique_key: null,
    status: null,
    completed_at: null,
    slug,
    favorited_at: null,
    last_viewed_at: null,
  }
}

const DEFINED: readonly PropertyDefinition[] = [
  { id: "toDoDueDate", title: "the day it is due", type: "calendar-date", pageId: "two" },
]

test("a page type's row carries the property definitions that page type declares", async () => {
  const rows = await withDefinitions([rowFor("to-do")], async () => DEFINED)
  expect(rows[0]?.attributes).toEqual({ displayName: "To Do", propertyDefinitions: DEFINED })
})

test("a row naming no page type carries no definition rather than asking for none", async () => {
  let asked = 0
  const rows = await withDefinitions([rowFor(null)], async () => {
    asked += 1
    return DEFINED
  })
  expect(asked).toBe(0)
  expect(rows[0]?.attributes).toEqual({ displayName: "To Do", propertyDefinitions: [] })
})

test("a page type whose properties went unread carries none rather than refusing", async () => {
  const rows = await withDefinitions([rowFor("to-do"), rowFor("nav")], async (slug) => {
    if (slug === "to-do") throw new Error("the pages answered no shape")
    return DEFINED
  })
  expect(rows[0]?.attributes).toEqual({ displayName: "To Do" })
  expect(rows[1]?.attributes).toEqual({ displayName: "To Do", propertyDefinitions: DEFINED })
})

test("every row is carried however many rows run past one batch", async () => {
  const many = Array.from({ length: 40 }, (_, at) => rowFor(`type-${at}`))
  const rows = await withDefinitions(many, async () => DEFINED)
  expect(rows.length).toBe(40)
  expect(rows.every((one) => one.attributes !== null)).toBe(true)
})

test("a roster that will not read refuses at 501 and names why", async () => {
  const deps = depsReading(() => Promise.reject(new RosterUnreachable("there is no roster left")))
  const answered = await answerPages(new Request(AT), "readout", deps)
  expect(answered.status).toBe(501)
  const said = (await answered.json()) as { error: string; unread: readonly string[] }
  expect(said.unread[0]).toContain("there is no roster left")
  expect(said.error).toContain("went unread")
})

test("a page type nothing is named for is still answered 404", async () => {
  const deps = depsReading(async () => null)
  const answered = await answerPages(new Request(AT), "readout", deps)
  expect(answered.status).toBe(404)
})

test("a raise that is not the roster is left to raise", async () => {
  const deps = depsReading(() => Promise.reject(new Error("something else entirely")))
  await expect(answerPages(new Request(AT), "readout", deps)).rejects.toThrow(
    "something else entirely"
  )
})

test("a page type that reads is answered with its rows", async () => {
  const reading: PageTypeReading = { pageTypeId: "one", definitions: [] }
  const answered = await answerPages(
    new Request(AT),
    "readout",
    depsReading(async () => reading)
  )
  expect(answered.status).toBe(200)
})

test("a listing asks the pages for no more rows than the listing carries", async () => {
  const under: number[] = []
  const deps = depsAsking(async (_pageTypeSlug, limit) => {
    under.push(limit)
    return { rows: [], n: 0 }
  })
  await answerPages(new Request(AT), "readout", deps)
  expect(under).toEqual([5_000])
})

const CARRIED: readonly PropertyDefinition[] = [
  {
    id: "slug",
    title: "Slug",
    type: "text",
    pageId: "one",
    drawnBy: ["text-property", "page-property", "domain", "page"],
  },
  {
    id: "stacks",
    title: "Stacks",
    type: "json",
    pageId: "two",
    drawnBy: ["page-property-entry", "page-property", "domain", "page"],
  },
]

test("a listing asks for every key but the ones whose rows are filed beside the page", async () => {
  const under: (readonly string[] | undefined)[] = []
  const answered = await answerPages(new Request(AT), "readout", {
    readUser: async () => ({ user: { id: "one" }, headers: new Headers() }),
    ask: async (_pageTypeSlug, _limit, keys) => {
      under.push(keys)
      return { rows: [], n: 0 }
    },
    readPageType: async () => ({ pageTypeId: "one", definitions: CARRIED }),
    definitionsFor: async () => [],
  })
  expect(answered.status).toBe(200)
  expect(under).toEqual([["slug"]])
})

test("a page type stating no property is asked for no keys rather than for an empty list", () => {
  expect(listedKeys([])).toBeUndefined()
})

test("how many pages are filed is the count the pages answer with", async () => {
  const deps = depsAsking(async () => ({ rows: [{ id: "one" }], n: 70_359 }))
  const answered = await answerPages(new Request(AT), "readout", deps)
  const said = (await answered.json()) as {
    held: number
    cut: boolean
    rows: readonly unknown[]
  }
  expect(said.held).toBe(70_359)
  expect(said.rows.length).toBe(1)
  expect(said.cut).toBe(true)
})

test("a roster that reads is answered as one entry for each page type", async () => {
  const deps = depsRostering(async () => new Set(["readout", "nav", "view"]))
  const answered = await answerPageTypes(new Request(ROSTER_AT), deps)
  expect(answered.status).toBe(200)
  const said = (await answered.json()) as { types: readonly { slug: string }[] }
  expect(said.types).toEqual([{ slug: "nav" }, { slug: "readout" }, { slug: "view" }])
})

test("a roster entry carries the page type's slug alone", async () => {
  const deps = depsRostering(async () => new Set(["nav"]))
  const answered = await answerPageTypes(new Request(ROSTER_AT), deps)
  const said = (await answered.json()) as { types: readonly Record<string, unknown>[] }
  expect(Object.keys(said.types[0] ?? {})).toEqual(["slug"])
})

test("a roster that will not read refuses at 503 and names why", async () => {
  const deps = depsRostering(() => Promise.reject(new RosterUnreachable("the pages went quiet")))
  const answered = await answerPageTypes(new Request(ROSTER_AT), deps)
  expect(answered.status).toBe(503)
  const said = (await answered.json()) as { error: string; unread: readonly string[] }
  expect(said.unread[0]).toContain("the pages went quiet")
  expect(said.error).toContain("did not answer")
})

test("a raise the roster did not make is left to raise", async () => {
  const deps = depsRostering(() => Promise.reject(new Error("something else entirely")))
  expect(answerPageTypes(new Request(ROSTER_AT), deps)).rejects.toThrow("something else entirely")
})

test("a reader who is signed out is answered 401 rather than a roster", async () => {
  const answered = await answerPageTypes(new Request(ROSTER_AT), {
    readUser: async () => ({ user: null, headers: new Headers() }),
    roster: async () => new Set(["nav"]),
  })
  expect(answered.status).toBe(401)
})
