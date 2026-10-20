import { expect, test } from "bun:test"
import {
  dataOf,
  type Reader,
  shown,
} from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"

const BOOLEAN = 1

const unread: Reader = () => null

const LEFT_OVER = 0x00007ff6_4a3c2b00n

test("a false whose payload keeps an old pointer's upper bytes reads false", () => {
  expect(dataOf(unread, { type: BOOLEAN, value: LEFT_OVER })).toBe(false)
  expect(shown(unread, { type: BOOLEAN, value: LEFT_OVER })).toBe("false")
})

test("a true whose payload keeps an old pointer's upper bytes reads true", () => {
  expect(dataOf(unread, { type: BOOLEAN, value: LEFT_OVER | 1n })).toBe(true)
  expect(shown(unread, { type: BOOLEAN, value: LEFT_OVER | 1n })).toBe("true")
})

test("a clean payload reads as its first byte says", () => {
  expect(dataOf(unread, { type: BOOLEAN, value: 0n })).toBe(false)
  expect(dataOf(unread, { type: BOOLEAN, value: 1n })).toBe(true)
})
