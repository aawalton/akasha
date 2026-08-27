import { describe, expect, test } from "bun:test"
import { BASE_IMAGE_ID } from "../core/constants"
import { applyIntent } from "../idle-actions"
import { NOW, stateWithImages } from "./test-helpers"

describe("idle-actions — selectImage (cosmetic front, #13389)", () => {
  test("selects an owned image as the card front", () => {
    const s = stateWithImages()
    const { state, outcome } = applyIntent(
      s,
      { type: "selectImage", slug: "abby", image: "img-2" },
      NOW
    )
    expect(outcome).toEqual({ applied: true })
    expect(state.gacha.girls.abby?.frontImage).toBe("img-2")
    expect(state.resource).toBe(s.resource)
    expect(state.gacha.girls.abby?.images).toEqual(["img-1", "img-2"])
    expect(state.gacha.girls.abby?.stars).toBe(0)
  })

  test("re-selecting the current front is an idempotent APPLIED (no phantom error)", () => {
    const s = stateWithImages()
    const once = applyIntent(s, { type: "selectImage", slug: "abby", image: "img-1" }, NOW)
    const { outcome } = applyIntent(
      once.state,
      { type: "selectImage", slug: "abby", image: "img-1" },
      NOW
    )
    expect(outcome).toEqual({ applied: true })
  })

  test("an image she does not own is an ineligible no-op", () => {
    const s = stateWithImages()
    const { state, outcome } = applyIntent(
      s,
      { type: "selectImage", slug: "abby", image: "img-9" },
      NOW
    )
    expect(outcome).toEqual({ applied: false, reason: "ineligible" })
    expect(state).toBe(s)
  })

  test("a locked / unknown girl is a not-owned no-op", () => {
    const s = stateWithImages()
    const { outcome } = applyIntent(s, { type: "selectImage", slug: "ghost", image: "img-1" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "not-owned" })
  })

  test("selecting the BASE cover is applied even with variants owned (never orphaned, #14459)", () => {
    const s = stateWithImages()
    const featured = applyIntent(s, { type: "selectImage", slug: "abby", image: "img-1" }, NOW)
    const { state, outcome } = applyIntent(
      featured.state,
      { type: "selectImage", slug: "abby", image: BASE_IMAGE_ID },
      NOW
    )
    expect(outcome).toEqual({ applied: true })
    expect(state.gacha.girls.abby?.frontImage).toBe(BASE_IMAGE_ID)
    expect(state.gacha.girls.abby?.images).toEqual(["img-1", "img-2"])
    expect(state.resource).toBe(s.resource)
  })

  test("selecting BASE is applied for a girl with NO collected variants yet (#14459)", () => {
    const s = stateWithImages()
    const { state, outcome } = applyIntent(
      s,
      { type: "selectImage", slug: "aura", image: BASE_IMAGE_ID },
      NOW
    )
    expect(outcome).toEqual({ applied: true })
    expect(state.gacha.girls.aura?.frontImage).toBe(BASE_IMAGE_ID)
    expect(state.gacha.girls.aura?.images).toEqual([])
  })

  test("BASE on a locked / unknown girl is still a not-owned no-op (#14459)", () => {
    const s = stateWithImages()
    const { outcome } = applyIntent(
      s,
      { type: "selectImage", slug: "ghost", image: BASE_IMAGE_ID },
      NOW
    )
    expect(outcome).toEqual({ applied: false, reason: "not-owned" })
  })
})
