import { beatEditor as beatEditorRole } from "akasha/agent/role/pages/beat-editor.role.ts"
import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master.role.ts"
import { proseEditor as proseEditorRole } from "akasha/agent/role/pages/prose-editor.role.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import type { Pictured } from "akasha/story/engine/beat-state/modules/beat-pictures/beat-pictures.module.code.ts"
import type { BeatProse } from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
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
import { editorAfter } from "akasha/story/world/stories/played/turns/modules/turn-editing/turn-editing.module.code.ts"
import {
  type Advanced,
  BEAT_EDITOR,
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
  beatsRefused,
  linesRefused,
  mechanicked,
  type Recorded,
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
  "beat-editor": beatEditorRole.slug,
  mechanics: storyRecorderRole.slug,
  writer: writerRole.slug,
  "prose-editor": proseEditorRole.slug,
  reviewers: reviewerRole.slug,
  recorders: storyRecorderRole.slug,
  player: null,
}

const TAKES: Readonly<{ [step in TurnStep]: Kind | null }> = {
  "world-builder": "lore",
  "game-master": "beats",
  "beat-editor": "beats",
  mechanics: "record",
  writer: "prose",
  "prose-editor": "prose",
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
    "one recorder's work (`--recorder`, with `--changes-file` and `--issues-file` at mechanics, `--memory-file` or `--pictured-file` at recorders)",
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
  readonly proseRecords?: readonly BeatProse[] | null
  readonly planned?: Planned | null
  readonly changes?: readonly BeatChange[] | null
  readonly memory?: readonly Memory[] | null
  readonly pictured?: readonly Pictured[] | null
  readonly issues?: readonly string[] | null
  readonly mechanicsIssues?: readonly string[] | null
  readonly landsKept?: boolean
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
    proseRecords: moving.proseRecords ?? null,
    planned: moving.planned ?? null,
    changes: moving.changes ?? null,
    memory: moving.memory ?? null,
    pictured: moving.pictured ?? null,
    issues: moving.issues ?? null,
    mechanicsIssues: moving.mechanicsIssues ?? null,
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
  const recording = leftOf(staff.recorders, held.recordedBy)
  if (recording.length > 0) return toRecorders(values, recording, moving)
  return toReviewers(held, values, staff, moving)
}

function toReviewers(
  held: Held,
  values: Readonly<{ [key: string]: unknown }>,
  staff: Staff,
  moving: Moving
): Moved {
  const reviewing = leftOf(staff.reviewers, held.reviewedBy)
  if (reviewing.length === 0) return moved(PLAYER, values, moving)
  const starts = reviewing.map((reviewer): Start => ({ kind: "reviewer", reviewer }))
  return moved(REVIEWERS, values, { ...moving, starts })
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
  return {
    memory: [...(held.memory ?? []), ...memory].toSorted((one, other) => one.beat - other.beat),
  }
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

function fromBeats(
  held: Held,
  beats: readonly string[],
  scenes: readonly BeatScene[],
  staff: Staff
): Advanced {
  const who = held.status === BEAT_EDITOR ? "beat editor" : "game master"
  if (beats.length === 0) return { refused: `a ${who}'s advance hands in beats, and this has none` }
  const wrong = beatsRefused(beats, held)
  if (wrong !== null) return { refused: wrong }
  const values = {
    beats: HELD_LINES,
    recordedBy: undefined,
    mechanicsIssues: undefined,
    ...(held.written ? { ownLength: 0 } : {}),
  }
  const moving = { planned: { beats, scenes } }
  const editor = editorAfter(held)
  if (editor !== null) return moved(editor, values, moving)
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
    ...(issues.length === 0 ? {} : { issues: PROSE_HELD }),
  }
  const stopping = { stopsCaller: true, issues: found.length === 0 ? null : issues }
  if (!reviewers.every((one) => reviewedBy.includes(one))) {
    return moved(REVIEWERS, values, stopping)
  }
  if (issues.length > 0) return moved(GAME_MASTER, values, stopping)
  if (!held.written) return moved(WRITER, values, stopping)
  return toRecorders(values, leftOf(staff.recorders, held.recordedBy), stopping)
}

function fromProse(
  held: Held,
  handed: Extract<Handed, { kind: "prose" }>,
  staff: Staff,
  cast: readonly Character[],
  admitted: Admitted
): Advanced {
  const taken = proseTaken(held, handed.prose, handed.characters, cast, admitted)
  if ("refused" in taken) return taken
  const moving = { prose: taken.prose, proseRecords: handed.beatProse ?? null }
  const editor = editorAfter(held)
  if (editor !== null) return moved(editor, taken.values, moving)
  return afterProse(held, taken.values, staff, moving)
}

function fromMechanics(held: Held, handed: Recorded, staff: Staff): Advanced {
  const done = mechanicked(held, handed, staff.mechanics)
  if ("refused" in done) return done
  const moving = { stopsCaller: true, changes: done.changes, mechanicsIssues: done.issues }
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
  const landing = { stopsCaller: true, landsKept: true, memory: memory.memory, pictured }
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
  if (handed.kind === "beats") return fromBeats(held, handed.beats, handed.scenes ?? [], staff)
  if (handed.kind === "review") return fromReviewer(held, handed.reviewer, handed.issues, staff)
  if (handed.kind === "record") return fromRecorder(held, handed, staff)
  return fromProse(held, handed, staff, cast, admitted)
}
