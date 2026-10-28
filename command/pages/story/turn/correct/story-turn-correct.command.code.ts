import { existsSync } from "node:fs"
import { join } from "node:path"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Changing,
  changesIndexed,
} from "akasha/command/pages/story/modules/turn-changes/turn-changes.module.code.ts"
import {
  beatsHeld,
  inOrder,
  type Paged,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import { outcomesAt } from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import {
  correctedOn,
  type Placed,
} from "akasha/command/pages/story/turn/correct/modules/beat-correcting/beat-correcting.module.code.ts"
import {
  type Asked,
  taken,
} from "akasha/command/pages/story/turn/correct/modules/correct-handing/correct-handing.module.code.ts"
import {
  type Unbeating,
  unbeatingIn,
} from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import { heldOf } from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
import {
  marksRefused,
  owedIn,
  unmarkedIn,
} from "akasha/command/pages/story/turn/modules/turn-outcome-marks/turn-outcome-marks.module.code.ts"
import {
  REACHED,
  type Reach,
  type Seated,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { shownOf } from "akasha/command/pages/story/turn/modules/turn-unplaying/turn-unplaying.module.code.ts"
import { foldedOf } from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import {
  type BeatChange,
  mergedOf,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type BeatProse,
  proseWritten,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import {
  type Beats,
  beatsWritten,
  NO_BEATS,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import {
  BEATS,
  bareOf,
  PLAYER,
  stepIn,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const STORY_ROLES: readonly string[] = [
  gameMaster.slug,
  writer.slug,
  storyRecorder.slug,
  reviewer.slug,
  worldBuilder.slug,
]

const PROSE = "prose"

const PROSE_HELD = "txt"

const BEATS_KEY = "beats"

const BEATS_HELD = "jsonl"

const STATUS = "stepStatus"

const OWN_LENGTH = "ownLength"

type Refused = { readonly refused: string }

export type Correcting = Reach & {
  readonly pagedOf: (root: string, game: string) => readonly Paged[]
  readonly changing: Changing
  readonly beatingOf: (root: string) => Unbeating
  readonly present: (root: string, path: string) => boolean
}

const CORRECTS: Correcting = {
  ...REACHED,
  pagedOf: (root, game) => storyIndexed(root, game, false),
  changing: changesIndexed,
  beatingOf: (root) =>
    unbeatingIn(
      root,
      (within, path) => valueAt(path, within),
      (within, path) => REACHED.textIn(within, path)
    ),
  present: (root, path) => existsSync(join(root, path)),
}

function callerRefused(seat: Seated | null, game: string): string | null {
  if (seat === null || seat.role === null) return null
  if (seat.role === gameMaster.slug && seat.game === game) return null
  if (!STORY_ROLES.includes(seat.role)) return null
  return `a beat of \`${game}\` is corrected by its ${gameMaster.slug}, or by a caller in no story seat, and this comes from the ${seat.role} seat \`${seat.name}\``
}

function placedOf(one: Paged): Placed | Refused {
  const beats = one.beats
  if (beats === undefined) return { slug: one.slug, beats: NO_BEATS, shown: 0 }
  if ("refused" in beats) return beats
  if (one.closed === true) return { slug: one.slug, beats, shown: beats.beats.length }
  const status = stepIn(one.value[STATUS]) ?? WORLD_BUILDER
  return { slug: one.slug, beats, shown: shownOf(status, beats) }
}

type Own = { readonly slug: string; readonly beats: Beats; readonly shown: number }

function storyFor(reach: Correcting, root: string, game: string, own: Own) {
  const placed: Placed[] = []
  for (const one of inOrder(reach.pagedOf(root, game))) {
    const said = one.slug === own.slug ? own : placedOf(one)
    if ("refused" in said) return said
    placed.push(said)
  }
  const at = placed.findIndex((one) => one.slug === own.slug)
  return at < 0 ? { refused: `\`${own.slug}\` is no turn of \`${game}\`` } : { placed, at }
}

function marksOn(
  reach: Correcting,
  root: string,
  turn: Turn,
  beats: Beats,
  now: readonly BeatChange[],
  beat: number
): string | null {
  const at = outcomesAt(turn.at)
  if (at === null || !reach.present(root, at)) return null
  const owed = owedIn(reach.textIn(root, at))
  const unmarked = unmarkedIn(owed, now)
  if (unmarked !== null) return unmarked
  const all = mergedOf(
    beats.changes.filter((one) => one.beat !== beat),
    now
  )
  return marksRefused(owed, all)
}

type Told = {
  readonly prose: readonly BeatProse[] | undefined
  readonly text: string | null
  readonly at: string
}

function proseTold(
  reach: Correcting,
  root: string,
  turn: Turn,
  beats: Beats,
  asked: Asked
): Told | Refused {
  const at = besideAt(turn.at, PROSE, textAt(turn.value, PROSE) ?? PROSE_HELD) ?? turn.at
  if (asked.prose === null) return { prose: beats.prose, text: null, at }
  const held = beats.prose ?? []
  const old = held.find((one) => one.beat === asked.beat)
  if (old === undefined) {
    return {
      refused: `beat ${asked.beat} carries no prose of its own, so its prose is mended in \`${at}\``,
    }
  }
  const restated = typeof asked.prose === "string" ? { ...old, prose: asked.prose } : asked.prose
  const prose = held.map((one) => (one.beat === asked.beat ? restated : one))
  const text = reach.present(root, at) ? reach.textIn(root, at) : ""
  if (text === proseWritten(held)) return { prose, text: proseWritten(prose), at }
  const parts = text.split(old.prose)
  if (parts.length !== 2) {
    return {
      refused: `\`${at}\` holds beat ${asked.beat}'s prose ${parts.length - 1} times, and a correction replaces it once`,
    }
  }
  return { prose, text: parts.join(restated.prose), at }
}

type Shown = {
  readonly turn: Turn
  readonly game: string
  readonly beats: Beats
  readonly shown: number
}

function shownRefused(
  reach: Correcting,
  root: string,
  slug: string,
  beat: number,
  seat: Seated | null
) {
  const turn = reach.turnAt(root, slug)
  if (turn === null) return { refused: `\`${slug}\` names no played turn here` }
  const held = heldOf(turn)
  if ("refused" in held) return held
  const caller = callerRefused(seat, held.game)
  if (caller !== null) return { refused: caller }
  const beats = beatsHeld(turn, (at) => reach.textIn(root, at))
  if ("refused" in beats) return beats
  const status = held.status
  const shown = status === PLAYER || status === BEATS ? shownOf(status, beats) : 0
  if (beat < 1 || beat > beats.beats.length) return { refused: `\`${slug}\` has no beat ${beat}` }
  if (beat > shown) {
    return {
      refused: `beat ${beat} of \`${slug}\` is not shown yet, so it is stated again with an advance rather than corrected`,
    }
  }
  const found: Shown = { turn, game: held.game, beats, shown }
  return found
}

function beatsAfter(beats: Beats, beat: number, now: readonly BeatChange[], retold: Told): Beats {
  const kept = (one: { readonly beat: number; readonly part: string }) =>
    !(one.beat === beat && one.part === "changes")
  const stated = now.length === 0 ? [{ beat, part: "changes" as const }] : []
  const none = [...(beats.none ?? []).filter(kept), ...stated]
  const changes = mergedOf(
    beats.changes.filter((one) => one.beat !== beat),
    now
  )
  return { ...beats, changes, none, ...(retold.prose === undefined ? {} : { prose: retold.prose }) }
}

async function heldOn(
  done: string[],
  asked: Asked,
  slug: string,
  given: Given,
  landing: Landing,
  reach: Correcting
): Promise<Answer> {
  const beat = asked.beat
  const found = shownRefused(reach, given.root, slug, beat, reach.seatOf(given.root, given.agentId))
  if ("refused" in found) return refused(found.refused, DATA)
  const { turn, beats, shown } = found
  const now = asked.changes ?? beats.changes.filter((one) => one.beat === beat)
  const story = storyFor(reach, given.root, found.game, { slug, beats, shown })
  if ("refused" in story) return refused(story.refused, DATA)
  const correction = { story: story.placed, at: story.at, beat, changes: now }
  const corrected = correctedOn(correction, reach.changing(given.root), reach.beatingOf(given.root))
  if ("refused" in corrected) return refused(corrected.refused, DATA)
  const unmarked = marksOn(reach, given.root, turn, beats, now, beat)
  if (unmarked !== null) return refused(unmarked, DATA)
  const retold = proseTold(reach, given.root, turn, beats, asked)
  if ("refused" in retold) return refused(retold.refused, DATA)
  const beatsAt =
    besideAt(turn.at, BEATS_KEY, textAt(turn.value, BEATS_KEY) ?? BEATS_HELD) ?? turn.at
  const counted = retold.text === null ? {} : { [OWN_LENGTH]: wordCount(retold.text) }
  const length: Naming = {
    pageTypeSlug: storyTurnPlayed.slug,
    slug,
    path: turn.at,
    values: counted,
    merge: true,
  }
  const lengths = retold.text === null ? [] : [length]
  const folded = foldedOf(reach, given.root, [...corrected.namings, ...lengths])
  if ("refused" in folded) return refused(folded.refused, DATA)
  const rewritten = corrected.files.flatMap((one) => [
    taking(one.at),
    putting({ path: one.at, content: one.content }),
  ])
  const prose = retold.text === null ? [] : [putting({ path: retold.at, content: retold.text })]
  const body = beatsWritten(beatsAfter(beats, beat, now, retold))
  const asking = [...folded, putting({ path: beatsAt, content: body }), ...prose, ...rewritten]
  const by = { agentId: given.agentId, writer: given.writer, done }
  const landed = await landing(given.root, asking, `${slug} beat ${beat} is corrected`, by)
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  const said = retold.text === null ? [] : [`rewritten\t${retold.at}`]
  const head = [`${slug}\tbeat ${beat}\tcorrected`, `rewritten\t${beatsAt}`]
  return told([...head, ...said, ...corrected.report])
}

async function correctedBy(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Correcting
): Promise<Answer> {
  const read = taken(argv, given.calledAs, given.root)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const slug = bareOf(read.turn)
  const placed = reach.turnAt(given.root, slug)
  if (placed === null) return refused(`\`${read.turn}\` names no played turn here`, DATA)
  const holding = async () => await heldOn(done, read, slug, given, landing, reach)
  return await reach.hold(given.root, placed.at, holding)
}

export async function storyTurnCorrect(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Correcting = CORRECTS
): Promise<Answer> {
  return await answering(async (done) => await correctedBy(done, argv, given, landing, reach))
}
