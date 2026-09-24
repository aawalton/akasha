import { expect, test } from "bun:test"
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

function rig(took = true) {
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
      return took
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

test("a stream refusing what is followed is opened again", async () => {
  const { following, streams } = rig(false)
  following.follow("seat", { pageTypeSlug: "seat" })
  following.start()
  streams[0]?.say("stream", { stream: "one" })
  await settled()
  expect(streams[0]?.wasClosed()).toBe(true)
  expect(streams.length).toBe(2)
  following.stop()
})

test("a push that names no page type is no push", () => {
  expect(pushedIn(JSON.stringify({ keys: [] }))).toBeNull()
  expect(pushedIn("not json")).toBeNull()
})

test("a store reads a shape again when it is pushed, and tells whoever watches its page", async () => {
  let read = 0
  const readingAgain = new Map([
    [
      "seat",
      async () => {
        read += 1
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
  watch.release()
})
