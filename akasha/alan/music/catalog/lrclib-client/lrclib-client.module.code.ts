import {
  type LrclibRecord,
  lrclibSearchSchema,
} from "../lrclib-schema/lrclib-schema.module.code.ts"

const BASE_URL = "https://lrclib.net/api"

const USER_AGENT = "temper-collections-music/0.1 ( aawalton@gmail.com )"

export const RATE_LIMIT_MS = 250

let pending: Promise<void> = Promise.resolve()

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = pending.then(fn)
  pending = result.then(
    () => new Promise((r) => setTimeout(r, RATE_LIMIT_MS)),
    () => new Promise((r) => setTimeout(r, RATE_LIMIT_MS))
  )
  return result
}

export async function searchLyrics(
  trackName: string,
  artistName: string
): Promise<readonly LrclibRecord[]> {
  const query = new URLSearchParams({ track_name: trackName, artist_name: artistName })
  const url = `${BASE_URL}/search?${query.toString()}`
  const response = await enqueue(() =>
    fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } })
  )
  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(`LRCLIB ${response.status} for /search: ${body.slice(0, 200)}`)
  }
  return lrclibSearchSchema.parse(await response.json())
}
