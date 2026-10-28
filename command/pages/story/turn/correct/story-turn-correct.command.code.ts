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
  proseTold,
  type Told,
} from "akasha/command/pages/story/turn/correct/modules/beat-retelling/beat-retelling.module.code.ts"
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
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
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
  type Beats,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
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

const BEATS_KEY = "beats"

const BEATS_HELD = "jsonl"

const OWN_LENGTH = "ownLength"

const STORY = "story"

export type Correcting = Reach & {
  readonly chapterOf: (root: string, slug: string) => Turn | null
  readonly pagedOf: (root: string, game: string) => readonly Paged[]
  readonly changing: Changing
  readonly beatingOf: (root: string) => Unbeating
  readonly present: (root: string, path: string) => boolean
  readonly tellingOf: (root: string) => Telling
  readonly unplayingOf: (root: string, turnAt: string) => Unplaying
}

function chapterIndexed(root: string, slug: string): Turn | null {
  const listed = listedAt(root, storyChapterPlayed.slug, slug)[0]
  const value = listed === undefined ? null : valueAt(listed.path, root)
  return listed === undefined || value === null ? null : { at: listed.path, slug, value }
}

const CORRECTS: Correcting = {
  ...REACHED,
  chapterOf: chapterIndexed,
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

function pageOf(reach: Correcting, root: string, slug: string): Turn | null {
  return reach.turnAt(root, slug) ?? reach.chapterOf(root, slug)
}

type Shown = {
  readonly turn: Turn
  readonly game: string
  readonly beats: Beats
  readonly shown: number
  readonly chapter: boolean
}

function shownRefused(
  reach: Correcting,
  root: string,
  slug: string,
  beat: number,
  seat: Seated | null
) {
  const turn = pageOf(reach, root, slug)
  if (turn === null) return { refused: `\`${slug}\` names no played turn or chapter here` }
  const chapter = reach.turnAt(root, slug) === null
  const story = { game: bareOf(textAt(turn.value, STORY) ?? ""), status: PLAYER }
  const held = chapter ? story : heldOf(turn)
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
  const found: Shown = { turn, game: held.game, beats, shown, chapter }
  return found
}

type Restated = {
  readonly changes: readonly BeatChange[]
  readonly memory: readonly Memory[]
  readonly told: Told
  readonly event: string | null
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
  const events = beats.beats.map((one, at) => (at + 1 === beat ? (now.event ?? one) : one))
  return { ...beats, beats: events, changes, memory, none, ...prose }
}

function written(texts: ReadonlyMap<string, string | null>): readonly Asking[] {
  return [...texts].map(([at, text]) =>
    text === null ? taking(at) : putting({ path: at, content: text })
  )
}

function settledOn(
  reach: Correcting,
  root: string,
  found: Shown,
  asked: Asked,
  now: readonly BeatChange[]
) {
  const settling = {
    present: (at: string) => reach.present(root, at),
    textOf: (at: string) => reach.textIn(root, at),
  }
  return outcomesOn(settling, found.turn.at, asked.outcomes, found.beats, asked.beat, now)
}

function unplayingFor(reach: Correcting, root: string, found: Shown): Unplaying {
  const unplaying = reach.unplayingOf(root, found.turn.at)
  return found.chapter ? { ...unplaying, valueBefore: () => null } : unplaying
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
  const settled = settledOn(reach, root, found, asked, now)
  if ("refused" in settled) return refused(settled.refused, DATA)
  const reading = {
    present: (at: string) => reach.present(root, at),
    textOf: (at: string) => reach.textIn(root, at),
  }
  const retold = proseTold(reading, turn, beats, asked, found.chapter)
  if ("refused" in retold) return refused(retold.refused, DATA)
  const others = [
    ...memoryOf(paged.filter((one) => one.slug !== slug)),
    ...beats.memory.filter((one) => one.beat !== beat),
  ]
  const remembering = {
    unplaying: unplayingFor(reach, root, found),
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
  const type = found.chapter ? storyChapterPlayed.slug : storyTurnPlayed.slug
  const length: Naming = { pageTypeSlug: type, slug, path: turn.at, values: counted, merge: true }
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
  const restated = { changes: now, memory, told: retold, event: asked.event }
  const body = beatsWritten(beatsAfter(beats, beat, restated))
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
  const placed = pageOf(reach, given.root, slug)
  if (placed === null) return refused(`\`${read.turn}\` names no played turn or chapter here`, DATA)
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
