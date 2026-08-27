import { describe, expect, test } from "bun:test"
import { z } from "zod"
import scratchState from "./__fixtures__/scratch-state.json"
import { type IdleSave, idleSaveSchema, parseIdleSave, toJsonSave } from "./idle-save"

describe("idle-save codec — lossless round-trip", () => {
  test("parseIdleSave retains every field of the real scratch save", () => {
    const parsed = parseIdleSave(scratchState)
    expect(parsed).toEqual(scratchState)
  })

  test("parsed save survives a jsonb encode/decode round-trip unchanged", () => {
    const parsed = parseIdleSave(scratchState)
    const roundTripped = parseIdleSave(JSON.parse(JSON.stringify(parsed)))
    expect(roundTripped).toEqual(scratchState)
  })

  test("retains all 50 top-level fields and the full 6-member roster", () => {
    const parsed = parseIdleSave(scratchState)
    expect(Object.keys(parsed).sort()).toEqual(Object.keys(scratchState).sort())
    expect(parsed.teammates).toHaveLength(6)
    expect(parsed.bloom).toEqual(scratchState.bloom)
  })

  test("rejects a value that is not a save", () => {
    expect(() => parseIdleSave({ nope: true })).toThrow()
  })

  test("schema preserves unknown future fields (loose)", () => {
    const withFuture = { ...scratchState, someFutureSliceField: 42 }
    const parsed = idleSaveSchema.parse(withFuture)
    expect(parsed.someFutureSliceField).toBe(42)
  })
})

describe("toJsonSave — jsonb-safe narrowing", () => {
  const saveWithUndefinedAffinity: IdleSave = {
    resource: 999.9,
    lastTickAt: 2000,
    teammates: [
      {
        slug: "a",
        name: "A",
        color: "#fff",
        portrait: "p",
        flavor: "f",
        owned: true,
        cost: 1,
        rate: 2,
        rank: 0,
        level: null,
        stage: "s",
        affinity: undefined,
      },
    ],
  }

  test("a direct z.json() parse throws on the explicit undefined key (why the naive narrowing failed)", () => {
    expect(() => z.json().parse(saveWithUndefinedAffinity)).toThrow()
  })

  test("toJsonSave yields valid JSON with the undefined key dropped", () => {
    const json = toJsonSave(saveWithUndefinedAffinity)
    expect(JSON.stringify(json)).not.toContain("affinity")
    expect(parseIdleSave(json)).toEqual(parseIdleSave(saveWithUndefinedAffinity))
  })

  test("toJsonSave round-trips the full scratch save unchanged", () => {
    expect(parseIdleSave(toJsonSave(parseIdleSave(scratchState)))).toEqual(scratchState)
  })
})
