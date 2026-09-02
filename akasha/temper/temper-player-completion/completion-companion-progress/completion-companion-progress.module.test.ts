import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import { MAX_COMPANION_RAPPORT } from "../companion-rapport/companion-rapport.module.code.ts"
import {
  transformCharacterCompanionRapport,
  transformCompanionProgress,
} from "./completion-companion-progress.module.code.ts"

const DEFID_BASTIAN = 1
const DEFID_MIRRI = 2

const NUM_REAL_COMPANIONS = 8
const TOTAL = NUM_REAL_COMPANIONS * MAX_COMPANION_RAPPORT

function charWith(companionRapport: Record<number, number>): CharacterCompletion {
  return { companionRapport } satisfies CharacterCompletion
}

describe("transformCharacterCompanionRapport counts points rather than tiers", () => {
  test("the total is eight companions times the rapport ceiling", () => {
    const [progress] = transformCharacterCompanionRapport([
      { id: "char-1", completion: charWith({ [DEFID_BASTIAN]: 2009 }) },
    ])
    expect(progress?.totalCount).toBe(TOTAL)
  })

  test("a companion's rapport is the clamped raw points rather than its tier of 1 to 8", () => {
    const [progress] = transformCharacterCompanionRapport([
      {
        id: "char-1",
        completion: charWith({ [DEFID_BASTIAN]: 2009, [DEFID_MIRRI]: MAX_COMPANION_RAPPORT }),
      },
    ])
    const bastian = progress?.entries.find((e) => e.companionId === "bastian")
    const mirri = progress?.entries.find((e) => e.companionId === "mirri")
    expect(bastian?.rapport).toBe(2009)
    expect(mirri?.rapport).toBe(MAX_COMPANION_RAPPORT)
  })

  test("negative rapport becomes 0 and rapport over the ceiling becomes the ceiling", () => {
    const [progress] = transformCharacterCompanionRapport([
      { id: "char-1", completion: charWith({ [DEFID_BASTIAN]: -2500, [DEFID_MIRRI]: 99999 }) },
    ])
    const bastian = progress?.entries.find((e) => e.companionId === "bastian")
    const mirri = progress?.entries.find((e) => e.companionId === "mirri")
    expect(bastian?.rapport).toBe(0)
    expect(mirri?.rapport).toBe(MAX_COMPANION_RAPPORT)
  })

  test("the completed count is the clamped points summed across companions", () => {
    const [progress] = transformCharacterCompanionRapport([
      { id: "char-1", completion: charWith({ [DEFID_BASTIAN]: 2009, [DEFID_MIRRI]: 1000 }) },
    ])
    expect(progress?.completedCount).toBe(3009)
  })
})

describe("transformCompanionProgress reports rapport as points", () => {
  test("a companion's rapport is the highest clamped raw points any character holds", () => {
    const { companionProgress } = transformCompanionProgress(
      [],
      [
        { completion: charWith({ [DEFID_BASTIAN]: 1500 }) },
        { completion: charWith({ [DEFID_BASTIAN]: 3200 }) },
      ]
    )
    const bastian = companionProgress.find((c) => c.companionId === "bastian")
    expect(bastian?.rapport).toBe(3200)
  })
})

describe("transformCompanionProgress gives an unmeasured companion no level", () => {
  test("no level comes back when no companion row exists at all", () => {
    const { companionProgress } = transformCompanionProgress([], [])
    expect(companionProgress).toHaveLength(NUM_REAL_COMPANIONS)
    for (const entry of companionProgress) {
      expect(entry.level).toBeUndefined()
    }
  })

  test("no level comes back for a row whose completion blob was never written", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: null }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBeUndefined()
  })

  test("no level comes back for an empty completion blob", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: {} }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBeUndefined()
  })

  test("a real level comes through untouched", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: { level: 12 } }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBe(12)
  })

  test("a measured level of 0 is kept rather than treated as absent", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: { level: 0 } }],
      []
    )
    expect(companionProgress.find((c) => c.companionId === "bastian")?.level).toBe(0)
  })

  test("rapport sourced from a character is still reported for a companion with no level", () => {
    const { companionProgress } = transformCompanionProgress(
      [{ companionId: "bastian", completion: {} }],
      [{ completion: charWith({ [DEFID_BASTIAN]: 3200 }) }]
    )
    const bastian = companionProgress.find((c) => c.companionId === "bastian")
    expect(bastian?.level).toBeUndefined()
    expect(bastian?.rapport).toBe(3200)
  })
})
