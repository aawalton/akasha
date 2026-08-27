import { describe, expect, test } from "bun:test"
import {
  type ActiveSessionInit,
  IDLE_PLAYING_SESSION,
  playingSessionReducer,
} from "./playing-session"

const CH1: ActiveSessionInit = {
  pageId: "chapter-1-aaaaaaaa",
  pageTypeSlug: "story-chapter",
  pageHref: "/story-chapter/chapter-one-aaaaaaaa",
  title: "Chapter One",
  medium: "audio",
  variant: "narrator-mara",
  speed: 1.5,
  nextHref: "/story-chapter/chapter-two-bbbbbbbb",
}

const CH2: ActiveSessionInit = {
  pageId: "chapter-2-bbbbbbbb",
  pageTypeSlug: "story-chapter",
  pageHref: "/story-chapter/chapter-two-bbbbbbbb",
  title: "Chapter Two",
  medium: "audio",
  variant: "narrator-mara",
  speed: 1.5,
  nextHref: null,
}

describe("playingSessionReducer", () => {
  test("idle + start → active carrying every init field", () => {
    const next = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    expect(next).toEqual({ status: "active", ...CH1 })
  })

  test("active + start(other) → replaces the session (different page)", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    const replaced = playingSessionReducer(active, { type: "start", session: CH2 })
    expect(replaced).toEqual({ status: "active", ...CH2 })
  })

  test("active + advance(next) → active on the next session", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    const advanced = playingSessionReducer(active, { type: "advance", next: CH2 })
    expect(advanced).toEqual({ status: "active", ...CH2 })
  })

  test("active + advance(null) → idle (end of story dismisses the bar)", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    const advanced = playingSessionReducer(active, { type: "advance", next: null })
    expect(advanced).toBe(IDLE_PLAYING_SESSION)
  })

  test("active + stop → idle", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    expect(playingSessionReducer(active, { type: "stop" })).toBe(IDLE_PLAYING_SESSION)
  })

  test("idle + stop → idle (idempotent, same reference)", () => {
    expect(playingSessionReducer(IDLE_PLAYING_SESSION, { type: "stop" })).toBe(IDLE_PLAYING_SESSION)
  })

  test("idle + advance → idle (defensive no-op; advance only fires from active)", () => {
    expect(playingSessionReducer(IDLE_PLAYING_SESSION, { type: "advance", next: CH2 })).toBe(
      IDLE_PLAYING_SESSION
    )
  })

  test("active + setVariant patches variant, preserves the rest", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    const next = playingSessionReducer(active, { type: "setVariant", variant: "narrator-finn" })
    expect(next).toEqual({ status: "active", ...CH1, variant: "narrator-finn" })
  })

  test("active + setSpeed patches speed, preserves the rest", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    const next = playingSessionReducer(active, { type: "setSpeed", speed: 2 })
    expect(next).toEqual({ status: "active", ...CH1, speed: 2 })
  })

  test("idle + setVariant → idle (no active session to patch)", () => {
    expect(playingSessionReducer(IDLE_PLAYING_SESSION, { type: "setVariant", variant: "x" })).toBe(
      IDLE_PLAYING_SESSION
    )
  })

  test("setSpeed to the same speed returns the same reference (no churn)", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    expect(playingSessionReducer(active, { type: "setSpeed", speed: CH1.speed })).toBe(active)
  })

  test("setVariant to the same variant returns the same reference (no churn)", () => {
    const active = playingSessionReducer(IDLE_PLAYING_SESSION, { type: "start", session: CH1 })
    expect(playingSessionReducer(active, { type: "setVariant", variant: CH1.variant })).toBe(active)
  })
})
