import { existsSync } from "node:fs"
import { join } from "node:path"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import {
  type Asking,
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
  type Paged,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  rootReading,
  type Reading as Telling,
} from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import {
  correctedOn,
  placedIn,
} from "akasha/command/pages/story/turn/correct/modules/beat-correcting/beat-correcting.module.code.ts"
import { rememberedOn } from "akasha/command/pages/story/turn/correct/modules/beat-remembering/beat-remembering.module.code.ts"
import {
  type Asked,
  taken,
} from "akasha/command/pages/story/turn/correct/modules/correct-handing/correct-handing.module.code.ts"
import { outcomesOn } from "akasha/command/pages/story/turn/correct/modules/correct-outcomes/correct-outcomes.module.code.ts"
import {
  type Unbeating,
  unbeatingIn,
} from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import { heldOf } from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
import {
  REACHED,
  type Reach,
  type Seated,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  memoryOf,
  shownOf,
  type Unplaying,
  unplayingIndexed,
} from "akasha/command/pages/story/turn/modules/turn-unplaying/turn-unplaying.module.code.ts"
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
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import {
  type BeatProse,
  proseWritten,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import {
  type Beats,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import {
  BEATS,
  bareOf,
  PLAYER,
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

const OWN_LENGTH = "ownLength"

type Refused = { readonly refused: string }

export type Correcting = Reach & {
  readonly pagedOf: (root: string, game: string) => readonly Paged[]
  readonly changing: Changing
  readonly beatingOf: (root: string) => Unbeating
  readonly present: (root: string, path: string) => boolean
  readonly tellingOf: (root: string) => Telling
  readonly unplayingOf: (root: string, turnAt: string) => Unplaying
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
  tellingOf: rootReading,
  unplayingOf: unplayingIndexed,
}

function callerRefused(seat: Seated | null, game: string): string | null {
  if (seat === null || seat.role === null) return null
  if (seat.role === gameMaster.slug && seat.game === game) return null
  if (!STORY_ROLES.includes(seat.role)) return null
  return `a beat of \`${game}\` is corrected by its ${gameMaster.slug}, or by a caller in no story seat, and this comes from the ${seat.role} seat \`${seat.name}\``
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
  if (!reach.present(root, at)) return { prose, text: null, at }
  const text = reach.textIn(root, at)
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

type Restated = {
  readonly changes: readonly BeatChange[]
  readonly memory: readonly Memory[]
  readonly told: Told
}

function beatsAfter(beats: Beats, beat: number, now: Restated): Beats {
  const others = (one: { readonly beat: number }) => one.beat !== beat
  const kept = (one: { readonly beat: number; readonly part: string }) =>
    one.beat !== beat || (one.part !== "changes" && one.part !== "memory")
  const empty = [
    ...(now.changes.length === 0 ? [{ beat, part: "changes" as const }] : []),
    ...(now.memory.length === 0 ? [{ beat, part: "memory" as const }] : []),
  ]
  const none = [...(beats.none ?? []).filter(kept), ...empty]
  const changes = mergedOf(beats.changes.filter(others), now.changes)
  const memory = [...beats.memory.filter(others), ...now.memory].toSorted(
    (one, other) => one.beat - other.beat
  )
  const prose = now.told.prose === undefined ? {} : { prose: now.told.prose }
  return { ...beats, changes, memory, none, ...prose }
}

function written(texts: ReadonlyMap<string, string | null>): readonly Asking[] {
  return [...texts].map(([at, text]) =>
    text === null ? taking(at) : putting({ path: at, content: text })
  )
}

async function heldOn(
  done: string[],
  asked: Asked,
  slug: string,
  given: Given,
  landing: Landing,
  reach: Correcting
): Promise<Answer> {
  const { root } = given
  const beat = asked.beat
  const found = shownRefused(reach, root, slug, beat, reach.seatOf(root, given.agentId))
  if ("refused" in found) return refused(found.refused, DATA)
  const { turn, beats, shown } = found
  const now = asked.changes ?? beats.changes.filter((one) => one.beat === beat)
  const old = beats.memory.filter((one) => one.beat === beat)
  const memory = asked.memory ?? old
  const stray = [...now, ...memory].find((one) => one.beat !== beat)
  if (stray !== undefined) return refused(`a line names beat ${stray.beat}, not ${beat}`, DATA)
  const paged = reach.pagedOf(root, found.game)
  const story = placedIn(paged, { slug, beats, shown })
  if ("refused" in story) return refused(story.refused, DATA)
  const correction = { story: story.placed, at: story.at, beat, changes: now }
  const corrected = correctedOn(correction, reach.changing(root), reach.beatingOf(root))
  if ("refused" in corrected) return refused(corrected.refused, DATA)
  const settling = {
    present: (at: string) => reach.present(root, at),
    textOf: (at: string) => reach.textIn(root, at),
  }
  const settled = outcomesOn(settling, turn.at, asked.outcomes, beats, beat, now)
  if ("refused" in settled) return refused(settled.refused, DATA)
  const retold = proseTold(reach, root, turn, beats, asked)
  if ("refused" in retold) return refused(retold.refused, DATA)
  const others = [
    ...memoryOf(paged.filter((one) => one.slug !== slug)),
    ...beats.memory.filter((one) => one.beat !== beat),
  ]
  const remembering = {
    unplaying: reach.unplayingOf(root, turn.at),
    telling: reach.tellingOf(root),
    fold: (naming: Naming) => reach.fold(root, naming),
  }
  const remembered =
    asked.memory === null
      ? { texts: new Map<string, string | null>(), report: [] }
      : rememberedOn(remembering, old, memory, others)
  if ("refused" in remembered) return refused(remembered.refused, DATA)
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
  const folded = foldedOf(reach, root, [
    ...corrected.namings,
    ...(retold.text === null ? [] : [length]),
  ])
  if ("refused" in folded) return refused(folded.refused, DATA)
  const files = new Map<string, string | null>(corrected.files.map((one) => [one.at, one.content]))
  if (settled.at !== null && settled.text !== null) files.set(settled.at, settled.text)
  const rewritten = [...files].flatMap(([at, text]) => [
    taking(at),
    putting({ path: at, content: text ?? "" }),
  ])
  const prose = retold.text === null ? [] : [putting({ path: retold.at, content: retold.text })]
  const body = beatsWritten(beatsAfter(beats, beat, { changes: now, memory, told: retold }))
  const asking = [
    ...folded,
    putting({ path: beatsAt, content: body }),
    ...prose,
    ...rewritten,
    ...written(remembered.texts),
  ]
  const by = { agentId: given.agentId, writer: given.writer, done }
  const landed = await landing(root, asking, `${slug} beat ${beat} is corrected`, by)
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  const said = retold.text === null ? [] : [`rewritten\t${retold.at}`]
  const outcomes = settled.text === null || settled.at === null ? [] : [`rewritten\t${settled.at}`]
  const head = [`${slug}\tbeat ${beat}\tcorrected`, `rewritten\t${beatsAt}`]
  return told([...head, ...said, ...outcomes, ...corrected.report, ...remembered.report])
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
