import { expect, test } from "bun:test"
import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import type { ResolvableTrack, ResolvedTrack } from "@akasha/music-choosing/track-resolving"
import type { Playing, StartResumeOptions } from "./music-play.command.code.ts"
import { playing, readingArgv } from "./music-play.command.code.ts"

const MOTION: ResolvedTrack = {
  name: "Motion Sickness",
  uri: "spotify:track:6gv6gQACUu1pZSU3Dq2qIN",
  id: "6gv6gQACUu1pZSU3Dq2qIN",
  artists: ["Phoebe Bridgers"],
}

type Kept = {
  readonly queries: { query: string; artist: string | undefined }[]
  readonly fetched: string[]
  readonly devices: (string | undefined)[]
  readonly started: StartResumeOptions[]
}

type Fake = {
  readonly ports: Playing
  readonly kept: Kept
}

function fakeFor(over: Partial<Playing> = {}): Fake {
  const kept: Kept = { queries: [], fetched: [], devices: [], started: [] }
  const ports: Playing = {
    parseTrackId: (uri) =>
      uri.startsWith("spotify:track:") ? uri.slice("spotify:track:".length) : null,
    getTrack: (id) => {
      kept.fetched.push(id)
      return Promise.resolve({
        id,
        name: "Motion Sickness",
        artists: [{ name: "Phoebe Bridgers" }],
      })
    },
    trackToResolved: (uri, track: ResolvableTrack) => ({
      name: track.name,
      uri,
      id: track.id,
      artists: (track.artists ?? []).map((one) => one.name),
    }),
    resolveQueryToTrack: (query, artist) => {
      kept.queries.push({ query, artist })
      return Promise.resolve(MOTION)
    },
    resolveDeviceId: (named) => {
      kept.devices.push(named)
      return Promise.resolve(named)
    },
    startResumePlayback: (options) => {
      kept.started.push(options)
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("a query is resolved and the track it answers is played", async () => {
  const fake = fakeFor()
  const said = await playing(["Phoebe Bridgers Motion Sickness"], fake.ports)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(fake.kept.queries).toEqual([
    { query: "Phoebe Bridgers Motion Sickness", artist: undefined },
  ])
  expect(fake.kept.started).toEqual([{ uris: [MOTION.uri] }])
  expect(said.report).toEqual([`▶ Playing "Motion Sickness" — Phoebe Bridgers`])
})

test("an artist named is carried into the query resolve", async () => {
  const fake = fakeFor()
  await playing(["Bulletproof", "--artist", "Em Beihold"], fake.ports)
  expect(fake.kept.queries).toEqual([{ query: "Bulletproof", artist: "Em Beihold" }])
})

test("a uri named is read for a track id and the track is fetched rather than searched", async () => {
  const fake = fakeFor()
  const said = await playing(["--uri", MOTION.uri], fake.ports)
  expect(said.code).toBe(0)
  expect(fake.kept.queries).toEqual([])
  expect(fake.kept.fetched).toEqual([MOTION.id ?? ""])
  expect(fake.kept.started).toEqual([{ uris: [MOTION.uri] }])
})

test("a uri naming no track is played as it was written", async () => {
  const fake = fakeFor()
  const said = await playing(["--uri", "spotify:episode:abc"], fake.ports)
  expect(said.code).toBe(0)
  expect(fake.kept.fetched).toEqual([])
  expect(fake.kept.started).toEqual([{ uris: ["spotify:episode:abc"] }])
  expect(said.report).toEqual([`▶ Playing "spotify:episode:abc"`])
})

test("a query named beside a uri refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await playing(["--uri", MOTION.uri, "Motion Sickness"], fake.ports)
  expect(said.code).toBe(1)
  expect(said.refusals.join("")).toContain("do not also pass a query")
  expect(fake.kept.started).toEqual([])
})

test("neither a query nor a uri refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await playing([], fake.ports)
  expect(said.code).toBe(1)
  expect(said.refusals.join("")).toContain("supply a track query to play")
  expect(fake.kept.started).toEqual([])
})

test("a uri and an artist named together refuse the call", async () => {
  const fake = fakeFor()
  const said = await playing(["--uri", MOTION.uri, "--artist", "Phoebe Bridgers"], fake.ports)
  expect(said.code).toBe(1)
  expect(said.refusals.join("")).toContain("mutually exclusive")
  expect(fake.kept.started).toEqual([])
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await playing(["--shuffle"], fake.ports)
  expect(said.code).toBe(1)
  expect(said.refusals).toEqual(["unknown flag: --shuffle"])
})

test("a second positional refuses the call", async () => {
  const fake = fakeFor()
  const said = await playing(["one", "two"], fake.ports)
  expect(said.code).toBe(1)
  expect(said.refusals.join("")).toContain("unexpected positional argument(s): two")
})

test("a device named on the command line is the device played on", async () => {
  const fake = fakeFor()
  await playing(["Motion Sickness", "--device-id", "abc123"], fake.ports)
  expect(fake.kept.devices).toEqual(["abc123"])
  expect(fake.kept.started).toEqual([{ uris: [MOTION.uri], deviceId: "abc123" }])
})

test("the json answer carries the query, the track and the device", async () => {
  const fake = fakeFor()
  const said = await playing(["Motion Sickness", "--json"], fake.ports)
  expect(said.code).toBe(0)
  expect(JSON.parse(said.report.join("\n"))).toEqual({
    query: "Motion Sickness",
    track: MOTION,
    deviceId: null,
  })
})

test("a query no track answers refuses the call as a data fault", async () => {
  const fake = fakeFor({
    resolveQueryToTrack: () => Promise.reject(new DataError("no Spotify track matched")),
  })
  const said = await playing(["nothing at all"], fake.ports)
  expect(said.code).toBe(2)
  expect(said.refusals).toEqual(["no Spotify track matched"])
})

test("no device left to play on refuses the call as an operational fault", async () => {
  const fake = fakeFor({
    resolveDeviceId: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await playing(["Motion Sickness"], fake.ports)
  expect(said.code).toBe(3)
  expect(said.refusals).toEqual(["no active Spotify device"])
})

test("a flag written with an equals carries its value", () => {
  const read = readingArgv(["--artist=Em Beihold", "Bulletproof"], ["--artist"], ["--json"])
  expect("mistaken" in read).toBe(false)
  if ("mistaken" in read) return
  expect(read.valued.get("--artist")).toBe("Em Beihold")
  expect(read.positionals).toEqual(["Bulletproof"])
})

test("what follows a bare pair of dashes is a positional however it is written", () => {
  const read = readingArgv(["--", "--json"], ["--artist"], ["--json"])
  expect("mistaken" in read).toBe(false)
  if ("mistaken" in read) return
  expect(read.positionals).toEqual(["--json"])
  expect(read.bare.size).toBe(0)
})
