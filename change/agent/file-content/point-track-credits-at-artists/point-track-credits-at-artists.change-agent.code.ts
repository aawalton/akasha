import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { creditFor } from "akasha/alan/music/catalog/modules/track-syncing/track-syncing.module.code.ts"
import { track } from "akasha/alan/music/catalog/track/track.page-type.ts"
import { changeFileContentPage } from "akasha/change/mechanical/file-content/change/change-file-content-page/change-file-content-page.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  gathered,
  refusing,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { literalIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { placeOf } from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import {
  recordsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT_MOST = "at-most"

const TRACK_ARTIST = "trackArtist"

const ARTIST = "artist"

const ARTIST_NAME = "artistName"

const EXTERNAL_ID = "externalId"

const IDENTITY = "externalIdentity"

const SPOTIFY = "spotify"

const RESTATE = `${changeMechanicalFileContent.slug}/${changeFileContentPage.slug}` as const

function artistsIn(world: World): ReadonlyMap<string, string> {
  const bySpotify = new Map<string, string>()
  for (const one of world.index.everyOfType(artist.slug)) {
    const value = world.index.pageByPath(one.path)
    if (value === null) continue
    const slug = textIn(value, "slug")
    const said = idFrom(value[IDENTITY], SPOTIFY)
    if (slug === null || said === null || bySpotify.has(said)) continue
    bySpotify.set(said, slug)
  }
  return bySpotify
}

function creditOver(artists: ReadonlyMap<string, string>, held: Value): Value {
  if (textIn(held, ARTIST) !== null) return { [ARTIST]: held[ARTIST] }
  const name = textIn(held, ARTIST_NAME)
  if (name === null) return held
  return creditFor(artists, textIn(held, EXTERNAL_ID), name)
}

function spelled(credit: Value): string {
  const fields = Object.entries(credit).map(([key, said]) => `${key}: ${JSON.stringify(said)}`)
  return `{ ${fields.join(", ")} }`
}

export function creditsOver(
  artists: ReadonlyMap<string, string>,
  held: unknown
): readonly Value[] | null {
  const was = recordsIn(held)
  const now = was.map((one) => creditOver(artists, one))
  return JSON.stringify(now) === JSON.stringify(was) ? null : now
}

export function restatedIn(
  path: string,
  text: string,
  credits: readonly Value[]
): { readonly old: string; readonly new: string } | null {
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return null
  const held = owner.properties[placeOf(owner, TRACK_ARTIST)]
  if (held === undefined) return null
  return {
    old: held.getText(source),
    new: `${TRACK_ARTIST}: [${credits.map(spelled).join(", ")}]`,
  }
}

export async function pointTrackCreditsAtArtists(
  world: World,
  atMost: number | null
): Promise<Answer> {
  const artists = artistsIn(world)
  const answers: Answer[] = []
  for (const one of world.index.everyOfType(track.slug)) {
    if (atMost !== null && answers.length >= atMost) break
    const value = world.index.pageByPath(one.path)
    if (value === null) continue
    const credits = creditsOver(artists, value[TRACK_ARTIST])
    if (credits === null) continue
    const text = world.textOf(one.path)
    if (text === null) continue
    const passage = restatedIn(one.path, text, credits)
    if (passage === null) continue
    answers.push((await reach(world, RESTATE, { at: one.path, ...passage })).said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  for (const key of Object.keys(given)) {
    if (key !== AT_MOST) return refusing(untaken(key, takes))
  }
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return await pointTrackCreditsAtArtists(world, atMost)
}
