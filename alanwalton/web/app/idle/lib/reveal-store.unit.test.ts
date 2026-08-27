import { afterEach, describe, expect, test } from "bun:test"
import type { DrawReveal } from "./core/gacha/draw"
import { clearReveal, getRevealSnapshot, pushReveal, subscribeReveal } from "./reveal-store"

const REVEAL: DrawReveal = {
  slug: "aura",
  name: "Aura",
  image: "img-1",
  isNewImage: true,
  isNewGirl: false,
  stars: 3,
  starUp: false,
}

afterEach(() => {
  clearReveal()
})

describe("reveal-store (#14366)", () => {
  test("snapshot is null before any push", () => {
    expect(getRevealSnapshot()).toBeNull()
  })

  test("pushReveal sets the snapshot to the reveal", () => {
    pushReveal(REVEAL)
    expect(getRevealSnapshot()).toBe(REVEAL)
  })

  test("clearReveal clears the snapshot", () => {
    pushReveal(REVEAL)
    clearReveal()
    expect(getRevealSnapshot()).toBeNull()
  })

  test("subscribers are notified on push and on clear", () => {
    let ticks = 0
    const unsubscribe = subscribeReveal(() => {
      ticks += 1
    })
    pushReveal(REVEAL)
    clearReveal()
    unsubscribe()
    pushReveal(REVEAL)
    expect(ticks).toBe(2)
  })

  test("unsubscribe stops further notifications", () => {
    let ticks = 0
    const unsubscribe = subscribeReveal(() => {
      ticks += 1
    })
    unsubscribe()
    pushReveal(REVEAL)
    expect(ticks).toBe(0)
  })
})
