import { expect, test } from "bun:test"
import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Backing } from "akasha/command/pages/music/back/music-back.command.code.ts"
import { backing } from "akasha/command/pages/music/back/music-back.command.code.ts"

const CALLED = "akasha music back"

type Fake = {
  readonly ports: Backing
  readonly kept: DeviceOption[]
}

function fakeFor(over: Partial<Backing> = {}): Fake {
  const kept: DeviceOption[] = []
  const ports: Backing = {
    skipToPrevious: (options) => {
      kept.push(options)
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("the call carries the active device back to the track before", async () => {
  const fake = fakeFor()
  const said = await backing([], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{}])
  expect(said.report).toEqual(["⏮ Went back on the active device"])
})

test("a device named on the command line is the device carried back", async () => {
  const fake = fakeFor()
  const said = await backing(["--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ deviceId: "abc123" }])
  expect(said.report).toEqual(["⏮ Went back on device abc123"])
})

test("--json answers the envelope on one line", async () => {
  const fake = fakeFor()
  const said = await backing(["--json", "--device-id=abc123"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"back":true,"deviceId":"abc123"}'])
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await backing(["--uri", "spotify:track:abc"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("")).toContain(`\`--uri\` is no argument \`${CALLED}\` takes`)
  expect(fake.kept).toEqual([])
})

test("spotify refusing the step back is answered as an operational fault", async () => {
  const fake = fakeFor({
    skipToPrevious: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await backing([], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
