import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Seeking } from "akasha/command/pages/music/seek/music-seek.command.code.ts"
import { seeking } from "akasha/command/pages/music/seek/music-seek.command.code.ts"
import { z } from "zod"

const CALLED = "akasha music seek"

const SEEK_SAID = z.strictObject({
  seconds: z.number(),
  positionMs: z.number(),
  deviceId: z.string().nullable(),
})

type Moved = {
  readonly positionMs: number
  readonly options: DeviceOption
}

type Fake = {
  readonly ports: Seeking
  readonly kept: Moved[]
}

function fakeFor(over: Partial<Seeking> = {}): Fake {
  const kept: Moved[] = []
  const ports: Seeking = {
    seek: (positionMs, options) => {
      kept.push({ positionMs, options })
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("a point said in seconds reaches Spotify in milliseconds", async () => {
  const fake = fakeFor()
  const said = await seeking(["42"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{ positionMs: 42000, options: {} }])
  expect(said.report).toEqual(["⏩ Moved to 42s on the active device"])
})

test("the opening of the track is a point like any other", async () => {
  const fake = fakeFor()
  await seeking(["0"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ positionMs: 0, options: {} }])
})

test("a device named on the command line is the device moved", async () => {
  const fake = fakeFor()
  const said = await seeking(["7", "--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ positionMs: 7000, options: { deviceId: "abc123" } }])
  expect(said.report).toEqual(["⏩ Moved to 7s on device abc123"])
})

test("--json answers the seconds, the milliseconds and the device", async () => {
  const fake = fakeFor()
  const said = await seeking(["30", "--json"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(SEEK_SAID.parse(JSON.parse(said.report.join("\n")))).toEqual({
    seconds: 30,
    positionMs: 30000,
    deviceId: null,
  })
})

test("a call naming no point refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await seeking([], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(`\`${CALLED}\` takes \`<seconds>\`, and nothing said it`)
  expect(fake.kept).toEqual([])
})

test("a point that is no whole number refuses the call", async () => {
  const fake = fakeFor()
  const said = await seeking(["half"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("")).toContain("is no whole number of nought or more")
  expect(fake.kept).toEqual([])
})

test("spotify refusing the move is answered as an operational fault", async () => {
  const fake = fakeFor({
    seek: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await seeking(["10"], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
