import { describe, expect, test } from "bun:test"
import {
  ACTION_BAR_MESSAGE_KINDS,
  classifyActionBarMessage,
  isOutOfCharacterFeedback,
} from "./action-bar-message"

describe("classifyActionBarMessage — the square-bracket OOC rule (#14583)", () => {
  const feedback: Record<string, string> = {
    "simple wrapped message": "[hello]",
    "sentence-shaped feedback (origin-shaped)": "[Okay, this is feedback, not an action.]",
    "leading/trailing whitespace is trimmed first": "   [adjust the pacing]   ",
    "internal whitespace inside the wrap": "[ slow the reveal down ]",
    "degenerate empty wrap still reads as bracketed": "[]",
    "both-ends bracketed (all-meta, Rule A → feedback)": "[a] [b]",
  }

  const action: Record<string, string> = {
    "plain unbracketed text": "open the door",
    "inline aside then action (documented NON-GOAL)": "[aside] then I draw my sword",
    "trailing bracketed span only": "I search the [hidden] alcove",
    "opens with a bracket but does not close with one": "[whispering, I step forward",
    "closes with a bracket but does not open with one": "I step forward]",
    "a lone open bracket": "[",
    "a lone close bracket": "]",
    "empty string": "",
    "whitespace only": "   ",
  }

  for (const [name, text] of Object.entries(feedback)) {
    test(`feedback: ${name}`, () => {
      expect(isOutOfCharacterFeedback(text)).toBe(true)
      expect(classifyActionBarMessage(text)).toBe("feedback")
    })
  }

  for (const [name, text] of Object.entries(action)) {
    test(`action: ${name}`, () => {
      expect(isOutOfCharacterFeedback(text)).toBe(false)
      expect(classifyActionBarMessage(text)).toBe("action")
    })
  }
})

describe("ACTION_BAR_MESSAGE_KINDS — the closed kind vocabulary", () => {
  test("exactly the two kinds, in a stable order", () => {
    expect(ACTION_BAR_MESSAGE_KINDS).toEqual(["action", "feedback"])
  })

  test("classify only ever returns a member of the vocabulary", () => {
    for (const sample of ["do the thing", "[meta]", "  ", "[a] [b]"]) {
      expect(ACTION_BAR_MESSAGE_KINDS).toContain(classifyActionBarMessage(sample))
    }
  })
})
