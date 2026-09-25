const PAGE_QUERY_TIMES = ["now", "eso-day", "eso-day-next", "day"] as const

type PageQueryTime = (typeof PAGE_QUERY_TIMES)[number]

export function pageQueryTimeIn(text: string): PageQueryTime | null {
  return PAGE_QUERY_TIMES.find((one) => one === text) ?? null
}
