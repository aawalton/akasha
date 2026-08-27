import { describe, expect, test } from "bun:test"
import { buildLabelModification } from "./messages"

describe("buildLabelModification", () => {
  test("emits only addLabelIds when given adds alone", () => {
    expect(buildLabelModification({ addLabelIds: ["STARRED"] })).toEqual({
      addLabelIds: ["STARRED"],
    })
  })

  test("emits only removeLabelIds when given removes alone", () => {
    expect(buildLabelModification({ removeLabelIds: ["INBOX"] })).toEqual({
      removeLabelIds: ["INBOX"],
    })
  })

  test("emits both keys when given adds and removes", () => {
    expect(
      buildLabelModification({ addLabelIds: ["STARRED"], removeLabelIds: ["UNREAD"] })
    ).toEqual({ addLabelIds: ["STARRED"], removeLabelIds: ["UNREAD"] })
  })

  test("throws on a no-op mutation with no labels", () => {
    expect(() => buildLabelModification({})).toThrow("at least one of --add or --remove")
  })

  test("throws when both label lists are present but empty", () => {
    expect(() => buildLabelModification({ addLabelIds: [], removeLabelIds: [] })).toThrow(
      "at least one of --add or --remove"
    )
  })
})
