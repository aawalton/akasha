import { expect, test } from "bun:test"
import type { LocationPoint } from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.code.ts"
import { readStoredBuffer } from "akasha/alan/atlas-web/modules/location-capture/location-capture.module.code.ts"

function pointOf(clientSeq: number): LocationPoint {
  return {
    deviceId: "a fixture phone",
    clientSeq,
    capturedAt: "2026-01-15T11:00:00.000Z",
    latitude: 40.7608,
    longitude: -111.891,
  }
}

test("a saved buffer whose every point is valid is read whole", () => {
  const saved = [pointOf(1), pointOf(2), pointOf(3)]
  expect(readStoredBuffer(JSON.stringify(saved))).toEqual({
    points: saved,
    refused: 0,
    why: null,
    unreadable: false,
  })
})

test("a saved buffer keeps every valid point and names the first refused one", () => {
  const saved = [pointOf(1), { ...pointOf(2), latitude: 91 }, pointOf(3), { clientSeq: 4 }]
  const read = readStoredBuffer(JSON.stringify(saved))
  expect(read.points).toEqual([pointOf(1), pointOf(3)])
  expect(read.refused).toBe(2)
  expect(read.why).toStartWith("point 1 at latitude: ")
  expect(read.unreadable).toBe(false)
})

test("a saved buffer that is not JSON is unreadable and keeps no point", () => {
  const read = readStoredBuffer('[{"deviceId": "a fixture phone", ')
  expect(read.points).toEqual([])
  expect(read.unreadable).toBe(true)
  expect(read.why).toStartWith("not JSON: ")
})

test("a saved buffer that is JSON but no list is unreadable", () => {
  const read = readStoredBuffer(JSON.stringify({ points: [pointOf(1)] }))
  expect(read.points).toEqual([])
  expect(read.unreadable).toBe(true)
})
