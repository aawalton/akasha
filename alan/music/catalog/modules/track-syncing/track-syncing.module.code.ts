import {
  identitiesWith,
  idFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  type CatalogueNames,
  catalogueNamesFrom,
  catalogueSlugFor,
} from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { songSlugFor } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
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

const MINUTES = "unit/minutes"

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
  readonly artistSlug: string
  readonly songs: ReadonlyMap<string, string>
  readonly slug: string
  readonly track: AlbumTrack
  readonly was: Value
  readonly today: string
}): Value {
  const song = songSlugFor(args.songs, args.artistSlug, args.track.name)
  return {
    ...args.was,
    ...(args.was["status"] === undefined ? { status: NOT_STARTED } : {}),
    ...(args.was["ownProgress"] === undefined ? { ownProgress: 0 } : {}),
    ...(song === null ? {} : { song: `${SONG}/${song}` }),
    title: args.track.name,
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

export function trackEdits(args: {
  readonly releaseSlug: string
  readonly artistSlug: string
  readonly songs: ReadonlyMap<string, string>
  readonly album: AlbumWithTracks
  readonly tracks: Tracked
  readonly today: string
  readonly edit: Editing
}): readonly Asking[] {
  const edits: Asking[] = []
  for (const track of args.album.tracks.items) {
    const slug = catalogueSlugFor(args.tracks.names, args.releaseSlug, track.name, track.id)
    edits.push(
      args.edit(
        TRACK,
        slug,
        trackValues({
          releaseSlug: args.releaseSlug,
          artistSlug: args.artistSlug,
          songs: args.songs,
          slug,
          track,
          was: args.tracks.held.get(slug) ?? {},
          today: args.today,
        })
      )
    )
  }
  args.tracks.byRelease.add(args.releaseSlug)
  return edits
}
