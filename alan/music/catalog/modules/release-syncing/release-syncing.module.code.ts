import {
  identitiesWith,
  idFrom,
  syncedFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import {
  type CatalogueNames,
  catalogueNamesFrom,
  catalogueSlugFor,
  slugifyName,
} from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { filingIn } from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import {
  type Tracked,
  trackEdits,
  tracksFiledIn,
} from "akasha/alan/music/catalog/modules/track-syncing/track-syncing.module.code.ts"
import {
  type Album,
  type AlbumWithTracks,
  albumMinutes,
  getAlbum,
  getArtistAlbums,
} from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  slugsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { recordingRun } from "akasha/story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/modules/sync-run-recording/sync-run-recording.module.code.ts"
import {
  daysAgoYYYYMMDD,
  todayYYYYMMDD,
} from "akasha/text/writing/modules/today/today.module.code.ts"

export const SOURCE = "spotify"

const ARTIST = "artist"

const RELEASE = "release"

const FOLLOWING = "following"

const MINUTES = `${unit.slug}/${minutes.slug}` as const

const NOT_STARTED = "not-started"

const DAY = "day"

const IDENTITY = "externalIdentity"

const SAID = "[spotify-sync]"

export const DUE_AFTER_DAYS = 30

export type Reach = {
  readonly getArtistAlbums: (artistId: string) => Promise<readonly Album[]>
  readonly getAlbum: (albumId: string) => Promise<AlbumWithTracks>
}

export const REACHING: Reach = { getArtistAlbums, getAlbum }

export type Counts = {
  readonly created: number
  readonly updated: number
  readonly skipped: number
  readonly tracked: number
  readonly backfilled: number
  readonly filed: number
  readonly failed: number
}

export type Followed = {
  readonly slug: string
  readonly title: string
  readonly artistId: string
  readonly was: Value
}

export type Filed = {
  readonly names: CatalogueNames
  readonly held: ReadonlyMap<string, Value>
  readonly byTitle: ReadonlyMap<string, string>
}

export type Asked = {
  readonly album: Album
  readonly slug: string
  readonly was: Value
}

export type Taken = {
  readonly only: string | null
  readonly limit: number | null
  readonly dryRun: boolean
}

export function taken(argv: readonly string[]): Taken {
  const named = argv.indexOf("--only")
  const capped = argv.indexOf("--limit")
  const said = capped === -1 ? null : Number(argv[capped + 1])
  return {
    only: named === -1 ? null : (argv[named + 1] ?? null),
    limit: said === null || !Number.isInteger(said) || said < 1 ? null : said,
    dryRun: argv.includes("--dry-run"),
  }
}

export function followedIn(root: string): readonly Followed[] {
  const rows: Followed[] = []
  for (const one of valuesOfType(root, ARTIST)) {
    if (textIn(one.value, "status") !== FOLLOWING) continue
    const slug = textIn(one.value, "slug")
    const artistId = idFrom(one.value[IDENTITY], SOURCE)
    if (slug === null || artistId === null) continue
    rows.push({ slug, title: textIn(one.value, "title") ?? slug, artistId, was: one.value })
  }
  return [...rows].sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0))
}

export function syncedAt(one: Followed): string | null {
  return syncedFrom(one.was[IDENTITY], SOURCE)
}

export function dueIn(every: readonly Followed[], since: string): readonly Followed[] {
  const due = every.filter((one) => {
    const at = syncedAt(one)
    return at === null || at < since
  })
  return [...due].sort((a, b) => {
    const left = syncedAt(a) ?? ""
    const right = syncedAt(b) ?? ""
    if (left !== right) return left < right ? -1 : 1
    return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0
  })
}

export function shareOf(followed: number): number {
  return Math.max(1, Math.ceil(followed / DUE_AFTER_DAYS))
}

export function titleKey(artistSlug: string, title: string): string {
  return `${artistSlug}|${slugifyName(title)}`
}

export function artistIn(value: Value): string | null {
  return slugsIn(value["partOfCollections"])[0] ?? null
}

export function filedIn(root: string): Filed {
  const rows: { readonly slug: string; readonly externalId: string | null }[] = []
  const held = new Map<string, Value>()
  const byTitle = new Map<string, string>()
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    rows.push({ slug, externalId: idFrom(one.value[IDENTITY], SOURCE) })
    held.set(slug, one.value)
    const artistSlug = artistIn(one.value)
    const title = textIn(one.value, "title")
    if (artistSlug === null || title === null) continue
    const key = titleKey(artistSlug, title)
    if (!byTitle.has(key)) byTitle.set(key, slug)
  }
  return { names: catalogueNamesFrom(rows), held, byTitle }
}

export function slugFor(filed: Filed, artistSlug: string, album: Album): string {
  const byId = filed.names.filed.get(album.id)
  if (byId !== undefined) return byId
  const byTitle = filed.byTitle.get(titleKey(artistSlug, album.name))
  if (byTitle !== undefined) return byTitle
  return catalogueSlugFor(filed.names, artistSlug, album.name, album.id)
}

export function unfiledIn(
  filed: Filed,
  artistSlug: string,
  albums: readonly Album[],
  room: number | null
): {
  readonly asked: readonly Asked[]
  readonly settled: readonly Asked[]
  readonly skipped: number
} {
  const asked: Asked[] = []
  const settled: Asked[] = []
  for (const album of albums) {
    const slug = slugFor(filed, artistSlug, album)
    const was = filed.held.get(slug)
    if (was !== undefined && idFrom(was[IDENTITY], SOURCE) === album.id) {
      settled.push({ album, slug, was })
      continue
    }
    if (room !== null && asked.length >= room) break
    asked.push({ album, slug, was: was ?? {} })
  }
  return { asked, settled, skipped: settled.length }
}

export function publishedDayOf(album: Album): string | null {
  return album.release_date_precision === DAY ? album.release_date : null
}

export function releaseValues(args: {
  readonly artistSlug: string
  readonly slug: string
  readonly album: AlbumWithTracks
  readonly was: Value
  readonly today: string
}): Value {
  const day = publishedDayOf(args.album)
  return {
    ...args.was,
    ...(args.was["status"] === undefined ? { status: NOT_STARTED } : {}),
    ...(args.was["ownProgress"] === undefined ? { ownProgress: 0 } : {}),
    ...(day === null ? {} : { publishedAt: day }),
    title: args.album.name,
    partOfCollections: [`${ARTIST}/${args.artistSlug}`],
    position: 0,
    ownLength: albumMinutes(args.album),
    unit: MINUTES,
    externalIdentity: identitiesWith(args.was[IDENTITY], {
      source: SOURCE,
      externalId: args.album.id,
      externalLink: args.album.external_urls.spotify,
      lastSyncedAt: args.today,
    }),
    type: RELEASE,
    slug: args.slug,
  }
}

export function artistValues(one: Followed, today: string): Value {
  return {
    ...one.was,
    externalIdentity: identitiesWith(one.was[IDENTITY], {
      source: SOURCE,
      externalId: one.artistId,
      externalLink: `https://open.spotify.com/artist/${one.artistId}`,
      lastSyncedAt: today,
    }),
    type: ARTIST,
    slug: one.slug,
  }
}

export function sweepingIn(
  every: readonly Followed[],
  held: Taken,
  since: string
): readonly Followed[] {
  if (held.only !== null) return every.filter((one) => one.slug === held.only)
  return dueIn(every, since).slice(0, shareOf(every.length))
}

export async function syncReleases(
  root: string,
  held: Taken,
  reach: Reach,
  landing: Landing | null,
  today: string,
  since: string
): Promise<Counts> {
  const every = followedIn(root)
  if (every.length === 0) {
    throw new Error(
      `no \`${ARTIST}\` is both followed and named by \`${SOURCE}\`, which no catalogue of Alan's is true of`
    )
  }
  const sweeping = sweepingIn(every, held, since)
  if (held.only !== null && sweeping.length === 0) {
    throw new Error(`\`--only\` names \`${held.only}\`, and no followed artist is filed under it`)
  }
  const filed = filedIn(root)
  const tracks: Tracked = tracksFiledIn(root)
  const filing = filingIn(root)
  const source = sourceFor(root)
  const editing = (pageTypeSlug: string, slug: string, values: Value): Asking =>
    composedEdit(root, pageTypeSlug, slug, values, source)
  let created = 0
  let updated = 0
  let skipped = 0
  let tracked = 0
  let backfilled = 0
  let songsFiled = 0
  let failed = 0
  for (const one of sweeping) {
    const room = held.limit === null ? null : held.limit - created
    if (room !== null && room <= 0) break
    try {
      const albums = await reach.getArtistAlbums(one.artistId)
      const unfiled = unfiledIn(filed, one.slug, albums, room)
      const changes: Asking[] = [
        composedEdit(root, ARTIST, one.slug, artistValues(one, today), source),
      ]
      let tracking = 0
      let filedHere = 0
      for (const asked of unfiled.asked) {
        const whole = await reach.getAlbum(asked.album.id)
        changes.push(
          composedEdit(
            root,
            RELEASE,
            asked.slug,
            releaseValues({
              artistSlug: one.slug,
              slug: asked.slug,
              album: whole,
              was: asked.was,
              today,
            }),
            source
          )
        )
        const edits = trackEdits({
          releaseSlug: asked.slug,
          artistSlug: one.slug,
          filing,
          album: whole,
          tracks,
          today,
          edit: editing,
        })
        changes.push(...edits.edits)
        tracking += edits.tracked
        filedHere += edits.filed
      }
      let filling = 0
      for (const behind of unfiled.settled) {
        if (tracks.byRelease.has(behind.slug)) continue
        const left = held.limit === null ? null : held.limit - backfilled - filling
        if (left !== null && left <= 0) break
        const whole = await reach.getAlbum(behind.album.id)
        const edits = trackEdits({
          releaseSlug: behind.slug,
          artistSlug: one.slug,
          filing,
          album: whole,
          tracks,
          today,
          edit: editing,
        })
        changes.push(...edits.edits)
        tracking += edits.tracked
        filedHere += edits.filed
        filling += 1
      }
      if (landing !== null) {
        const landed = await landing(
          root,
          changes,
          `file ${unfiled.asked.length} spotify release(s), backfill ${filling}, and file ${tracking} track(s) and ${filedHere} song(s) for ${one.title}`
        )
        const wrong = refusalsIn(landed)
        if (wrong.length > 0) throw new Error(wrong.join("; "))
      }
      created += unfiled.asked.filter((each) => Object.keys(each.was).length === 0).length
      updated += unfiled.asked.filter((each) => Object.keys(each.was).length > 0).length
      skipped += unfiled.skipped
      tracked += tracking
      backfilled += filling
      songsFiled += filedHere
    } catch (thrown) {
      failed += 1
      console.error(`${SAID} ${one.slug}:`, thrown instanceof Error ? thrown.message : thrown)
    }
  }
  return { created, updated, skipped, tracked, backfilled, filed: songsFiled, failed }
}

export async function main(argv: readonly string[]): Promise<number> {
  const root = akashaRoot()
  const held = taken(argv)
  const running = (): Promise<Counts> =>
    syncReleases(
      root,
      held,
      REACHING,
      held.dryRun ? null : runMechanicalChange,
      todayYYYYMMDD(),
      daysAgoYYYYMMDD(DUE_AFTER_DAYS)
    )
  const counts = held.dryRun ? await running() : await recordingRun(SOURCE, running)
  console.log(
    `${SAID} swept ${counts.created + counts.updated + counts.skipped} release(s) · filed ${counts.created} · restamped ${counts.updated} · already filed ${counts.skipped} · backfilled ${counts.backfilled} · tracks ${counts.tracked} · songs ${counts.filed} · failed ${counts.failed}`
  )
  return counts.failed > 0 ? 1 : 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
