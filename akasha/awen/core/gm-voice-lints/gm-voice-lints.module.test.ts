import { describe, expect, test } from "bun:test"
import {
  assertGmVoiceProse,
  GmVoiceProseError,
  lintGmVoiceProse,
} from "./gm-voice-lints.module.code.ts"

const lints = (text: string) => lintGmVoiceProse(text).map((v) => v.lint)

describe("lintGmVoiceProse", () => {
  test("plain narration carries no intrusion", () => {
    expect(lints("The gate stood open. Rain came off the stone.")).toEqual([])
  })

  test("prose closing on a second-person prompt is an intrusion", () => {
    expect(lints("The gate stood open.\n\nWhat do you do?")).toEqual([
      "pov-agency/prompt-line-closer",
    ])
  })

  test("your move as a closing line is an intrusion", () => {
    expect(lints("The blade rang.\n\nYour move.")).toEqual(["pov-agency/prompt-line-closer"])
  })

  test("a quoted closing line is never counted an intrusion", () => {
    expect(lints('The gate stood open.\n\n"What do you do?"')).toEqual([])
  })

  test("a long closing line is left alone", () => {
    expect(
      lints(
        "The gate stood open.\n\nAnd so with the rain still falling and the road behind you gone what do you do now that the hour has turned?"
      )
    ).toEqual([])
  })

  test("an inline System window is an intrusion", () => {
    expect(lints("The gate stood open.\n\n[System: you have gained a level]")).toEqual([
      "system-voice/inline-text",
    ])
  })

  test("both intrusions are reported together", () => {
    expect(lints("[System: level up]\n\nWhat do you do?")).toEqual([
      "pov-agency/prompt-line-closer",
      "system-voice/inline-text",
    ])
  })

  test("only prose runs are linted, not what sits past a marker", () => {
    expect(lints("The gate stood open.\n\n{{system}}\n\nWhat do you do?")).toEqual([
      "pov-agency/prompt-line-closer",
    ])
  })

  test("malformed marker text is still linted as loose blocks", () => {
    expect(lints("a {{system}} b\n\n[System: level up]")).toEqual(["system-voice/inline-text"])
  })

  test("empty prose carries no intrusion", () => {
    expect(lints("")).toEqual([])
  })
})

describe("assertGmVoiceProse", () => {
  test("says nothing about clean prose", () => {
    expect(assertGmVoiceProse("The gate stood open.")).toBe(undefined)
  })

  test("throws carrying the violations it found", () => {
    try {
      assertGmVoiceProse("What do you do?")
      throw new Error("expected a throw")
    } catch (err) {
      expect(err).toBeInstanceOf(GmVoiceProseError)
      expect((err as GmVoiceProseError).violations).toHaveLength(1)
    }
  })
})
