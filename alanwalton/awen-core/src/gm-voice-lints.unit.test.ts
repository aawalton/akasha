import { describe, expect, test } from "bun:test"
import { assertGmVoiceProse, GmVoiceProseError, lintGmVoiceProse } from "./gm-voice-lints"

function lintStems(text: string): readonly string[] {
  return lintGmVoiceProse(text).map((v) => v.lint)
}

const CLEAN = `The corridor exhales cold air as your torch gutters.

Far ahead, something metal drags across stone, then stops. The silence after is worse than the sound.`

describe("lintGmVoiceProse — pov-agency/prompt-line-closer (positive)", () => {
  const closers = [
    "What do you do?",
    "What do you do next?",
    "What will you do?",
    "Your move.",
    "What's your next move?",
    "What now?",
    "How do you respond?",
  ]
  for (const closer of closers) {
    test(`flags a trailing "${closer}"`, () => {
      const text = `${CLEAN}\n\n${closer}`
      expect(lintStems(text)).toContain("pov-agency/prompt-line-closer")
    })
  }
})

describe("lintGmVoiceProse — pov-agency/prompt-line-closer (negative, precision)", () => {
  test("clean narration is not flagged", () => {
    expect(lintStems(CLEAN)).not.toContain("pov-agency/prompt-line-closer")
  })

  test("a QUOTED action prompt (a character speaking) is not flagged", () => {
    const text = `${CLEAN}\n\n"What do you do?" she asks, one brow raised.`
    expect(lintStems(text)).not.toContain("pov-agency/prompt-line-closer")
  })

  test("a long paragraph that merely CONTAINS a question mid-flow is not flagged", () => {
    const text = `You weigh the two doors. What do you do when both paths look equally lethal and the torch is burning down to your knuckles? The question hangs there as the cold seeps in.`
    expect(lintStems(text)).not.toContain("pov-agency/prompt-line-closer")
  })

  test("a second-person line that is NOT an action prompt is not flagged", () => {
    const text = `${CLEAN}\n\nYour hands are steady, for now.`
    expect(lintStems(text)).not.toContain("pov-agency/prompt-line-closer")
  })
})

describe("lintGmVoiceProse — system-voice/inline-text", () => {
  test("flags an inline [System: …] window in prose", () => {
    const text = `You cross the threshold.\n\n[System: +40 XP. Level 4 reached.]`
    expect(lintStems(text)).toContain("system-voice/inline-text")
  })

  test("flags a bracketed [System] tag anywhere in a prose run", () => {
    const text = `[System] Quest updated.\n\nThe map redraws itself in your mind.`
    expect(lintStems(text)).toContain("system-voice/inline-text")
  })

  test("a legitimate {{system}} position marker is NOT flagged", () => {
    const text = `You cross the threshold.\n\n{{system}}\n\nThe far wall shifts.`
    expect(lintStems(text)).not.toContain("system-voice/inline-text")
  })

  test("clean prose with an ordinary bracketed aside is not flagged", () => {
    const text = `The ledger (water-stained, barely legible) lists three names.`
    expect(lintStems(text)).not.toContain("system-voice/inline-text")
  })
})

describe("lintGmVoiceProse — one-pass, both lints", () => {
  test("a turn with BOTH intrusions returns both violations", () => {
    const text = `You step in.\n\n[System: +40 XP]\n\nWhat do you do?`
    const stems = lintStems(text)
    expect(stems).toContain("pov-agency/prompt-line-closer")
    expect(stems).toContain("system-voice/inline-text")
  })

  test("clean prose returns no violations", () => {
    expect(lintGmVoiceProse(CLEAN)).toEqual([])
  })
})

describe("assertGmVoiceProse — the write-boundary gate", () => {
  test("throws GmVoiceProseError naming all violations on an intruding turn", () => {
    const text = `You step in.\n\n[System: +40 XP]\n\nWhat do you do?`
    expect(() => assertGmVoiceProse(text)).toThrow(GmVoiceProseError)
    try {
      assertGmVoiceProse(text)
    } catch (err) {
      expect(err).toBeInstanceOf(GmVoiceProseError)
      if (err instanceof GmVoiceProseError) expect(err.violations.length).toBeGreaterThanOrEqual(2)
    }
  })

  test("is a no-op on clean prose", () => {
    expect(() => assertGmVoiceProse(CLEAN)).not.toThrow()
  })

  test("is a no-op on empty text", () => {
    expect(() => assertGmVoiceProse("")).not.toThrow()
  })
})
