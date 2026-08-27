import { describe, expect, test } from "bun:test"
import { buildKokoroSpeechInput, splitSentences } from "@alanwalton/voice-core/voice/speech"
import { parseProseBlocks } from "./reader-prose"
import {
  layoutSentenceSpans,
  type SentenceLayout,
  type SentenceRun,
} from "./reader-sentence-layout"

function canonicalCount(body: string): number {
  return splitSentences(buildKokoroSpeechInput(body)).length
}

function runsOf(layout: SentenceLayout, blockIndex: number): readonly SentenceRun[] {
  return layout.blocks[blockIndex]?.runs ?? []
}

function joinRuns(layout: SentenceLayout, blockIndex: number): string {
  return runsOf(layout, blockIndex)
    .map((r) => r.text)
    .join("")
}

function allRunIndices(layout: SentenceLayout): readonly number[] {
  return layout.blocks.flatMap((b) => b.runs.map((r) => r.sentenceIndex))
}

describe("layoutSentenceSpans — specific shapes", () => {
  test("two sentences in one paragraph → two contiguous runs, indices 0,1", () => {
    const body = "The cat sat. The dog ran."
    const layout = layoutSentenceSpans(body)
    expect(layout.sentenceCount).toBe(2)
    expect(layout.blocks).toHaveLength(1)
    const runs = runsOf(layout, 0)
    expect(runs.map((r) => r.sentenceIndex)).toEqual([0, 1])
    expect(joinRuns(layout, 0)).toBe(body)
    expect(runs[0]?.text.startsWith("The cat sat.")).toBe(true)
    expect(layout.firstBlockForSentence).toEqual([0, 0])
  })

  test("two paragraphs, one sentence each → indices 0 then 1 across blocks", () => {
    const body = "First one.\nSecond two."
    const layout = layoutSentenceSpans(body)
    expect(layout.sentenceCount).toBe(2)
    expect(layout.blocks).toHaveLength(2)
    expect(allRunIndices(layout)).toEqual([0, 1])
    expect(joinRuns(layout, 0)).toBe("First one.")
    expect(joinRuns(layout, 1)).toBe("Second two.")
    expect(layout.firstBlockForSentence).toEqual([0, 1])
  })

  test("emphasis interleaves within a sentence — em run carries the sentence index, kinds preserved", () => {
    const body = "A *bright* day. Night."
    const layout = layoutSentenceSpans(body)
    expect(layout.sentenceCount).toBe(2)
    const runs = runsOf(layout, 0)
    expect(joinRuns(layout, 0)).toBe("A bright day. Night.")
    const em = runs.find((r) => r.kind === "em")
    expect(em?.text).toBe("bright")
    expect(em?.sentenceIndex).toBe(0)
    expect(runs.at(-1)?.sentenceIndex).toBe(1)
  })

  test("a sentence spanning a block boundary (unterminated line) stays ONE canonical sentence", () => {
    const body = "Chapter One\nIt began."
    const layout = layoutSentenceSpans(body)
    expect(layout.sentenceCount).toBe(1)
    expect(canonicalCount(body)).toBe(1)
    expect(layout.blocks).toHaveLength(2)
    expect(allRunIndices(layout)).toEqual([0, 0])
    expect(layout.firstBlockForSentence).toEqual([0])
  })

  test("fence block emits no runs and does not desync the alignment", () => {
    const body = "Hi there.\n```\ncode();\n```\nBye now."
    const layout = layoutSentenceSpans(body)
    expect(layout.blocks).toHaveLength(3)
    expect(runsOf(layout, 1)).toEqual([])
    const byeRuns = runsOf(layout, 2)
    expect(byeRuns.length).toBeGreaterThan(0)
    expect(joinRuns(layout, 2)).toBe("Bye now.")
    expect(byeRuns.at(-1)?.sentenceIndex).toBe(layout.sentenceCount - 1)
  })

  test("scene-break block emits no runs and does not consume the alignment", () => {
    const body = "One.\n***\nTwo."
    const layout = layoutSentenceSpans(body)
    expect(layout.blocks).toHaveLength(3)
    expect(runsOf(layout, 1)).toEqual([])
    expect(joinRuns(layout, 0)).toBe("One.")
    expect(joinRuns(layout, 2)).toBe("Two.")
  })

  test("empty body → empty layout", () => {
    const layout = layoutSentenceSpans("")
    expect(layout.blocks).toEqual([])
    expect(layout.sentenceCount).toBe(0)
    expect(layout.firstBlockForSentence).toEqual([])
  })
})

describe("layoutSentenceSpans — invariants across representative bodies", () => {
  const bodies = [
    "The cat sat. The dog ran.",
    "First one.\nSecond two.",
    "A *bright* day. Night.",
    "Chapter One\nIt began.",
    "Hi there.\n```\ncode();\n```\nBye now.",
    "Alpha beta gamma. Delta epsilon zeta. Eta theta.\nSecond paragraph here. And more.",
    "No terminal punctuation here\nbut this one ends it.",
  ]

  test("blocks array parallels parseProseBlocks", () => {
    for (const body of bodies) {
      expect(layoutSentenceSpans(body).blocks).toHaveLength(parseProseBlocks(body).length)
    }
  })

  test("sentenceCount matches the canonical (marks) index space exactly", () => {
    for (const body of bodies) {
      expect(layoutSentenceSpans(body).sentenceCount).toBe(canonicalCount(body))
    }
  })

  test("every run index is within [0, sentenceCount)", () => {
    for (const body of bodies) {
      const layout = layoutSentenceSpans(body)
      for (const idx of allRunIndices(layout)) {
        expect(idx).toBeGreaterThanOrEqual(0)
        expect(idx).toBeLessThan(layout.sentenceCount)
      }
    }
  })

  test("run indices are non-decreasing in reading order (monotonic)", () => {
    for (const body of bodies) {
      const indices = allRunIndices(layoutSentenceSpans(body))
      let prev = Number.NEGATIVE_INFINITY
      for (const idx of indices) {
        expect(idx).toBeGreaterThanOrEqual(prev)
        prev = idx
      }
    }
  })

  test("firstBlockForSentence has one entry per sentence, non-decreasing", () => {
    for (const body of bodies) {
      const layout = layoutSentenceSpans(body)
      expect(layout.firstBlockForSentence).toHaveLength(layout.sentenceCount)
      let prev = Number.NEGATIVE_INFINITY
      for (const block of layout.firstBlockForSentence) {
        if (block < 0) continue
        expect(block).toBeGreaterThanOrEqual(prev)
        prev = block
      }
    }
  })

  test("non-paragraph blocks carry no runs", () => {
    for (const body of bodies) {
      const layout = layoutSentenceSpans(body)
      parseProseBlocks(body).forEach((block, i) => {
        if (block.kind !== "paragraph") {
          expect(runsOf(layout, i)).toEqual([])
        }
      })
    }
  })
})
