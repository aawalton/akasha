import { describe, expect, test } from "bun:test"
import { AWEN_GAME_SLUG } from "./index"

describe("AWEN_GAME_SLUG", () => {
  test("is the canonical game page-type slug", () => {
    expect(AWEN_GAME_SLUG).toBe("game")
  })
})
