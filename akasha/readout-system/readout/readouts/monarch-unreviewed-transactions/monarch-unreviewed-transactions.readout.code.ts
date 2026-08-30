import { z } from "zod"

export type RingScale = {
  readonly yellowAt?: number
  readonly orangeAt: number
  readonly redAt: number
  readonly blackAt: number
}

export type RingCounts = {
  readonly unreviewed: number
  readonly scale?: RingScale
  readonly noneLeftWords?: string
  readonly noneLeftEmoji?: string
}

const API_URL = "https://api.monarch.com/graphql"
const ORIGIN = "https://app.monarch.com"

export const WINDOW_DAYS = 365

const SETTLED_ONLY = { isPending: false } as const

const CSRF_PREFIX = "csrftoken="

const csrfToken = z.string().min(1, {
  message:
    "MONARCH_COOKIE carries no `csrftoken=` value. Monarch matches the X-CSRFToken header " +
    "against that cookie and refuses the pair when they disagree, so the whole Cookie header " +
    "from a signed-in session is wanted here, not one of its parts.",
})

const RING_QUERY = `query RingCounts($backlog: TransactionFilterInput) {
  unreviewed: allTransactions(filters: $backlog) { totalCount }
}`

function monarchHeaders(cookie: string): Record<string, string> {
  const csrf = csrfToken.parse(
    cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(CSRF_PREFIX))
      ?.slice(CSRF_PREFIX.length)
  )
  return {
    "Content-Type": "application/json",
    "Client-Platform": "web",
    Cookie: cookie,
    "X-CSRFToken": csrf,
    Origin: ORIGIN,
    Referer: `${ORIGIN}/`,
  }
}

function windowFilters(
  now: Date,
  days: number
): { search: string; startDate: string; endDate: string } {
  const start = new Date(now.getTime() - days * 86_400_000)
  return {
    search: "",
    startDate: start.toISOString().slice(0, 10),
    endDate: now.toISOString().slice(0, 10),
  }
}

export async function fetchRingCountsFromMonarch(
  cookie: string,
  now: Date = new Date()
): Promise<RingCounts> {
  const year = windowFilters(now, WINDOW_DAYS)
  const response = await fetch(API_URL, {
    method: "POST",
    headers: monarchHeaders(cookie),
    body: JSON.stringify({
      query: RING_QUERY,
      variables: { backlog: { ...year, ...SETTLED_ONLY, needsReview: true } },
    }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    throw new Error(
      `Monarch answered ${response.status} for the ring counts. A session cookie expires ` +
        "and only Alan at a browser can produce another, so this is most likely a dead credential."
    )
  }

  const parsed = ringAnswer.safeParse(await response.json())
  if (!parsed.success) {
    throw new Error(
      "Monarch's answer carried no count where the ring query asks for one. " +
        "A 200 whose body is an error envelope is the shape a refused query arrives in."
    )
  }
  return { unreviewed: parsed.data.data.unreviewed.totalCount }
}

const totalCount = z.object({ totalCount: z.number().int().nonnegative() })
const ringAnswer = z.object({ data: z.object({ unreviewed: totalCount }) })
