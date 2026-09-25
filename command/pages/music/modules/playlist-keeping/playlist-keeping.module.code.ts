import {
  idFrom,
  linkFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  type Reconciled,
  reconciling,
} from "akasha/alan/music/choosing/modules/playlist-reconciling/playlist-reconciling.module.code.ts"
import type { Picked } from "akasha/alan/music/choosing/modules/track-picking/track-picking.module.code.ts"
import {
  addTracks,
  heldTracks,
  putTracks,
  removeTracks,
} from "akasha/alan/music/spotify/modules/playlists/spotify-playlists.module.code.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ARTIST = "artist"

const RELEASE = "release"

const TRACK = "track"

const PLAYLIST = "playlist"

const SPOTIFY = "spotify"

const IDENTITY = "externalIdentity"

const FOLLOWING = "following"

export type Reach = {
  readonly heldTracks: typeof heldTracks
  readonly addTracks: typeof addTracks
  readonly removeTracks: typeof removeTracks
  readonly putTracks: typeof putTracks
}

export const REACHING: Reach = { heldTracks, addTracks, removeTracks, putTracks }

type Named = {
  readonly id: string
  readonly link: string | null
}

export type Kept = {
  readonly picked: readonly Picked[]
  readonly artists: number
  readonly link: string | null
  readonly said: Reconciled
  readonly holding: readonly string[]
  readonly added: number
  readonly removed: number
  readonly ordered: number
}

type Picking = (
  tracks: readonly Value[],
  releases: readonly Value[],
  followed: ReadonlySet<string>
) => readonly Picked[]

export function noPlaylistAt(slug: string): string {
  return `the \`${PLAYLIST}/${slug}\` page names no spotify playlist to keep up to date`
}

function followedIn(root: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of valuesOfType(root, ARTIST)) {
    if (textIn(one.value, "status") !== FOLLOWING) continue
    const slug = textIn(one.value, "slug")
    if (slug !== null) held.add(slug)
  }
  return held
}

function pickedFor(root: string, picking: Picking): readonly Picked[] {
  const tracks = valuesOfType(root, TRACK).map((one) => one.value)
  const releases = valuesOfType(root, RELEASE).map((one) => one.value)
  return picking(tracks, releases, followedIn(root))
}

function playlistIn(root: string, slug: string): Named | null {
  const held = valuedAt(root, PLAYLIST, slug).value[IDENTITY]
  const id = idFrom(held, SPOTIFY)
  return id === null ? null : { id, link: linkFrom(held, SPOTIFY) }
}

export function artistsIn(picked: readonly Picked[]): number {
  return new Set(picked.map((one) => one.artistSlug)).size
}

export function rowsOf(kept: Kept): readonly string[] {
  const rows = [
    `tracks\t${kept.picked.length}`,
    `artists\t${kept.artists}`,
    `adding\t${kept.said.adding.length}`,
    `removing\t${kept.said.removing.length}`,
    `kept\t${kept.said.keeping.length}`,
    `added\t${kept.added}`,
    `removed\t${kept.removed}`,
    `ordered\t${kept.ordered}`,
  ]
  if (kept.link !== null) rows.push(`link\t${kept.link}`)
  return rows
}

export function jsonOf(kept: Kept): string {
  return JSON.stringify({
    tracks: kept.picked.length,
    artists: kept.artists,
    adding: kept.said.adding.length,
    removing: kept.said.removing.length,
    kept: kept.said.keeping.length,
    added: kept.added,
    removed: kept.removed,
    ordered: kept.ordered,
    link: kept.link,
    titles: kept.picked.map((one) => `${one.artistSlug} — ${one.title}`),
  })
}

function heldAfter(holding: readonly string[], said: Reconciled): readonly string[] {
  const gone = new Set(said.removing)
  return [...holding.filter((one) => !gone.has(one)), ...said.adding]
}

function sameOrder(mine: readonly string[], theirs: readonly string[]): boolean {
  if (mine.length !== theirs.length) return false
  return mine.every((one, at) => one === theirs[at])
}

function wantedIn(kept: Kept): readonly string[] {
  return kept.picked.map((one) => one.trackId)
}

function outOfOrder(kept: Kept): boolean {
  return !sameOrder(wantedIn(kept), heldAfter(kept.holding, kept.said))
}

export async function keepingOver(kept: Kept, playlistId: string, reach: Reach): Promise<Kept> {
  const removed = await reach.removeTracks(playlistId, kept.said.removing)
  const added = await reach.addTracks(playlistId, kept.said.adding)
  const wanted = wantedIn(kept)
  const ordered = outOfOrder(kept) ? await reach.putTracks(playlistId, wanted) : 0
  return { ...kept, added, removed, ordered }
}

export function reconciledOver(picked: readonly Picked[], holding: readonly string[]): Kept {
  return {
    picked,
    artists: artistsIn(picked),
    link: null,
    holding,
    said: reconciling(
      picked.map((one) => one.trackId),
      holding
    ),
    added: 0,
    removed: 0,
    ordered: 0,
  }
}

export async function keptOver(
  root: string,
  slug: string,
  picking: Picking,
  planning: boolean,
  reach: Reach
): Promise<Kept | null> {
  const named = playlistIn(root, slug)
  if (named === null) return null
  const holding = await reach.heldTracks(named.id)
  const kept: Kept = { ...reconciledOver(pickedFor(root, picking), holding), link: named.link }
  return planning ? kept : await keepingOver(kept, named.id, reach)
}
