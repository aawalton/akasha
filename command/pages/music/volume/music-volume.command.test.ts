import { expect, test } from "bun:test"
import type { DeviceOption } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Sounding } from "akasha/command/pages/music/volume/music-volume.command.code.ts"
import { sounding } from "akasha/command/pages/music/volume/music-volume.command.code.ts"

const CALLED = "akasha music volume"

type Setting = {
  readonly percent: number
  readonly options: DeviceOption
}

type Fake = {
  readonly ports: Sounding
  readonly kept: Setting[]
}

function fakeFor(over: Partial<Sounding> = {}): Fake {
  const kept: Setting[] = []
  const ports: Sounding = {
    setVolume: (percent, options) => {
      kept.push({ percent, options })
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("a percent said as a word is the loudness Spotify is given", async () => {
  const fake = fakeFor()
  const said = await sounding(["40"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{ percent: 40, options: {} }])
  expect(said.report).toEqual(["🔊 Loudness 40 on the active device"])
})

test("silence and the loudest are each within what the command takes", async () => {
  const fake = fakeFor()
  await sounding(["0"], fake.ports, CALLED)
  await sounding(["100"], fake.ports, CALLED)
  expect(fake.kept.map((one) => one.percent)).toEqual([0, 100])
})

test("a device named on the command line is the device set", async () => {
  const fake = fakeFor()
  const said = await sounding(["55", "--device-id", "abc123"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ percent: 55, options: { deviceId: "abc123" } }])
  expect(said.report).toEqual(["🔊 Loudness 55 on device abc123"])
})

test("--json answers the percent and the device", async () => {
  const fake = fakeFor()
  const said = await sounding(["40", "--json"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"percent":40,"deviceId":null}'])
})

test("a percent past a hundred refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await sounding(["120"], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals).toEqual(["`<percent>` takes nought to a hundred, and 120 is past that"])
  expect(fake.kept).toEqual([])
})

test("a call naming no percent refuses the call", async () => {
  const fake = fakeFor()
  const said = await sounding([], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(`\`${CALLED}\` takes \`<percent>\`, and nothing said it`)
  expect(fake.kept).toEqual([])
})

test("spotify refusing the set is answered as an operational fault", async () => {
  const fake = fakeFor({
    setVolume: () => Promise.reject(new OperationalError("no active Spotify device")),
  })
  const said = await sounding(["40"], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no active Spotify device")
})
