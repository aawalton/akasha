import {
  type Picked,
  pickingOver,
} from "akasha/alan/music/choosing/modules/unheard-picking/unheard-picking.module.code.ts"
import {
  addTracks,
  createPlaylist,
  type Playlist,
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
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { todayYYYYMMDD } from "akasha/text/writing/modules/today/today.module.code.ts"

const ARTIST = "artist"

const RELEASE = "release"

const TRACK = "track"

const FOLLOWING = "following"

const NAMED = [json, plan] as const

const NOTHING = "every track a followed artist made is heard, so no playlist was made"

export type Reach = {
  readonly createPlaylist: typeof createPlaylist
  readonly addTracks: typeof addTracks
}

export const REACHING: Reach = { createPlaylist, addTracks }

export type Made = {
  readonly picked: readonly Picked[]
  readonly artists: number
  readonly playlist: Playlist | null
  readonly added: number
}

export function followedIn(root: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of valuesOfType(root, ARTIST)) {
    if (textIn(one.value, "status") !== FOLLOWING) continue
    const slug = textIn(one.value, "slug")
    if (slug !== null) held.add(slug)
  }
  return held
}

export function pickedIn(root: string): readonly Picked[] {
  const tracks = valuesOfType(root, TRACK).map((one) => one.value)
  const releases = valuesOfType(root, RELEASE).map((one) => one.value)
  return pickingOver(tracks, releases, followedIn(root))
}

export function artistsIn(picked: readonly Picked[]): number {
  return new Set(picked.map((one) => one.artistSlug)).size
}

export function namedFor(today: string): string {
  return `Unheard ${today}`
}

export function describedFor(picked: readonly Picked[]): string {
  return `${picked.length} track(s) from ${artistsIn(picked)} artist(s) Alan follows and has not heard.`
}

export function rowsOf(made: Made): readonly string[] {
  const rows = [`tracks\t${made.picked.length}`, `artists\t${made.artists}`, `added\t${made.added}`]
  if (made.playlist !== null) rows.push(`link\t${made.playlist.external_urls.spotify}`)
  return rows
}

export function jsonOf(made: Made): string {
  return JSON.stringify({
    tracks: made.picked.length,
    artists: made.artists,
    added: made.added,
    link: made.playlist === null ? null : made.playlist.external_urls.spotify,
    titles: made.picked.map((one) => `${one.artistSlug} — ${one.title}`),
  })
}

export async function makingOver(
  picked: readonly Picked[],
  today: string,
  reach: Reach
): Promise<Made> {
  const playlist = await reach.createPlaylist({
    name: namedFor(today),
    description: describedFor(picked),
  })
  const added = await reach.addTracks(
    playlist.id,
    picked.map((one) => one.trackId)
  )
  return { picked, artists: artistsIn(picked), playlist, added }
}

async function answered(argv: readonly string[], given: Given, reach: Reach): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const picked = pickedIn(given.root)
  if (picked.length === 0) return told([NOTHING])
  const held: Made = { picked, artists: artistsIn(picked), playlist: null, added: 0 }
  if (read.taken.plan) return told(read.taken.json ? [jsonOf(held)] : rowsOf(held))
  const made = await makingOver(picked, todayYYYYMMDD(), reach)
  return told(read.taken.json ? [jsonOf(made)] : rowsOf(made))
}

export async function musicUnheardPlaylist(
  argv: readonly string[],
  given: Given,
  reach: Reach = REACHING
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, reach))
}
