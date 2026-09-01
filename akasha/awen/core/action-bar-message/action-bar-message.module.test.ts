import { describe, expect, test } from "bun:test"
import {
  ACTION_BAR_MESSAGE_KINDS,
  classifyActionBarMessage,
  isOutOfCharacterFeedback,
} from "./action-bar-message.module.code.ts"

describe("classifyActionBarMessage", () => {
  test("a bare line is an act in the fiction", () => {
    expect(classifyActionBarMessage("I draw the sword")).toBe("action")
  })

  test("a line wrapped whole in brackets is a note", () => {
    expect(classifyActionBarMessage("[can we slow down?]")).toBe("feedback")
  })

  test("surrounding whitespace does not hide the brackets", () => {
    expect(classifyActionBarMessage("  [note]  ")).toBe("feedback")
  })

  test("a bracket only at the start is still an act", () => {
    expect(classifyActionBarMessage("[draws sword and swings")).toBe("action")
  })

  test("a lone bracket is too short to be a note", () => {
    expect(isOutOfCharacterFeedback("[")).toBe(false)
  })

  test("both kinds are named", () => {
    expect(ACTION_BAR_MESSAGE_KINDS).toEqual(["action", "feedback"])
  })
})
