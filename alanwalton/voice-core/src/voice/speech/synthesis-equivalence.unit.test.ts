import { describe, expect, test } from "bun:test"
import {
  buildKokoroSpeechInput,
  buildKokoroSpeechSegments,
  MAX_SPEECH_SEGMENTS,
  packSegments,
  splitSentences,
} from "../speech"
import { giantSingleSentence, longMultiSegmentText, pathologicalWord } from "./test-helpers"

describe("synthesis-equivalence: server-rederived segments === sent segments", () => {
  const serverRederive = (joined: string): readonly string[] =>
    packSegments(splitSentences(joined)).slice(0, MAX_SPEECH_SEGMENTS)

  const assertEquivalent = (rawText: string): undefined => {
    const sent = buildKokoroSpeechSegments(rawText)
    const rederived = serverRederive(buildKokoroSpeechInput(rawText))
    expect(rederived).toEqual([...sent])
  }

  test("short single-segment text", () => {
    assertEquivalent("First sentence. Second one! A third?")
  })

  test("markdown-laden multi-paragraph chapter text", () => {
    assertEquivalent(
      "# Chapter One\n\n**Bold** intro with a [link](https://x.test).\n\n- a bullet\n- another\n\nA closing paragraph, longer, with several clauses and a final stop."
    )
  })

  test("long multi-segment text that crosses the pack budget", () => {
    const long = longMultiSegmentText()
    assertEquivalent(long)
    expect(buildKokoroSpeechSegments(long).length).toBeGreaterThan(1)
  })

  test("a single over-budget sentence (word-boundary hard-wrap edge)", () => {
    const giant = giantSingleSentence()
    assertEquivalent(giant)
    expect(buildKokoroSpeechSegments(giant).length).toBeGreaterThan(1)
  })

  test("a single pathological word longer than the budget (char-slice edge)", () => {
    const word = pathologicalWord()
    assertEquivalent(`${word}.`)
    expect(buildKokoroSpeechSegments(`${word}.`).length).toBeGreaterThan(1)
  })

  test("empty input — both sides empty", () => {
    assertEquivalent("   \n\n  ")
    expect(buildKokoroSpeechSegments("   \n\n  ")).toEqual([])
  })

  test("speaker-marker-laden multi-paragraph input", () => {
    assertEquivalent(
      "[amy] Line one is here. Line two follows.\n\n[zadi] A second speaker's paragraph, with commas, clauses, and a stop."
    )
  })
})
