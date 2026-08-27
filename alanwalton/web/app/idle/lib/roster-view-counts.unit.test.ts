import { describe, expect, test } from "bun:test"
import {
  deriveCollectionCounts,
  deriveVariantCounts,
  deriveVariantIds,
  formatCollectedBadge,
  formatStarsDetail,
  type GirlCardVM,
} from "./roster-view"

function mkCard(
  over: Partial<GirlCardVM> & { pool: readonly string[]; images: readonly string[] }
): GirlCardVM {
  return {
    slug: "x",
    name: "X",
    color: "var(--pink)",
    locked: false,
    portrait: "",
    frontImageId: null,
    stars: 0,
    dupeProgress: 0,
    nextThreshold: null,
    imageCount: over.images.length,
    level: null,
    stage: "",
    rank: 1,
    baseRate: 0,
    trainCost: 0,
    train10Cost: 0,
    ...over,
  }
}

describe("deriveVariantIds / deriveVariantCounts — union denominator (#14738)", () => {
  test("ordered union: pool first, then owned ids not in the pool", () => {
    const card = mkCard({ pool: ["a", "b", "c"], images: ["a", "b"] })
    expect(deriveVariantIds(card)).toEqual(["a", "b", "c"])
    expect(deriveVariantCounts(card)).toEqual({ collected: 2, total: 3 })
  })

  test("owned-outside-pool variant counts toward BOTH numerator and denominator (Awen 3/2 → 2/2)", () => {
    const awen = mkCard({ pool: ["i1"], images: ["i1", "i2"] })
    expect(deriveVariantIds(awen)).toEqual(["i1", "i2"])
    expect(deriveVariantCounts(awen)).toEqual({ collected: 2, total: 2 })
  })

  test("INVARIANT: collected ≤ total for every pool/owned combination", () => {
    const cases: ReadonlyArray<{ pool: readonly string[]; images: readonly string[] }> = [
      { pool: [], images: [] },
      { pool: ["a"], images: [] },
      { pool: [], images: ["a"] },
      { pool: ["a", "b"], images: ["a"] },
      { pool: ["a"], images: ["a", "b", "c"] },
      { pool: ["a", "b", "c"], images: ["b", "z"] },
    ]
    for (const c of cases) {
      const { collected, total } = deriveVariantCounts(mkCard(c))
      expect(collected).toBeLessThanOrEqual(total)
      expect(total).toBe(deriveVariantIds(mkCard(c)).length)
    }
  })

  test("locked girl (no owned images): collected 0 over her full pool", () => {
    const locked = mkCard({ pool: ["n1", "n2"], images: [] })
    expect(deriveVariantCounts(locked)).toEqual({ collected: 0, total: 2 })
  })

  test("deriveVariantIds de-dupes: an owned id already in the pool is not repeated", () => {
    const card = mkCard({ pool: ["a", "b"], images: ["a", "b"] })
    expect(deriveVariantIds(card)).toEqual(["a", "b"])
  })

  test("base-cover dedup: the `/api/image/<id>` cover id is excluded from the variant union (#14738 RE-OPEN #2)", () => {
    const selah = mkCard({ pool: ["a"], images: ["a"], portrait: "/api/image/a" })
    expect(deriveVariantIds(selah)).toEqual([])
    expect(deriveVariantCounts(selah)).toEqual({ collected: 0, total: 0 })
    const withExtra = mkCard({ pool: ["a", "b"], images: ["a", "b"], portrait: "/api/image/a" })
    expect(deriveVariantIds(withExtra)).toEqual(["b"])
  })

  test("base-cover dedup is a no-op for a STATIC portrait (distinct asset, not a pooled variant)", () => {
    const card = mkCard({ pool: ["a"], images: ["a"], portrait: "cover.png" })
    expect(deriveVariantIds(card)).toEqual(["a"])
  })

  test("LOCKED girl keeps the cover id in her pool (no base term to dedup against)", () => {
    const locked = mkCard({ pool: ["a", "b"], images: [], portrait: "/api/image/a", locked: true })
    expect(deriveVariantIds(locked)).toEqual(["a", "b"])
    expect(deriveVariantCounts(locked)).toEqual({ collected: 0, total: 2 })
  })
})

describe("deriveCollectionCounts — the base-inclusive tally (#14738)", () => {
  test("no base cover (portrait ''): equals the bare variant union", () => {
    expect(deriveCollectionCounts(mkCard({ pool: ["a", "b", "c"], images: ["a", "b"] }))).toEqual({
      collected: 2,
      total: 3,
    })
  })

  test("a present base cover always counts +1/+1 (it is always owned)", () => {
    expect(
      deriveCollectionCounts(
        mkCard({ pool: ["a", "b", "c"], images: ["a", "b"], portrait: "c.png" })
      )
    ).toEqual({ collected: 3, total: 4 })
  })

  test("owned-outside-pool + base: union restores the retired variant, base adds one", () => {
    expect(
      deriveCollectionCounts(mkCard({ pool: ["i1"], images: ["i1", "i2"], portrait: "c.png" }))
    ).toEqual({ collected: 3, total: 3 })
  })

  test("INVARIANT: collected ≤ total holds with the base layered in", () => {
    const cases: ReadonlyArray<
      Partial<GirlCardVM> & { pool: readonly string[]; images: readonly string[] }
    > = [
      { pool: [], images: [], portrait: "" },
      { pool: [], images: [], portrait: "c.png" },
      { pool: ["a"], images: [], portrait: "c.png" },
      { pool: ["a"], images: ["a", "b"], portrait: "c.png" },
      { pool: ["a", "b", "c"], images: ["b", "z"], portrait: "c.png" },
    ]
    for (const c of cases) {
      const { collected, total } = deriveCollectionCounts(mkCard(c))
      expect(collected).toBeLessThanOrEqual(total)
    }
  })
})

describe("formatCollectedBadge — the base-inclusive {collected}/{total} collected card badge (#14738)", () => {
  test("wraps deriveCollectionCounts (no base: owned ⊆ pool → 2/3 collected)", () => {
    expect(formatCollectedBadge(mkCard({ pool: ["a", "b", "c"], images: ["a", "b"] }))).toBe(
      "2/3 collected"
    )
  })

  test("owned-outside-pool reads 2/2, never the impossible 3/2 (the Awen fix)", () => {
    expect(formatCollectedBadge(mkCard({ pool: ["i1"], images: ["i1", "i2"] }))).toBe(
      "2/2 collected"
    )
  })

  test("a locked girl (no base) reads 0 collected over her full pool", () => {
    expect(formatCollectedBadge(mkCard({ pool: ["n1", "n2"], images: [] }))).toBe("0/2 collected")
  })

  test("a LOCKED girl WITH a portrait still omits the base cover (not hers until drawn)", () => {
    const lockedWithPortrait = mkCard({
      pool: ["n1", "n2"],
      images: [],
      portrait: "silhouette.png",
      locked: true,
    })
    expect(formatCollectedBadge(lockedWithPortrait)).toBe("0/2 collected")
  })
})

describe("cross-surface agreement: card badge == gallery/modal header (#14459 one-predicate)", () => {
  test("the real Selah case (cover IS her sole pool variant): card 1/1 == modal 1/1, one tile", () => {
    const selah = mkCard({ pool: ["a"], images: ["a"], portrait: "/api/image/a" })
    expect(deriveVariantIds(selah)).toEqual([])
    const counts = deriveCollectionCounts(selah)
    expect(counts).toEqual({ collected: 1, total: 1 })
    expect(formatCollectedBadge(selah)).toBe("1/1 collected")
    expect(`${counts.collected} / ${counts.total} collected`).toBe("1 / 1 collected")
  })

  test("cover-as-variant PLUS a distinct extra variant: base once + the extra → card 2/2 == modal 2/2", () => {
    const selahPlus = mkCard({ pool: ["a", "b"], images: ["a", "b"], portrait: "/api/image/a" })
    expect(deriveVariantIds(selahPlus)).toEqual(["b"])
    const counts = deriveCollectionCounts(selahPlus)
    expect(counts).toEqual({ collected: 2, total: 2 })
    expect(formatCollectedBadge(selahPlus)).toBe("2/2 collected")
    expect(`${counts.collected} / ${counts.total} collected`).toBe("2 / 2 collected")
  })

  test("a DISTINCT static cover (separate asset) still adds its own +1: card 3/3 == modal 3/3", () => {
    const distinctCover = mkCard({ pool: ["i1"], images: ["i1", "i2"], portrait: "cover.png" })
    const counts = deriveCollectionCounts(distinctCover)
    expect(counts).toEqual({ collected: 3, total: 3 })
    expect(formatCollectedBadge(distinctCover)).toBe("3/3 collected")
    expect(`${counts.collected} / ${counts.total} collected`).toBe("3 / 3 collected")
  })
})

describe("formatStarsDetail — the ★{stars} {progress}/{next} badge (#14738 nit-4)", () => {
  test("mid-progression shows stars and the dupe fuel toward the next star", () => {
    expect(
      formatStarsDetail(
        mkCard({ pool: [], images: [], stars: 2, dupeProgress: 3, nextThreshold: 5 })
      )
    ).toBe("★2 3/5")
  })

  test("zero progress toward the next star still shows the 0/{next} fraction", () => {
    expect(
      formatStarsDetail(
        mkCard({ pool: [], images: [], stars: 0, dupeProgress: 0, nextThreshold: 2 })
      )
    ).toBe("★0 0/2")
  })

  test("at the star cap (nextThreshold null) it collapses to bare ★{stars} — no trailing /", () => {
    const capped = formatStarsDetail(
      mkCard({ pool: [], images: [], stars: 5, dupeProgress: 0, nextThreshold: null })
    )
    expect(capped).toBe("★5")
    expect(capped).not.toContain("/")
  })
})
