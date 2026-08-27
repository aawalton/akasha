import { describe, expect, test } from "bun:test"
import { actionIntentSchema } from "../idle-actions"

describe("idle-actions — boundary schema", () => {
  test("parses each valid intent shape", () => {
    expect(actionIntentSchema.parse({ type: "train", slug: "abby" })).toEqual({
      type: "train",
      slug: "abby",
    })
    expect(actionIntentSchema.parse({ type: "train10", slug: "abby" })).toEqual({
      type: "train10",
      slug: "abby",
    })
    expect(actionIntentSchema.parse({ type: "trainMax", slug: "abby" })).toEqual({
      type: "trainMax",
      slug: "abby",
    })
    expect(actionIntentSchema.parse({ type: "selectImage", slug: "abby", image: "img-1" })).toEqual(
      { type: "selectImage", slug: "abby", image: "img-1" }
    )
    expect(actionIntentSchema.parse({ type: "team", members: ["aura", "abby"] })).toEqual({
      type: "team",
      members: ["aura", "abby"],
    })
    expect(actionIntentSchema.parse({ type: "apotheosis" })).toEqual({ type: "apotheosis" })
  })

  test("rejects an unknown action type, a removed action, and missing fields", () => {
    expect(() => actionIntentSchema.parse({ type: "nope" })).toThrow()
    expect(() => actionIntentSchema.parse({ type: "acquire", slug: "abby" })).toThrow()
    expect(() => actionIntentSchema.parse({ type: "train" })).toThrow()
    expect(() => actionIntentSchema.parse({ type: "selectImage", slug: "abby" })).toThrow()
  })
})
