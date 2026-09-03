/**
 * What the usage tile is allowed to say, and what it must refuse to say.
 *
 * This route moved off `@shared/pages-query`, whose store could not see the figures it reduces —
 * they are declared `uncommitted` on the claude-account page type and stand beside each account's
 * page rather than in the commit — onto `@akasha/pages-system-service`, which reads them. The
 * service reduces nothing, so the mean and the three "next instant" picks the four saved page
 * queries carried are taken here over plain rows.
 *
 * The reduction moving is what these tests are for. A mean over an empty list sums to zero and
 * divides by nothing, and either mistake draws Alan a fleet that has spent nothing — a claim about
 * his capacity rather than the absence it is. Absent has to stay distinguishable from zero on the
 * way out, and it is only distinguishable because the route refuses with 503 instead of answering.
 *
 * The three instants are the other half: a pick matching no account is a true `null` — nothing is
 * pending — and must not be dragged into that refusal.
 */
import { expect, test } from "bun:test"
import {
  ACCOUNT,
  type Asked,
  askingsAt,
  buildClaudeUsageResponse,
  type ClaudeUsageAnswers,
  spentIn,
  type UsageWidgetPayload,
} from "./api.claude-usage.ts"

const NOW = Date.parse("2026-09-01T20:00:00.000Z")
const HOUR = 3_600_000

const NOTHING: Asked = { rows: [] }

function answers(over: Partial<ClaudeUsageAnswers>): ClaudeUsageAnswers {
  return {
    meanWeeklyUsed: NOTHING,
    nextFiveHourBack: NOTHING,
    nextSevenDayBack: NOTHING,
    nextSevenDayEnd: NOTHING,
    ...over,
  }
}

function spent(...percents: readonly (number | null)[]): Asked {
  return {
    rows: percents.map((one, at) =>
      one === null ? { slug: `a${at}` } : { slug: `a${at}`, sevenDayPercentUsed: one }
    ),
  }
}

async function payloadOf(answered: ClaudeUsageAnswers): Promise<UsageWidgetPayload> {
  const response = buildClaudeUsageResponse(answered, NOW)
  expect(response.status).toBe(200)
  return (await response.json()) as UsageWidgetPayload
}

async function unreadIn(answered: ClaudeUsageAnswers): Promise<readonly string[]> {
  const response = buildClaudeUsageResponse(answered, NOW)
  expect(response.status).toBe(503)
  const said = (await response.json()) as { readonly unread: readonly string[] }
  return said.unread
}

test("the mean is taken over the accounts that carried a figure", async () => {
  const payload = await payloadOf(answers({ meanWeeklyUsed: spent(10, 20, 60) }))
  expect(payload.avgUsedPct).toBe(30)
})

test("an account carrying no figure is left out rather than counted as spending none", async () => {
  const payload = await payloadOf(answers({ meanWeeklyUsed: spent(10, null, 20) }))
  expect(payload.avgUsedPct).toBe(15)
})

test("a mean over no account refuses rather than answering nothing spent", async () => {
  const unread = await unreadIn(answers({ meanWeeklyUsed: spent(null, null) }))
  expect(unread).toHaveLength(1)
  expect(unread[0]).toContain("matched 2 account(s)")
  expect(unread[0]).toContain("unread rather than nothing")
})

test("a fleet of no accounts refuses rather than answering nothing spent", async () => {
  const unread = await unreadIn(answers({ meanWeeklyUsed: NOTHING }))
  expect(unread[0]).toContain("matched 0 account(s)")
})

test("nothing the route refuses to read reaches the widget as a zero", async () => {
  const response = buildClaudeUsageResponse(answers({ meanWeeklyUsed: NOTHING }), NOW)
  const said = (await response.json()) as Record<string, unknown>
  expect(said.avgUsedPct).toBeUndefined()
  expect(said.tier).toBeUndefined()
})

test("a refusal from the pages is carried through as unread", async () => {
  const unread = await unreadIn(
    answers({ meanWeeklyUsed: { refused: "`claude-account` names no page type the index holds" } })
  )
  expect(unread[0]).toBe("`claude-account` names no page type the index holds")
})

test("every reading that failed is named, not just the first", async () => {
  const unread = await unreadIn(
    answers({
      meanWeeklyUsed: { refused: "one" },
      nextSevenDayEnd: { rows: [{ slug: "aine" }] },
    })
  )
  expect(unread).toHaveLength(2)
})

test("an instant no account holds is null rather than a refusal", async () => {
  const payload = await payloadOf(answers({ meanWeeklyUsed: spent(4) }))
  expect(payload.fiveHourBackAt).toBeNull()
  expect(payload.sevenDayBackAt).toBeNull()
  expect(payload.sevenDayEndsAt).toBeNull()
  expect(payload.tier).toBe("blue")
})

test("a picked account carrying no instant refuses rather than reading as absent", async () => {
  const unread = await unreadIn(
    answers({
      meanWeeklyUsed: spent(4),
      nextFiveHourBack: { rows: [{ slug: "aine" }] },
    })
  )
  expect(unread).toHaveLength(1)
  expect(unread[0]).toContain("no `fiveHourResetsAt` text on it")
})

test("a picked account carrying text that is no instant refuses", async () => {
  const unread = await unreadIn(
    answers({
      meanWeeklyUsed: spent(4),
      nextSevenDayEnd: { rows: [{ sevenDayResetsAt: "whenever" }] },
    })
  )
  expect(unread[0]).toContain("which is no instant")
})

test("the instants come back as milliseconds", async () => {
  const at = "2026-09-02T09:00:00.470730+00:00"
  const payload = await payloadOf(
    answers({
      meanWeeklyUsed: spent(4),
      nextFiveHourBack: { rows: [{ fiveHourResetsAt: at }] },
      nextSevenDayBack: { rows: [{ sevenDayResetsAt: at }] },
      nextSevenDayEnd: { rows: [{ sevenDayResetsAt: at }] },
    })
  )
  expect(payload.fiveHourBackAt).toBe(Date.parse(at))
  expect(payload.sevenDayBackAt).toBe(Date.parse(at))
})

test("the tier is read off how long the seven-day window has left", async () => {
  const tierAt = async (hours: number): Promise<string> => {
    const at = new Date(NOW + hours * HOUR).toISOString()
    const payload = await payloadOf(
      answers({ meanWeeklyUsed: spent(4), nextSevenDayEnd: { rows: [{ sevenDayResetsAt: at }] } })
    )
    return payload.tier
  }
  expect(await tierAt(1)).toBe("red")
  expect(await tierAt(30)).toBe("yellow")
  expect(await tierAt(60)).toBe("green")
  expect(await tierAt(100)).toBe("blue")
})

test("a withdrawn subscription has spent the whole of its seven-day window", () => {
  expect(spentIn({ slug: "aine", subscriptionDisabledReason: "cancelled" })).toBe(100)
  const withdrawn = { slug: "aine", sevenDayPercentUsed: 2, subscriptionDisabledReason: "gone" }
  expect(spentIn(withdrawn)).toBe(100)
})

test("a figure standing as text is read as the number it is", () => {
  expect(spentIn({ slug: "aine", sevenDayPercentUsed: "42" })).toBe(42)
  expect(spentIn({ slug: "aine", sevenDayPercentUsed: "" })).toBeNull()
  expect(spentIn({ slug: "aine" })).toBeNull()
})

test("the mean is asked of every account, narrowing nothing", () => {
  const asking = askingsAt(NOW).meanWeeklyUsed
  expect(asking.pageTypeSlug).toBe(ACCOUNT)
  expect(asking.where).toBeUndefined()
  expect(asking.keys).toContain("sevenDayPercentUsed")
  expect(asking.keys).toContain("subscriptionDisabledReason")
})

test("each pick narrows the way its saved query narrowed", () => {
  const asking = askingsAt(NOW)
  const now = new Date(NOW).toISOString()

  expect(asking.nextFiveHourBack.where).toEqual({
    fiveHourPercentUsed: { "at-or-after": 100 },
    fiveHourResetsAt: { "at-or-after": now },
  })
  expect(asking.nextSevenDayBack.where).toEqual({
    sevenDayPercentUsed: { "at-or-after": 100 },
    sevenDayResetsAt: { "at-or-after": now },
  })
  expect(asking.nextSevenDayEnd.where).toEqual({
    sevenDayPercentUsed: { before: 100 },
    sevenDayResetsAt: { "at-or-after": now },
  })

  for (const pick of [asking.nextFiveHourBack, asking.nextSevenDayBack, asking.nextSevenDayEnd]) {
    expect(pick.pageTypeSlug).toBe(ACCOUNT)
    expect(pick.limit).toBe(1)
    expect(pick.sortBy).toBe(pick.keys?.[0])
    expect(pick.descending).toBeUndefined()
  }
})

test("the threshold is stated as a number so the pages order it as one", () => {
  const held = askingsAt(NOW).nextFiveHourBack.where?.fiveHourPercentUsed
  expect(typeof held?.["at-or-after"]).toBe("number")
})
