import { afterAll, expect, test } from "bun:test"
import { watch, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { ReadableStreamDefaultReader } from "node:stream/web"
import {
  tempPathFor,
  writeFileAtomicSync,
} from "akasha/file/system/modules/atomic-write/atomic-write.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { askedIn } from "akasha/page/service/modules/follow-asking/follow-asking.module.code.ts"
import {
  type Held,
  heardOf,
  type Target,
} from "akasha/page/service/modules/follow-planning/follow-planning.module.code.ts"
import {
  changedAt,
  changesFor,
  eventSaid,
  followingFor,
  keysFor,
  nameHeard,
  replayOf,
  type Sent,
} from "akasha/page/service/modules/page-following/page-following.module.code.ts"
import { readersFor } from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"
import { z } from "zod"

const scratch = scratchWorld()

afterAll(scratch.sweep)

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

test("a file written beside a page and renamed onto it is a change to that page", () => {
  const folder = "/r/temper/catalog/skill/pages/soul-summons"
  const page = "soul-summons.temper-skill.ts"
  expect(changedAt(join(folder, nameHeard(tempPathFor(page))))).toEqual({
    pageTypeSlug: "temper-skill",
    slug: "soul-summons",
  })
  expect(nameHeard(page)).toBe(page)
})

test("a page written the way a landing writes it is heard under its own name", async () => {
  const folder = scratch.rootFor("akasha-page-following-")
  const page = "athena.seat.ts"
  writeFileSync(join(folder, page), "old")
  const heard: string[] = []
  const watcher = watch(folder, (_, name) => {
    if (typeof name === "string" && name !== "") heard.push(nameHeard(name))
  })
  await Bun.sleep(50)
  writeFileAtomicSync(join(folder, page), "new")
  await Bun.sleep(200)
  watcher.close()
  expect(heard).toContain(page)
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

test("a kept file heard is a change to each page whose calculation read it, or to the list where none is known", () => {
  const computed = "held/progress.computed-property.ts"
  const turn = "/r/stories/a/turns/one.story-turn-played.ts"
  const whole: Target = { kind: "story-played", slugs: null, computed }
  const readers = readersFor("/r")
  expect(changesFor(whole, turn, readers)).toEqual([{ pageTypeSlug: "story-played" }])
  const pages = new Map([
    ["stories/a/a.story-played.ts", { files: [turn], folders: [] }],
    ["stories/b/b.story-played.ts", { files: [], folders: [] }],
    ["stories/a/chapters/c/c.story-chapter-played.ts", { files: [turn], folders: [] }],
  ])
  readers.kept(new Map([[computed, { files: new Set(), folders: new Set(), pages }]]))
  expect(changesFor(whole, turn, readers)).toEqual([{ pageTypeSlug: "story-played", slug: "a" }])
  expect(changesFor(whole, "/r/stories/b/notes.md", readers)).toEqual([])
  const named: Target = { kind: "story-played", slugs: new Set(["b"]), computed }
  expect(changesFor(named, turn, readers)).toEqual([{ pageTypeSlug: "story-played", slug: "b" }])
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

test("a stream nobody reads is closed, and its follows let go", async () => {
  const following = followingFor(NOWHERE, 10)
  const opened = following.opened(new Request("http://here/events"))
  const reader = (opened.body as ReadableStream<Uint8Array>).getReader()
  const [first] = await eventsFrom(reader, 1)
  const { stream } = STREAM_SAID.parse(JSON.parse((first ?? "").split("data: ")[1] ?? "{}"))
  expect(following.followed({ stream, follows: [] }).status).toBe(200)
  await Bun.sleep(120)
  expect(following.followed({ stream, follows: [] }).status).toBe(404)
})

test("a stream read as it beats stays open however long it runs", async () => {
  const following = followingFor(NOWHERE, 10)
  const aborting = new AbortController()
  const opened = following.opened(new Request("http://here/events", { signal: aborting.signal }))
  const reader = (opened.body as ReadableStream<Uint8Array>).getReader()
  const [first] = await eventsFrom(reader, 1)
  const { stream } = STREAM_SAID.parse(JSON.parse((first ?? "").split("data: ")[1] ?? "{}"))
  const until = Date.now() + 120
  while (Date.now() < until) await reader.read()
  expect(following.followed({ stream, follows: [] }).status).toBe(200)
  aborting.abort()
})

test("a stream read as it beats stays open through a stall of the service", async () => {
  const following = followingFor(NOWHERE, 10)
  const aborting = new AbortController()
  const opened = following.opened(new Request("http://here/events", { signal: aborting.signal }))
  const reader = (opened.body as ReadableStream<Uint8Array>).getReader()
  const [first] = await eventsFrom(reader, 1)
  const { stream } = STREAM_SAID.parse(JSON.parse((first ?? "").split("data: ")[1] ?? "{}"))
  const reading = (async () => {
    while (!aborting.signal.aborted) await reader.read()
  })()
  const stalled = Date.now() + 100
  while (Date.now() < stalled) {}
  await Bun.sleep(30)
  expect(following.followed({ stream, follows: [] }).status).toBe(200)
  aborting.abort()
  await reading.catch(() => undefined)
})

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
  const [marked, pushed] = await eventsFrom(reader, 2)
  expect(marked?.startsWith("event: mark\n")).toBe(true)
  expect(pushed).toBe(
    eventSaid("page", {
      pageTypeSlug: "seat",
      slug: "athena",
      keys: ["athena-page"],
      mark: 3,
    }).trimEnd()
  )
  aborting.abort()
})

function sentAt(mark: number, slug: string): Sent {
  return { mark, at: 0, one: { pageTypeSlug: "seat", slug } }
}

test("a mark this run holds every change after is answered with the last change to each page since", () => {
  const recent = [sentAt(3, "a"), sentAt(4, "b"), sentAt(5, "a")]
  expect(replayOf(recent, { epoch: "e", mark: 2 }, "e", 5)).toEqual([
    sentAt(5, "a"),
    sentAt(4, "b"),
  ])
  expect(replayOf(recent, { epoch: "e", mark: 4 }, "e", 5)).toEqual([sentAt(5, "a")])
  expect(replayOf(recent, { epoch: "e", mark: 5 }, "e", 5)).toEqual([])
})

test("a mark from another run, from the future, or older than what is held is answered with nothing", () => {
  const recent = [sentAt(3, "a"), sentAt(4, "b")]
  expect(replayOf(recent, { epoch: "other", mark: 3 }, "e", 4)).toBeNull()
  expect(replayOf(recent, { epoch: "e", mark: 9 }, "e", 4)).toBeNull()
  expect(replayOf(recent, { epoch: "e", mark: 1 }, "e", 4)).toBeNull()
  expect(replayOf([], { epoch: "e", mark: 1 }, "e", 4)).toBeNull()
  expect(replayOf([], { epoch: "e", mark: 4 }, "e", 4)).toEqual([])
})

const FOLLOW_SAID = z.looseObject({ epoch: z.string(), mark: z.number(), caughtUp: z.boolean() })

async function streamOf(following: ReturnType<typeof followingFor>) {
  const aborting = new AbortController()
  const opened = following.opened(new Request("http://here/events", { signal: aborting.signal }))
  const reader = (opened.body as ReadableStream<Uint8Array>).getReader()
  const [first] = await eventsFrom(reader, 1)
  const { stream } = STREAM_SAID.parse(JSON.parse((first ?? "").split("data: ")[1] ?? "{}"))
  return { reader, stream, aborting }
}

test("a stream opened again with the mark it had is sent the changes it missed, and none it had", async () => {
  const following = followingFor(NOWHERE)
  const follows = [{ key: "seats", pageTypeSlug: "seat", by: "slug", values: ["athena", "ember"] }]
  const first = await streamOf(following)
  const taken = FOLLOW_SAID.parse(
    await following.followed({ stream: first.stream, follows }).json()
  )
  expect(taken.caughtUp).toBe(false)
  following.changed({ pageTypeSlug: "seat", slug: "athena" })
  await eventsFrom(first.reader, 1)
  first.aborting.abort()
  following.changed({ pageTypeSlug: "seat", slug: "ember" })
  const second = await streamOf(following)
  const since = { epoch: taken.epoch, mark: taken.mark + 1 }
  const again = FOLLOW_SAID.parse(
    await following.followed({ stream: second.stream, follows, since }).json()
  )
  expect(again).toMatchObject({ epoch: taken.epoch, mark: taken.mark + 2, caughtUp: true })
  const [missed, caught] = await eventsFrom(second.reader, 2)
  expect(missed).toBe(
    eventSaid("page", {
      pageTypeSlug: "seat",
      slug: "ember",
      keys: ["seats"],
      mark: taken.mark + 2,
    }).trimEnd()
  )
  expect(caught).toBe(eventSaid("mark", { epoch: taken.epoch, mark: taken.mark + 2 }).trimEnd())
  const other = { epoch: "another-run", mark: 0 }
  const lost = await following.followed({ stream: second.stream, follows, since: other }).json()
  expect(FOLLOW_SAID.parse(lost).caughtUp).toBe(false)
  second.aborting.abort()
})
