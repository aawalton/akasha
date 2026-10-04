import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master.role.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import type {
  BeatScene,
  Planned,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import type {
  Admitted,
  Character,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Advanced,
  type Caller,
  CHAPTER,
  firstMoved,
  GAME_MASTER,
  type Handed,
  type Held,
  leftOf,
  MECHANICS,
  type Moved,
  type Moving,
  memoryMerged,
  moved,
  type Noun,
  PLAYER,
  RECORDERS,
  REVIEWERS,
  type Ruling,
  type Staff,
  type Start,
  TURN,
  type TurnStep,
  toRecorders,
  toReviewers,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { loreRefused } from "akasha/story/world/stories/played/turns/modules/turn-lore-handed/turn-lore-handed.module.code.ts"
import {
  beatsRefused,
  issueOf,
  issuesRefused,
  mechanicked,
  type Recorded,
  raisedAs,
  raiserOf,
  ruledOut,
  rulingsJoined,
  unruled,
} from "akasha/story/world/stories/played/turns/modules/turn-mechanics/turn-mechanics.module.code.ts"
import {
  proseTaken,
  unaddressed,
} from "akasha/story/world/stories/played/turns/modules/turn-prose/turn-prose.module.code.ts"

const STORY_REVIEWER = storyReviewer.slug

const STORY_RECORDER = storyRecorder.slug

const PROSE_HELD = "txt"

const HELD_LINES = "jsonl"

const PARTED = "/"

type Kind = Handed["kind"]

const ROLE_OF: Readonly<{ [step in TurnStep]: string | null }> = {
  "world-builder": worldBuilderRole.slug,
  "game-master": gameMasterRole.slug,
  mechanics: storyRecorderRole.slug,
  writer: writerRole.slug,
  reviewers: reviewerRole.slug,
  recorders: storyRecorderRole.slug,
  player: null,
}

const TAKES: Readonly<{ [step in TurnStep]: Kind | null }> = {
  "world-builder": "lore",
  "game-master": "beats",
  mechanics: "record",
  writer: "prose",
  reviewers: "review",
  recorders: "record",
  player: null,
}

const SAID_AS: Readonly<{ [kind in Kind]: string }> = {
  lore: "the lore pages it landed (`--lore`, or none)",
  beats: "the beats (`--beats-file`, with `--rulings-file` or none)",
  review: "one reviewer's issues (`--reviewer`, with `--issues-file` or none)",
  prose: "the prose (`--prose-file`, with `--character`)",
  record:
    "one recorder's work (`--recorder`, with `--changes-file` and `--issues-file` at mechanics, `--memory-file` or `--pictured-file` at recorders)",
}

function nounOf(held: Held): Noun {
  return held.noun ?? TURN
}

function callerRefused(held: Held, caller: Caller): string | null {
  const role = ROLE_OF[held.status]
  const noun = nounOf(held)
  if (role === null && noun === CHAPTER) {
    return `the chapter is at ${PLAYER}, so it is published and nothing moves it on`
  }
  if (role === null) {
    return `the turn is at ${PLAYER}, and only the player's next action makes the next turn`
  }
  if (caller.role === role && caller.game === held.game) return null
  const from =
    caller.role === null
      ? "no seat that holds a role"
      : `a ${caller.role} seat${caller.game === null ? "" : ` of \`${caller.game}\``}`
  return `the ${noun} is at ${held.status}, so it waits on the ${role} of \`${held.game}\`, and this advance comes from ${from}`
}

function namedAs(type: string, slugs: readonly string[]): readonly string[] | undefined {
  return slugs.length === 0 ? undefined : slugs.map((one) => `${type}${PARTED}${one}`)
}

function afterProse(
  held: Held,
  values: Readonly<{ [key: string]: unknown }>,
  staff: Staff,
  moving: Moving
): Moved {
  const mechanics = leftOf(staff.mechanics, held.recordedBy)
  if (mechanics.length > 0) {
    const starts = mechanics.map((recorder): Start => ({ kind: "mechanics", recorder }))
    return moved(MECHANICS, values, { ...moving, starts })
  }
  const recording = leftOf(staff.recorders, held.recordedBy)
  if (recording.length > 0) return toRecorders(values, recording, moving)
  return toReviewers(held, values, staff, moving)
}

type Remembered = { readonly refused: string } | { readonly memory: readonly Memory[] | null }

function remembered(held: Held, handed: Recorded): Remembered {
  const memory = handed.memory ?? []
  if (memory.length === 0) return { memory: null }
  const beats = held.beats ?? Number.POSITIVE_INFINITY
  const far = memory.find((one) => one.beat > beats)
  if (far !== undefined) {
    return {
      refused: `a memory names beat ${far.beat}, and the ${nounOf(held)} has ${beats} beats`,
    }
  }
  return { memory: memoryMerged(held.memory ?? [], memory) }
}

function picturedRefused(held: Held, handed: Recorded): string | null {
  const beats = held.beats ?? Number.POSITIVE_INFINITY
  const far = (handed.pictured ?? []).find((one) => one.beat > beats)
  if (far === undefined) return null
  return `a picture names beat ${far.beat}, and the ${nounOf(held)} has ${beats} beats`
}

function fromWorldBuilder(held: Held, lore: readonly string[], admitted: Admitted): Advanced {
  const wrong = unaddressed("lore page", lore) ?? loreRefused(lore, admitted)
  if (wrong !== null) return { refused: wrong }
  const kept = [...new Set([...held.lore, ...lore])]
  return moved(GAME_MASTER, kept.length === 0 ? {} : { lore: kept })
}

type Ruled = {
  readonly held: Held
  readonly values: Readonly<{ [key: string]: unknown }>
  readonly moving: Moving
}

function ruledOver(
  held: Held,
  rulings: readonly Ruling[],
  reviewers: readonly string[]
): Ruled | { readonly refused: string } {
  if (rulings.length === 0) return { held, values: {}, moving: {} }
  const lines = [...held.issues, ...(held.mechanicsIssues ?? [])]
  const stray = rulings.findIndex((one) => !lines.includes(one.issue))
  if (stray >= 0) {
    return { refused: `ruling ${stray + 1} names no issue line the ${nounOf(held)} holds` }
  }
  const issues = unruled(held.issues, rulings)
  const mechanicsIssues = unruled(held.mechanicsIssues ?? [], rulings)
  const raisers = (of: readonly string[]) => of.flatMap((one) => raiserOf(one, reviewers) ?? [])
  const live = raisers(issues)
  const settled = raisers(held.issues).filter(
    (one, at, all) => all.indexOf(one) === at && !live.includes(one)
  )
  const reviewedBy = [...held.reviewedBy, ...leftOf(settled, held.reviewedBy)]
  const changed = issues.length !== held.issues.length
  const values = {
    rulings: HELD_LINES,
    ...(reviewedBy.length > held.reviewedBy.length
      ? { reviewedBy: namedAs(STORY_REVIEWER, reviewedBy) }
      : {}),
    ...(changed ? { issues: issues.length > 0 ? PROSE_HELD : undefined } : {}),
  }
  const moving = {
    rulings: rulingsJoined(held.rulings ?? [], rulings),
    ...(changed && issues.length > 0 ? { issues } : {}),
  }
  return { held: { ...held, issues, mechanicsIssues, reviewedBy }, values, moving }
}

function fromBeats(
  given: Held,
  beats: readonly string[],
  scenes: readonly BeatScene[],
  rulings: readonly Ruling[],
  staff: Staff
): Advanced {
  if (beats.length === 0) {
    return { refused: "a game master's advance hands in beats, and this has none" }
  }
  const wrong = beatsRefused(beats, given)
  if (wrong !== null) return { refused: wrong }
  const ruled = ruledOver(given, rulings, staff.reviewers)
  if ("refused" in ruled) return ruled
  const held = ruled.held
  const recordedBy = recordedAfter(held, { beats, scenes }, staff)
  const values = {
    beats: HELD_LINES,
    recordedBy: namedAs(STORY_RECORDER, recordedBy),
    mechanicsIssues: undefined,
    ...ruled.values,
  }
  const moving = { planned: { beats, scenes }, ...ruled.moving }
  const mechanics = leftOf(staff.mechanics, recordedBy)
  if (mechanics.length === 0) return moved(WRITER, values, moving)
  const starts = mechanics.map((recorder): Start => ({ kind: "mechanics", recorder }))
  return moved(MECHANICS, values, { ...moving, starts })
}

function recordedAfter(held: Held, planned: Planned, staff: Staff): readonly string[] {
  if (firstMoved(held.planned, planned) !== null) return []
  if ((held.mechanicsIssues ?? []).length === 0) return held.recordedBy
  return leftOf(held.recordedBy, staff.mechanics)
}

function fromReviewer(
  held: Held,
  reviewer: string,
  raised: readonly string[],
  staff: Staff
): Advanced {
  const rulings = held.rulings ?? []
  const found = raised.filter((one) => !ruledOut(raisedAs(reviewer, one), rulings))
  const reviewers = staff.reviewers
  if (!reviewers.includes(reviewer)) {
    return {
      refused: `\`${reviewer}\` is no story reviewer, and the story reviewers are ${reviewers.join(", ")}`,
    }
  }
  const noun = nounOf(held)
  if (held.reviewedBy.includes(reviewer)) {
    return {
      refused: `\`${reviewer}\` has reviewed this ${noun} already, and reviews it again only once the issues it raised are mended`,
    }
  }
  const rest = held.issues.filter((one) => raiserOf(one, reviewers) !== reviewer)
  const issues = [...rest, ...found.map((one) => raisedAs(reviewer, one))]
  const wrong = issuesRefused([...rest.map((one) => issueOf(one, reviewers)), ...found], noun)
  if (wrong !== null) return { refused: wrong }
  const reviewedBy = [...held.reviewedBy, reviewer]
  const cleared = issues.length === 0 && held.issues.length > 0
  const values = {
    reviewedBy: namedAs(STORY_REVIEWER, reviewedBy),
    ...(issues.length > 0 ? { issues: PROSE_HELD } : cleared ? { issues: undefined } : {}),
  }
  const rewritten = found.length > 0 || rest.length !== held.issues.length
  const moving = { issues: rewritten && issues.length > 0 ? issues : null }
  if (!reviewers.every((one) => reviewedBy.includes(one))) {
    return moved(REVIEWERS, values, moving)
  }
  if (issues.length > 0) {
    const raisers = issues.flatMap((one) => raiserOf(one, reviewers) ?? [])
    const kept = namedAs(STORY_REVIEWER, leftOf(reviewedBy, raisers))
    return moved(GAME_MASTER, { ...values, reviewedBy: kept }, moving)
  }
  if (!held.written) return moved(WRITER, values, moving)
  return toRecorders(values, leftOf(staff.recorders, held.recordedBy), moving)
}

function fromProse(
  held: Held,
  handed: Extract<Handed, { kind: "prose" }>,
  staff: Staff,
  cast: readonly Character[],
  admitted: Admitted
): Advanced {
  const taken = proseTaken(handed.prose, handed.characters, cast, admitted)
  if ("refused" in taken) return taken
  const moving = { prose: taken.prose, proseRecords: handed.beatProse ?? null }
  return afterProse(held, taken.values, staff, moving)
}

function fromMechanics(held: Held, handed: Recorded, staff: Staff): Advanced {
  const done = mechanicked(held, handed, staff.mechanics)
  if ("refused" in done) return done
  const moving = { changes: done.changes, mechanicsIssues: done.issues }
  if (done.next === "mechanics") return moved(MECHANICS, done.values, moving)
  if (done.next === "game-master") return moved(GAME_MASTER, done.values, moving)
  if (!held.written || held.issues.length > 0) return moved(WRITER, done.values, moving)
  return afterProse({ ...held, recordedBy: done.recordedBy }, done.values, staff, moving)
}

function fromRecorder(held: Held, handed: Recorded, staff: Staff): Advanced {
  const recorder = handed.recorder
  const mechanics = held.status === MECHANICS
  const allowed = mechanics ? staff.mechanics : [...staff.recorders, ...staff.mechanics]
  const step = mechanics ? "at mechanics" : "at recorders"
  if (!allowed.includes(recorder)) {
    return {
      refused: `\`${recorder}\` is no story recorder ${step}, and those are ${allowed.join(", ")}`,
    }
  }
  const noun = nounOf(held)
  if (held.recordedBy.includes(recorder)) {
    return {
      refused: `\`${recorder}\` has recorded this ${noun} already, and a ${noun} is recorded once a run`,
    }
  }
  if (mechanics && [...(handed.memory ?? []), ...(handed.pictured ?? [])].length > 0) {
    return { refused: "memory and pictures are handed in at recorders, and this is at mechanics" }
  }
  if (mechanics) return fromMechanics(held, handed, staff)
  if ((handed.changes ?? []).length > 0 || (handed.issues ?? []).length > 0) {
    return { refused: "changes and issues are handed in at mechanics, and this is at recorders" }
  }
  const memory = remembered(held, handed)
  if ("refused" in memory) return memory
  const far = picturedRefused(held, handed)
  if (far !== null) return { refused: far }
  const recordedBy = [...held.recordedBy, recorder]
  const values = { recordedBy: recordedBy.map((one) => `${STORY_RECORDER}${PARTED}${one}`) }
  const pictured = (handed.pictured ?? []).length === 0 ? null : (handed.pictured ?? null)
  const landing = { landsKept: true, memory: memory.memory, pictured }
  if (!staff.recorders.every((one) => recordedBy.includes(one))) {
    return moved(RECORDERS, values, landing)
  }
  return toReviewers({ ...held, recordedBy }, values, staff, landing)
}

export function advanced(
  held: Held,
  caller: Caller,
  handed: Handed,
  reviewers: readonly string[],
  recorders: readonly string[],
  cast: readonly Character[],
  admitted: Admitted,
  mechanics: readonly string[] = []
): Advanced {
  const refused = callerRefused(held, caller)
  if (refused !== null) return { refused }
  const takes = TAKES[held.status]
  if (takes === null) {
    return { refused: `the ${nounOf(held)} is at ${held.status}, and nothing advances it` }
  }
  if (handed.kind !== takes) {
    return {
      refused: `at ${held.status} an advance hands in ${SAID_AS[takes]}, and this hands in ${SAID_AS[handed.kind]}`,
    }
  }
  if (handed.kind === "prose" && handed.beatProse !== undefined && held.proseOnBeats !== true) {
    return {
      refused:
        "this story keeps each chapter's prose in the file beside the chapter, so a writer hands in the prose itself",
    }
  }
  const staff = { reviewers, recorders: leftOf(recorders, mechanics), mechanics }
  if (handed.kind === "lore") return fromWorldBuilder(held, handed.lore, admitted)
  if (handed.kind === "beats") {
    return fromBeats(held, handed.beats, handed.scenes ?? [], handed.rulings ?? [], staff)
  }
  if (handed.kind === "review") return fromReviewer(held, handed.reviewer, handed.issues, staff)
  if (handed.kind === "record") return fromRecorder(held, handed, staff)
  return fromProse(held, handed, staff, cast, admitted)
}
