import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import {
  type CatalogueNames,
  catalogueNamesFrom,
  catalogueSlugFor,
  slugSortingFirst,
} from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  type Filing,
  songForTrack,
} from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import { trackTypeFor } from "akasha/alan/music/catalog/modules/track-typing/track-typing.module.code.ts"
import {
  type AlbumTrack,
  type AlbumWithTracks,
  trackMinutes,
} from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  slugsUnder,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TRACK = "track"

const SONG = "song"

const RELEASE = "release"

const UNDER_RELEASE = `${RELEASE}/` as const

const MINUTES = `${unit.slug}/${minutes.slug}` as const

const NOT_STARTED = "not-started"

const CARRIED_BY = "carriedBy"

const PART_OF = "partOfCollections"

const TRACK_KEY = "trackKey"

const EXTERNAL_ID = "externalId"

const ARTIST = "artist"

const UNDER_ARTIST = `${ARTIST}/` as const

const IDENTITY = "externalIdentity"

const SPOTIFY = "spotify"

const APART = "|"

const BETWEEN = ","

const LOOSE = /[^a-z0-9]+/gu

export function trackKeyFor(track: AlbumTrack): string {
  const title = track.name.normalize("NFKD").toLowerCase().replace(LOOSE, "")
  const artists = track.artists
    .map((one) => one.id)
    .toSorted()
    .join(BETWEEN)
  return [title, artists, String(track.duration_ms)].join(APART)
}

function carrierFor(releaseSlug: string, track: AlbumTrack): Value {
  return {
    release: `${UNDER_RELEASE}${releaseSlug}`,
    discNumber: track.disc_number,
    position: track.track_number,
    externalId: track.id,
    externalLink: track.external_urls.spotify,
  }
}

function carriersWith(held: unknown, fresh: Value): readonly Value[] {
  const named = textIn(fresh, RELEASE)
  const kept = recordsIn(held).filter((one) => textIn(one, RELEASE) !== named)
  return [...kept, fresh].toSorted((mine, theirs) => {
    const left = textIn(mine, RELEASE) ?? ""
    const right = textIn(theirs, RELEASE) ?? ""
    return left < right ? -1 : left > right ? 1 : 0
  })
}

function collectionsWith(held: unknown, named: string): readonly string[] {
  const kept = Array.isArray(held)
    ? held.filter((one): one is string => typeof one === "string" && one !== "")
    : []
  return kept.includes(named) ? kept : [...kept, named]
}

export type Tracked = {
  readonly names: CatalogueNames
  readonly held: Map<string, Value>
  readonly byRelease: Map<string, number>
  readonly byKey: Map<string, string>
  readonly artists: ReadonlyMap<string, string>
}

export type Editing = (pageTypeSlug: string, slug: string, values: Value) => Asking

function artistsFiledIn(root: string): ReadonlyMap<string, string> {
  const bySpotify = new Map<string, string>()
  for (const one of valuesOfType(root, ARTIST)) {
    const slug = textIn(one.value, "slug")
    const said = idFrom(one.value[IDENTITY], SPOTIFY)
    if (slug === null || said === null) continue
    bySpotify.set(said, slugSortingFirst(bySpotify.get(said) ?? null, slug))
  }
  return bySpotify
}

export function creditFor(
  artists: ReadonlyMap<string, string>,
  spotifyId: string | null,
  name: string
): Value {
  const slug = spotifyId === null ? undefined : artists.get(spotifyId)
  return slug === undefined ? { artistName: name } : { artist: `${UNDER_ARTIST}${slug}` }
}

export function tracksFiledIn(root: string): Tracked {
  const rows: { readonly slug: string; readonly externalId: string | null }[] = []
  const held = new Map<string, Value>()
  const byRelease = new Map<string, number>()
  const byKey = new Map<string, string>()
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    rows.push({ slug, externalId: null })
    for (const carrier of recordsIn(one.value[CARRIED_BY])) {
      rows.push({ slug, externalId: textIn(carrier, EXTERNAL_ID) })
    }
    held.set(slug, one.value)
    for (const said of slugsUnder(one.value[PART_OF], UNDER_RELEASE)) {
      byRelease.set(said, (byRelease.get(said) ?? 0) + 1)
    }
    const key = textIn(one.value, TRACK_KEY)
    if (key === null) continue
    byKey.set(key, slugSortingFirst(byKey.get(key) ?? null, slug))
  }
  return { names: catalogueNamesFrom(rows), held, byRelease, byKey, artists: artistsFiledIn(root) }
}

function trackSlugFor(tracks: Tracked, releaseSlug: string, track: AlbumTrack): string {
  const key = trackKeyFor(track)
  const filed = tracks.names.filed.get(track.id) ?? tracks.byKey.get(key)
  if (filed !== undefined) {
    tracks.names.filed.set(track.id, filed)
    if (!tracks.byKey.has(key)) tracks.byKey.set(key, filed)
    return filed
  }
  const minted = catalogueSlugFor(tracks.names, releaseSlug, track.name, track.id)
  tracks.byKey.set(key, minted)
  return minted
}

export function trackValues(args: {
  readonly releaseSlug: string
  readonly song: string | null
  readonly slug: string
  readonly track: AlbumTrack
  readonly was: Value
  readonly artists: ReadonlyMap<string, string>
}): Value {
  return {
    ...args.was,
    ...(args.was["status"] === undefined ? { status: NOT_STARTED } : {}),
    ...(args.was["ownProgress"] === undefined ? { ownProgress: 0 } : {}),
    ...(args.song === null ? {} : { song: `${SONG}/${args.song}` }),
    title: args.track.name,
    trackType: trackTypeFor(args.track.name),
    trackKey: trackKeyFor(args.track),
    partOfCollections: collectionsWith(args.was[PART_OF], `${UNDER_RELEASE}${args.releaseSlug}`),
    explicit: args.track.explicit,
    trackArtist: args.track.artists.map((one) => creditFor(args.artists, one.id, one.name)),
    ownLength: trackMinutes(args.track),
    unit: MINUTES,
    carriedBy: carriersWith(args.was[CARRIED_BY], carrierFor(args.releaseSlug, args.track)),
    type: TRACK,
    slug: args.slug,
  }
}

export type Edited = {
  readonly edits: readonly Asking[]
  readonly tracked: number
  readonly filed: number
}

export function trackEdits(args: {
  readonly releaseSlug: string
  readonly artistSlug: string
  readonly filing: Filing
  readonly album: AlbumWithTracks
  readonly tracks: Tracked
  readonly edit: Editing
}): Edited {
  const edits: Asking[] = []
  const carried = new Set<string>()
  let tracked = 0
  let filed = 0
  for (const track of args.album.tracks.items) {
    const slug = trackSlugFor(args.tracks, args.releaseSlug, track)
    carried.add(slug)
    const song = songForTrack(args.filing, args.artistSlug, track.name)
    if (song !== null && song.values !== null) {
      edits.push(args.edit(SONG, song.slug, song.values))
      filed += 1
    }
    const values = trackValues({
      releaseSlug: args.releaseSlug,
      song: song === null ? null : song.slug,
      slug,
      track,
      was: args.tracks.held.get(slug) ?? {},
      artists: args.tracks.artists,
    })
    args.tracks.held.set(slug, values)
    edits.push(args.edit(TRACK, slug, values))
    tracked += 1
  }
  args.tracks.byRelease.set(args.releaseSlug, carried.size)
  return { edits, tracked, filed }
}
