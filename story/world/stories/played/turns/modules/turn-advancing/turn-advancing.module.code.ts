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

const MOST_LINES = 100

const LONGEST_LINE = 100

const STORY_REVIEWER = storyReviewer.slug

const STORY_RECORDER = storyRecorder.slug

const PROSE_HELD = "txt"

const PARTED = "/"

const BREAK = "\n"

type Kind = Handed["kind"]

const ROLE_OF: Readonly<Record<TurnStep, string | null>> = {
  "world-builder": worldBuilderRole.slug,
  "game-master": gameMasterRole.slug,
  mechanics: storyRecorderRole.slug,
  writer: writerRole.slug,
  reviewers: reviewerRole.slug,
  recorders: storyRecorderRole.slug,
  player: null,
}

const TAKES: Readonly<Record<TurnStep, Kind | null>> = {
  "world-builder": "lore",
  "game-master": "beats",
  mechanics: "record",
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

function linesRefused(one: string, lines: readonly string[], noun: Noun): string | null {
  const what = `${one}s`
  if (lines.length > MOST_LINES) {
    return `a ${noun} holds at most ${MOST_LINES} ${what}, and this makes ${lines.length}`
  }
  const long = lines.flatMap((line, at) =>
    line.length > LONGEST_LINE ? [`${one} ${at + 1} runs to ${line.length}`] : []
  )
  if (long.length === 0) return null
  return `each of a ${noun}'s ${what} is at most ${LONGEST_LINE} characters, and ${long.join(", ")}`
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
  values: Readonly<Record<string, unknown>>,
  starts: readonly Start[] = [],
  stopsCaller = false,
  prose: string | null = null,
  landsKept = false
): Moved {
  const stated = { stepStatus: statusOf(status), ...values }
  return { status, values: stated, prose, starts, stopsCaller, landsKept }
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
  scenes: readonly BeatScene[]
): Advanced {
  if (beats.length === 0)
    return { refused: "a game master's advance hands in beats, and this has none" }
  const wrong = linesRefused("beat", beats, nounOf(held))
  if (wrong !== null) return { refused: wrong }
  return moved(WRITER, { beats, beatScenes: scenes.length === 0 ? undefined : scenes })
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
  recorders: readonly string[],
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
  const noun = nounOf(held)
  if (held.recordedBy.includes(recorder)) {
    return {
      refused: `\`${recorder}\` has recorded this ${noun} already, and a ${noun} is recorded once`,
    }
  }
  const recordedBy = [...held.recordedBy, recorder]
  const values = { recordedBy: recordedBy.map((one) => `${STORY_RECORDER}${PARTED}${one}`) }
  if (!recorders.every((one) => recordedBy.includes(one))) {
    return moved(RECORDERS, values, [], true, null, true)
  }
  return moved(PLAYER, values, [], true, null, true)
}

export function advanced(
  held: Held,
  caller: Caller,
  handed: Handed,
  reviewers: readonly string[],
  recorders: readonly string[],
  cast: readonly Character[],
  admitted: Admitted
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
  if (handed.kind === "lore") return fromWorldBuilder(held, handed.lore, admitted)
  if (handed.kind === "beats") return fromGameMaster(held, handed.beats, handed.scenes ?? [])
  if (handed.kind === "review") {
    return fromReviewer(held, handed.reviewer, handed.issues, reviewers, recorders)
  }
  if (handed.kind === "record") return fromRecorder(held, handed.recorder, recorders)
  return fromWriter(held, handed.prose, handed.characters, reviewers, recorders, cast, admitted)
}
