import { join } from "node:path"
import { MUSIC_RATINGS } from "akasha/alan/music/choosing/rating-ladder/rating-ladder.module.code.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  landedMechanically,
  type runMechanicalChange,
} from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { gradeTarget } from "akasha/commands/arguments/pages/grade-target.argument.ts"
import { insights } from "akasha/commands/arguments/pages/insights.argument.ts"
import { insightsFile } from "akasha/commands/arguments/pages/insights-file.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { personalConnections } from "akasha/commands/arguments/pages/personal-connections.argument.ts"
import { personalConnectionsFile } from "akasha/commands/arguments/pages/personal-connections-file.argument.ts"
import { rating } from "akasha/commands/arguments/pages/rating.argument.ts"
import { reaction } from "akasha/commands/arguments/pages/reaction.argument.ts"
import { reactionFile } from "akasha/commands/arguments/pages/reaction-file.argument.ts"
import { slug as slugArgument } from "akasha/commands/arguments/pages/slug.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  INPUT,
  keeping,
  OK,
  OPERATIONAL,
  refused,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { textAt } from "akasha/commands/modules/body-reaching/body-reaching.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Filing,
  filledIn,
} from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { musicRate as page } from "akasha/commands/pages/music/rate/music-rate.command.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { composedFor } from "akasha/pages/service/page-composing/page-composing.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const ARTIST = "artist"

export const SONG = "song"

const TXT = "txt"

const TARGET = gradeTarget.said

const RATING = rating.said

const WHOLE = true

export const ARTIST_PROSE = [reaction.slug]

export const SONG_PROSE = [personalConnections.slug, insights.slug]

const TAKES = [
  json,
  slugArgument,
  rating,
  reactionFile,
  personalConnectionsFile,
  insightsFile,
  reaction,
  personalConnections,
  insights,
  gradeTarget,
]

const REACTION_FILING: Filing = { said: reaction.said, file: reactionFile.said, whole: WHOLE }

const CONNECTIONS_FILING: Filing = {
  said: personalConnections.said,
  file: personalConnectionsFile.said,
  whole: WHOLE,
}

const INSIGHTS_FILING: Filing = { said: insights.said, file: insightsFile.said, whole: WHOLE }

export const WRITE = "change-mechanical/add-file-of-any-kind"

export type Landing = (
  done: string[],
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

export type Taken = {
  readonly target: string
  readonly slug: string
  readonly rating: string | null
  readonly prose: ReadonlyMap<string, string>
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: string }

export function wrongIn(
  target: string,
  grade: string | null,
  prose: ReadonlyMap<string, string>
): string | null {
  const strayed = (target === ARTIST ? SONG_PROSE : ARTIST_PROSE).filter((one) => prose.has(one))
  if (strayed.length > 0) {
    const named = strayed.map((one) => `\`--${one}\``).join(" and ")
    const other = target === ARTIST ? SONG : ARTIST
    return `${named} applies to \`${TARGET} ${other}\` rather than to \`${TARGET} ${target}\``
  }
  if (grade !== null || prose.size > 0) return null
  const own = (target === ARTIST ? ARTIST_PROSE : SONG_PROSE).map((one) => `\`--${one}\``)
  return `nothing is recorded by this call — name \`${RATING}\` or ${own.join(" or ")}`
}

export function taken(argv: readonly string[], given: Given): Reading {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return { refused: read.refused.join(" | ") }
  const held = read.taken
  const target = held.gradeTarget
  if (target !== ARTIST && target !== SONG) {
    return {
      refused: `\`${TARGET}\` takes \`${ARTIST}\` or \`${SONG}\`, and this call names \`${target}\``,
    }
  }
  const grade = held.rating ?? null
  if (grade !== null && !MUSIC_RATINGS.some((one) => one === grade)) {
    return {
      refused: `\`${RATING}\` takes a rung from \`${MUSIC_RATINGS.join("`, `")}\`, and this call names \`${grade}\``,
    }
  }
  const filled = [
    filledIn(given.root, held.reaction, held.reactionFile, REACTION_FILING),
    filledIn(
      given.root,
      held.personalConnections,
      held.personalConnectionsFile,
      CONNECTIONS_FILING
    ),
    filledIn(given.root, held.insights, held.insightsFile, INSIGHTS_FILING),
  ]
  const keys = [reaction.slug, personalConnections.slug, insights.slug]
  const prose = new Map<string, string>()
  for (const [at, one] of filled.entries()) {
    if ("refused" in one) return { refused: one.refused.join(" | ") }
    const key = keys[at]
    if (key !== undefined && one.text !== undefined) prose.set(key, one.text)
  }
  const wrong = wrongIn(target, grade, prose)
  if (wrong !== null) return { refused: wrong }
  return { target, slug: held.slug, rating: grade, prose, json: held.json }
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

async function recorded(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given)
  if ("refused" in held) return refused(held.refused, INPUT)
  const found = listedAt(given.root, held.target, held.slug)
  const at = found.length === 1 ? found[0]?.path : undefined
  if (at === undefined) {
    return refused(`no ${held.target} page is filed at \`${held.slug}\``, DATA)
  }
  const was = valueAt(at, given.root)
  if (was === null) return refused(`${at} would not load, so what it holds is unknown`, DATA)
  const old = textAt(join(given.root, at))
  const composed = composedFor(given.root, {
    pageTypeSlug: held.target,
    slug: held.slug,
    values: valuesFor(was, held),
  })
  if ("refused" in composed) return refused(composed.refused, DATA)
  const put = composed.put
  const first =
    old === null ? { at: put.path, body: put.content } : { at: put.path, body: put.content, old }
  const changes: Asking[] = [{ at: WRITE, given: first }]
  for (const [one, text] of held.prose) {
    const beside = besideAt(composed.put.path, one, TXT)
    if (beside === null) {
      return mistaking([`no \`${one}\` file can sit beside a name like ${composed.put.path}`])
    }
    changes.push({ at: WRITE, given: { at: beside, body: text } })
  }
  const landed = await landing(done, given.root, changes, `record ${held.target} ${held.slug}`)
  const wrote = "refusals" in landed ? [] : landed.landed.map((one) => `wrote ${one}`)
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return keeping(done, answeredWith(wrote, wrong, OPERATIONAL))
  return answeredWith(held.json ? [saidOf(held)] : [saidOf(held), ...wrote], [], OK)
}

export async function musicRate(
  argv: readonly string[],
  given: Given,
  landing: Landing = landedMechanically
): Promise<Answer> {
  return await answering(async (done) => await recorded(done, argv, given, landing))
}
