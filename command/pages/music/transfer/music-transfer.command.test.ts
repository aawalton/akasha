import { expect, test } from "bun:test"
import { OperationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  INPUT,
  OK,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Moving } from "akasha/command/pages/music/transfer/music-transfer.command.code.ts"
import { moving } from "akasha/command/pages/music/transfer/music-transfer.command.code.ts"

const CALLED = "akasha music transfer"

type Moved = {
  readonly deviceIds: readonly string[]
  readonly play: boolean | undefined
}

type Fake = {
  readonly ports: Moving
  readonly kept: Moved[]
}

function fakeFor(over: Partial<Moving> = {}): Fake {
  const kept: Moved[] = []
  const ports: Moving = {
    transferPlayback: (deviceIds, play) => {
      kept.push({ deviceIds, play })
      return Promise.resolve()
    },
    ...over,
  }
  return { ports, kept }
}

test("a device said as a word is the device playback moves to", async () => {
  const fake = fakeFor()
  const said = await moving(["abc123"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
  expect(fake.kept).toEqual([{ deviceIds: ["abc123"], play: undefined }])
  expect(said.report).toEqual(["📲 Playback moved to abc123"])
})

test("devices said at the flag and as words reach Spotify in the order written", async () => {
  const fake = fakeFor()
  await moving(["abc123", "--device-id", "def456", "ghi789"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ deviceIds: ["abc123", "def456", "ghi789"], play: undefined }])
})

test("`--play` starts the device moved to", async () => {
  const fake = fakeFor()
  const said = await moving(["abc123", "--play"], fake.ports, CALLED)
  expect(fake.kept).toEqual([{ deviceIds: ["abc123"], play: true }])
  expect(said.report).toEqual(["📲 Playback moved to abc123 and started"])
})

test("--json answers the devices and whether the call started them", async () => {
  const fake = fakeFor()
  const said = await moving(["abc123", "def456", "--json"], fake.ports, CALLED)
  expect(said.code).toBe(OK)
  expect(said.report).toEqual(['{"deviceIds":["abc123","def456"],"play":false}'])
})

test("a call naming no device refuses the call as an input fault", async () => {
  const fake = fakeFor()
  const said = await moving([], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals[0]).toBe(
    `\`${CALLED}\` takes \`<id>\` or \`--device-id\`, and nothing said it`
  )
  expect(fake.kept).toEqual([])
})

test("an empty word names no device and refuses the call", async () => {
  const fake = fakeFor()
  const said = await moving([""], fake.ports, CALLED)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("")).toContain("an empty word names none")
  expect(fake.kept).toEqual([])
})

test("spotify refusing the move is answered as an operational fault", async () => {
  const fake = fakeFor({
    transferPlayback: () => Promise.reject(new OperationalError("no such Spotify device")),
  })
  const said = await moving(["abc123"], fake.ports, CALLED)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals[0]).toBe("no such Spotify device")
})
