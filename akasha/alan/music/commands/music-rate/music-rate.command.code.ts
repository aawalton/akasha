import { landingAsked, mistaking, textAt, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { listedAt } from "@akasha/indexes"
import { MUSIC_RATINGS } from "@akasha/music-choosing/rating-ladder"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"

const INPUT = 1

const DATA = 2

export const ARTIST = "artist"

export const SONG = "song"

const TXT = "txt"

const TARGET = "--target"

const SLUG = "--slug"

const RATING = "--rating"

const REACTION = "reaction"

const PERSONAL_CONNECTIONS = "personal-connections"

const INSIGHTS = "insights"

const JSON_SAID = "--json"

const FROM_FILE = "-file"

export const ARTIST_PROSE = [REACTION]

export const SONG_PROSE = [PERSONAL_CONNECTIONS, INSIGHTS]

const PROSE = [...ARTIST_PROSE, ...SONG_PROSE]

const FLAGGED = PROSE.map((one) => `--${one}`)

const VALUED = [TARGET, SLUG, RATING, ...FLAGGED, ...FLAGGED.map((one) => `${one}${FROM_FILE}`)]

const BARE = [JSON_SAID]

export type Taken = {
  readonly target: string
  readonly slug: string
  readonly rating: string | null
  readonly prose: ReadonlyMap<string, string>
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: string }

type Said = { readonly held: ReadonlyMap<string, string>; readonly bare: ReadonlySet<string> }

function saidIn(argv: readonly string[]): Said | { readonly refused: string } {
  const held = new Map<string, string>()
  const bare = new Set<string>()
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (BARE.includes(one)) {
      bare.add(one)
      continue
    }
    if (!VALUED.includes(one)) return { refused: `\`${one}\` is nothing this takes` }
    const value = argv[at]
    at += 1
    if (value === undefined || value === "") {
      return { refused: `\`${one}\` takes a value, and this call names none after it` }
    }
    if (held.has(one)) {
      return { refused: `\`${one}\` is named twice, so which is meant is unsettled` }
    }
    held.set(one, value)
  }
  return { held, bare }
}

function proseIn(said: Said): ReadonlyMap<string, string> | { readonly refused: string } {
  const found = new Map<string, string>()
  for (const one of PROSE) {
    const flag = `--${one}`
    const fromFile = `${flag}${FROM_FILE}`
    const value = said.held.get(flag)
    const path = said.held.get(fromFile)
    if (value !== undefined && path !== undefined) {
      return {
        refused: `\`${flag}\` and \`${fromFile}\` each carry the ${one}, and both are given`,
      }
    }
    if (value !== undefined) {
      found.set(one, value)
      continue
    }
    if (path === undefined) continue
    const read = textAt(path)
    if (read === null) return { refused: `\`${fromFile}\` ${path} could not be read as text` }
    found.set(one, read)
  }
  return found
}

function wantingIn(
  target: string,
  rating: string | null,
  prose: ReadonlyMap<string, string>
): string | null {
  const strayed = (target === ARTIST ? SONG_PROSE : ARTIST_PROSE).filter((one) => prose.has(one))
  if (strayed.length > 0) {
    const named = strayed.map((one) => `\`--${one}\``).join(" and ")
    const other = target === ARTIST ? SONG : ARTIST
    return `${named} applies to \`${TARGET} ${other}\` rather than to \`${TARGET} ${target}\``
  }
  if (rating !== null || prose.size > 0) return null
  const own = (target === ARTIST ? ARTIST_PROSE : SONG_PROSE).map((one) => `\`--${one}\``)
  return `nothing is recorded by this call — name \`${RATING}\` or ${own.join(" or ")}`
}

export function taken(argv: readonly string[]): Reading {
  const said = saidIn(argv)
  if ("refused" in said) return said
  const target = said.held.get(TARGET)
  if (target === undefined)
    return { refused: `\`${TARGET}\` says which sort of page, and none is named` }
  if (target !== ARTIST && target !== SONG) {
    return {
      refused: `\`${TARGET}\` takes \`${ARTIST}\` or \`${SONG}\`, and this call names \`${target}\``,
    }
  }
  const slug = said.held.get(SLUG)
  if (slug === undefined) return { refused: `\`${SLUG}\` names the page, and none is named` }
  const rating = said.held.get(RATING) ?? null
  if (rating !== null && !MUSIC_RATINGS.some((one) => one === rating)) {
    return {
      refused: `\`${RATING}\` takes a rung from \`${MUSIC_RATINGS.join("`, `")}\`, and this call names \`${rating}\``,
    }
  }
  const prose = proseIn(said)
  if ("refused" in prose) return prose
  const wanting = wantingIn(target, rating, prose)
  if (wanting !== null) return { refused: wanting }
  return { target, slug, rating, prose, json: said.bare.has(JSON_SAID) }
}

export function valuesFor(was: Value, held: Taken): Value {
  const values: Value = { ...was }
  if (held.rating !== null) values["rank"] = held.rating
  for (const one of held.prose.keys()) values[exportedAs(one)] = TXT
  return values
}

export function saidOf(held: Taken): string {
  return held.json
    ? JSON.stringify({ target: held.target, slug: held.slug, rating: held.rating })
    : `Recorded ${held.target} ${held.slug}`
}

export function musicRate(argv: readonly string[], given: Given): Answer {
  const held = taken(argv)
  if ("refused" in held) return refused(held.refused, INPUT)
  const found = listedAt(given.root, held.target, held.slug)
  const at = found.length === 1 ? found[0]?.path : undefined
  if (at === undefined) {
    return refused(`no ${held.target} page is filed at \`${held.slug}\``, DATA)
  }
  const was = valueAt(at, given.root)
  if (was === null) return refused(`${at} would not load, so what it holds is unknown`, DATA)
  const composed = composedFor(given.root, {
    pageTypeSlug: held.target,
    slug: held.slug,
    values: valuesFor(was, held),
  })
  if ("refused" in composed) return refused(composed.refused, DATA)
  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  for (const [one, text] of held.prose) {
    const beside = besideAt(composed.put.path, one, TXT)
    if (beside === null) {
      return mistaking([`no \`${one}\` file can sit beside a name like ${composed.put.path}`])
    }
    changes.push({ path: beside, body: new TextEncoder().encode(text) })
  }
  const answer = landingAsked(given, {
    changes,
    message: `record ${held.target} ${held.slug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer
  return {
    report: held.json ? [saidOf(held)] : [saidOf(held), ...answer.report],
    refusals: [],
    code: 0,
  }
}
