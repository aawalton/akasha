import { describe, expect, test } from "bun:test"
import type { Catalog } from "./catalog"
import { normalizeGameState } from "./core/accrual"
import { type GameState, type Teammate } from "./core/types"
import { commitIntent } from "./idle-apply"
import { deriveCardRows } from "./idle-card-rows"
import { parseIdleSave } from "./idle-save"

const NOW = 1_000_000

const SLUGS = ["aura", "abby", "aelwyn"] as const
const TEAMMATES: readonly Teammate[] = SLUGS.map((slug) => ({
  slug,
  name: slug,
  color: "#fff",
  portrait: "p",
  flavor: "f",
  cost: 0,
  rate: 10,
  rank: 1,
  level: null,
  stage: "s",
}))

function fixtureState(): GameState {
  return normalizeGameState(
    parseIdleSave({
      resource: 0,
      teammates: TEAMMATES,
      lastTickAt: NOW,
      synergyMatrix: {},
      activeTeam: ["aura"],
      ranksZeroIndexed: true,
      gacha: {
        girls: {
          aura: { stars: 2, dupeProgress: 0, images: [] },
          abby: { stars: 0, dupeProgress: 0, images: [] },
        },
        cycleDraws: 0,
      },
    })
  )
}

const CATALOG: Catalog = {
  roster: SLUGS.map((slug) => ({ slug, name: slug, level: null, stage: "s", cover: "" })),
  pools: {},
}

describe("deriveCardRows (#14601)", () => {
  test("one row per roster slug, keyed by slug", () => {
    const rows = deriveCardRows(fixtureState(), CATALOG)
    expect(rows.map((r) => r._id).sort()).toEqual([...SLUGS].sort())
    for (const row of rows) {
      expect(typeof row._id).toBe("string")
    }
  })

  test("unlocked card title is its name; locked card title is '???'", () => {
    const rows = deriveCardRows(fixtureState(), CATALOG)
    const byId = new Map(rows.map((r) => [r._id, r]))
    expect(byId.get("aura")?.title).toBe("aura")
    expect(byId.get("abby")?.title).toBe("abby")
    expect(byId.get("aelwyn")?.title).toBe("???")
  })

  test("core badge cells are present", () => {
    const aura = deriveCardRows(fixtureState(), CATALOG).find((r) => r._id === "aura")
    expect(aura).toBeDefined()
    expect(typeof aura?.stars).toBe("number")
    expect(typeof aura?.rank).toBe("number")
    expect(typeof aura?.ratePerSec).toBe("number")
    expect(typeof aura?.cover).toBe("string")
  })

  test("carries the client-only train10Cost cell — the cumulative next-ten cost (#15554)", () => {
    const rows = deriveCardRows(fixtureState(), CATALOG)
    const aura = rows.find((r) => r._id === "aura")
    expect(typeof aura?.train10Cost).toBe("number")
    expect(Number(aura?.train10Cost)).toBeGreaterThan(Number(aura?.trainCost))
    for (const r of rows) {
      expect(Number(r.train10Cost)).toBeGreaterThanOrEqual(Number(r.trainCost))
    }
  })

  test("carries the #14738 client-only composite badge cells (starsDetail, collected)", () => {
    const rows = deriveCardRows(fixtureState(), CATALOG)
    const byId = new Map(rows.map((r) => [r._id, r]))
    expect(byId.get("aura")?.starsDetail).toBe("★2 0/125")
    expect(byId.get("aura")?.collected).toBe("1/1 collected")
    expect(byId.get("aelwyn")?.starsDetail).toBe("★0 0/5")
    expect(byId.get("aelwyn")?.collected).toBe("0/0 collected")
  })

  test("on-team card carries a numeric seatIndex; a benched card is null", () => {
    const rows = deriveCardRows(fixtureState(), CATALOG)
    const byId = new Map(rows.map((r) => [r._id, r]))
    expect(byId.get("aura")?.seatIndex).toBe(0)
    expect(byId.get("abby")?.seatIndex).toBeNull()
  })

  test("locked card stores no cover art", () => {
    const aelwyn = deriveCardRows(fixtureState(), CATALOG).find((r) => r._id === "aelwyn")
    expect(aelwyn?.cover).toBe("")
  })
})

function richState(lastTickAt: number): GameState {
  return normalizeGameState(
    parseIdleSave({
      resource: 100_000,
      teammates: TEAMMATES,
      lastTickAt,
      synergyMatrix: {},
      activeTeam: ["aura"],
      ranksZeroIndexed: true,
      gacha: {
        girls: {
          aura: { stars: 2, dupeProgress: 0, images: [] },
          abby: { stars: 0, dupeProgress: 0, images: [] },
        },
        cycleDraws: 0,
      },
    })
  )
}

function auraRatePerSec(state: GameState): number {
  const aura = deriveCardRows(state, CATALOG).find((r) => r._id === "aura")
  const rate = aura?.ratePerSec
  if (typeof rate !== "number") throw new Error("aura ratePerSec is not numeric")
  return rate
}

describe("ratePerSec is the instantaneous rate, not the aggregate (#14601 symptom)", () => {
  test("on Train the rate JUMPS same-frame to the new value — never resets to 0", () => {
    const before = richState(NOW)
    const R = auraRatePerSec(before)
    expect(R).toBe(10)
    expect(R).toBeGreaterThan(0)

    const afterTrain = commitIntent(before, { type: "train", slug: "aura" }, NOW).state
    const R2 = auraRatePerSec(afterTrain)

    expect(R2).toBe(20)
    expect(R2).toBeGreaterThan(R)
    expect(R2).not.toBe(0)
  })

  test("the rate does NOT climb with elapsed time — it is time-independent", () => {
    const early = richState(NOW)
    const late = richState(NOW + 3_600_000)
    expect(auraRatePerSec(late)).toBe(auraRatePerSec(early))

    const earlyRow = deriveCardRows(early, CATALOG).find((r) => r._id === "aura")
    const lateRow = deriveCardRows(late, CATALOG).find((r) => r._id === "aura")
    expect(lateRow?.ratePerSec).toBe(earlyRow?.ratePerSec)
  })
})
