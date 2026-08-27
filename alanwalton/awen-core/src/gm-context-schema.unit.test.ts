import { describe, expect, test } from "bun:test"
import {
  GmContextSchema,
  GmReferenceSchema,
  parseGmContext,
  parseGmReference,
} from "./gm-context-schema"

describe("parseGmContext", () => {
  test("null / non-object → null (absent, caller branches without a throw)", () => {
    expect(parseGmContext(undefined)).toBeNull()
    expect(parseGmContext(null)).toBeNull()
    expect(parseGmContext("nope")).toBeNull()
    expect(parseGmContext(42)).toBeNull()
  })

  test("empty object → parsed with empty policies default, no turnContract", () => {
    const ctx = parseGmContext({})
    expect(ctx).not.toBeNull()
    expect(ctx?.policies).toEqual([])
    expect(ctx?.turnContract).toBeUndefined()
  })

  test("full shape parses: policies bands + turnContract obligations", () => {
    const ctx = parseGmContext({
      policies: [
        {
          id: "damage-gate",
          title: "Damage gate",
          description: "when to spend",
          bands: ["low", "high"],
        },
        { id: "enemy-intent", title: "Enemy intent" },
      ],
      turnContract: {
        obligations: [{ id: "publish", requirement: "emit a turn", detail: "always" }],
        notes: "ordered",
      },
    })
    expect(ctx?.policies).toHaveLength(2)
    expect(ctx?.policies[0]?.bands).toEqual(["low", "high"])
    expect(ctx?.policies[1]?.bands).toEqual([])
    expect(ctx?.turnContract?.obligations[0]?.requirement).toBe("emit a turn")
  })

  test("strict spine (#14466): an unknown TOP-LEVEL key fails loud naming the key", () => {
    expect(() => GmContextSchema.parse({ policies: [], tone: "grim" })).toThrow(/tone/)
  })

  test("the modeled `role` axis (live on partners) parses", () => {
    const ctx = parseGmContext({ policies: [], role: "the impartial arbiter of the table" })
    expect(ctx?.role).toBe("the impartial arbiter of the table")
  })

  test("the modeled `doctrineVersion` axis (#14528) parses; absent on pre-pack games", () => {
    const ctx = parseGmContext({ policies: [], doctrineVersion: 3 })
    expect(ctx?.doctrineVersion).toBe(3)
    const bare = parseGmContext({ policies: [] })
    expect(bare?.doctrineVersion).toBeUndefined()
  })

  test("doctrineVersion rejects a negative / non-integer value (loud, not silent)", () => {
    expect(() => GmContextSchema.parse({ policies: [], doctrineVersion: -1 })).toThrow()
    expect(() => GmContextSchema.parse({ policies: [], doctrineVersion: 1.5 })).toThrow()
  })

  test("Mari wrapper-fragment regression (#14466): { gmContext: {...} } is refused naming the key", () => {
    expect(() =>
      parseGmContext({ gmContext: { policies: [{ id: "p", title: "buried" }] } })
    ).toThrow(/gmContext/)
  })

  test("strict inner: an unknown key inside a policy fails loud", () => {
    expect(() => parseGmContext({ policies: [{ id: "x", title: "X", weight: 3 }] })).toThrow()
  })

  test("strict inner: an unknown key inside turnContract fails loud", () => {
    expect(() => parseGmContext({ turnContract: { obligations: [], cadence: "fast" } })).toThrow()
  })

  test("the modeled `systemVoice` axis (#14588) parses `declared`; absent → undefined (mute)", () => {
    const declared = parseGmContext({ policies: [], systemVoice: "declared" })
    expect(declared?.systemVoice).toBe("declared")
    const mute = parseGmContext({ policies: [], systemVoice: "mute" })
    expect(mute?.systemVoice).toBe("mute")
    const bare = parseGmContext({ policies: [] })
    expect(bare?.systemVoice).toBeUndefined()
  })

  test("systemVoice rejects an out-of-enum value (loud, not silent)", () => {
    expect(() => GmContextSchema.parse({ policies: [], systemVoice: "personified" })).toThrow()
  })
})

describe("parseGmReference", () => {
  test("null / non-object → null", () => {
    expect(parseGmReference(undefined)).toBeNull()
    expect(parseGmReference(null)).toBeNull()
    expect(parseGmReference("nope")).toBeNull()
  })

  test("sections-less object → fails loud (silent-empty killed)", () => {
    expect(() => parseGmReference({})).toThrow()
    expect(() => parseGmReference({ world: "Aetheria" })).toThrow()
  })

  test("canonical empty reference { sections: [] } → accepted", () => {
    const ref = parseGmReference({ sections: [] })
    expect(ref).not.toBeNull()
    expect(ref?.sections).toEqual([])
  })

  test("sections parse verbatim", () => {
    const ref = parseGmReference({
      sections: [
        { id: "world", title: "The World", body: "Long prose here." },
        { id: "lore", title: "Lore", body: "More prose." },
      ],
    })
    expect(ref?.sections).toHaveLength(2)
    expect(ref?.sections[0]?.title).toBe("The World")
  })

  test("strict spine (#14466): an unknown top-level key fails loud naming the key", () => {
    expect(() => GmReferenceSchema.parse({ sections: [], version: 2 })).toThrow(/version/)
  })

  test("strict inner: an unknown key inside a section fails loud", () => {
    expect(() =>
      parseGmReference({ sections: [{ id: "x", title: "X", body: "b", extra: 1 }] })
    ).toThrow()
  })

  test("strict inner: a section missing a required key fails loud", () => {
    expect(() => parseGmReference({ sections: [{ id: "x", title: "X" }] })).toThrow()
  })
})
