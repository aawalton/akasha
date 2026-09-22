import { join } from "node:path"
import { getRecentlyPlayed } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { grade } from "akasha/command/argument/pages/grade.argument.ts"
import { gradeTarget } from "akasha/command/argument/pages/grade-target.argument.ts"
import { insights } from "akasha/command/argument/pages/insights.argument.ts"
import { insightsFile } from "akasha/command/argument/pages/insights-file.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { justPlayed } from "akasha/command/argument/pages/just-played.argument.ts"
import { nowPlaying } from "akasha/command/argument/pages/now-playing.argument.ts"
import { personalConnections } from "akasha/command/argument/pages/personal-connections.argument.ts"
import { personalConnectionsFile } from "akasha/command/argument/pages/personal-connections-file.argument.ts"
import { reaction } from "akasha/command/argument/pages/reaction.argument.ts"
import { reactionFile } from "akasha/command/argument/pages/reaction-file.argument.ts"
import { slug as slugArgument } from "akasha/command/argument/pages/slug.argument.ts"
import { tag } from "akasha/command/argument/pages/tag.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  INPUT,
  keeping,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { textAt } from "akasha/command/modules/body-reaching/body-reaching.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Filing,
  filledIn,
} from "akasha/command/modules/filling/command-filling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  envelopeFor,
  type NowPlayingReader,
  PLAYER,
} from "akasha/command/pages/music/now-playing/music-now-playing.command.code.ts"
import {
  type Finding,
  justPlayedNamed,
  type PlayedReader,
  playingIdOf,
  playingNamed,
  type Refusal,
  slugCarried,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.code.ts"
import { musicRate as page } from "akasha/command/pages/music/rate/music-rate.command.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

export const ARTIST = "artist"

export const SONG = "song"

export const TRACK = "track"

export const RELEASE = "release"

const TXT = "txt"

const TARGET = gradeTarget.said

const GRADE = grade.said

const TAG = tag.said

const TAGS = "tags"

const GRADE_KEY = "grade"

const SLUG = slugArgument.said

const WHOLE = true

const LAST_FEW = 3

const playedLast: PlayedReader = () => getRecentlyPlayed({ limit: LAST_FEW })

const ARTIST_PROSE = [reaction.slug]

const SONG_PROSE = [personalConnections.slug, insights.slug]

const NO_PROSE: readonly string[] = []

const PROSE_OF: ReadonlyMap<string, readonly string[]> = new Map([
  [ARTIST, ARTIST_PROSE],
  [SONG, SONG_PROSE],
  [TRACK, NO_PROSE],
  [RELEASE, NO_PROSE],
])

export const TARGETS = [...PROSE_OF.keys()]

const GRADED: ReadonlySet<string> = new Set([ARTIST, TRACK, RELEASE])

const TAKES = [
  json,
  slugArgument,
  nowPlaying,
  justPlayed,
  grade,
  tag,
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

export const WRITE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

export type Taken = {
  readonly target: string
  readonly slug: string | null
  readonly justPlayed: boolean
  readonly grade: string | null
  readonly prose: ReadonlyMap<string, string>
  readonly tags: readonly string[]
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: readonly string[] }

function strayedIn(target: string, prose: ReadonlyMap<string, string>): readonly string[] {
  const said: string[] = []
  for (const [other, own] of PROSE_OF) {
    if (other === target) continue
    for (const one of own) {
      if (prose.has(one)) said.push(`\`--${one}\` applies to \`${TARGET} ${other}\``)
    }
  }
  return said
}

function wrongIn(
  target: string,
  marked: string | null,
  prose: ReadonlyMap<string, string>,
  tags: readonly string[]
): string | null {
  const strayed = strayedIn(target, prose)
  if (strayed.length > 0) {
    return `${strayed.join(" and ")} rather than to \`${TARGET} ${target}\``
  }
  if (marked !== null && !GRADED.has(target)) {
    const taking = [...GRADED].map((one) => `\`${TARGET} ${one}\``).join(", ")
    return `\`${GRADE}\` applies to ${taking}, and Alan grades the recording he heard rather than the ${target}`
  }
  if (marked !== null || prose.size > 0 || tags.length > 0) return null
  const own = PROSE_OF.get(target) ?? []
  const marking = GRADED.has(target) ? [GRADE, TAG] : [TAG]
  const naming = [...marking, ...own.map((one) => `--${one}`)].map((one) => `\`${one}\``)
  return `nothing is recorded by this call — name ${naming.join(" or ")}`
}

function targetIn(named: string | null, said: string | undefined): string | Refusal {
  if (named === null) return TRACK
  if (said === undefined) {
    return {
      refused: `\`${SLUG}\` names a page, and only \`${TARGET}\` says which sort of page that is`,
    }
  }
  if (PROSE_OF.has(said)) return said
  return {
    refused: `\`${TARGET}\` takes \`${TARGETS.join("`, `")}\`, and this call names \`${said}\``,
  }
}

export function taken(argv: readonly string[], given: Given): Reading {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return { refused: read.refused }
  const held = read.taken
  const named = held.slug ?? null
  const targeted = targetIn(named, held.gradeTarget)
  if (typeof targeted !== "string") return { refused: [targeted.refused] }
  const target = targeted
  const marked = held.grade ?? null
  if (marked !== null && !gradeProperty.values.some((one) => one === marked)) {
    return {
      refused: [
        `\`${GRADE}\` takes a rung from \`${gradeProperty.values.join("`, `")}\`, and this call names \`${marked}\``,
      ],
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
    if ("refused" in one) return { refused: one.refused }
    const key = keys[at]
    if (key !== undefined && one.text !== undefined) prose.set(key, one.text)
  }
  const tags = held.tag
  const wrong = wrongIn(target, marked, prose, tags)
  if (wrong !== null) return { refused: [wrong] }
  return {
    target,
    slug: named,
    justPlayed: held.justPlayed,
    grade: marked,
    prose,
    tags,
    json: held.json,
  }
}

function slugCarrying(root: string, externalId: string): string | null {
  return slugCarried(
    valuesOfType(root, TRACK).map((one) => one.value),
    externalId
  )
}

function taggedOver(was: Value, said: readonly string[]): readonly string[] {
  const held = [...(textsAt(was, TAGS) ?? [])]
  for (const one of said) if (!held.includes(one)) held.push(one)
  return held
}

export function valuesFor(was: Value, held: Taken): Value {
  const values: Value = { ...was }
  if (held.grade !== null) values[GRADE_KEY] = held.grade
  if (held.tags.length > 0) values[TAGS] = taggedOver(was, held.tags)
  for (const one of held.prose.keys()) values[exportedAs(one)] = TXT
  return values
}

export function saidOf(held: Taken, slug: string): string {
  return held.json
    ? JSON.stringify({ target: held.target, slug, grade: held.grade })
    : `Recorded ${held.target} ${slug}`
}

async function namedFor(
  held: Taken,
  found: Finding,
  read: NowPlayingReader,
  history: PlayedReader
): Promise<string | Refusal> {
  if (held.slug !== null) return held.slug
  const envelope = await envelopeFor(read)
  if (!held.justPlayed) return playingNamed(found, envelope)
  return justPlayedNamed(found, (await history()).items, playingIdOf(envelope))
}

async function recorded(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  read: NowPlayingReader,
  history: PlayedReader
): Promise<Answer> {
  const held = taken(argv, given)
  if ("refused" in held) return refusedBy(held.refused, INPUT)
  const finding: Finding = (externalId) => slugCarrying(given.root, externalId)
  const naming = await namedFor(held, finding, read, history)
  if (typeof naming !== "string") return refused(naming.refused, DATA)
  const slug = naming
  const found = listedAt(given.root, held.target, slug)
  const at = found.length === 1 ? found[0]?.path : undefined
  if (at === undefined) {
    return refused(`no ${held.target} page is filed at \`${slug}\``, DATA)
  }
  const was = valueAt(at, given.root)
  if (was === null) return refused(`${at} would not load, so what it holds is unknown`, DATA)
  const old = textAt(join(given.root, at))
  const composed = composedFor(given.root, {
    pageTypeSlug: held.target,
    slug,
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
  const landed = await landing(given.root, changes, `record ${held.target} ${slug}`, { done })
  const wrote = "refusals" in landed ? [] : landed.landed.map((one) => `wrote ${one}`)
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return keeping(done, answeredWith(wrote, wrong, OPERATIONAL))
  const said = saidOf(held, slug)
  return told(held.json ? [said] : [said, ...wrote])
}

export async function musicRate(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  read: NowPlayingReader = PLAYER,
  history: PlayedReader = playedLast
): Promise<Answer> {
  return await answering(async (done) => await recorded(done, argv, given, landing, read, history))
}
