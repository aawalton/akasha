import { describe, expect, test } from "bun:test"
import {
  minutesOf,
  nearlyEnded,
  watchedTo,
} from "akasha/alan/collection/watching/modules/playback-watching/playback-watching.module.code.ts"

describe("watchedTo", () => {
  test("nine tenths of a video is watched", () => {
    expect(watchedTo(1320, 1440)).toBe(true)
  })

  test("four fifths of a video is not watched", () => {
    expect(watchedTo(1152, 1440)).toBe(false)
  })

  test("a trailer watched to its end records nothing", () => {
    expect(watchedTo(59, 59)).toBe(false)
  })
})

describe("nearlyEnded", () => {
  test("a video stopped on its last second is at its end", () => {
    expect(nearlyEnded(1439, 1440)).toBe(true)
  })

  test("a video stopped a minute short is not", () => {
    expect(nearlyEnded(1380, 1440)).toBe(false)
  })
})

describe("minutesOf", () => {
  test("a video's seconds are its minutes", () => {
    expect(minutesOf(1440)).toBe(24)
    expect(minutesOf(7800)).toBe(130)
  })
})
