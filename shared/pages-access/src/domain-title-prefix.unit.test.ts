import { describe, expect, test } from "bun:test"
import { TEMPER_UNPREFIXED_SLUGS, validateTemperTitlePrefix } from "./domain-title-prefix"

describe("validateTemperTitlePrefix", () => {
  test("rejects a temper-* slug whose title lacks the 'Temper ' prefix", () => {
    expect(() => validateTemperTitlePrefix("temper-curse", "Curse")).toThrow(
      "page type 'temper-curse'"
    )
    expect(() => validateTemperTitlePrefix("temper-skill", "Skill")).toThrow("Temper ")
  })

  test("accepts a temper-* slug whose title already carries the prefix", () => {
    expect(() => validateTemperTitlePrefix("temper-curse", "Temper Curse")).not.toThrow()
    expect(() =>
      validateTemperTitlePrefix("temper-companion-skill", "Temper Companion Skill")
    ).not.toThrow()
  })

  test("rejects an un-prefixed-slug exception (character/companion) with a bare title", () => {
    for (const slug of TEMPER_UNPREFIXED_SLUGS) {
      expect(() => validateTemperTitlePrefix(slug, "Character")).toThrow(`page type '${slug}'`)
    }
  })

  test("accepts the exception slugs when the title carries the prefix", () => {
    expect(() =>
      validateTemperTitlePrefix("character-build", "Temper Character Build")
    ).not.toThrow()
    expect(() =>
      validateTemperTitlePrefix("companion-build", "Temper Companion Build")
    ).not.toThrow()
  })

  test("ignores page types of other domains", () => {
    expect(() =>
      validateTemperTitlePrefix("monarch-transaction", "Monarch Transaction")
    ).not.toThrow()
    expect(() => validateTemperTitlePrefix("ctw-team", "CTW Team")).not.toThrow()
    expect(() => validateTemperTitlePrefix("song", "Song")).not.toThrow()
  })

  test("does not enforce 'Temper ' on a non-temper slug even with a bare title", () => {
    expect(() => validateTemperTitlePrefix("song", "Song")).not.toThrow()
  })

  test("only enforces when both slug and title are strings", () => {
    expect(() => validateTemperTitlePrefix(undefined, "Curse")).not.toThrow()
    expect(() => validateTemperTitlePrefix("temper-curse", undefined)).not.toThrow()
    expect(() => validateTemperTitlePrefix("temper-curse", null)).not.toThrow()
    expect(() => validateTemperTitlePrefix("temper-curse", 42)).not.toThrow()
    expect(() => validateTemperTitlePrefix(123, "Curse")).not.toThrow()
  })

  test("requires the trailing space — bare 'Temper' is not a valid prefix", () => {
    expect(() => validateTemperTitlePrefix("temper-curse", "Temper")).toThrow()
    expect(() => validateTemperTitlePrefix("temper-curse", "Tempered Curse")).toThrow()
  })

  test("error message names the offending slug and the required prefix", () => {
    try {
      validateTemperTitlePrefix("temper-zone", "Zone")
      throw new Error("expected throw")
    } catch (err) {
      if (!(err instanceof Error)) throw err
      expect(err.message).toContain("temper-zone")
      expect(err.message).toContain("Temper ")
    }
  })
})
