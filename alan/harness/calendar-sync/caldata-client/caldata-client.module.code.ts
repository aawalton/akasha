import {
  type CaldataEvent,
  caldataResponseSchema,
} from "../caldata-schema/caldata-schema.module.code.ts"

const USER_AGENT = "Mozilla/5.0 (compatible; alanwalton-calendar-sync/1.0; +https://alanwalton.com)"

const WINDOW_DAYS = 30

const DEFAULT_HORIZON_DAYS = 120

function toDateStr(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}

function buildCaldataUrl(baseUrl: string, date: string, days: number): string {
  const req = JSON.stringify({
    private: false,
    date,
    days,
    locations: [],
    ages: [],
    types: [],
  })
  const base = baseUrl.replace(/\/+$/, "")
  return `${base}/eeventcaldata?event_type=0&req=${encodeURIComponent(req)}`
}

export async function fetchCaldataWindow(
  baseUrl: string,
  date: string,
  days: number
): Promise<readonly CaldataEvent[]> {
  const url = buildCaldataUrl(baseUrl, date, days)
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  })
  if (!res.ok) {
    throw new Error(
      `eeventcaldata fetch failed (${res.status} ${res.statusText}) for ${date}+${days}d`
    )
  }
  return caldataResponseSchema.parse(await res.json())
}

export type FetchAllOptions = {
  fromMs: number
  horizonDays?: number
  windowDays?: number
}

export async function fetchAllEvents(
  baseUrl: string,
  options: FetchAllOptions
): Promise<readonly CaldataEvent[]> {
  const horizon = options.horizonDays ?? DEFAULT_HORIZON_DAYS
  const window = options.windowDays ?? WINDOW_DAYS
  const byId = new Map<string, CaldataEvent>()
  for (let offset = 0; offset < horizon; offset += window) {
    const date = toDateStr(options.fromMs + offset * 86_400_000)
    const days = Math.min(window, horizon - offset)
    const events = await fetchCaldataWindow(baseUrl, date, days)
    for (const event of events) byId.set(event.id, event)
  }
  return [...byId.values()]
}
