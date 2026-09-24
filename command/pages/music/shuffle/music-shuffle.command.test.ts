import { expect, test } from "bun:test"
import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Shuffling } from "akasha/command/pages/music/shuffle/music-shuffle.command.code.ts"
import { shuffling } from "akasha/command/pages/music/shuffle/music-shuffle.command.code.ts"

const CALLED = "akasha music shuffle"

type Put = {
  readonly state: boolean
  readonly options: DeviceOption
}

type Fake = {
  readonly ports: Shuffling
  readonly kept: Put[]
}

function fakeFor(over: Partial<Shuffling> = {}): Fake {
  const kept: Put[] = []
  const ports: Shuffling = {
    toggleShuffle: (state, options) => {
      kept.push({ state, options })
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("`on` puts the active device on drawing at random", async () => {
  const fake = fakeFor()
  const said = await shuffling(["on"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{ state: true, options: {} }])
  expect(said.report).toEqual(["🔀 Shuffle on · the active device"])
})

test("`off` puts it back on the order the tracks are queued in", async () => {
  const fake = fakeFor()
  const said = await shuffling(["off"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ state: false, options: {} }])
  expect(said.report).toEqual(["🔀 Shuffle off · the active device"])
})

test("a device named on the command line is the device put", async () => {
  const fake = fakeFor()
  const said = await shuffling(["on", "--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ state: true, options: { deviceId: "abc123" } }])
  expect(said.report).toEqual(["🔀 Shuffle on · device abc123"])
})

test("--json answers the state and the device", async () => {
  const fake = fakeFor()
  const said = await shuffling(["on", "--json"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"shuffle":true,"deviceId":null}'])
})

test("a word that is neither refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await shuffling(["maybe"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual(["`<on|off>` takes `on` or `off`, and `maybe` is neither"])
  expect(fake.kept).toEqual([])
})

test("a call naming neither word refuses the call", async () => {
  const fake = fakeFor()
  const said = await shuffling([], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(`\`${CALLED}\` takes \`<on|off>\`, and nothing said it`)
  expect(fake.kept).toEqual([])
})

test("spotify refusing the putting is answered as an operational fault", async () => {
  const fake = fakeFor({
    toggleShuffle: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await shuffling(["on"], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
