import { describe, expect, it } from "bun:test"
import {
  ANSWERED_OPTION_INDEX_KEY,
  DISMISSED_QUESTION_STATUS,
  OPEN_QUESTION_STATUS,
  openQuestionsWhere,
  QUESTION_PAGE_TYPE_SLUG,
  selectTappedOptionIndex,
} from "./index"

describe("open-questions predicate (single-source drift guard)", () => {
  it("QUESTION_PAGE_TYPE_SLUG is the #15057 question page-type slug", () => {
    expect(QUESTION_PAGE_TYPE_SLUG).toBe("question")
  })

  it("OPEN_QUESTION_STATUS is the unanswered status value", () => {
    expect(OPEN_QUESTION_STATUS).toBe("open")
  })

  it("openQuestionsWhere() lowers to a single status=open equality", () => {
    expect(openQuestionsWhere()).toEqual([{ key: "status", eq: "open" }])
  })

  it("openQuestionsWhere() is authored from the shared open-status constant", () => {
    const where = openQuestionsWhere()
    expect(where).toHaveLength(1)
    expect(where[0]).toMatchObject({ key: "status", eq: OPEN_QUESTION_STATUS })
  })

  it("DISMISSED_QUESTION_STATUS is the resolved-without-answer value, distinct from open", () => {
    expect(DISMISSED_QUESTION_STATUS).toBe("dismissed")
    expect(DISMISSED_QUESTION_STATUS).not.toBe(OPEN_QUESTION_STATUS)
  })

  it("openQuestionsWhere() excludes dismissed by construction (positive eq, no negation)", () => {
    const [term] = openQuestionsWhere()
    expect(term).toEqual({ key: "status", eq: OPEN_QUESTION_STATUS })
    expect(term).not.toEqual({ key: "status", eq: DISMISSED_QUESTION_STATUS })
    expect(term).not.toHaveProperty("neq")
    expect(term).not.toHaveProperty("notIn")
  })
})

describe("selectTappedOptionIndex (tapped-vs-typed verification)", () => {
  const OPTIONS = ["Yes", "No, I was doing something else"]

  it("ANSWERED_OPTION_INDEX_KEY is the declared row property key", () => {
    expect(ANSWERED_OPTION_INDEX_KEY).toBe("answeredOptionIndex")
  })

  it("verifies a tap whose index addresses matching option text", () => {
    expect(selectTappedOptionIndex({ options: OPTIONS, claimedIndex: 0, content: "Yes" })).toBe(0)
    expect(
      selectTappedOptionIndex({
        options: OPTIONS,
        claimedIndex: 1,
        content: "No, I was doing something else",
      })
    ).toBe(1)
  })

  it("declines when no index is claimed — a free-text answer is never a tap", () => {
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: undefined, content: "Yes" })
    ).toBeNull()
  })

  it("declines free text identical to an option's text", () => {
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: undefined, content: "Yes" })
    ).toBeNull()
  })

  it("declines an index that addresses a DIFFERENT option than the content", () => {
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: 1, content: "Yes" })
    ).toBeNull()
  })

  it("declines an out-of-range index", () => {
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: 2, content: "Yes" })
    ).toBeNull()
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: -1, content: "Yes" })
    ).toBeNull()
  })

  it("declines a non-integer index", () => {
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: 0.5, content: "Yes" })
    ).toBeNull()
    expect(
      selectTappedOptionIndex({ options: OPTIONS, claimedIndex: Number.NaN, content: "Yes" })
    ).toBeNull()
  })

  it("declines every index when the row carries no options", () => {
    expect(selectTappedOptionIndex({ options: [], claimedIndex: 0, content: "Yes" })).toBeNull()
  })

  it("compares trimmed on both sides", () => {
    expect(selectTappedOptionIndex({ options: ["  Yes  "], claimedIndex: 0, content: "Yes" })).toBe(
      0
    )
  })
})
