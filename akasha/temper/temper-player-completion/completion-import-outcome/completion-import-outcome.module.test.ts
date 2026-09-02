import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import { mergeCharacterCompletionForward } from "../completion-merge-forward/completion-merge-forward.module.code.ts"
import {
  type CompletionImportVerdict,
  classifyCompletionImport,
} from "./completion-import-outcome.module.code.ts"

function verdictFor(
  existing: CharacterCompletion | undefined,
  incoming: CharacterCompletion | undefined
): CompletionImportVerdict {
  return classifyCompletionImport(
    existing,
    incoming,
    mergeCharacterCompletionForward(existing, incoming)
  )
}

function outcomeFor(
  existing: CharacterCompletion | undefined,
  incoming: CharacterCompletion | undefined
): string {
  return verdictFor(existing, incoming).outcome
}

describe("classifyCompletionImport", () => {
  test("nothing stored yet reads as created", () => {
    expect(outcomeFor(undefined, { level: 10 })).toBe("created")
  })

  test("a reading that carries the stored one further reads as updated", () => {
    expect(outcomeFor({ level: 10 }, { level: 20 })).toBe("updated")
  })

  test("a reading identical to the stored one reads as unchanged", () => {
    expect(outcomeFor({ level: 20, quests: [1, 2, 3] }, { level: 20, quests: [1, 2, 3] })).toBe(
      "unchanged"
    )
  })

  test("a reading that reorders a quest list and adds nothing reads as unchanged", () => {
    expect(outcomeFor({ quests: [1, 2, 3] }, { quests: [3, 1, 2] })).toBe("unchanged")
  })

  test("a reading that would have dropped a whole quest list reads as preserved", () => {
    expect(outcomeFor({ level: 50, quests: [1, 2, 3] }, { level: 50 })).toBe("preserved")
  })

  test("a reading where a count that only rises falls reads as preserved", () => {
    expect(outcomeFor({ level: 50 }, { level: 3 })).toBe("preserved")
  })

  test("a reading that is a wholesale wipe reads as preserved", () => {
    expect(outcomeFor({ level: 50, quests: [1, 2, 3] }, {})).toBe("preserved")
  })

  test("a reading that both adds and drops reads as preserved rather than updated", () => {
    expect(outcomeFor({ level: 50, quests: [1, 2] }, { level: 60 })).toBe("preserved")
  })

  test("a field the fresh reading owns outright changing is no loss", () => {
    expect(outcomeFor({ gender: 1, level: 50 }, { gender: 0, level: 50 })).toBe("updated")
  })

  test("no fresh reading at all reads as unchanged rather than as a loss", () => {
    expect(outcomeFor({ level: 50 }, undefined)).toBe("unchanged")
  })
})

describe("the fields a verdict says the merge held back", () => {
  test("the verdict names the field held back rather than saying only that one was", () => {
    const verdict = verdictFor({ level: 50, quests: [1, 2, 3] }, { level: 50 })
    expect(verdict.outcome).toBe("preserved")
    expect(verdict.preservedFields).toEqual(["quests"])
  })

  test("the verdict names every field held back, sorted", () => {
    const verdict = verdictFor({ level: 50, quests: [1], bagSize: 140 }, { level: 50 })
    expect(verdict.preservedFields).toEqual(["bagSize", "quests"])
  })

  test("the verdict names no field where none was held back", () => {
    expect(verdictFor({ level: 10 }, { level: 20 }).preservedFields).toEqual([])
    expect(verdictFor({ level: 20 }, { level: 20 }).preservedFields).toEqual([])
  })
})
