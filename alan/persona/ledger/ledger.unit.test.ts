import { describe, expect, test } from "bun:test"
import { GREEN_BASELINE_DAYS, levelForPoints, STAGES } from "../closeness/closeness.ts"
import { computeLedger, createNetBytesAccumulator, parseNetBytes, WALLPAPER_COST } from "./ledger.ts"

describe("parseNetBytes", () => {
  const COMMIT = (sha: string, body: readonly string[]): string =>
    [
      `commit ${sha}`,
      "Author: Alan Walton <aawalton@gmail.com>",
      "",
      "    write a page",
      "",
      "diff --git a/packages/books/draft.md b/packages/books/draft.md",
      "--- a/packages/books/draft.md",
      "+++ b/packages/books/draft.md",
      "@@ -1,2 +1,3 @@",
      ...body,
    ].join("\n")

  test("net of one commit: added bytes minus removed bytes", () => {
    const diff = COMMIT("0123456789abcdef0123456789abcdef01234567", [
      " unchanged line",
      "-removed line",
      "+added line",
      "+café ☕",
    ])
    const added = Buffer.byteLength("+added line", "utf8") + Buffer.byteLength("+café ☕", "utf8")
    const removed = Buffer.byteLength("-removed line", "utf8")
    expect(parseNetBytes(diff)).toBe(added - removed)
  })

  test("excludes +++ / --- file headers from added and removed", () => {
    const diff = COMMIT("1111111111111111111111111111111111111111", [
      " context",
      "+only one added line",
    ])
    expect(parseNetBytes(diff)).toBe(Buffer.byteLength("+only one added line", "utf8"))
  })

  test("a net-negative commit is floored to zero, never subtracting", () => {
    const diff = COMMIT("2222222222222222222222222222222222222222", [
      "-a long removed line of prose",
      "-another removed line",
      "+tiny",
    ])
    expect(parseNetBytes(diff)).toBe(0)
  })

  test("floor is per-commit: a net-negative commit does not erase another's gains", () => {
    const gainer = COMMIT("3333333333333333333333333333333333333333", [
      "+a freshly written paragraph of some length",
    ])
    const deleter = COMMIT("4444444444444444444444444444444444444444", [
      "-a freshly written paragraph of some length",
    ])
    const gain = Buffer.byteLength("+a freshly written paragraph of some length", "utf8")
    expect(parseNetBytes(`${gainer}\n${deleter}`)).toBe(gain)
    expect(parseNetBytes(`${gainer}\n${deleter}`)).not.toBe(0)
  })

  test("sums the per-commit nets across multiple commits", () => {
    const c1 = COMMIT("5555555555555555555555555555555555555555", ["+first", "-x"])
    const c2 = COMMIT("6666666666666666666666666666666666666666", ["+second line"])
    const net1 = Buffer.byteLength("+first", "utf8") - Buffer.byteLength("-x", "utf8")
    const net2 = Buffer.byteLength("+second line", "utf8")
    expect(parseNetBytes(`${c1}\n${c2}`)).toBe(net1 + net2)
  })

  test("multibyte UTF-8 content counts bytes, not characters, on both sides", () => {
    const diff = COMMIT("7777777777777777777777777777777777777777", ["-☕", "+☕☕"])
    expect(parseNetBytes(diff)).toBe(3)
  })

  test("empty diff text earns nothing", () => {
    expect(parseNetBytes("")).toBe(0)
  })

  test("a pure-addition commit equals its added bytes (no removals)", () => {
    const diff = COMMIT("8888888888888888888888888888888888888888", ["+alpha", "+beta"])
    expect(parseNetBytes(diff)).toBe(
      Buffer.byteLength("+alpha", "utf8") + Buffer.byteLength("+beta", "utf8")
    )
  })
})

describe("createNetBytesAccumulator", () => {
  const COMMIT = (sha: string, body: readonly string[]): string =>
    [
      `commit ${sha}`,
      "Author: Alan Walton <aawalton@gmail.com>",
      "",
      "    write a page",
      "",
      "diff --git a/packages/shared/pages/core/x.ts b/packages/shared/pages/core/x.ts",
      "--- a/packages/shared/pages/core/x.ts",
      "+++ b/packages/shared/pages/core/x.ts",
      "@@ -1,2 +1,3 @@",
      ...body,
    ].join("\n")

  const feedLineByLine = (diffText: string): number => {
    const acc = createNetBytesAccumulator()
    for (const line of diffText.split("\n")) acc.pushLine(line)
    return acc.total()
  }

  test("line-fed total matches parseNetBytes on a multi-commit diff", () => {
    const c1 = COMMIT("5555555555555555555555555555555555555555", ["+first", "-x"])
    const c2 = COMMIT("6666666666666666666666666666666666666666", ["+second line", "+café ☕"])
    const diff = `${c1}\n${c2}`
    expect(feedLineByLine(diff)).toBe(parseNetBytes(diff))
  })

  test("per-commit floor holds under the streaming feed", () => {
    const gainer = COMMIT("3333333333333333333333333333333333333333", [
      "+a freshly written paragraph of some length",
    ])
    const deleter = COMMIT("4444444444444444444444444444444444444444", [
      "-a freshly written paragraph of some length",
    ])
    const diff = `${gainer}\n${deleter}`
    const gain = Buffer.byteLength("+a freshly written paragraph of some length", "utf8")
    expect(feedLineByLine(diff)).toBe(gain)
    expect(feedLineByLine(diff)).toBe(parseNetBytes(diff))
  })

  test("total() folds in the still-open final commit (no trailing header to close it)", () => {
    const only = COMMIT("8888888888888888888888888888888888888888", ["+alpha", "+beta"])
    expect(feedLineByLine(only)).toBe(
      Buffer.byteLength("+alpha", "utf8") + Buffer.byteLength("+beta", "utf8")
    )
  })

  test("total() is a pure read — repeatable without mutating the accumulator", () => {
    const acc = createNetBytesAccumulator()
    for (const line of COMMIT("9999999999999999999999999999999999999999", ["+gamma"]).split("\n")) {
      acc.pushLine(line)
    }
    const first = acc.total()
    expect(acc.total()).toBe(first)
    expect(first).toBe(Buffer.byteLength("+gamma", "utf8"))
  })

  test("an empty stream earns nothing", () => {
    expect(createNetBytesAccumulator().total()).toBe(0)
  })
})

describe("WALLPAPER_COST", () => {
  test("is 2^22 (4,194,304)", () => {
    expect(WALLPAPER_COST).toBe(2 ** 22)
    expect(WALLPAPER_COST).toBe(4_194_304)
  })
})

describe("computeLedger", () => {
  test("no points source (0 net bytes), 0 wallpapers → level 1, zero balance", () => {
    const ledger = computeLedger({ netBytes: 0, wallpaperCount: 0 })
    expect(ledger.level).toBe(1)
    expect(ledger.stage).toBe("Initiating")
    expect(ledger.percentProgress).toBe(0)
    expect(ledger.spent).toBe(0)
    expect(ledger.balance).toBe(0)
  })

  test("points below the first threshold → level 1, nothing spent", () => {
    const ledger = computeLedger({ netBytes: 1_000, wallpaperCount: 0 })
    expect(ledger.level).toBe(1)
    expect(ledger.stage).toBe("Initiating")
    expect(ledger.spent).toBe(0)
    expect(ledger.balance).toBe(1_000)
  })

  test("1 wallpaper → grandfathered, spent 0", () => {
    const ledger = computeLedger({ netBytes: 50_000, wallpaperCount: 1 })
    expect(ledger.spent).toBe(0)
    expect(ledger.balance).toBe(50_000)
    expect(ledger.level).toBe(1)
    expect(ledger.stage).toBe("Initiating")
  })

  test("level derives from earned points, not wallpapers owned", () => {
    const ledger = computeLedger({ netBytes: 0, wallpaperCount: 7 })
    expect(ledger.level).toBe(1)
    expect(ledger.stage).toBe("Initiating")
    expect(ledger.spent).toBe(6 * WALLPAPER_COST)
  })

  test("each cumulative green threshold steps the level (default Faith green)", () => {
    expect(computeLedger({ netBytes: 70_000, wallpaperCount: 0 }).stage).toBe("Experimenting")
    expect(computeLedger({ netBytes: 490_000, wallpaperCount: 0 }).level).toBe(3)
    expect(computeLedger({ netBytes: 2_290_000, wallpaperCount: 0 }).level).toBe(4)
    expect(computeLedger({ netBytes: 7_690_000, wallpaperCount: 0 }).level).toBe(5)
  })

  test("level clamps at 5 (Bonding); stockpiled points do not overflow", () => {
    const ledger = computeLedger({ netBytes: 50_000_000, wallpaperCount: 7 })
    expect(ledger.level).toBe(5)
    expect(ledger.stage).toBe("Bonding")
    expect(ledger.percentProgress).toBe(100)
    expect(ledger.spent).toBe(6 * WALLPAPER_COST)
  })

  test("percentProgress measures within the current level step", () => {
    const ledger = computeLedger({ netBytes: 35_000, wallpaperCount: 0 })
    expect(ledger.level).toBe(1)
    expect(ledger.percentProgress).toBe(50)
  })

  test("deficit clamps at 0 when balance covers the next wallpaper", () => {
    const netBytes = WALLPAPER_COST + 500_000
    const ledger = computeLedger({ netBytes, wallpaperCount: 1 })
    expect(ledger.balance).toBe(netBytes)
    expect(ledger.nextWallpaperDeficit).toBe(0)
  })

  test("deficit is the remaining points when balance falls short", () => {
    const ledger = computeLedger({ netBytes: 2_000_000, wallpaperCount: 1 })
    expect(ledger.nextWallpaperDeficit).toBe(WALLPAPER_COST - 2_000_000)
  })

  test("an explicit greenDayPoints scales the level computation (Fun green)", () => {
    const ledger = computeLedger({ netBytes: 700, wallpaperCount: 0, greenDayPoints: 100 })
    expect(ledger.level).toBe(2)
  })

  test("an explicit greenDayPoints scales percentProgress (Fun green)", () => {
    const ledger = computeLedger({ netBytes: 350, wallpaperCount: 0, greenDayPoints: 100 })
    expect(ledger.level).toBe(1)
    expect(ledger.percentProgress).toBe(50)
  })

  test("omitting greenDayPoints behaves as the default Faith/Learn green (10,000)", () => {
    const withDefault = computeLedger({ netBytes: 70_000, wallpaperCount: 0 })
    const withExplicit = computeLedger({
      netBytes: 70_000,
      wallpaperCount: 0,
      greenDayPoints: 10_000,
    })
    expect(withDefault.level).toBe(2)
    expect(withDefault.level).toBe(withExplicit.level)
    expect(withDefault.percentProgress).toBe(withExplicit.percentProgress)
  })

  test("greenDayTotal is the native total normalized to green-day units (default green)", () => {
    const ledger = computeLedger({ netBytes: 70_000, wallpaperCount: 0 })
    expect(ledger.greenDayTotal).toBe(7)
  })

  test("greenDayTotal divides by the explicit per-persona greenDayPoints", () => {
    const ledger = computeLedger({ netBytes: 3_846, wallpaperCount: 0, greenDayPoints: 360 })
    expect(ledger.greenDayTotal).toBeCloseTo(3_846 / 360, 10)
    expect(ledger.level).toBe(2)
  })

  test("greenDayTotal is cross-persona comparable: equal green-days ⇒ equal level", () => {
    const bytes = computeLedger({ netBytes: 490_000, wallpaperCount: 0, greenDayPoints: 10_000 })
    const minutes = computeLedger({ netBytes: 17_640, wallpaperCount: 0, greenDayPoints: 360 })
    expect(bytes.greenDayTotal).toBe(49)
    expect(minutes.greenDayTotal).toBe(49)
    expect(bytes.level).toBe(minutes.level)
  })

  test("greenDayTotal preserves the level the native scaling produced", () => {
    const ledger = computeLedger({ netBytes: 26_956, wallpaperCount: 0, greenDayPoints: 10_000 })
    expect(ledger.level).toBe(levelForPoints(26_956, GREEN_BASELINE_DAYS, 10_000))
  })
})

describe("STAGES", () => {
  test("five Knapp stages in escalation order", () => {
    expect(STAGES).toEqual([
      "Initiating",
      "Experimenting",
      "Intensifying",
      "Integrating",
      "Bonding",
    ])
  })
})
