import { type CaldataEvent, caldataResponseSchema } from "./schema"

const USER_AGENT = "Mozilla/5.0 (compatible; alanwalton-calendar-sync/1.0; +https://alanwalton.com)"

const WINDOW_DAYS = 30

const DEFAULT_HORIZON_DAYS = 120

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function toDateStr(ms: number): string {
  const d = new Date(ms)
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`
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
