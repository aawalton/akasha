import { expect, test } from "bun:test"
import {
  byDesktop,
  byPhone,
  noticeFor,
  noticesWith,
} from "akasha/agent/seat/modules/notice-choosing/seat-notice-choosing.module.code.ts"

const SEAT = "01a16f1c-8e48-7000-b6a3-9aae18284763"

const OTHER = "01a16f1c-8e48-7000-b6a3-000000000000"

test("a person stating no notice for a seat is told on the phone and the desktop", () => {
  const notice = noticeFor(undefined, SEAT)
  expect(notice).toBe("both")
  expect(byPhone(notice)).toBe(true)
  expect(byDesktop(notice)).toBe(true)
})

test("a notice reaches only the places it names", () => {
  expect([byPhone("phone"), byDesktop("phone")]).toEqual([true, false])
  expect([byPhone("desktop"), byDesktop("desktop")]).toEqual([false, true])
  expect([byPhone("none"), byDesktop("none")]).toEqual([false, false])
})

test("a notice stated wrongly is read as no notice stated", () => {
  expect(noticeFor([{ seat: SEAT, notice: "loud" }], SEAT)).toBe("both")
  expect(noticeFor("phone", SEAT)).toBe("both")
})

test("choosing a seat's notice replaces that seat's alone", () => {
  const held = [
    { seat: SEAT, notice: "phone" },
    { seat: OTHER, notice: "none" },
  ]
  const chosen = noticesWith(held, SEAT, "desktop")
  expect(noticeFor(chosen, SEAT)).toBe("desktop")
  expect(noticeFor(chosen, OTHER)).toBe("none")
  expect(chosen).toHaveLength(2)
})
