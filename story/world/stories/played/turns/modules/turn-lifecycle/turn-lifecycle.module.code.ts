import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master.role.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import { lore as lorePageType } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import { gameMaster } from "akasha/story/world/stories/played/turns/turn-status/pages/game-master.turn-status.ts"
import { player } from "akasha/story/world/stories/played/turns/turn-status/pages/player.turn-status.ts"
import { recorders as recordersStatus } from "akasha/story/world/stories/played/turns/turn-status/pages/recorders.turn-status.ts"
import { reviewers as reviewersStatus } from "akasha/story/world/stories/played/turns/turn-status/pages/reviewers.turn-status.ts"
import { worldBuilder } from "akasha/story/world/stories/played/turns/turn-status/pages/world-builder.turn-status.ts"
import { writer } from "akasha/story/world/stories/played/turns/turn-status/pages/writer.turn-status.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

export const TURN_STEPS = [
  worldBuilder.slug,
  gameMaster.slug,
  writer.slug,
  reviewersStatus.slug,
  recordersStatus.slug,
  player.slug,
] as const

export type TurnStep = (typeof TURN_STEPS)[number]

export const WORLD_BUILDER: TurnStep = worldBuilder.slug

export const GAME_MASTER: TurnStep = gameMaster.slug

export const REVIEWERS: TurnStep = reviewersStatus.slug

export const WRITER: TurnStep = writer.slug

export const RECORDERS: TurnStep = recordersStatus.slug

export const PLAYER: TurnStep = player.slug

const MANY: readonly TurnStep[] = [REVIEWERS, RECORDERS]

export const TURN_SENDER = "story-turn"

export const MOST_LINES = 100

export const LONGEST_LINE = 100

export const LONGEST_ACTION = 4000

const TURN_STATUS = turnStatus.slug

const STORY_REVIEWER = storyReviewer.slug

const STORY_RECORDER = storyRecorder.slug

const PROSE_HELD = "txt"

const PARTED = "/"

const BREAK = "\n"

const LINES = /\r?\n/

const LAST_NUMBER = /^(.*?)(\d+)$/

export type Handed =
  | { readonly kind: "lore"; readonly lore: readonly string[] }
  | { readonly kind: "beats"; readonly beats: readonly string[] }
  | { readonly kind: "review"; readonly reviewer: string; readonly issues: readonly string[] }
  | { readonly kind: "prose"; readonly prose: string; readonly characters: readonly string[] }
  | { readonly kind: "record"; readonly recorder: string }

type Kind = Handed["kind"]

export type Held = {
  readonly game: string
  readonly status: TurnStep
  readonly lore: readonly string[]
  readonly issues: readonly string[]
  readonly reviewedBy: readonly string[]
  readonly recordedBy: readonly string[]
  readonly written: boolean
}

export type Caller = { readonly role: string | null; readonly game: string | null }

export type Start =
  | { readonly kind: "reviewer"; readonly reviewer: string }
  | { readonly kind: "recorder"; readonly recorder: string }

export type Moved = {
  readonly status: TurnStep
  readonly values: Readonly<Record<string, unknown>>
  readonly prose: string | null
  readonly starts: readonly Start[]
  readonly stopsCaller: boolean
  readonly landsKept: boolean
}

export type Advanced = Moved | { readonly refused: string }

export type Latest = {
  readonly slug: string
  readonly position: number
  readonly collections: readonly string[]
  readonly unit: string | null
  readonly status: TurnStep | null
}

export type Made =
  | { readonly slug: string; readonly values: Readonly<Record<string, unknown>> }
  | { readonly refused: string }

const ROLE_OF: Readonly<Record<TurnStep, string | null>> = {
  "world-builder": worldBuilderRole.slug,
  "game-master": gameMasterRole.slug,
  writer: writerRole.slug,
  reviewers: reviewerRole.slug,
  recorders: storyRecorderRole.slug,
  player: null,
}

const TAKES: Readonly<Record<TurnStep, Kind | null>> = {
  "world-builder": "lore",
  "game-master": "beats",
  writer: "prose",
  reviewers: "review",
  recorders: "record",
  player: null,
}

const SAID_AS: Readonly<Record<Kind, string>> = {
  lore: "the lore pages it landed (`--lore`, or none)",
  beats: "the beats (`--beats-file`)",
  review: "one reviewer's issues (`--reviewer`, with `--issues-file` or none)",
  prose: "the prose (`--prose-file`, with `--character`)",
  record: "one recorder's drafted edits (`--recorder`)",
}

const WHO: Readonly<Record<TurnStep, string>> = {
  "world-builder": "the world builder",
  "game-master": "the game master",
  writer: "the writer",
  reviewers: "the reviewers",
  recorders: "the recorders",
  player: "the player",
}

export function stepIn(value: unknown): TurnStep | null {
  if (typeof value !== "string") return null
  const slug = value.slice(value.lastIndexOf(PARTED) + 1)
  return TURN_STEPS.find((one) => one === slug) ?? null
}

export function statusOf(step: TurnStep): string {
  return `${TURN_STATUS}${PARTED}${step}`
}

export function bareOf(address: string): string {
  return address.slice(address.lastIndexOf(PARTED) + 1)
}

export function workingSaid(step: TurnStep): string {
  const who = WHO[step]
  const opening = `${who.charAt(0).toUpperCase()}${who.slice(1)}`
  return `${opening} ${MANY.includes(step) ? "are" : "is"} working…`
}

export function linesIn(text: string): readonly string[] {
  return text
    .split(LINES)
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function noticeOf(turn: string, step: TurnStep, changed: readonly string[] = []): string {
  const said = `The turn \`${turn}\` is at ${step}.`
  if (changed.length === 0) return said
  const listed = changed.map((one) => `- \`${one}\``)
  return [said, "", "These lore pages have changed since you last read them:", ...listed].join(
    BREAK
  )
}

function linesRefused(what: string, lines: readonly string[]): string | null {
  if (lines.length > MOST_LINES) {
    return `a turn holds at most ${MOST_LINES} ${what}, and this makes ${lines.length}`
  }
  const long = lines.find((one) => one.length > LONGEST_LINE)
  if (long === undefined) return null
  return `each of a turn's ${what} is at most ${LONGEST_LINE} characters, and this one runs to ${long.length}: ${long}`
}

function unaddressed(what: string, addresses: readonly string[]): string | null {
  const bare = addresses.find((one) => !one.includes(PARTED))
  if (bare === undefined) return null
  return `a ${what} is named by its address, its type and its slug, and \`${bare}\` names no type`
}

export function callerRefused(held: Held, caller: Caller): string | null {
  const role = ROLE_OF[held.status]
  if (role === null) {
    return `the turn is at ${PLAYER}, and only the player's next action makes the next turn`
  }
  if (caller.role === role && caller.game === held.game) return null
  const from =
    caller.role === null
      ? "no seat that holds a role"
      : `a ${caller.role} seat${caller.game === null ? "" : ` of \`${caller.game}\``}`
  return `the turn is at ${held.status}, so it waits on the ${role} of \`${held.game}\`, and this advance comes from ${from}`
}

function moved(
  status: TurnStep,
  values: Readonly<Record<string, unknown>>,
  starts: readonly Start[] = [],
  stopsCaller = false,
  prose: string | null = null,
  landsKept = false
): Moved {
  const stated = { turnStatus: statusOf(status), ...values }
  return { status, values: stated, prose, starts, stopsCaller, landsKept }
}

const LORE_TYPES: readonly string[] = [lorePageType.slug, place.slug]

function notLore(lore: readonly string[]): string | null {
  const other = lore.find((one) => !LORE_TYPES.includes(one.slice(0, one.lastIndexOf(PARTED))))
  if (other === undefined) return null
  return `a lore page is of type ${LORE_TYPES.join(" or ")}, and \`${other}\` is not`
}

function fromWorldBuilder(held: Held, lore: readonly string[]): Advanced {
  const wrong = unaddressed("lore page", lore) ?? notLore(lore)
  if (wrong !== null) return { refused: wrong }
  const kept = [...new Set([...held.lore, ...lore])]
  return moved(GAME_MASTER, kept.length === 0 ? {} : { lore: kept })
}

function fromGameMaster(beats: readonly string[]): Advanced {
  if (beats.length === 0)
    return { refused: "a game master's advance hands in beats, and this has none" }
  const wrong = linesRefused("beats", beats)
  if (wrong !== null) return { refused: wrong }
  return moved(WRITER, { beats })
}

function onward(
  values: Readonly<Record<string, unknown>>,
  recorders: readonly string[],
  stopsCaller: boolean,
  prose: string | null
): Moved {
  if (recorders.length === 0) return moved(PLAYER, values, [], stopsCaller, prose)
  const starts = recorders.map((recorder): Start => ({ kind: "recorder", recorder }))
  return moved(RECORDERS, values, starts, stopsCaller, prose)
}

function fromReviewer(
  held: Held,
  reviewer: string,
  found: readonly string[],
  reviewers: readonly string[],
  recorders: readonly string[]
): Advanced {
  if (!reviewers.includes(reviewer)) {
    return {
      refused: `\`${reviewer}\` is no story reviewer, and the story reviewers are ${reviewers.join(", ")}`,
    }
  }
  if (held.reviewedBy.includes(reviewer)) {
    return {
      refused: `\`${reviewer}\` has reviewed this turn already, and a turn is reviewed once`,
    }
  }
  const issues = [...held.issues, ...found]
  const wrong = linesRefused("issues", issues)
  if (wrong !== null) return { refused: wrong }
  const reviewedBy = [...held.reviewedBy, reviewer]
  const values = {
    reviewedBy: reviewedBy.map((one) => `${STORY_REVIEWER}${PARTED}${one}`),
    ...(issues.length === 0 ? {} : { issues }),
  }
  if (!reviewers.every((one) => reviewedBy.includes(one))) {
    return moved(REVIEWERS, values, [], true)
  }
  if (issues.length > 0) return moved(GAME_MASTER, values, [], true)
  if (!held.written) return moved(WRITER, values, [], true)
  return onward(values, recorders, true, null)
}

function fromWriter(
  held: Held,
  prose: string,
  characters: readonly string[],
  reviewers: readonly string[],
  recorders: readonly string[]
): Advanced {
  if (prose.trim() === "")
    return { refused: "a writer's advance hands in prose, and this has none" }
  const wrong = unaddressed("character", characters)
  if (wrong !== null) return { refused: wrong }
  const kept = [...new Set(characters)]
  const written = prose.endsWith(BREAK) ? prose : `${prose}${BREAK}`
  const values = {
    prose: PROSE_HELD,
    ownLength: wordCount(prose),
    ...(kept.length === 0 ? {} : { characters: kept }),
  }
  const left = reviewers.filter((one) => !held.reviewedBy.includes(one))
  if (left.length === 0) return onward(values, recorders, false, written)
  const starts = left.map((reviewer): Start => ({ kind: "reviewer", reviewer }))
  return moved(REVIEWERS, values, starts, false, written)
}

function fromRecorder(held: Held, recorder: string, recorders: readonly string[]): Advanced {
  if (!recorders.includes(recorder)) {
    return {
      refused: `\`${recorder}\` is no story recorder, and the story recorders are ${recorders.join(", ")}`,
    }
  }
  if (held.recordedBy.includes(recorder)) {
    return {
      refused: `\`${recorder}\` has recorded this turn already, and a turn is recorded once`,
    }
  }
  const recordedBy = [...held.recordedBy, recorder]
  const values = { recordedBy: recordedBy.map((one) => `${STORY_RECORDER}${PARTED}${one}`) }
  if (!recorders.every((one) => recordedBy.includes(one))) {
    return moved(RECORDERS, values, [], true)
  }
  return moved(PLAYER, values, [], true, null, true)
}

export function advanced(
  held: Held,
  caller: Caller,
  handed: Handed,
  reviewers: readonly string[],
  recorders: readonly string[]
): Advanced {
  const refused = callerRefused(held, caller)
  if (refused !== null) return { refused }
  const takes = TAKES[held.status]
  if (takes === null) return { refused: `the turn is at ${held.status}, and nothing advances it` }
  if (handed.kind !== takes) {
    return {
      refused: `at ${held.status} an advance hands in ${SAID_AS[takes]}, and this hands in ${SAID_AS[handed.kind]}`,
    }
  }
  if (handed.kind === "lore") return fromWorldBuilder(held, handed.lore)
  if (handed.kind === "beats") return fromGameMaster(handed.beats)
  if (handed.kind === "review") {
    return fromReviewer(held, handed.reviewer, handed.issues, reviewers, recorders)
  }
  if (handed.kind === "record") return fromRecorder(held, handed.recorder, recorders)
  return fromWriter(held, handed.prose, handed.characters, reviewers, recorders)
}

export function slugAfter(slug: string): string | null {
  const found = LAST_NUMBER.exec(slug)
  if (found === null) return null
  const head = found[1] ?? ""
  const digits = found[2] ?? ""
  return `${head}${String(Number(digits) + 1).padStart(digits.length, "0")}`
}

export function latestOf<Of extends { readonly position: number }>(
  turns: readonly Of[]
): Of | null {
  return turns.toSorted((one, other) => other.position - one.position)[0] ?? null
}

export function makingRefused(latest: Latest | null): string | null {
  if (latest === null) return "This story has no turn yet for a new one to follow."
  const status = latest.status ?? PLAYER
  if (status === PLAYER) return null
  return `The last turn is still being made: ${WHO[status]} ${MANY.includes(status) ? "are" : "is"} working on it.`
}

export function turnAfter(latest: Latest | null, action: string): Made {
  if (action.trim() === "") return { refused: "An action says what you do, and this says nothing." }
  if (action.length > LONGEST_ACTION) {
    return { refused: `An action is at most ${LONGEST_ACTION} characters.` }
  }
  const refused = makingRefused(latest)
  if (refused !== null || latest === null) return { refused: refused ?? "" }
  const slug = slugAfter(latest.slug)
  if (slug === null) {
    return { refused: `The last turn, \`${latest.slug}\`, ends in no number to count on from.` }
  }
  return {
    slug,
    values: {
      partOfCollections: [...latest.collections],
      position: latest.position + 1,
      ...(latest.unit === null ? {} : { unit: latest.unit }),
      turnStatus: statusOf(WORLD_BUILDER),
      action,
    },
  }
}
