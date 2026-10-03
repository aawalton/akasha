import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master.role.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import type { BeatScene } from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import {
  type Admitted,
  type Character,
  listedRefused,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Advanced,
  type Caller,
  CHAPTER,
  GAME_MASTER,
  type Handed,
  type Held,
  MECHANICS,
  type Moved,
  type Noun,
  PLAYER,
  RECORDERS,
  REVIEWERS,
  type Start,
  statusOf,
  TURN,
  type TurnStep,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { loreRefused } from "akasha/story/world/stories/played/turns/modules/turn-lore-handed/turn-lore-handed.module.code.ts"
import {
  linesRefused,
  mechanicked,
  type Recorded,
} from "akasha/story/world/stories/played/turns/modules/turn-mechanics/turn-mechanics.module.code.ts"

const STORY_REVIEWER = storyReviewer.slug

const STORY_RECORDER = storyRecorder.slug

const PROSE_HELD = "txt"

const CHANGES_HELD = "jsonl"

const PARTED = "/"

const BREAK = "\n"

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
  beats: "the beats (`--beats-file`)",
  review: "one reviewer's issues (`--reviewer`, with `--issues-file` or none)",
  prose: "the prose (`--prose-file`, with `--character`)",
  record:
    "one recorder's work (`--recorder`, with `--changes-file` and `--issues-file` at mechanics)",
}

type Staff = {
  readonly reviewers: readonly string[]
  readonly recorders: readonly string[]
  readonly mechanics: readonly string[]
}

type Moving = {
  readonly starts?: readonly Start[]
  readonly stopsCaller?: boolean
  readonly prose?: string | null
  readonly changes?: string | null
  readonly landsKept?: boolean
}

function unaddressed(what: string, addresses: readonly string[]): string | null {
  const bare = addresses.find((one) => !one.includes(PARTED))
  if (bare === undefined) return null
  return `a ${what} is named by its address, its type and its slug, and \`${bare}\` names no type`
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

function moved(
  status: TurnStep,
  values: Readonly<{ [key: string]: unknown }>,
  moving: Moving = {}
): Moved {
  return {
    status,
    values: { stepStatus: statusOf(status), ...values },
    prose: moving.prose ?? null,
    changes: moving.changes ?? null,
    starts: moving.starts ?? [],
    stopsCaller: moving.stopsCaller ?? false,
    landsKept: moving.landsKept ?? false,
  }
}

function leftOf(all: readonly string[], done: readonly string[]): readonly string[] {
  return all.filter((one) => !done.includes(one))
}

function toRecorders(
  values: Readonly<{ [key: string]: unknown }>,
  recorders: readonly string[],
  moving: Moving
): Moved {
  if (recorders.length === 0) return moved(PLAYER, values, moving)
  const starts = recorders.map((recorder): Start => ({ kind: "recorder", recorder }))
  return moved(RECORDERS, values, { ...moving, starts })
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
  const reviewing = leftOf(staff.reviewers, held.reviewedBy)
  if (reviewing.length === 0) {
    return toRecorders(values, leftOf(staff.recorders, held.recordedBy), moving)
  }
  const starts = reviewing.map((reviewer): Start => ({ kind: "reviewer", reviewer }))
  return moved(REVIEWERS, values, { ...moving, starts })
}

function fromWorldBuilder(held: Held, lore: readonly string[], admitted: Admitted): Advanced {
  const wrong = unaddressed("lore page", lore) ?? loreRefused(lore, admitted)
  if (wrong !== null) return { refused: wrong }
  const kept = [...new Set([...held.lore, ...lore])]
  return moved(GAME_MASTER, kept.length === 0 ? {} : { lore: kept })
}

function fromGameMaster(
  held: Held,
  beats: readonly string[],
  scenes: readonly BeatScene[],
  staff: Staff
): Advanced {
  if (beats.length === 0)
    return { refused: "a game master's advance hands in beats, and this has none" }
  const wrong = linesRefused("beat", beats, nounOf(held))
  if (wrong !== null) return { refused: wrong }
  const emptied = (held.changes ?? []).length > 0
  const values = {
    beats,
    beatScenes: scenes.length === 0 ? undefined : scenes,
    recordedBy: undefined,
    mechanicsIssues: undefined,
    ...(emptied ? { beatChanges: CHANGES_HELD } : {}),
  }
  const moving = emptied ? { changes: "" } : {}
  if (staff.mechanics.length === 0) return moved(WRITER, values, moving)
  const starts = staff.mechanics.map((recorder): Start => ({ kind: "mechanics", recorder }))
  return moved(MECHANICS, values, { ...moving, starts })
}

function fromReviewer(
  held: Held,
  reviewer: string,
  found: readonly string[],
  staff: Staff
): Advanced {
  const reviewers = staff.reviewers
  if (!reviewers.includes(reviewer)) {
    return {
      refused: `\`${reviewer}\` is no story reviewer, and the story reviewers are ${reviewers.join(", ")}`,
    }
  }
  const noun = nounOf(held)
  if (held.reviewedBy.includes(reviewer)) {
    return {
      refused: `\`${reviewer}\` has reviewed this ${noun} already, and a ${noun} is reviewed once`,
    }
  }
  const issues = [...held.issues, ...found]
  const wrong = linesRefused("issue", issues, noun)
  if (wrong !== null) return { refused: wrong }
  const reviewedBy = [...held.reviewedBy, reviewer]
  const values = {
    reviewedBy: reviewedBy.map((one) => `${STORY_REVIEWER}${PARTED}${one}`),
    ...(issues.length === 0 ? {} : { issues }),
  }
  const stopping = { stopsCaller: true }
  if (!reviewers.every((one) => reviewedBy.includes(one))) {
    return moved(REVIEWERS, values, stopping)
  }
  if (issues.length > 0) return moved(GAME_MASTER, values, stopping)
  if (!held.written) return moved(WRITER, values, stopping)
  return toRecorders(values, leftOf(staff.recorders, held.recordedBy), stopping)
}

function fromWriter(
  held: Held,
  prose: string,
  characters: readonly string[],
  staff: Staff,
  cast: readonly Character[],
  admitted: Admitted
): Advanced {
  if (prose.trim() === "")
    return { refused: "a writer's advance hands in prose, and this has none" }
  const wrong =
    unaddressed("character", characters) ?? listedRefused(prose, characters, cast, admitted)
  if (wrong !== null) return { refused: wrong }
  const kept = [...new Set(characters)]
  const written = prose.endsWith(BREAK) ? prose : `${prose}${BREAK}`
  const values = {
    prose: PROSE_HELD,
    ownLength: wordCount(prose),
    ...(kept.length === 0 ? {} : { characters: kept }),
  }
  return afterProse(held, values, staff, { prose: written })
}

function fromMechanics(held: Held, handed: Recorded, staff: Staff): Advanced {
  const done = mechanicked(held, handed, staff.mechanics)
  if ("refused" in done) return done
  const moving = { stopsCaller: true, changes: done.changes }
  if (done.next === "mechanics") return moved(MECHANICS, done.values, moving)
  if (done.next === "game-master") return moved(GAME_MASTER, done.values, moving)
  if (!held.written) return moved(WRITER, done.values, moving)
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
  if (mechanics) return fromMechanics(held, handed, staff)
  if ((handed.changes ?? []).length > 0 || (handed.issues ?? []).length > 0) {
    return { refused: "changes and issues are handed in at mechanics, and this is at recorders" }
  }
  const recordedBy = [...held.recordedBy, recorder]
  const values = { recordedBy: recordedBy.map((one) => `${STORY_RECORDER}${PARTED}${one}`) }
  const landing = { stopsCaller: true, landsKept: true }
  if (!staff.recorders.every((one) => recordedBy.includes(one))) {
    return moved(RECORDERS, values, landing)
  }
  return moved(PLAYER, values, landing)
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
  const staff = { reviewers, recorders: leftOf(recorders, mechanics), mechanics }
  if (handed.kind === "lore") return fromWorldBuilder(held, handed.lore, admitted)
  if (handed.kind === "beats") {
    return fromGameMaster(held, handed.beats, handed.scenes ?? [], staff)
  }
  if (handed.kind === "review") return fromReviewer(held, handed.reviewer, handed.issues, staff)
  if (handed.kind === "record") return fromRecorder(held, handed, staff)
  return fromWriter(held, handed.prose, handed.characters, staff, cast, admitted)
}
