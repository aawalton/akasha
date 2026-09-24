import { expect, test } from "bun:test"
import { pointOf } from "akasha/alan/atlas-web/modules/location-batch/location-batch.module.test-fixtures.ts"
import {
  readStoredBuffer,
  seqPastBuffer,
} from "akasha/alan/atlas-web/modules/location-capture/location-capture.module.code.ts"

test("a sequence saved behind the buffer moves past every point buffered", () => {
  expect(seqPastBuffer(2, [pointOf(1), pointOf(4), pointOf(3)])).toBe(5)
})

test("a sequence already past the buffer is kept", () => {
  expect(seqPastBuffer(9, [pointOf(1), pointOf(4)])).toBe(9)
  expect(seqPastBuffer(0, [])).toBe(0)
})

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
  expect(read.why).toStartWith("point 1: latitude: ")
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
