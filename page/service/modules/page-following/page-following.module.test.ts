import { expect, test } from "bun:test"
import type { ReadableStreamDefaultReader } from "node:stream/web"
import {
  askedIn,
  changedAt,
  eventSaid,
  followingFor,
  type Held,
  heardOf,
  keysFor,
} from "akasha/page/service/modules/page-following/page-following.module.code.ts"
import { z } from "zod"

const STREAM_SAID = z.looseObject({ stream: z.string() })

const NOWHERE = "/var/tmp/no-checkout-is-here-at-all"

function held(key: string, kinds: readonly string[], slugs: readonly string[] | null): Held {
  return { key, kinds: new Set(kinds), slugs: slugs === null ? null : new Set(slugs) }
}

test("a follow naming no pages answers every change to its page type", () => {
  const helds = [held("seats", ["seat"], null)]
  expect(keysFor(helds, { pageTypeSlug: "seat", slug: "athena" })).toEqual(["seats"])
  expect(keysFor(helds, { pageTypeSlug: "seat" })).toEqual(["seats"])
})

test("a follow naming pages answers only a change to one of those pages", () => {
  const helds = [held("athena", ["seat"], ["athena"])]
  expect(keysFor(helds, { pageTypeSlug: "seat", slug: "athena" })).toEqual(["athena"])
  expect(keysFor(helds, { pageTypeSlug: "seat", slug: "ember" })).toEqual([])
  expect(keysFor(helds, { pageTypeSlug: "seat" })).toEqual([])
})

test("a change to a page type nothing follows answers no follow", () => {
  expect(keysFor([held("seats", ["seat"], null)], { pageTypeSlug: "persona" })).toEqual([])
})

test("a follow of a page type answers a change to a page type under it", () => {
  const helds = [held("properties", ["page-property-definition", "text-property"], null)]
  expect(keysFor(helds, { pageTypeSlug: "text-property", slug: "slug" })).toEqual(["properties"])
})

test("any file named for a page is a change to that page", () => {
  expect(changedAt("/r/agent/seat/pages/athena/athena.seat.ts")).toEqual({
    pageTypeSlug: "seat",
    slug: "athena",
  })
  expect(changedAt("/r/agent/seat/pages/athena/athena.seat.uncommitted.ts")).toEqual({
    pageTypeSlug: "seat",
    slug: "athena",
  })
  expect(changedAt("/r/agent/seat/pages/athena/notes")).toBeNull()
})

test("a follow is refused where it names no stream or names pages some other way", () => {
  expect("refused" in askedIn({ follows: [] })).toBe(true)
  expect("refused" in askedIn({ stream: "s", follows: [{ key: "k" }] })).toBe(true)
  expect(
    "refused" in askedIn({ stream: "s", follows: [{ key: "k", pageTypeSlug: "seat", by: "name" }] })
  ).toBe(true)
  expect(
    askedIn({
      stream: "s",
      follows: [{ key: "k", pageTypeSlug: "seat", by: "slug", values: ["athena"] }],
    })
  ).toEqual({
    stream: "s",
    follows: [{ key: "k", pageTypeSlug: "seat", by: "slug", values: ["athena"] }],
  })
})

test("a follow narrows only by a where a question could ask", () => {
  const follows = [{ key: "k", pageTypeSlug: "nav", where: { app: { is: "web-app/requests" } } }]
  expect(askedIn({ stream: "s", follows })).toEqual({ stream: "s", follows })
  expect(
    "refused" in
      askedIn({ stream: "s", follows: [{ key: "k", pageTypeSlug: "nav", where: "app" }] })
  ).toBe(true)
})

test("a follow held to a narrow answers a change to a page inside it before or after", () => {
  const narrowed = { where: { app: { is: "web-app/requests" } }, met: new Set(["home"]) }
  const helds: readonly Held[] = [{ ...held("navs", ["nav"], null), narrowed }]
  const inside = () => ({ app: "web-app/requests" })
  const outside = () => ({ app: "web-app/other" })
  expect(keysFor(helds, { pageTypeSlug: "nav", slug: "other" }, outside)).toEqual([])
  expect(keysFor(helds, { pageTypeSlug: "nav", slug: "home" }, outside)).toEqual(["navs"])
  expect(keysFor(helds, { pageTypeSlug: "nav", slug: "home" }, outside)).toEqual([])
  expect(keysFor(helds, { pageTypeSlug: "nav", slug: "other" }, inside)).toEqual(["navs"])
  expect(keysFor(helds, { pageTypeSlug: "nav", slug: "gone" }, () => null)).toEqual([])
  expect(keysFor(helds, { pageTypeSlug: "nav" })).toEqual(["navs"])
})

test("a file a computed property keeps is heard by name in its folder, and a folder whole", () => {
  const slugs = new Set(["athena"])
  expect(
    heardOf("/r", "seat", slugs, { files: ["a/b.seat.ts", "/t/one.jsonl"], folders: ["logs"] })
  ).toEqual([
    { folder: "/r/a", name: "b.seat.ts", kind: "seat", slugs },
    { folder: "/t", name: "one.jsonl", kind: "seat", slugs },
    { folder: "/r/logs", name: null, kind: "seat", slugs },
  ])
})

test("an event is framed as a named server-sent event", () => {
  expect(eventSaid("page", { slug: "athena" })).toBe('event: page\ndata: {"slug":"athena"}\n\n')
})

async function eventsFrom(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  count: number
): Promise<readonly string[]> {
  const decoder = new TextDecoder()
  const found: string[] = []
  let waiting = ""
  while (found.length < count) {
    const { value, done } = await reader.read()
    if (done) break
    waiting += decoder.decode(value)
    const parts = waiting.split("\n\n")
    waiting = parts.pop() ?? ""
    for (const one of parts) if (one.startsWith("event:")) found.push(one)
  }
  return found
}

test("a change is pushed down the stream following it and no other change is", async () => {
  const following = followingFor(NOWHERE)
  const aborting = new AbortController()
  const opened = following.opened(new Request("http://here/events", { signal: aborting.signal }))
  const reader = (opened.body as ReadableStream<Uint8Array>).getReader()
  const [first] = await eventsFrom(reader, 1)
  const { stream } = STREAM_SAID.parse(JSON.parse((first ?? "").split("data: ")[1] ?? "{}"))
  const unknown = following.followed({ stream: "no-such-stream", follows: [] })
  expect(unknown.status).toBe(404)
  const answered = following.followed({
    stream,
    follows: [{ key: "athena-page", pageTypeSlug: "seat", by: "slug", values: ["athena"] }],
  })
  expect(answered.status).toBe(200)
  following.changed({ pageTypeSlug: "seat", slug: "ember" })
  following.changed({ pageTypeSlug: "persona", slug: "athena" })
  following.changed({ pageTypeSlug: "seat", slug: "athena" })
  const [pushed] = await eventsFrom(reader, 1)
  expect(pushed).toBe(
    eventSaid("page", { pageTypeSlug: "seat", slug: "athena", keys: ["athena-page"] }).trimEnd()
  )
  aborting.abort()
})
