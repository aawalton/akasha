import { expect, test } from "bun:test"
import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Skipping } from "akasha/command/pages/music/skip/music-skip.command.code.ts"
import { skipping } from "akasha/command/pages/music/skip/music-skip.command.code.ts"

const CALLED = "akasha music skip"

type Fake = {
  readonly ports: Skipping
  readonly kept: DeviceOption[]
}

function fakeFor(over: Partial<Skipping> = {}): Fake {
  const kept: DeviceOption[] = []
  const ports: Skipping = {
    skipToNext: (options) => {
      kept.push(options)
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("the call carries the active device on to the track behind", async () => {
  const fake = fakeFor()
  const said = await skipping([], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{}])
  expect(said.report).toEqual(["⏭ Skipped ahead on the active device"])
})

test("a device named on the command line is the device skipped on", async () => {
  const fake = fakeFor()
  const said = await skipping(["--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ deviceId: "abc123" }])
  expect(said.report).toEqual(["⏭ Skipped ahead on device abc123"])
})

test("--json answers the envelope on one line", async () => {
  const fake = fakeFor()
  const said = await skipping(["--json", "--device-id=abc123"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"skipped":true,"deviceId":"abc123"}'])
})

test("a flag the command does not carry refuses the call", async () => {
  const fake = fakeFor()
  const said = await skipping(["--uri", "spotify:track:abc"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("")).toContain(`\`--uri\` is no argument \`${CALLED}\` takes`)
  expect(fake.kept).toEqual([])
})

test("spotify refusing the skip is answered as an operational fault", async () => {
  const fake = fakeFor({
    skipToNext: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await skipping([], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
