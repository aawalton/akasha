import { describe, expect, test } from "bun:test"
import type { Value } from "@akasha/pages-system/page-value"
import {
  UPKEEP_PERIOD_MS,
  UPKEEP_RENEWAL_MARGIN_MS,
} from "../oauth/claude-account-oauth.module.code.ts"
import {
  type AccountReading,
  EXPIRY_FLOOR_MS,
  judgeAccount,
  stallAcross,
  stallLines,
  USAGE_CEILING_MS,
} from "./claude-account-upkeep-stall.module.code.ts"

const NOW = Date.parse("2026-01-01T00:00:00.000Z")

const AN_HOUR = 60 * 60 * 1000

function at(msFromNow: number): string {
  return new Date(NOW + msFromNow).toISOString()
}

function reading(beside: Value | null, why: string | null = null): AccountReading {
  return { slug: "one", beside, why }
}

function stamps(expiresIn: number, usageReadAgo: number): Value {
  return { accessTokenExpiresAt: at(expiresIn), usageReadAt: at(-usageReadAgo) }
}

describe("the bounds", () => {
  test("the expiry floor is the upkeep's margin less the two periods a pass may be late", () => {
    expect(EXPIRY_FLOOR_MS).toBe(UPKEEP_RENEWAL_MARGIN_MS - 2 * UPKEEP_PERIOD_MS)
    expect(EXPIRY_FLOOR_MS).toBe(AN_HOUR)
  })

  test("the usage ceiling is three of the upkeep's periods", () => {
    expect(USAGE_CEILING_MS).toBe(3 * UPKEEP_PERIOD_MS)
    expect(USAGE_CEILING_MS).toBe(3 * AN_HOUR)
  })

  test("neither bound is a number restated here", () => {
    expect(EXPIRY_FLOOR_MS).toBeLessThan(UPKEEP_RENEWAL_MARGIN_MS)
    expect(EXPIRY_FLOOR_MS).toBeGreaterThan(0)
  })
})

describe("judgeAccount", () => {
  test("a token with life to spare and a fresh usage reading is current", () => {
    const one = judgeAccount(reading(stamps(5 * AN_HOUR, AN_HOUR)), NOW)
    expect(one.verdict).toBe("current")
    expect(one.slug).toBe("one")
    expect(one.detail).toBe("5.0h of token life left, usage read 1.0h ago")
  })

  test("a token whose life has run out is expired", () => {
    const one = judgeAccount(reading(stamps(-2 * AN_HOUR, AN_HOUR)), NOW)
    expect(one.verdict).toBe("expired")
    expect(one.detail).toBe(
      "its token expired 2.0h ago and upkeep is the only thing that renews one"
    )
  })

  test("a token expiring at this very instant is expired", () => {
    expect(judgeAccount(reading(stamps(0, AN_HOUR)), NOW).verdict).toBe("expired")
  })

  test("a token with less life left than the floor is expiry-behind", () => {
    const one = judgeAccount(reading(stamps(AN_HOUR / 2, AN_HOUR)), NOW)
    expect(one.verdict).toBe("expiry-behind")
    expect(one.detail).toBe(
      "0.5h of token life left, under the 1.0h floor upkeep's own margin and period set"
    )
  })

  test("a token with exactly the floor of life left is not behind", () => {
    expect(judgeAccount(reading(stamps(EXPIRY_FLOOR_MS, AN_HOUR)), NOW).verdict).toBe("current")
  })

  test("an account holding a usage reading and no expiry is expiry-behind", () => {
    const one = judgeAccount(reading({ usageReadAt: at(-AN_HOUR) }), NOW)
    expect(one.verdict).toBe("expiry-behind")
    expect(one.detail).toBe(
      "holds no accessTokenExpiresAt, so nothing here says its token was ever renewed"
    )
  })

  test("an account holding an expiry and no usage reading is usage-behind", () => {
    const one = judgeAccount(reading({ accessTokenExpiresAt: at(5 * AN_HOUR) }), NOW)
    expect(one.verdict).toBe("usage-behind")
    expect(one.detail).toBe(
      "holds no usageReadAt, so its eligibility stands on nothing upkeep read"
    )
  })

  test("a usage reading older than the ceiling is usage-behind", () => {
    const one = judgeAccount(reading(stamps(5 * AN_HOUR, 4 * AN_HOUR)), NOW)
    expect(one.verdict).toBe("usage-behind")
    expect(one.detail).toBe(
      "its usage was read 4.0h ago, past the 3.0h ceiling, so its eligibility is frozen at whatever it then held"
    )
  })

  test("a usage reading exactly at the ceiling is not behind", () => {
    expect(judgeAccount(reading(stamps(5 * AN_HOUR, USAGE_CEILING_MS)), NOW).verdict).toBe(
      "current"
    )
  })

  test("an account holding neither stamp has never been reached", () => {
    const one = judgeAccount(reading({}), NOW)
    expect(one.verdict).toBe("never-reached")
    expect(one.detail).toBe(
      "holds neither accessTokenExpiresAt nor usageReadAt, so upkeep has never reached it"
    )
  })

  test("a key standing beside as null counts as a stamp that is not there", () => {
    const one = judgeAccount(reading({ accessTokenExpiresAt: null, usageReadAt: null }), NOW)
    expect(one.verdict).toBe("never-reached")
  })

  test("a reading that says why it could not be looked at is unread", () => {
    const one = judgeAccount(reading(stamps(5 * AN_HOUR, AN_HOUR), "the file would not parse"), NOW)
    expect(one.verdict).toBe("unread")
    expect(one.detail).toBe("the file would not parse")
  })

  test("a reading with nothing beside it at all is unread", () => {
    const one = judgeAccount(reading(null), NOW)
    expect(one.verdict).toBe("unread")
    expect(one.detail).toBe("nothing was held to look at")
  })

  test("a stamp standing beside as anything but a string is unread", () => {
    const one = judgeAccount(reading({ accessTokenExpiresAt: 1234, usageReadAt: at(0) }), NOW)
    expect(one.verdict).toBe("unread")
    expect(one.detail).toBe("accessTokenExpiresAt stands beside as number, not a timestamp")
  })

  test("a stamp standing beside as a string no date parser reads is unread", () => {
    const one = judgeAccount(
      reading({ accessTokenExpiresAt: at(5 * AN_HOUR), usageReadAt: "soon" }),
      NOW
    )
    expect(one.verdict).toBe("unread")
    expect(one.detail).toBe("usageReadAt stands beside as 'soon', which is not a timestamp")
  })

  test("an unreadable expiry is named ahead of an unreadable usage reading", () => {
    const one = judgeAccount(reading({ accessTokenExpiresAt: "then", usageReadAt: "soon" }), NOW)
    expect(one.detail).toBe(
      "accessTokenExpiresAt stands beside as 'then', which is not a timestamp"
    )
  })

  test("an expired token is answered ahead of a stale usage reading", () => {
    expect(judgeAccount(reading(stamps(-AN_HOUR, 9 * AN_HOUR)), NOW).verdict).toBe("expired")
  })

  test("a token under the floor is answered ahead of a stale usage reading", () => {
    expect(judgeAccount(reading(stamps(AN_HOUR / 2, 9 * AN_HOUR)), NOW).verdict).toBe(
      "expiry-behind"
    )
  })

  test("a stated why is answered ahead of every stamp beside the page", () => {
    expect(judgeAccount(reading(null, "no page stands"), NOW).detail).toBe("no page stands")
  })

  test("the slug asked about is the slug answered", () => {
    const one = judgeAccount({ slug: "moss", beside: {}, why: null }, NOW)
    expect(one.slug).toBe("moss")
  })

  test("nothing here throws", () => {
    const besides: readonly (Value | null)[] = [
      null,
      {},
      { accessTokenExpiresAt: {} },
      { accessTokenExpiresAt: [] },
      { usageReadAt: true },
      { accessTokenExpiresAt: "", usageReadAt: "" },
      stamps(AN_HOUR, AN_HOUR),
    ]
    for (const beside of besides) {
      expect(() => judgeAccount(reading(beside), NOW)).not.toThrow()
    }
  })
})

describe("stallAcross", () => {
  const readings: readonly AccountReading[] = [
    { slug: "current-one", beside: stamps(5 * AN_HOUR, AN_HOUR), why: null },
    { slug: "expired-one", beside: stamps(-AN_HOUR, AN_HOUR), why: null },
    { slug: "never-one", beside: {}, why: null },
    { slug: "unread-one", beside: null, why: "nothing to look at" },
  ]

  test("every reading handed in is judged, in the order it was handed in", () => {
    const stall = stallAcross(readings, NOW)
    expect(stall.entries.map((one) => one.slug)).toEqual([
      "current-one",
      "expired-one",
      "never-one",
      "unread-one",
    ])
    expect(stall.entries.map((one) => one.verdict)).toEqual([
      "current",
      "expired",
      "never-reached",
      "unread",
    ])
  })

  test("the pages counted are the readings handed in", () => {
    expect(stallAcross(readings, NOW).pages).toBe(4)
  })

  test("an account that reads as unread is counted out of the accounts judged", () => {
    const stall = stallAcross(readings, NOW)
    expect(stall.judged).toBe(3)
    expect(stall.unread).toEqual(["unread-one"])
  })

  test("an account that reads as unread is named among neither the stalled nor the current", () => {
    const stall = stallAcross(readings, NOW)
    expect(stall.stalled).toEqual(["expired-one", "never-one"])
    expect(stall.current).toBe(1)
  })

  test("no readings at all is no pages, none judged and none current", () => {
    const stall = stallAcross([], NOW)
    expect(stall).toEqual({
      pages: 0,
      judged: 0,
      current: 0,
      stalled: [],
      unread: [],
      entries: [],
    })
  })

  test("a fleet wholly current names nothing stalled and nothing unread", () => {
    const stall = stallAcross([readings[0] as AccountReading], NOW)
    expect(stall.current).toBe(1)
    expect(stall.judged).toBe(1)
    expect(stall.stalled).toEqual([])
    expect(stall.unread).toEqual([])
  })

  test("every account judged is either current, stalled or unread", () => {
    const stall = stallAcross(readings, NOW)
    expect(stall.current + stall.stalled.length + stall.unread.length).toBe(stall.pages)
  })
})

describe("stallLines", () => {
  test("one line states each account and one more closes the count", () => {
    const stall = stallAcross(
      [
        { slug: "current-one", beside: stamps(5 * AN_HOUR, AN_HOUR), why: null },
        { slug: "unread-one", beside: null, why: "nothing to look at" },
      ],
      NOW
    )
    expect(stallLines(stall)).toEqual([
      "current-one: current — 5.0h of token life left, usage read 1.0h ago",
      "unread-one: unread — nothing to look at",
      "1 of 2 account page(s) current; 0 behind upkeep, 1 could not be looked at",
    ])
  })

  test("a ruling on nothing is the closing count alone", () => {
    expect(stallLines(stallAcross([], NOW))).toEqual([
      "0 of 0 account page(s) current; 0 behind upkeep, 0 could not be looked at",
    ])
  })

  test("the closing count states the stalled and the unread apart", () => {
    const stall = stallAcross(
      [
        { slug: "expired-one", beside: stamps(-AN_HOUR, AN_HOUR), why: null },
        { slug: "unread-one", beside: null, why: "nothing to look at" },
      ],
      NOW
    )
    expect(stallLines(stall).at(-1)).toBe(
      "0 of 2 account page(s) current; 1 behind upkeep, 1 could not be looked at"
    )
  })
})
