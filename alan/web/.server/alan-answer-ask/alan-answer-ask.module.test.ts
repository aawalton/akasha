import { expect, test } from "bun:test"
import {
  type AskDeps,
  askHeld,
  narrowOver,
} from "akasha/alan/web/.server/alan-answer-ask/alan-answer-ask.module.code.ts"
import { readsAsTheirPages } from "akasha/alan/web/.server/alan-answer-ask/alan-answer-ask.module.test-fixtures.ts"

const ALAN = { person: "alan" }

const JENNY = { person: "jenny" }

const SEAT_ID = "01a14f20-9e11-7000-a53b-1e2e9cc76a9a"

type Sent = { readonly at: string; readonly body: unknown }

function asking(
  reader: object | null,
  below: Readonly<Record<string, readonly string[]>> = {}
): { readonly deps: AskDeps; readonly sent: Sent[] } {
  const sent: Sent[] = []
  const deps: AskDeps = {
    readerOf: async () => reader,
    mayRead: readsAsTheirPages,
    kindsBelow: async (pageTypeSlug) => below[pageTypeSlug] ?? [],
    post: async (at, _what, body) => {
      sent.push({ at, body })
      return { ok: true, body: { rows: [{ slug: "one" }], n: 1 } }
    },
  }
  return { deps, sent }
}

function asked(body: unknown): Request {
  return new Request("https://alanwalton.com/api/ask", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

const CONVERSATION = {
  pageTypeSlug: "seat",
  where: { id: { is: SEAT_ID } },
  keys: ["conversation"],
  limit: 1,
}

test("Alan's question is carried to the store as he asked it", async () => {
  const { deps, sent } = asking(ALAN, { domain: ["persona", "role", "person"] })
  for (const body of [
    CONVERSATION,
    { pageTypeSlug: "persona", keys: ["slug", "title"] },
    { pageTypeSlug: "domain", where: { slug: { in: ["alan", "romance"] } } },
    { pageTypeSlug: "relationship-topic" },
  ]) {
    const answered = await askHeld(asked(body), deps)
    expect(answered.status).toBe(200)
    expect(await answered.json()).toEqual({ rows: [{ slug: "one" }], n: 1 })
    expect(sent.at(-1)).toEqual({ at: "/ask", body })
  }
})

const ALAN_SCREENS = [
  {
    pageTypeSlug: "image",
    where: { grade: { empty: true }, persona: { is: "amy" } },
    keys: ["id", "slug"],
    sortBy: "id",
    limit: 50,
    offset: 0,
  },
  {
    pageTypeSlug: "persona",
    where: { title: { "contains-ignoring-case": "am" } },
    keys: ["id", "slug", "title"],
    sortBy: "slug",
    limit: 50,
  },
  {
    pageTypeSlug: "story-played",
    where: { externalId: { is: "one" } },
    keys: ["coverReroll", "coverRerollRefused"],
  },
  {
    pageTypeSlug: "page-type",
    where: { extends: { has: "metric-item" } },
    keys: ["slug", "extends"],
  },
  { pageTypeSlug: "metric-character-attribute", where: { character: { is: "c" } } },
  { pageTypeSlug: "world-species", where: { character: { is: "c" } }, undeclaredMatchesNone: true },
  {
    pageTypeSlug: "story-turn-played",
    where: { id: { in: ["a", "b"] } },
    keys: ["id", "prose"],
    files: ["prose"],
  },
  { pageTypeSlug: "played-panel", keys: ["slug", "drawn"], files: ["drawn"] },
  { pageTypeSlug: "story-item", where: { character: { "ends-with": "/c" } } },
  { pageTypeSlug: "nav", where: { id: { is: "01a0" } }, keys: ["slug", "navParent"] },
  { pageTypeSlug: "domain" },
  { pageTypeSlug: "agent-message", where: { recipient: { is: "astra" } } },
]

test("every question Alan's screens ask reaches the store unchanged", async () => {
  const { deps, sent } = asking(ALAN, {
    "metric-character-attribute": ["metric-character-stat", "metric-character-level"],
    "world-species": ["character-species"],
    domain: ["persona", "role", "person", "module", "page-type"],
  })
  for (const body of ALAN_SCREENS) {
    expect((await askHeld(asked(body), deps)).status).toBe(200)
  }
  expect(sent).toEqual(ALAN_SCREENS.map((body) => ({ at: "/ask", body })))
})

test("Jenny's conversation question is held to the one seat she may read", async () => {
  const { deps, sent } = asking(JENNY)
  const answered = await askHeld(asked(CONVERSATION), deps)
  expect(answered.status).toBe(200)
  expect(sent).toEqual([
    {
      at: "/ask",
      body: {
        ...CONVERSATION,
        where: { id: { is: SEAT_ID }, slug: { is: "couples-therapy-couples-therapist" } },
      },
    },
  ])
})

test("Jenny asking for every seat is answered only the couples-therapy-couples-therapist seat", async () => {
  const { deps, sent } = asking(JENNY)
  await askHeld(asked({ pageTypeSlug: "seat", keys: ["slug"] }), deps)
  expect(sent[0]?.body).toEqual({
    pageTypeSlug: "seat",
    keys: ["slug"],
    where: { slug: { is: "couples-therapy-couples-therapist" } },
  })
})

test("Jenny asking for another seat by slug is refused and nothing is carried", async () => {
  const { deps, sent } = asking(JENNY)
  for (const slug of [{ is: "amy" }, { in: ["couples-therapy-couples-therapist", "amy"] }]) {
    const answered = await askHeld(asked({ pageTypeSlug: "seat", where: { slug } }), deps)
    expect(answered.status).toBe(403)
  }
  expect(sent).toEqual([])
})

test("Jenny asking a page type she holds no access to is refused", async () => {
  const { deps, sent } = asking(JENNY)
  for (const pageTypeSlug of ["persona", "relationship-topic", "agent-message", "page"]) {
    const answered = await askHeld(asked({ pageTypeSlug }), deps)
    expect(answered.status).toBe(403)
    expect(await answered.json()).toHaveProperty("refused")
  }
  expect(sent).toEqual([])
})

test("a page type whose kinds below hold one the reader may not read is refused", async () => {
  const { deps, sent } = asking(JENNY, { person: ["persona"] })
  const answered = await askHeld(asked({ pageTypeSlug: "person" }), deps)
  expect(answered.status).toBe(403)
  expect(sent).toEqual([])
})

test("a reader nobody signed in as is refused as before", async () => {
  const { deps, sent } = asking(null)
  const answered = await askHeld(asked(CONVERSATION), deps)
  expect(answered.status).toBe(401)
  expect(sent).toEqual([])
})

test("a question that is no JSON object naming a page type is refused", async () => {
  const { deps, sent } = asking(ALAN)
  const unparsed = new Request("https://alanwalton.com/api/ask", { method: "POST", body: "{" })
  expect((await askHeld(unparsed, deps)).status).toBe(400)
  expect((await askHeld(asked({ where: {} }), deps)).status).toBe(400)
  expect((await askHeld(asked({ pageTypeSlug: "seat", where: [] }), deps)).status).toBe(400)
  expect(sent).toEqual([])
})

test("a store refusing is carried back with its status", async () => {
  const { deps } = asking(ALAN)
  const refusing: AskDeps = {
    ...deps,
    post: async () => ({ ok: false, why: "no", status: 400 }),
  }
  const answered = await askHeld(asked(CONVERSATION), refusing)
  expect(answered.status).toBe(400)
  expect(await answered.json()).toEqual({ refused: "no" })
})

test("narrows reaching a page type and its kinds below must agree", () => {
  const one = { permitted: true, narrows: [{ key: "slug", is: "a" }] } as const
  const every = { permitted: true, narrows: null } as const
  expect(narrowOver([every, every])).toBeNull()
  expect(narrowOver([every, one])).toEqual(one.narrows)
  expect(narrowOver([one, one])).toEqual(one.narrows)
  expect(narrowOver([one, { permitted: true, narrows: [{ key: "slug", is: "b" }] }])).toBe(
    "disagree"
  )
})
