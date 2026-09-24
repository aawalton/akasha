import { expect, test } from "bun:test"
import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Holding } from "akasha/command/pages/music/pause/music-pause.command.code.ts"
import { holding } from "akasha/command/pages/music/pause/music-pause.command.code.ts"

const CALLED = "akasha music pause"

type Fake = {
  readonly ports: Holding
  readonly kept: DeviceOption[]
}

function fakeFor(over: Partial<Holding> = {}): Fake {
  const kept: DeviceOption[] = []
  const ports: Holding = {
    pausePlayback: (options) => {
      kept.push(options)
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("the call holds what the active device is playing", async () => {
  const fake = fakeFor()
  const said = await holding([], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{}])
  expect(said.report).toEqual(["⏸ Held on the active device"])
})

test("a device named on the command line is the device held", async () => {
  const fake = fakeFor()
  const said = await holding(["--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ deviceId: "abc123" }])
  expect(said.report).toEqual(["⏸ Held on device abc123"])
})

test("--json answers the envelope on one line", async () => {
  const fake = fakeFor()
  const said = await holding(["--json", "--device-id=abc123"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"held":true,"deviceId":"abc123"}'])
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await holding(["--uri", "spotify:track:abc"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("")).toContain(`\`--uri\` is no argument \`${CALLED}\` takes`)
  expect(fake.kept).toEqual([])
})

test("spotify refusing the hold is answered as an operational fault", async () => {
  const fake = fakeFor({
    pausePlayback: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await holding([], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
