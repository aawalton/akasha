import { expect, test } from "bun:test"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type {
  Queued,
  Upcoming,
} from "akasha/command/pages/music/upcoming/music-upcoming.command.code.ts"
import {
  envelopeOf,
  linesOf,
  upcoming,
} from "akasha/command/pages/music/upcoming/music-upcoming.command.code.ts"

const CALLED = "akasha music upcoming"

const QUEUED: Queued = {
  currently_playing: { name: "Bulletproof", uri: "spotify:track:one", id: "one" },
  queue: [
    { name: "Motion Sickness", uri: "spotify:track:two", id: "two" },
    { name: "Holocene", uri: "spotify:track:three", id: "three" },
  ],
}

const EMPTY: Queued = { currently_playing: null, queue: [] }

function fakeFor(queued: Queued): Upcoming {
  return { getQueue: () => Promise.resolve(queued) }
}

test("the track playing now is named before the tracks queued behind it", () => {
  expect(linesOf(envelopeOf(QUEUED))).toEqual([
    "▶ Now: Bulletproof",
    "  1. Motion Sickness",
    "  2. Holocene",
  ])
})

test("nothing playing and nothing queued are each said", () => {
  expect(linesOf(envelopeOf(EMPTY))).toEqual(["▶ Now: (nothing)", "  (nothing queued)"])
})

test("the envelope carries the track playing now and the queue behind it", () => {
  expect(envelopeOf(QUEUED)).toEqual({
    playing: { name: "Bulletproof", uri: "spotify:track:one", id: "one" },
    queue: [
      { name: "Motion Sickness", uri: "spotify:track:two", id: "two" },
      { name: "Holocene", uri: "spotify:track:three", id: "three" },
    ],
  })
})

test("the human report is the lines", async () => {
  const said = await upcoming([], fakeFor(QUEUED), CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(said.report).toEqual(["▶ Now: Bulletproof", "  1. Motion Sickness", "  2. Holocene"])
})

test("--json answers the envelope on one line", async () => {
  const said = await upcoming(["--json"], fakeFor(EMPTY), CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"playing":null,"queue":[]}'])
})

test("a flag the command does not carry refuses the call", async () => {
  const said = await upcoming(["--pretty"], fakeFor(QUEUED), CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.report).toEqual([])
  expect(said.refusals.join("")).toContain("--pretty")
})

test("spotify refusing the reading is answered as an operational fault", async () => {
  const ports: Upcoming = {
    getQueue: () => Promise.reject(new OperationalError("no active Spotify device")),
  }
  const said = await upcoming([], ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
