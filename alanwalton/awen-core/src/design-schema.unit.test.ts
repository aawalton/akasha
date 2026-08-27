import { describe, expect, it } from "bun:test"
import {
  DesignContentSchema,
  DesignEntryInputSchema,
  decideDesignCompleteness,
  designKindOf,
} from "./design-schema"

describe("DesignContentSchema", () => {
  it("accepts each discriminated variant", () => {
    expect(
      DesignContentSchema.parse({
        kind: "companion-design",
        talent: "Guardian",
        activation: "interpose for an ally taking a hit meant for the player",
      }).kind
    ).toBe("companion-design")
    const floor = DesignContentSchema.parse({
      kind: "floor-design",
      challenge: "read the core to end it fast",
      enemies: [{ name: "Ashling", readableTrait: "the core is the kill" }],
      items: [{ name: "rusted iron bar", effect: "+4 Atk" }],
    })
    expect(floor.kind).toBe("floor-design")
    if (floor.kind === "floor-design") expect(floor.items.length).toBe(1)
    expect(
      DesignContentSchema.parse({
        kind: "world-logic",
        rule: "the tower seals a floor until cleared",
      }).kind
    ).toBe("world-logic")
  })

  it("rejects an unknown key (strict spine)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "companion-design",
        talent: "t",
        activation: "a",
        extra: 1,
      })
    ).toThrow()
  })

  it("rejects a companion-design missing its activation condition (the Aria-gap class)", () => {
    expect(() => DesignContentSchema.parse({ kind: "companion-design", talent: "Lucky" })).toThrow()
  })

  it("rejects an unknown enemy/item key (strict inner shape)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "floor-design",
        challenge: "c",
        enemies: [{ name: "x", hp: 100 }],
        items: [],
      })
    ).toThrow()
  })

  it("tolerates a floor with no challengeOwner (expand-contract — the field is optional at parse)", () => {
    const parsed = DesignContentSchema.parse({
      kind: "floor-design",
      challenge: "c",
      enemies: [{ name: "e" }],
      items: [{ name: "i" }],
    })
    expect(parsed.kind).toBe("floor-design")
  })

  it("accepts a character-owned floor without a clue set", () => {
    const parsed = DesignContentSchema.parse({
      kind: "floor-design",
      challenge: "c",
      challengeOwner: "character",
      enemies: [{ name: "e" }],
      items: [{ name: "i" }],
    })
    expect(parsed.kind === "floor-design" && parsed.challengeOwner).toBe("character")
  })

  it("accepts a player-owned floor with a non-empty clue set of {component, dealSite}", () => {
    const parsed = DesignContentSchema.parse({
      kind: "floor-design",
      challenge: "c",
      challengeOwner: "player",
      clues: [{ component: "it IS the wall", dealSite: "perceivable on entry" }],
      enemies: [{ name: "e" }],
      items: [{ name: "i" }],
    })
    expect(parsed.kind === "floor-design" && parsed.clues?.length).toBe(1)
  })

  it("rejects a player-owned floor with NO clue set (the conditional requirement)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "floor-design",
        challenge: "c",
        challengeOwner: "player",
        enemies: [{ name: "e" }],
        items: [{ name: "i" }],
      })
    ).toThrow()
  })

  it("rejects a player-owned floor with an EMPTY clue set (the conditional requirement)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "floor-design",
        challenge: "c",
        challengeOwner: "player",
        clues: [],
        enemies: [{ name: "e" }],
        items: [{ name: "i" }],
      })
    ).toThrow()
  })

  it("rejects an unknown challengeOwner value (enum strictness)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "floor-design",
        challenge: "c",
        challengeOwner: "narrator",
        enemies: [{ name: "e" }],
        items: [{ name: "i" }],
      })
    ).toThrow()
  })

  it("rejects an unknown clue key (strict clue shape)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "floor-design",
        challenge: "c",
        challengeOwner: "player",
        clues: [{ component: "x", dealSite: "y", hint: "z" }],
        enemies: [{ name: "e" }],
        items: [{ name: "i" }],
      })
    ).toThrow()
  })

  it("rejects a clue missing its dealSite (both fields required)", () => {
    expect(() =>
      DesignContentSchema.parse({
        kind: "floor-design",
        challenge: "c",
        challengeOwner: "player",
        clues: [{ component: "x" }],
        enemies: [{ name: "e" }],
        items: [{ name: "i" }],
      })
    ).toThrow()
  })
})

describe("designKindOf", () => {
  it("derives the stored designKind from the content discriminant", () => {
    expect(designKindOf({ kind: "world-logic", rule: "r" })).toBe("world-logic")
    expect(designKindOf({ kind: "floor-design", challenge: "c", enemies: [], items: [] })).toBe(
      "floor-design"
    )
  })
})

describe("DesignEntryInputSchema", () => {
  const base = {
    externalId: "hh--floor-design--floor-1--0",
    subjectKey: "floor-1",
    content: {
      kind: "floor-design",
      challenge: "read the core",
      enemies: [{ name: "Ashling" }],
      items: [{ name: "iron bar" }],
    },
  }

  it("parses a valid entry (no citation — designed truth is uncited)", () => {
    const parsed = DesignEntryInputSchema.parse(base)
    expect(parsed.subjectKey).toBe("floor-1")
    expect(parsed.content.kind).toBe("floor-design")
  })

  it("carries an optional supersedes + sourceRef (published-canon-wins provenance)", () => {
    const parsed = DesignEntryInputSchema.parse({
      ...base,
      supersedes: "hh--floor-design--floor-1--prior",
      sourceRef: "harem-hotel-t9",
    })
    expect(parsed.supersedes).toBe("hh--floor-design--floor-1--prior")
    expect(parsed.sourceRef).toBe("harem-hotel-t9")
  })

  it("rejects an empty subjectKey", () => {
    expect(() => DesignEntryInputSchema.parse({ ...base, subjectKey: "" })).toThrow()
  })
})

describe("decideDesignCompleteness", () => {
  it("passes a fully-concretized companion (talent + activation)", () => {
    expect(
      decideDesignCompleteness({
        kind: "companion-design",
        talent: "Guardian",
        activation: "interpose for an ally",
      }).ok
    ).toBe(true)
  })

  it("fails a companion whose activation is whitespace-only (the Aria-gap class)", () => {
    const r = decideDesignCompleteness({
      kind: "companion-design",
      talent: "Momentum",
      activation: "   ",
    })
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("activation")
  })

  it("passes a character-owned floor with challenge + ≥1 enemy + ≥1 item (no clues needed)", () => {
    expect(
      decideDesignCompleteness({
        kind: "floor-design",
        challenge: "read the core",
        challengeOwner: "character",
        enemies: [{ name: "Ashling" }],
        items: [{ name: "iron bar" }],
      }).ok
    ).toBe(true)
  })

  it("passes a player-owned floor with challenge + owner + clues + enemy + item", () => {
    expect(
      decideDesignCompleteness({
        kind: "floor-design",
        challenge: "solve the Doorward",
        challengeOwner: "player",
        clues: [{ component: "it IS the wall", dealSite: "perceivable on entry" }],
        enemies: [{ name: "Doorward" }],
        items: [{ name: "Letter-Knife" }],
      }).ok
    ).toBe(true)
  })

  it("fails a floor missing challengeOwner (v28 challenge-ownership gap)", () => {
    const r = decideDesignCompleteness({
      kind: "floor-design",
      challenge: "read the core",
      enemies: [{ name: "Ashling" }],
      items: [{ name: "iron bar" }],
    })
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("challengeOwner")
  })

  it("fails a player-owned floor whose clue set is empty (fair-play gap)", () => {
    const r = decideDesignCompleteness({
      kind: "floor-design",
      challenge: "c",
      challengeOwner: "player",
      clues: [],
      enemies: [{ name: "e" }],
      items: [{ name: "i" }],
    })
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("clue set")
  })

  it("fails a floor with an empty enemy roster", () => {
    const r = decideDesignCompleteness({
      kind: "floor-design",
      challenge: "c",
      challengeOwner: "character",
      enemies: [],
      items: [{ name: "i" }],
    })
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("enemy roster")
  })

  it("fails a floor with no item inventory (Alan's 'down to floor items')", () => {
    const r = decideDesignCompleteness({
      kind: "floor-design",
      challenge: "c",
      challengeOwner: "character",
      enemies: [{ name: "e" }],
      items: [],
    })
    expect(r.ok).toBe(false)
    expect(r.reason).toContain("item inventory")
  })

  it("fails a world-logic with a blank rule", () => {
    expect(decideDesignCompleteness({ kind: "world-logic", rule: "  " }).ok).toBe(false)
  })
})
