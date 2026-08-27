import { describe, expect, test } from "bun:test"
import type { GameState, Teammate } from "./core/types"
import { IDLE_LOCK_STATE_LOCKED, IDLE_LOCK_STATE_UNLOCKED } from "./idle-card-page-type"
import {
  buildLockInputs,
  cardFileValues,
  cardPageName,
  deriveCardProjections,
  type IdleCardProjection,
  type LockInputs,
  lockFlagsFor,
  type PersonaInfo,
  projectedCoverUrl,
} from "./idle-card-projection"
import type { GirlCardVM } from "./roster-view"

function vm(over: Partial<GirlCardVM> & { slug: string; name: string }): GirlCardVM {
  return {
    color: "var(--pink)",
    locked: false,
    portrait: "portraits/x.png",
    frontImageId: null,
    images: [],
    pool: [],
    stars: 0,
    dupeProgress: 0,
    nextThreshold: null,
    imageCount: 0,
    level: null,
    stage: "",
    rank: 0,
    baseRate: 0,
    trainCost: 0,
    train10Cost: 0,
    ...over,
  }
}

const USER = "user-1"

function onlyProjection(projections: readonly IdleCardProjection[]): IdleCardProjection {
  const [first] = projections
  if (first === undefined) {
    throw new Error("deriveCardProjections answered no projection for a single card")
  }
  return first
}
const personas = (entries: Record<string, PersonaInfo>): ReadonlyMap<string, PersonaInfo> =>
  new Map(Object.entries(entries))

describe("projectedCoverUrl", () => {
  test("unlocked: prefers the featured reward image", () => {
    expect(
      projectedCoverUrl(vm({ slug: "a", name: "A", frontImageId: "img-7" }), "/persona-cover")
    ).toBe("/api/image/img-7")
  })

  test("unlocked: defaults to the persona cover when none featured", () => {
    expect(projectedCoverUrl(vm({ slug: "a", name: "A" }), "/persona-cover")).toBe("/persona-cover")
  })

  test("unlocked: falls back to the portrait when no featured AND no persona cover", () => {
    expect(
      projectedCoverUrl(vm({ slug: "a", name: "A", portrait: "portraits/a.png" }), undefined)
    ).toBe("/portraits/a.png")
  })

  test("locked: stores NO art at all (empty cover), even if a featured image exists (#14184)", () => {
    expect(
      projectedCoverUrl(
        vm({
          slug: "a",
          name: "A",
          locked: true,
          frontImageId: "img-7",
          portrait: "portraits/a.png",
        }),
        "/persona-cover"
      )
    ).toBe("")
  })
})

describe("deriveCardProjections", () => {
  test("unlocked: stores NO name attribute, sets the persona relation + owner + fields", () => {
    const [proj] = deriveCardProjections(
      [vm({ slug: "aura", name: "Aura", stars: 3, baseRate: 12, rank: 5, images: ["a", "b"] })],
      personas({ aura: { id: "persona-aura", cover: "/cover-aura" } }),
      USER
    )
    expect(proj?.cardSlug).toBe("aura")
    expect(proj?.attributes).toEqual({
      playerId: USER,
      cardSlug: "aura",
      personaSlug: "aura",
      cover: "/cover-aura",
      coverImageId: null,
      stars: 3,
      ratePerSec: 12,
      rank: 5,
      lockState: IDLE_LOCK_STATE_UNLOCKED,
      images: ["a", "b"],
      seatIndex: null,
      lockEligible: false,
      specializeLocked: false,
      trainCost: 0,
    })
    expect(Object.values(proj?.attributes ?? {})).not.toContain("Aura")
    expect(proj?.titleWrite).toBe("Aura")
  })

  test("locked: masks the heading, drops the relation, masks the cover", () => {
    const [proj] = deriveCardProjections(
      [vm({ slug: "mystery", name: "Mystery", locked: true, portrait: "portraits/m.png" })],
      personas({ mystery: { id: "persona-mystery", cover: "/cover-m" } }),
      USER
    )
    expect(proj?.titleWrite).toBe("???")
    expect(proj?.attributes).not.toHaveProperty("title")
    expect(proj?.attributes.personaSlug).toBeNull()
    expect(proj?.attributes.coverImageId).toBeNull()
    expect(proj?.attributes.cover).toBe("")
    expect(proj?.attributes.lockState).toBe(IDLE_LOCK_STATE_LOCKED)
  })

  describe("write-once titleWrite", () => {
    const auraVm = vm({ slug: "aura", name: "Aura" })
    const personaMap = personas({ aura: { id: "persona-aura", cover: "/cover-aura" } })
    const prior = (title: string | null): ReadonlyMap<string, string | null> =>
      new Map([["aura", title]])

    test("new card (no prior row) → stamps the desired heading", () => {
      const [proj] = deriveCardProjections([auraVm], personaMap, USER, new Map())
      expect(proj?.titleWrite).toBe("Aura")
    })

    test("steady state (stored === desired) → omits (undefined) so the heading is preserved", () => {
      const [proj] = deriveCardProjections([auraVm], personaMap, USER, prior("Aura"))
      expect(proj?.titleWrite).toBeUndefined()
    })

    test("unlock transition (stored '???') → stamps the persona name", () => {
      const [proj] = deriveCardProjections([auraVm], personaMap, USER, prior("???"))
      expect(proj?.titleWrite).toBe("Aura")
    })

    test("repairs a drifted/blank stored heading on an unlocked card", () => {
      const [proj] = deriveCardProjections([auraVm], personaMap, USER, prior(""))
      expect(proj?.titleWrite).toBe("Aura")
    })

    test("locked card already masked (stored '???') → omits (no churn)", () => {
      const lockedVm = vm({ slug: "aura", name: "Aura", locked: true })
      const [proj] = deriveCardProjections([lockedVm], personaMap, USER, prior("???"))
      expect(proj?.titleWrite).toBeUndefined()
    })
  })

  test("unlocked but persona missing from the map: relation null, cover falls back", () => {
    const [proj] = deriveCardProjections(
      [vm({ slug: "ghost", name: "Ghost", portrait: "portraits/g.png" })],
      personas({}),
      USER
    )
    expect(proj?.attributes.personaSlug).toBeNull()
    expect(proj?.attributes.cover).toBe("/portraits/g.png")
  })

  test("preserves roster order and keys each by slug", () => {
    const projs = deriveCardProjections(
      [vm({ slug: "abby", name: "Abby" }), vm({ slug: "amy", name: "Amy" })],
      personas({}),
      USER
    )
    expect(projs.map((p) => p.cardSlug)).toEqual(["abby", "amy"])
  })

  test("never projects a relationship level/stage attribute (SACRED)", () => {
    const [proj] = deriveCardProjections(
      [vm({ slug: "abby", name: "Abby", level: 9, stage: "Bonded" })],
      personas({}),
      USER
    )
    expect(proj?.attributes).not.toHaveProperty("level")
    expect(proj?.attributes).not.toHaveProperty("stage")
  })

  const DECLARED_FILE_KEYS = [
    "player-id",
    "card-slug",
    "persona-slug",
    "cover",
    "cover-image-id",
    "stars",
    "rate-per-sec",
    "rank",
    "train-cost",
    "lock-state",
    "images",
    "seat-index",
    "lock-eligible",
    "specialize-locked",
  ] as const

  test("fills every property the card's files declare, in the kebab they state", () => {
    const proj = onlyProjection(
      deriveCardProjections(
        [vm({ slug: "aura", name: "Aura" })],
        personas({ aura: { id: "persona-aura", cover: "/cover-aura" } }),
        USER
      )
    )
    const keys = new Set(Object.keys(cardFileValues(proj)))
    for (const key of DECLARED_FILE_KEYS) expect(keys.has(key)).toBe(true)
    for (const key of keys) expect(key).not.toMatch(/[A-Z]/)
  })

  test("a locked card's file states no persona and no art to clear both", () => {
    const proj = onlyProjection(
      deriveCardProjections(
        [vm({ slug: "mystery", name: "Mystery", locked: true, frontImageId: "img-7" })],
        personas({ mystery: { id: "persona-mystery", cover: "/cover-m" } }),
        USER
      )
    )
    const values = cardFileValues(proj)
    expect(values["persona-slug"]).toEqual([])
    expect(values["cover-image-id"]).toEqual([])
    expect(values.cover).toBe("")
    expect(values.title).toBe("???")
  })

  test("a benched card clears its seat rather than stating a number", () => {
    const proj = onlyProjection(
      deriveCardProjections([vm({ slug: "aura", name: "Aura" })], personas({}), USER)
    )
    expect(cardFileValues(proj)["seat-index"]).toEqual([])
  })

  test("an unchanged heading is left out, so a steady save rewrites no title", () => {
    const proj = onlyProjection(
      deriveCardProjections(
        [vm({ slug: "aura", name: "Aura" })],
        personas({}),
        USER,
        new Map([["aura", "Aura"]])
      )
    )
    expect(cardFileValues(proj)).not.toHaveProperty("title")
  })

  test("mirrors the VM's authoritative trainCost onto the row", () => {
    const [proj] = deriveCardProjections(
      [vm({ slug: "aura", name: "Aura", trainCost: 4242 })],
      personas({ aura: { id: "persona-aura", cover: "/cover-aura" } }),
      USER
    )
    expect(proj?.attributes.trainCost).toBe(4242)
  })

  describe("seatIndex (active-team seat order)", () => {
    test("seated persona → its 0-based index in activeTeam; benched → null", () => {
      const projs = deriveCardProjections(
        [
          vm({ slug: "abby", name: "Abby" }),
          vm({ slug: "amy", name: "Amy" }),
          vm({ slug: "aura", name: "Aura" }),
        ],
        personas({}),
        USER,
        new Map(),
        ["amy", "abby"]
      )
      const bySlug = new Map(projs.map((p) => [p.cardSlug, p.attributes.seatIndex]))
      expect(bySlug.get("amy")).toBe(0)
      expect(bySlug.get("abby")).toBe(1)
      expect(bySlug.get("aura")).toBeNull()
    })

    test("empty/absent activeTeam → every card benched (null)", () => {
      const [proj] = deriveCardProjections([vm({ slug: "aura", name: "Aura" })], personas({}), USER)
      expect(proj?.attributes.seatIndex).toBeNull()
    })

    test("a card whose slug is absent from activeTeam → null (e.g. a locked card)", () => {
      const [proj] = deriveCardProjections(
        [vm({ slug: "mystery", name: "Mystery", locked: true })],
        personas({}),
        USER,
        new Map(),
        ["aura"]
      )
      expect(proj?.attributes.seatIndex).toBeNull()
    })
  })
})

describe("lockFlagsFor", () => {
  const li = (over: Partial<LockInputs> & { bySlug: LockInputs["bySlug"] }): LockInputs => ({
    specializeUnlocked: true,
    affinityUnlocked: true,
    ...over,
  })
  const one = (slug: string, e: { affinity?: string; locked: boolean }): LockInputs["bySlug"] =>
    new Map([[slug, e]])
  const card = (rank: number): GirlCardVM => vm({ slug: "aura", name: "A", rank })

  test("absent lockInputs → both flags false", () => {
    expect(lockFlagsFor(card(99), 0, undefined)).toEqual({
      lockEligible: false,
      specializeLocked: false,
    })
  })

  test("specialize latch OFF → both false even when seat-fit + mastered", () => {
    expect(
      lockFlagsFor(
        card(50),
        0,
        li({ specializeUnlocked: false, bySlug: one("aura", { affinity: "lead", locked: false }) })
      )
    ).toEqual({ lockEligible: false, specializeLocked: false })
  })

  test("seat-fit + mastered (rank ≥ 30) + not locked → eligible, not yet locked", () => {
    expect(
      lockFlagsFor(card(30), 0, li({ bySlug: one("aura", { affinity: "lead", locked: false }) }))
    ).toEqual({ lockEligible: true, specializeLocked: false })
  })

  test("already specialize-locked → both true (eligible to release), regardless of rank", () => {
    expect(
      lockFlagsFor(card(1), 0, li({ bySlug: one("aura", { affinity: "lead", locked: true }) }))
    ).toEqual({ lockEligible: true, specializeLocked: true })
  })

  test("seat-fit but below mastery rank + not locked → not eligible", () => {
    expect(
      lockFlagsFor(card(29), 0, li({ bySlug: one("aura", { affinity: "lead", locked: false }) }))
    ).toEqual({ lockEligible: false, specializeLocked: false })
  })

  test("mastered but in the WRONG seat (affinity mismatch) → not eligible", () => {
    expect(
      lockFlagsFor(card(50), 1, li({ bySlug: one("aura", { affinity: "lead", locked: false }) }))
    ).toEqual({ lockEligible: false, specializeLocked: false })
  })

  test("affinity latch OFF → no fit → not eligible", () => {
    expect(
      lockFlagsFor(
        card(50),
        0,
        li({ affinityUnlocked: false, bySlug: one("aura", { affinity: "lead", locked: false }) })
      )
    ).toEqual({ lockEligible: false, specializeLocked: false })
  })

  test("benched (seatIdx null) but already locked → still eligible to release", () => {
    expect(
      lockFlagsFor(card(50), null, li({ bySlug: one("aura", { affinity: "lead", locked: true }) }))
    ).toEqual({ lockEligible: true, specializeLocked: true })
  })

  test("benched (seatIdx null) not locked → no seat → not eligible", () => {
    expect(
      lockFlagsFor(card(50), null, li({ bySlug: one("aura", { affinity: "lead", locked: false }) }))
    ).toEqual({ lockEligible: false, specializeLocked: false })
  })
})

describe("buildLockInputs", () => {
  const tm = (over: Partial<Teammate> & { slug: string }): Teammate => ({
    name: over.slug,
    color: "#fff",
    portrait: "",
    flavor: "",
    cost: 0,
    rate: 1,
    rank: 1,
    level: null,
    stage: "",
    ...over,
  })
  const gstate = (over: Partial<GameState>): GameState => ({
    resource: 0,
    teammates: [],
    lastTickAt: 0,
    gacha: { girls: {}, cycleDraws: 0 },
    ...over,
  })

  test("reads the latch flags + each teammate's affinity/locked from the save", () => {
    const inputs = buildLockInputs(
      gstate({
        specializeUnlocked: true,
        affinityUnlocked: true,
        teammates: [
          tm({ slug: "aura", affinity: "lead", locked: true }),
          tm({ slug: "abby", affinity: "support" }),
        ],
      })
    )
    expect(inputs.specializeUnlocked).toBe(true)
    expect(inputs.affinityUnlocked).toBe(true)
    expect(inputs.bySlug.get("aura")).toEqual({ affinity: "lead", locked: true })
    expect(inputs.bySlug.get("abby")).toEqual({ affinity: "support", locked: false })
  })

  test("missing latch flags default to false", () => {
    const inputs = buildLockInputs(gstate({ teammates: [] }))
    expect(inputs.specializeUnlocked).toBe(false)
    expect(inputs.affinityUnlocked).toBe(false)
  })
})

describe("cardPageName", () => {
  test("names a card by its player and its slug, which is where its file stands", () => {
    expect(cardPageName("4ee54543-cb30-4f47-a8d0-9269b4b7df76", "abby")).toBe(
      "4ee54543-cb30-4f47-a8d0-9269b4b7df76/abby"
    )
  })

  test("two players holding the same persona get two names, never one", () => {
    expect(cardPageName("player-a", "aura")).not.toBe(cardPageName("player-b", "aura"))
  })
})
