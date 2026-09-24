import { expect, test } from "bun:test"
import type {
  DeviceOption,
  RepeatState,
} from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Repeating } from "akasha/command/pages/music/repeat/music-repeat.command.code.ts"
import { repeating } from "akasha/command/pages/music/repeat/music-repeat.command.code.ts"

const CALLED = "akasha music repeat"

type Put = {
  readonly state: RepeatState
  readonly options: DeviceOption
}

type Fake = {
  readonly ports: Repeating
  readonly kept: Put[]
}

function fakeFor(over: Partial<Repeating> = {}): Fake {
  const kept: Put[] = []
  const ports: Repeating = {
    setRepeatMode: (state, options) => {
      kept.push({ state, options })
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("`track` puts the active device on playing the one track again", async () => {
  const fake = fakeFor()
  const said = await repeating(["track"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{ state: "track", options: {} }])
  expect(said.report).toEqual(["🔁 Repeat track · the active device"])
})

test("`context` and `off` are taken as they are written", async () => {
  const fake = fakeFor()
  await repeating(["context"], fake.ports, CALLED)
  await repeating(["off"], fake.ports, CALLED)
  expect(fake.kept.map((one) => one.state)).toEqual(["context", "off"])
})

test("a device named on the command line is the device put", async () => {
  const fake = fakeFor()
  const said = await repeating(["off", "--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ state: "off", options: { deviceId: "abc123" } }])
  expect(said.report).toEqual(["🔁 Repeat off · device abc123"])
})

test("--json answers the state and the device", async () => {
  const fake = fakeFor()
  const said = await repeating(["track", "--json"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"repeat":"track","deviceId":null}'])
})

test("a word that is none of the three refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await repeating(["loop"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual([
    "`<track|context|off>` takes `track`, `context` or `off`, and `loop` is none of them",
  ])
  expect(fake.kept).toEqual([])
})

test("a call naming no state refuses the call", async () => {
  const fake = fakeFor()
  const said = await repeating([], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(`\`${CALLED}\` takes \`<track|context|off>\`, and nothing said it`)
  expect(fake.kept).toEqual([])
})

test("spotify refusing the putting is answered as an operational fault", async () => {
  const fake = fakeFor({
    setRepeatMode: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await repeating(["track"], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
