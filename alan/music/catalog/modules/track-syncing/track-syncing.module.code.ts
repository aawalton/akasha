import {
  identitiesWith,
  idFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import {
  type CatalogueNames,
  catalogueNamesFrom,
  catalogueSlugFor,
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
  slugsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SOURCE = "spotify"

const TRACK = "track"

const SONG = "song"

const RELEASE = "release"

const MINUTES = `${unit.slug}/${minutes.slug}` as const

const NOT_STARTED = "not-started"

const IDENTITY = "externalIdentity"

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

export type Tracked = {
  readonly names: CatalogueNames
  readonly held: ReadonlyMap<string, Value>
  readonly byRelease: Set<string>
}

export type Editing = (pageTypeSlug: string, slug: string, values: Value) => Asking

export function tracksFiledIn(root: string): Tracked {
  const rows: { readonly slug: string; readonly externalId: string | null }[] = []
  const held = new Map<string, Value>()
  const byRelease = new Set<string>()
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    rows.push({ slug, externalId: idFrom(one.value[IDENTITY], SOURCE) })
    held.set(slug, one.value)
    const releaseSlug = slugsIn(one.value["partOfCollections"])[0]
    if (releaseSlug !== undefined) byRelease.add(releaseSlug)
  }
  return { names: catalogueNamesFrom(rows), held, byRelease }
}

export function trackValues(args: {
  readonly releaseSlug: string
  readonly song: string | null
  readonly slug: string
  readonly track: AlbumTrack
  readonly was: Value
  readonly today: string
}): Value {
  return {
    ...args.was,
    ...(args.was["status"] === undefined ? { status: NOT_STARTED } : {}),
    ...(args.was["ownProgress"] === undefined ? { ownProgress: 0 } : {}),
    ...(args.song === null ? {} : { song: `${SONG}/${args.song}` }),
    title: args.track.name,
    trackType: trackTypeFor(args.track.name),
    trackKey: trackKeyFor(args.track),
    partOfCollections: [`${RELEASE}/${args.releaseSlug}`],
    position: args.track.track_number,
    discNumber: args.track.disc_number,
    explicit: args.track.explicit,
    trackArtist: args.track.artists.map((one) => ({
      externalId: one.id,
      artistName: one.name,
    })),
    ownLength: trackMinutes(args.track),
    unit: MINUTES,
    externalIdentity: identitiesWith(args.was[IDENTITY], {
      source: SOURCE,
      externalId: args.track.id,
      externalLink: args.track.external_urls.spotify,
      lastSyncedAt: args.today,
    }),
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
  readonly today: string
  readonly edit: Editing
}): Edited {
  const edits: Asking[] = []
  let tracked = 0
  let filed = 0
  for (const track of args.album.tracks.items) {
    const slug = catalogueSlugFor(args.tracks.names, args.releaseSlug, track.name, track.id)
    const song = songForTrack(args.filing, args.artistSlug, track.name)
    if (song !== null && song.values !== null) {
      edits.push(args.edit(SONG, song.slug, song.values))
      filed += 1
    }
    edits.push(
      args.edit(
        TRACK,
        slug,
        trackValues({
          releaseSlug: args.releaseSlug,
          song: song === null ? null : song.slug,
          slug,
          track,
          was: args.tracks.held.get(slug) ?? {},
          today: args.today,
        })
      )
    )
    tracked += 1
  }
  args.tracks.byRelease.add(args.releaseSlug)
  return { edits, tracked, filed }
}
