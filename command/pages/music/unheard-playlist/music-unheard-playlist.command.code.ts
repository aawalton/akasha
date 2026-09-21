import {
  idFrom,
  linkFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  type Reconciled,
  reconciling,
} from "akasha/alan/music/choosing/modules/playlist-reconciling/playlist-reconciling.module.code.ts"
import {
  type Picked,
  pickingOver,
} from "akasha/alan/music/choosing/modules/unheard-picking/unheard-picking.module.code.ts"
import {
  addTracks,
  heldTracks,
  putTracks,
  removeTracks,
} from "akasha/alan/music/spotify/modules/playlists/spotify-playlists.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { plan } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicUnheardPlaylist as page } from "akasha/command/pages/music/unheard-playlist/music-unheard-playlist.command.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ARTIST = "artist"

const RELEASE = "release"

const TRACK = "track"

const PLAYLIST = "playlist"

const UNHEARD = "unheard"

const SPOTIFY = "spotify"

const IDENTITY = "externalIdentity"

const FOLLOWING = "following"

const NAMED = [json, plan] as const

const NO_PLAYLIST = `the \`${PLAYLIST}/${UNHEARD}\` page names no spotify playlist to keep up to date`

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

function followedIn(root: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of valuesOfType(root, ARTIST)) {
    if (textIn(one.value, "status") !== FOLLOWING) continue
    const slug = textIn(one.value, "slug")
    if (slug !== null) held.add(slug)
  }
  return held
}

function pickedIn(root: string): readonly Picked[] {
  const tracks = valuesOfType(root, TRACK).map((one) => one.value)
  const releases = valuesOfType(root, RELEASE).map((one) => one.value)
  return pickingOver(tracks, releases, followedIn(root))
}

function playlistIn(root: string): Named | null {
  const held = valuedAt(root, PLAYLIST, UNHEARD).value[IDENTITY]
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

export function heldAfter(holding: readonly string[], said: Reconciled): readonly string[] {
  const gone = new Set(said.removing)
  return [...holding.filter((one) => !gone.has(one)), ...said.adding]
}

export function sameOrder(mine: readonly string[], theirs: readonly string[]): boolean {
  if (mine.length !== theirs.length) return false
  return mine.every((one, at) => one === theirs[at])
}

export function wantedIn(kept: Kept): readonly string[] {
  return kept.picked.map((one) => one.trackId)
}

export function outOfOrder(kept: Kept): boolean {
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

async function answered(argv: readonly string[], given: Given, reach: Reach): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const named = playlistIn(given.root)
  if (named === null) return refused(NO_PLAYLIST, DATA)
  const holding = await reach.heldTracks(named.id)
  const kept: Kept = { ...reconciledOver(pickedIn(given.root), holding), link: named.link }
  if (read.taken.plan) return told(read.taken.json ? [jsonOf(kept)] : rowsOf(kept))
  const done = await keepingOver(kept, named.id, reach)
  return told(read.taken.json ? [jsonOf(done)] : rowsOf(done))
}

export async function musicUnheardPlaylist(
  argv: readonly string[],
  given: Given,
  reach: Reach = REACHING
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, reach))
}
