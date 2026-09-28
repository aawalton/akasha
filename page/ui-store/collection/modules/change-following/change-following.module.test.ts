import { expect, test } from "bun:test"
import { until } from "akasha/check/test/fixture/waiting/waiting.test-fixture.code.ts"
import {
  createChangeFollowing,
  createStoreFollowing,
  type Pushed,
  pushedIn,
  type StreamLike,
} from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"

type Fake = StreamLike & {
  readonly say: (name: string, body: unknown) => undefined
  readonly shut: () => undefined
  readonly wasClosed: () => boolean
}

function fakeStream(): Fake {
  const heard = new Map<string, (data: unknown) => undefined>()
  let closed = false
  let shut = false
  return {
    on: (name, listener) => {
      heard.set(name, listener)
      return undefined
    },
    closed: () => shut,
    close: () => {
      closed = true
      return undefined
    },
    say: (name, body) => heard.get(name)?.(JSON.stringify(body)),
    shut: () => {
      shut = true
      return heard.get("error")?.(undefined)
    },
    wasClosed: () => closed,
  }
}

function settled(): Promise<void> {
  return new Promise((done) => setTimeout(done, 5))
}

function rig(took = true, caughtUp = false) {
  const streams: Fake[] = []
  const sent: unknown[] = []
  const pushes: Pushed[] = []
  let caught = 0
  const following = createChangeFollowing({
    open: () => {
      const one = fakeStream()
      streams.push(one)
      return one
    },
    send: async (body) => {
      sent.push(body)
      return took ? { caughtUp } : null
    },
    pushed: (one) => {
      pushes.push(one)
      return undefined
    },
    caughtUp: () => {
      caught += 1
      return undefined
    },
    settleMs: 0,
    retryMs: 0,
  })
  return { following, streams, sent, pushes, caught: () => caught }
}

test("a key becomes live once the stream has taken what is followed", async () => {
  const { following, streams, sent } = rig()
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  expect(following.live("seat")).toBe(false)
  streams[0]?.say("stream", { stream: "one" })
  await settled()
  expect(sent).toEqual([{ stream: "one", follows: [{ key: "seat", pageTypeSlug: "seat" }] }])
  expect(following.live("seat")).toBe(true)
})

test("a key followed twice stays followed until it is let go twice", async () => {
  const { following, streams, sent } = rig()
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  following.follow("seat", { pageTypeSlug: "seat" })
  following.follow("seat", { pageTypeSlug: "seat" })
  following.unfollow("seat")
  await settled()
  expect(following.live("seat")).toBe(true)
  following.unfollow("seat")
  await settled()
  expect(following.live("seat")).toBe(false)
  expect(sent.at(-1)).toEqual({ stream: "one", follows: [] })
})

test("a change pushed is handed on with the keys it answers", () => {
  const { following, streams, pushes } = rig()
  following.start()
  streams[0]?.say("page", { pageTypeSlug: "seat", slug: "athena", id: "x", keys: ["seat"] })
  expect(pushes).toEqual([{ pageTypeSlug: "seat", slug: "athena", id: "x", keys: ["seat"] }])
})

test("a stream lost leaves nothing live, and the next stream reads everything again", async () => {
  const { following, streams, caught } = rig()
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  await settled()
  expect(caught()).toBe(0)
  streams[0]?.shut()
  expect(following.live("seat")).toBe(false)
  await settled()
  streams[1]?.say("stream", { stream: "two" })
  await settled()
  expect(following.live("seat")).toBe(true)
  expect(caught()).toBe(1)
  following.stop()
})

test("a stream opened again names the last mark the lost stream said, and reads nothing again once caught up", async () => {
  const { following, streams, sent, caught } = rig(true, true)
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  await settled()
  streams[0]?.say("mark", { epoch: "run", mark: 7 })
  streams[0]?.say("mark", { epoch: "run", mark: 9 })
  streams[0]?.shut()
  await settled()
  streams[1]?.say("stream", { stream: "two" })
  await settled()
  expect(sent).toEqual([
    { stream: "one", follows: [{ key: "seat", pageTypeSlug: "seat" }] },
    {
      stream: "two",
      follows: [{ key: "seat", pageTypeSlug: "seat" }],
      since: { epoch: "run", mark: 9 },
    },
  ])
  expect(following.live("seat")).toBe(true)
  expect(caught()).toBe(0)
  following.stop()
})

test("a stream that said no mark is followed again with none, and everything is read again", async () => {
  const { following, streams, sent, caught } = rig(true, false)
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  await settled()
  streams[0]?.say("mark", { epoch: "run" })
  streams[0]?.shut()
  await settled()
  streams[1]?.say("stream", { stream: "two" })
  await settled()
  expect(sent.at(-1)).toEqual({ stream: "two", follows: [{ key: "seat", pageTypeSlug: "seat" }] })
  expect(caught()).toBe(1)
  following.stop()
})

test("the keys a stream takes anew are named, on the first stream and on every stream after", async () => {
  const streams: Fake[] = []
  const named: (readonly string[])[] = []
  const following = createChangeFollowing({
    open: () => {
      const one = fakeStream()
      streams.push(one)
      return one
    },
    send: async () => ({ caughtUp: false }),
    pushed: () => undefined,
    caughtUp: () => undefined,
    took: (keys) => {
      named.push(keys)
      return undefined
    },
    settleMs: 0,
    retryMs: 0,
  })
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  await settled()
  following.follow("persona", { pageTypeSlug: "persona" })
  await settled()
  streams[0]?.shut()
  await settled()
  streams[1]?.say("stream", { stream: "two" })
  await settled()
  expect(named).toEqual([["seat"], ["persona"], ["seat", "persona"]])
  following.stop()
})

test("a stream refusing what is followed is opened again", async () => {
  const { following, streams } = rig(false)
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  expect(await until(() => streams.length === 2)).toBe(true)
  expect(streams[0]?.wasClosed()).toBe(true)
  following.stop()
})

test("a store reads nothing again on a new stream the service says it caught up", async () => {
  const asked: (readonly string[] | undefined)[] = []
  const readingAgain = new Map([
    [
      "seat",
      async (ids?: readonly string[]) => {
        asked.push(ids)
      },
    ],
  ])
  const answers = ["{}", '{"caughtUp":true}']
  const streams: Fake[] = []
  const store = createStoreFollowing(
    readingAgain,
    async () => new Response(answers.shift() ?? "{}", { status: 200 }),
    () => {
      const one = fakeStream()
      streams.push(one)
      return one
    },
    true
  )
  store.follow("seat", { pageTypeSlug: "seat" })
  store.followPages({ events: "/events", follow: "/follow" })
  streams[0]?.say("stream", { stream: "one" })
  await until(() => store.live("seat"))
  streams[0]?.shut()
  expect(await until(() => streams.length === 2)).toBe(true)
  streams[1]?.say("stream", { stream: "two" })
  await until(() => store.live("seat"))
  await settled()
  expect(asked).toEqual([])
}, 8_000)

test("a push that names no page type is no push", () => {
  expect(pushedIn(JSON.stringify({ keys: [] }))).toBeNull()
  expect(pushedIn("not json")).toBeNull()
})

test("a store reads a shape again when it is pushed, and tells whoever watches its page", async () => {
  let read = 0
  const asked: (readonly string[] | undefined)[] = []
  const readingAgain = new Map([
    [
      "seat",
      async (ids?: readonly string[]) => {
        read += 1
        asked.push(ids)
      },
    ],
  ])
  const streams: Fake[] = []
  const store = createStoreFollowing(
    readingAgain,
    async () => new Response("{}", { status: 200 }),
    () => {
      const one = fakeStream()
      streams.push(one)
      return one
    },
    true
  )
  let told = 0
  const watch = store.watchPage("seat", "x", () => {
    told += 1
    return undefined
  })
  store.follow("seat", { pageTypeSlug: "seat" })
  store.followPages({ events: "/events", follow: "/follow" })
  streams[0]?.say("page", { pageTypeSlug: "seat", slug: "a", keys: ["seat", "page:seat?id=x"] })
  await settled()
  expect(read).toBe(1)
  expect(told).toBe(1)
  streams[0]?.say("page", { pageTypeSlug: "seat", slug: "a", id: "x", keys: ["seat"] })
  await settled()
  expect(asked).toEqual([undefined, ["x"]])
  watch.release()
})

test("a view watching a whole page type is told on the store's one stream, and no stream is opened for it", async () => {
  const streams: Fake[] = []
  const sent: unknown[] = []
  const store = createStoreFollowing(
    new Map(),
    async (_at, init) => {
      sent.push(JSON.parse(String(init?.body)))
      return new Response("{}", { status: 200 })
    },
    () => {
      const one = fakeStream()
      streams.push(one)
      return one
    },
    true
  )
  let told = 0
  const watch = store.watchPages("web-app", () => {
    told += 1
    return undefined
  })
  const page = store.watchPage("seat", "x", () => undefined)
  store.followPages({ events: "/events", follow: "/follow" })
  store.followPages({ events: "/events", follow: "/follow" })
  streams[0]?.say("stream", { stream: "one" })
  await until(() => sent.length > 0)
  streams[0]?.say("page", { pageTypeSlug: "web-app", slug: "a", keys: ["pages:web-app"] })

  expect(streams.length).toBe(1)
  expect(sent).toEqual([
    {
      stream: "one",
      follows: [
        { key: "pages:web-app", pageTypeSlug: "web-app" },
        { key: "page:seat?id=x", pageTypeSlug: "seat", by: "id", values: ["x"] },
      ],
    },
  ])
  expect(told).toBe(1)
  watch.release()
  page.release()
})
