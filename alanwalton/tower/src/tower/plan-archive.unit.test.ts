import { describe, expect, it } from "bun:test"
import type { Beat, ChapterEntry, TowerState } from "@alanwalton/tower-core/state-schema"
import { planArchive } from "./plan-archive"

function makeLog(count: number): readonly Beat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `b${i}`,
    turn: i,
    type: "narrative" as const,
    text: `beat ${i}`,
  }))
}

function makeChapter(
  over: Partial<ChapterEntry> & Pick<ChapterEntry, "number" | "status">
): ChapterEntry {
  return {
    title: `Chapter ${over.number}`,
    floor: over.number,
    startBeat: "b0",
    ...over,
  }
}

function makeState(chapters: readonly ChapterEntry[], logCount: number): TowerState {
  return {
    title: "The Tower",
    turn: logCount,
    hud: { level: 1, hp: 10, hpMax: 10, focus: 10, focusMax: 10, stamina: 10, stamMax: 10 },
    sheet: {
      attributes: {
        MIGHT: 10,
        FINESSE: 10,
        VITALITY: 10,
        INTELLECT: 10,
        PERCEPTION: 10,
        WILL: 10,
        PRESENCE: 10,
        LUCK: 10,
      },
    },
    log: [...makeLog(logCount)],
    chapters: [...chapters],
  }
}

describe("planArchive", () => {
  it("keeps the open chapter and the most-recent closed chapter; archives older closed", () => {
    const state = makeState(
      [
        makeChapter({ number: 1, status: "closed", startBeat: "b0", endBeat: "b2" }),
        makeChapter({ number: 2, status: "closed", startBeat: "b3", endBeat: "b5" }),
        makeChapter({ number: 3, status: "open", startBeat: "b6" }),
      ],
      10
    )
    const plans = planArchive(state, 2)
    expect(plans.map((p) => p.chapter.number)).toEqual([1])
  })

  it("never archives an open chapter even when alone", () => {
    const state = makeState([makeChapter({ number: 1, status: "open", startBeat: "b0" })], 4)
    expect(planArchive(state, 2)).toEqual([])
  })

  it("skips already-archived chapters", () => {
    const state = makeState(
      [
        makeChapter({ number: 1, status: "archived", startBeat: "b0", endBeat: "b1" }),
        makeChapter({ number: 2, status: "closed", startBeat: "b2", endBeat: "b3" }),
        makeChapter({ number: 3, status: "closed", startBeat: "b4", endBeat: "b5" }),
        makeChapter({ number: 4, status: "open", startBeat: "b6" }),
      ],
      10
    )
    expect(planArchive(state, 2).map((p) => p.chapter.number)).toEqual([2])
  })

  it("slices each archivable chapter's beats inclusively by id", () => {
    const state = makeState(
      [
        makeChapter({ number: 1, status: "closed", startBeat: "b0", endBeat: "b2" }),
        makeChapter({ number: 2, status: "closed", startBeat: "b3", endBeat: "b5" }),
        makeChapter({ number: 3, status: "open", startBeat: "b6" }),
      ],
      10
    )
    const [plan] = planArchive(state, 2)
    expect(plan?.beats.map((b) => b.id)).toEqual(["b0", "b1", "b2"])
  })

  it("with keepWindow 1 keeps only the open chapter and archives every closed one", () => {
    const state = makeState(
      [
        makeChapter({ number: 1, status: "closed", startBeat: "b0", endBeat: "b1" }),
        makeChapter({ number: 2, status: "closed", startBeat: "b2", endBeat: "b3" }),
        makeChapter({ number: 3, status: "open", startBeat: "b4" }),
      ],
      8
    )
    expect(planArchive(state, 1).map((p) => p.chapter.number)).toEqual([1, 2])
  })

  it("archives multiple older-closed chapters oldest-first", () => {
    const state = makeState(
      [
        makeChapter({ number: 1, status: "closed", startBeat: "b0", endBeat: "b1" }),
        makeChapter({ number: 2, status: "closed", startBeat: "b2", endBeat: "b3" }),
        makeChapter({ number: 3, status: "closed", startBeat: "b4", endBeat: "b5" }),
        makeChapter({ number: 4, status: "open", startBeat: "b6" }),
      ],
      10
    )
    expect(planArchive(state, 2).map((p) => p.chapter.number)).toEqual([1, 2])
  })

  it("throws when a closed chapter has no endBeat", () => {
    const state = makeState(
      [
        makeChapter({ number: 1, status: "closed", startBeat: "b0" }),
        makeChapter({ number: 2, status: "closed", startBeat: "b2", endBeat: "b3" }),
        makeChapter({ number: 3, status: "open", startBeat: "b4" }),
      ],
      8
    )
    expect(() => planArchive(state, 2)).toThrow(/endBeat/)
  })
})
