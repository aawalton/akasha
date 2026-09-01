import {
  type Asked,
  askNamed,
  askTaking,
  type Written,
  writePage,
  writeRow,
} from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { personaRecipeRows } from "./persona-recipe-rows"
import {
  HEARD_BY_SPOTIFY_ID_QUERY,
  HEARD_BY_TITLE_KEY_QUERY,
  HEARD_MUSIC_SLUG,
  HEARD_SOURCES,
  HEARD_TRACK_SLUG,
  MUSIC_DAY_SLUG,
  NEWEST_PLAY_QUERY,
  PLAY_BY_KEY_QUERY,
  SONG_LISTEN_SLUG,
} from "./page-types"
import {
  buildPlayRow,
  heardKeyOf,
  isFirstListen,
  type PlayInput,
  playKeyOf,
  resumeCursorMs,
} from "./play-row"
import { parseProviderTrack } from "./provider-track"
import { getRecentlyPlayed, type PlayHistory } from "../spotify-reads"

const MAX_RECENTLY_PLAYED = 50

const POINTS_SOURCE = SONG_LISTEN_SLUG

const BY = "music-listening-capture"

export interface CaptureResult {
  readonly personaId: string
  readonly personaTitle: string
  readonly fetched: number
  readonly recorded: number
  readonly alreadyRecorded: number
  readonly firstListens: number
  readonly primed: boolean
  readonly skippedUnidentified: number
  readonly newMusicMinutes: number
}

interface Persona {
  readonly id: string
  readonly title: string
  readonly slug: string
}

export async function resolveListeningPersona(): Promise<Persona> {
  const rows = (await personaRecipeRows()).filter((r) => r.pointsSource === POINTS_SOURCE)
  if (rows.length > 1) {
    const titles = rows.map((r) => r.title ?? r.id).join(", ")
    throw new Error(`more than one persona declares pointsSource="${POINTS_SOURCE}": ${titles}`)
  }
  const row = rows[0]
  if (row === undefined) {
    throw new Error(
      `no persona declares pointsSource="${POINTS_SOURCE}"; set her recipe before capturing`
    )
  }
  const id = String(row.id)
  const slug = typeof row.slug === "string" ? row.slug : ""
  if (slug === "")
    throw new Error(`the persona holding pointsSource="${POINTS_SOURCE}" has no slug`)
  return { id, title: typeof row.title === "string" ? row.title : id, slug }
}

export async function resolveHeardLedger(): Promise<string> {
  const asked = await askComposed({
    "page-type": HEARD_MUSIC_SLUG,
    keys: ["id", "slug"],
    limit: 1000,
  })
  if (!asked.ok) throw new Error(`resolveHeardLedger: ${asked.why}`)
  const named = asked.answer.rows
    .map((row) => row.values.slug)
    .filter((slug): slug is string => typeof slug === "string")
  const only = named.length === 1 ? named[0] : undefined
  if (only === undefined) {
    throw new Error(
      `capture writes one \`${HEARD_MUSIC_SLUG}\` ledger and found ${named.length}: ${named.join(", ")}`
    )
  }
  return only
}

function answered(asked: Asked, what: string): Asked & { readonly ok: true } {
  if (!asked.ok) throw new Error(`${what} went unread: ${asked.why}`)
  return asked
}

function landed(written: Written, what: string): undefined {
  if (!written.ok) throw new Error(`${what} did not land: ${written.why}`)
  return undefined
}

export async function newestStoredPlayedAt(): Promise<string | null> {
  const asked = answered(await askNamed(NEWEST_PLAY_QUERY), NEWEST_PLAY_QUERY)
  const row = asked.answer.rows[0]
  if (row === undefined) return null
  const at = row.values["played-at"]
  return typeof at === "string" ? at : null
}

export function readPlay(item: PlayHistory): PlayInput | null {
  const track = parseProviderTrack(item.track)
  if (track === null) return null
  return {
    trackId: track.id,
    trackName: track.name,
    artistName: track.artistName,
    playedAt: item.played_at,
    durationMs: track.durationMs,
  }
}

async function isAlreadyRecorded(key: string): Promise<boolean> {
  const asked = answered(await askTaking(PLAY_BY_KEY_QUERY, { "play-key": key }), PLAY_BY_KEY_QUERY)
  return asked.answer.rows.length > 0
}

async function isAlreadyHeard(trackId: string, titleKey: string): Promise<boolean> {
  const byId = answered(
    await askTaking(HEARD_BY_SPOTIFY_ID_QUERY, { "spotify-track-id": trackId }),
    HEARD_BY_SPOTIFY_ID_QUERY
  )
  if (byId.answer.rows.length > 0) return true
  const byTitle = answered(
    await askTaking(HEARD_BY_TITLE_KEY_QUERY, { "title-key": titleKey }),
    HEARD_BY_TITLE_KEY_QUERY
  )
  return byTitle.answer.rows.length > 0
}

async function markHeard(ledger: string, play: PlayInput, priming: boolean): Promise<boolean> {
  const titleKey = heardKeyOf(play.trackName, play.artistName)
  if (await isAlreadyHeard(play.trackId, titleKey)) return isFirstListen(priming, true)

  landed(
    await writeRow(
      HEARD_TRACK_SLUG,
      ledger,
      {
        id: Bun.randomUUIDv7(),
        title: play.trackName === "" ? play.trackId : play.trackName,
        "spotify-track-id": play.trackId,
        "title-key": titleKey,
        "track-name": play.trackName,
        "artist-name": play.artistName,
        "first-heard-at": play.playedAt,
        "heard-source": priming ? HEARD_SOURCES.seedPriorWindow : HEARD_SOURCES.observed,
      },
      BY
    ),
    `the heard track ${titleKey}`
  )
  return isFirstListen(priming, false)
}

async function standingDay(day: string, held: Set<string>): Promise<void> {
  if (held.has(day)) return
  const asked = await askComposed({
    "page-type": MUSIC_DAY_SLUG,
    where: { slug: { is: day } },
    limit: 1,
    keys: ["id"],
  })
  if (!asked.ok) throw new Error(`standingDay(${day}): ${asked.why}`)
  if (asked.answer.rows.length === 0) {
    landed(
      await writePage(MUSIC_DAY_SLUG, day, { id: Bun.randomUUIDv7(), title: day, slug: day }, BY),
      `the music day ${day}`
    )
  }
  held.add(day)
}

export async function captureListening(): Promise<CaptureResult> {
  const persona = await resolveListeningPersona()
  const ledger = await resolveHeardLedger()
  const newestStored = await newestStoredPlayedAt()
  const priming = newestStored === null
  const after = resumeCursorMs(newestStored)
  const page = await getRecentlyPlayed({
    limit: MAX_RECENTLY_PLAYED,
    ...(after === undefined ? {} : { after }),
  })

  const oldestFirst = [...page.items].sort((a, b) => a.played_at.localeCompare(b.played_at))

  const days = new Set<string>()
  let recorded = 0
  let alreadyRecorded = 0
  let firstListens = 0
  let skippedUnidentified = 0
  let newMusicMinutes = 0

  for (const item of oldestFirst) {
    const play = readPlay(item)
    if (play === null) {
      skippedUnidentified += 1
      continue
    }
    if (await isAlreadyRecorded(playKeyOf(play.trackId, play.playedAt))) {
      alreadyRecorded += 1
      continue
    }
    const firstListen = await markHeard(ledger, play, priming)
    const row = buildPlayRow(play, firstListen)
    await standingDay(row.date, days)
    landed(
      await writeRow(
        SONG_LISTEN_SLUG,
        row.date,
        {
          id: Bun.randomUUIDv7(),
          title: `${row.trackName} — ${row.date}`,
          date: row.date,
          "played-at": row.playedAt,
          "play-key": row.playKey,
          "spotify-track-id": row.spotifyTrackId,
          "track-name": row.trackName,
          "artist-name": row.artistName,
          minutes: row.minutes,
          "first-listen": row.firstListen,
          "new-music-minutes": row.newMusicMinutes,
          "persona-slug": persona.slug,
        },
        BY
      ),
      `the play ${row.playKey}`
    )
    recorded += 1
    if (firstListen) firstListens += 1
    newMusicMinutes += row.newMusicMinutes
  }

  return {
    personaId: persona.id,
    personaTitle: persona.title,
    fetched: page.items.length,
    primed: priming,
    recorded,
    alreadyRecorded,
    firstListens,
    skippedUnidentified,
    newMusicMinutes: Number(newMusicMinutes.toFixed(3)),
  }
}
