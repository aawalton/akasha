import { afterEach, describe, expect, test } from "bun:test"
import {
  closeRosterGallery,
  getRosterGallerySnapshot,
  openRosterGallery,
  subscribeRosterGallery,
} from "./roster-gallery-store"

afterEach(() => {
  closeRosterGallery()
})

describe("roster-gallery-store (#13944)", () => {
  test("snapshot is null before any open", () => {
    expect(getRosterGallerySnapshot()).toBeNull()
  })

  test("openRosterGallery sets the snapshot to the slug", () => {
    openRosterGallery("nova")
    expect(getRosterGallerySnapshot()).toBe("nova")
  })

  test("closeRosterGallery clears the snapshot", () => {
    openRosterGallery("aura")
    closeRosterGallery()
    expect(getRosterGallerySnapshot()).toBeNull()
  })

  test("subscribers are notified on open and on close", () => {
    let ticks = 0
    const unsubscribe = subscribeRosterGallery(() => {
      ticks += 1
    })
    openRosterGallery("abby")
    closeRosterGallery()
    unsubscribe()
    openRosterGallery("amy")
    expect(ticks).toBe(2)
  })

  test("unsubscribe stops further notifications", () => {
    let ticks = 0
    const unsubscribe = subscribeRosterGallery(() => {
      ticks += 1
    })
    unsubscribe()
    openRosterGallery("nova")
    expect(ticks).toBe(0)
  })
})
