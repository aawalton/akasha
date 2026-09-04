import {
  type MbArtist,
  type MbArtistSearchHit,
  type MbRecording,
  type MbWork,
  mbArtistSchema,
  mbArtistSearchSchema,
  mbRecordingBrowseSchema,
  mbWorkBrowseSchema,
} from "../musicbrainz-schema/musicbrainz-schema.module.code.ts"

const BASE_URL = "https://musicbrainz.org/ws/2"

const USER_AGENT = "temper-collections-music/0.1 ( aawalton@gmail.com )"

export const RATE_LIMIT_MS = 1100

export const BROWSE_PAGE_SIZE = 100

let pending: Promise<void> = Promise.resolve()

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = pending.then(fn)
  pending = result.then(
    () => new Promise((r) => setTimeout(r, RATE_LIMIT_MS)),
    () => new Promise((r) => setTimeout(r, RATE_LIMIT_MS))
  )
  return result
}

async function mbGet(path: string, params: Record<string, string>): Promise<unknown> {
  const query = new URLSearchParams({ ...params, fmt: "json" })
  const url = `${BASE_URL}${path}?${query.toString()}`
  const response = await enqueue(() =>
    fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } })
  )
  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(`MusicBrainz ${response.status} for ${path}: ${body.slice(0, 200)}`)
  }
  return response.json()
}

export async function searchArtist(name: string): Promise<readonly MbArtistSearchHit[]> {
  const raw = await mbGet("/artist", { query: `artist:"${name}"`, limit: "10" })
  return mbArtistSearchSchema.parse(raw).artists
}

export async function getArtist(mbid: string): Promise<MbArtist> {
  const raw = await mbGet(`/artist/${mbid}`, { inc: "genres+tags" })
  return mbArtistSchema.parse(raw)
}

export async function browseWorks(mbid: string): Promise<readonly MbWork[]> {
  const collected: MbWork[] = []
  let offset = 0
  for (;;) {
    const raw = await mbGet("/work", {
      artist: mbid,
      inc: "artist-rels+work-rels",
      limit: String(BROWSE_PAGE_SIZE),
      offset: String(offset),
    })
    const answer = mbWorkBrowseSchema.parse(raw)
    collected.push(...answer.works)
    offset += BROWSE_PAGE_SIZE
    if (offset >= answer["work-count"] || answer.works.length === 0) break
  }
  return collected
}

export async function browseArtistRecordings(mbid: string): Promise<readonly MbRecording[]> {
  const collected: MbRecording[] = []
  let offset = 0
  for (;;) {
    const raw = await mbGet("/recording", {
      artist: mbid,
      inc: "work-rels",
      limit: String(BROWSE_PAGE_SIZE),
      offset: String(offset),
    })
    const answer = mbRecordingBrowseSchema.parse(raw)
    collected.push(...answer.recordings)
    offset += BROWSE_PAGE_SIZE
    if (offset >= answer["recording-count"] || answer.recordings.length === 0) break
  }
  return collected
}
