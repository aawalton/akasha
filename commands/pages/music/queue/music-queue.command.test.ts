import { expect, test } from "bun:test"
import {
  DataError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { ResolvedTrack } from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import type { StartResumeOptions } from "akasha/commands/pages/music/play/music-play.command.code.ts"
import type {
  DeviceOption,
  Queueing,
} from "akasha/commands/pages/music/queue/music-queue.command.code.ts"
import {
  playedAndQueued,
  queueing,
} from "akasha/commands/pages/music/queue/music-queue.command.code.ts"

const CALLED = "akasha music queue"

const PLAYED = `▶ Playing "one — Someone"`

const QUEUED = `  + queued "two — Someone"`

const THIRD = `  + queued "three — Someone"`

function trackFor(name: string, artist: string): ResolvedTrack {
  return { name, uri: `spotify:track:${name}`, id: name, artists: [artist] }
}

type Kept = {
  readonly queries: { query: string; artist: string | undefined }[]
  readonly devices: (string | undefined)[]
  readonly started: StartResumeOptions[]
  readonly enqueued: { uri: string; options: DeviceOption }[]
}

type Fake = {
  readonly ports: Queueing
  readonly kept: Kept
}

function fakeFor(over: Partial<Queueing> = {}): Fake {
  const kept: Kept = { queries: [], devices: [], started: [], enqueued: [] }
  const ports: Queueing = {
    resolveQueryToTrack: (query, artist) => {
      kept.queries.push({ query, artist })
      return Promise.resolve(trackFor(query, artist ?? "Someone"))
    },
    resolveDeviceId: (named) => {
      kept.devices.push(named)
      return Promise.resolve(named)
    },
    startResumePlayback: (options) => {
      kept.started.push(options)
      return Promise.resolve()
    },
    addToQueue: (uri, options) => {
      kept.enqueued.push({ uri, options })
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("the first query is played and every one after it is queued in order", async () => {
  const fake = fakeFor()
  const said = await queueing(["Holocene", "Skinny Love", "Re: Stacks"], fake.ports, CALLED)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(fake.kept.started).toEqual([{ uris: ["spotify:track:Holocene"] }])
  expect(fake.kept.enqueued.map((one) => one.uri)).toEqual([
    "spotify:track:Skinny Love",
    "spotify:track:Re: Stacks",
  ])
})

test("the report names the track played and each track queued behind it", async () => {
  const fake = fakeFor()
  const said = await queueing(["Holocene", "Skinny Love"], fake.ports, CALLED)
  expect(said.report).toEqual([
    `▶ Playing "Holocene — Someone"`,
    `  + queued "Skinny Love — Someone"`,
  ])
})

test("every query is resolved before anything is played", async () => {
  const order: string[] = []
  const fake = fakeFor({
    resolveQueryToTrack: (query) => {
      order.push(`resolved ${query}`)
      return Promise.resolve(trackFor(query, "Someone"))
    },
    startResumePlayback: () => {
      order.push("played")
      return Promise.resolve()
    },
  })
  await queueing(["one", "two"], fake.ports, CALLED)
  expect(order).toEqual(["resolved one", "resolved two", "played"])
})

test("an artist named holds every query rather than the first alone", async () => {
  const fake = fakeFor()
  await queueing(["Bulletproof", "Numb Little Bug", "--artist", "Em Beihold"], fake.ports, CALLED)
  expect(fake.kept.queries.map((one) => one.artist)).toEqual(["Em Beihold", "Em Beihold"])
})

test("a device named is carried into the first play and into every enqueue", async () => {
  const fake = fakeFor()
  await queueing(["one", "two", "--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept.started).toEqual([{ uris: ["spotify:track:one"], deviceId: "abc123" }])
  expect(fake.kept.enqueued).toEqual([
    { uri: "spotify:track:two", options: { deviceId: "abc123" } },
  ])
})

test("no device worked out leaves the enqueue naming none", async () => {
  const fake = fakeFor()
  await queueing(["one", "two"], fake.ports, CALLED)
  expect(fake.kept.enqueued).toEqual([{ uri: "spotify:track:two", options: {} }])
})

test("no query at all refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await queueing([], fake.ports, CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(`\`${CALLED}\` takes \`<query>\`, and nothing said it`)
  expect(fake.kept.started).toEqual([])
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await queueing(["--uri", "spotify:track:abc"], fake.ports, CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals.join("")).toContain(`\`--uri\` is no argument \`${CALLED}\` takes`)
})

test("an artist written with an equals holds every query", async () => {
  const fake = fakeFor()
  await queueing(["Bulletproof", "Numb Little Bug", "--artist=Em Beihold"], fake.ports, CALLED)
  expect(fake.kept.queries.map((one) => one.artist)).toEqual(["Em Beihold", "Em Beihold"])
})

test("the json answer carries the queries, the tracks and the device", async () => {
  const fake = fakeFor()
  const said = await queueing(["one", "two", "--json"], fake.ports, CALLED)
  expect(said.code).toBe(0)
  expect(JSON.parse(said.report.join("\n"))).toEqual({
    queries: ["one", "two"],
    tracks: [trackFor("one", "Someone"), trackFor("two", "Someone")],
    deviceId: null,
  })
})

test("a query no track answers refuses the call before anything is played", async () => {
  const fake = fakeFor({
    resolveQueryToTrack: () => Promise.reject(new DataError("no Spotify track matched")),
  })
  const said = await queueing(["one", "two"], fake.ports, CALLED)
  expect(said.code).toBe(2)
  expect(said.refusals[0]).toBe("no Spotify track matched")
  expect(fake.kept.started).toEqual([])
})

test("each track is named as soon as that track reaches Spotify", async () => {
  const fake = fakeFor()
  const done: string[] = []

  await playedAndQueued(
    [trackFor("one", "Someone"), trackFor("two", "Someone")],
    undefined,
    fake.ports,
    done
  )
  expect(done).toEqual([PLAYED, QUEUED])
})

test("a call that threw part way names in its refusal each track it had reached", async () => {
  const fake = fakeFor({
    addToQueue: (uri) =>
      uri === "spotify:track:three"
        ? Promise.reject(new OperationalError("spotify answered 429"))
        : Promise.resolve(),
  })

  const said = await queueing(["one", "two", "three"], fake.ports, CALLED)
  expect(said.code).toBe(3)
  expect(said.report).toEqual([PLAYED, QUEUED])
  const last = said.refusals[said.refusals.length - 1] as string
  expect(last).toContain(PLAYED)
  expect(last).toContain(QUEUED)
  expect(last).not.toContain(THIRD)
})

test("a call that threw before a track reached Spotify names no track", async () => {
  const fake = fakeFor({
    startResumePlayback: () => Promise.reject(new OperationalError("spotify answered 502")),
  })

  const said = await queueing(["one", "two"], fake.ports, CALLED)
  expect(said.report).toEqual([])
  expect(said.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
