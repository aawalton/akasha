import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { beat as beatArgument } from "akasha/command/argument/pages/beat.argument.ts"
import { changesFile } from "akasha/command/argument/pages/changes-file.argument.ts"
import { memoryFile } from "akasha/command/argument/pages/memory-file.argument.ts"
import { outcomesFile } from "akasha/command/argument/pages/outcomes-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { storyTurnCorrect as page } from "akasha/command/pages/story/turn/correct/story-turn-correct.command.ts"
import {
  type BeatChange,
  changesIn,
  recordIn,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type Memory,
  memoryIn,
} from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import {
  type BeatProse,
  proseIn,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import { linesIn } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NAMED = [playedTurn, beatArgument, changesFile, proseFile, memoryFile, outcomesFile] as const

type Refusal = { readonly refused: readonly string[] }

export type Asked = {
  readonly turn: string
  readonly beat: number
  readonly changes: readonly BeatChange[] | null
  readonly prose: BeatProse | string | null
  readonly memory: readonly Memory[] | null
  readonly outcomes: string | null
}

function changesAt(root: string, path: string | undefined) {
  if (path === undefined) return { changes: null }
  const read = heldAt(root, changesFile.said, path)
  if ("refused" in read) return read
  const changes = changesIn(linesIn(read.text), Number.MAX_SAFE_INTEGER)
  return "refused" in changes ? { refused: [changes.refused] } : { changes }
}

function memoryAt(root: string, path: string | undefined) {
  if (path === undefined) return { memory: null }
  const read = heldAt(root, memoryFile.said, path)
  if ("refused" in read) return read
  const memory = memoryIn(linesIn(read.text), Number.MAX_SAFE_INTEGER)
  return "refused" in memory ? { refused: [memory.refused] } : { memory }
}

function outcomesAt(root: string, path: string | undefined) {
  if (path === undefined) return { outcomes: null }
  const read = heldAt(root, outcomesFile.said, path)
  return "refused" in read ? read : { outcomes: read.text }
}

function proseAt(root: string, path: string | undefined, beat: number) {
  if (path === undefined) return { prose: null }
  const read = heldAt(root, proseFile.said, path)
  if ("refused" in read) return read
  const lines = linesIn(read.text)
  if (recordIn(lines[0] ?? "") === null) {
    const prose = read.text.trim()
    return prose === "" ? { refused: [`\`${path}\` holds no prose`] } : { prose }
  }
  const records = proseIn(lines, Number.MAX_SAFE_INTEGER)
  if ("refused" in records) return { refused: [records.refused] }
  const one = records[0]
  if (records.length !== 1 || one?.beat !== beat) {
    return { refused: [`\`${path}\` holds beat ${beat}'s prose as one record naming it`] }
  }
  return { prose: one }
}

type Said = {
  readonly changesFile?: string | undefined
  readonly proseFile?: string | undefined
  readonly memoryFile?: string | undefined
  readonly outcomesFile?: string | undefined
}

function nothingRefused(said: Said): Refusal | null {
  const files = [said.changesFile, said.proseFile, said.memoryFile, said.outcomesFile]
  if (files.some((one) => one !== undefined)) return null
  const flags = [changesFile, proseFile, memoryFile, outcomesFile].map((one) => `\`${one.said}\``)
  return {
    refused: [`a correction hands in the beat's changes at ${flags.join(", ")}, or several`],
  }
}

export function taken(argv: readonly string[], calledAs: string, root: string): Asked | Refusal {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const held = read.taken
  const turn = held.playedTurn.trim()
  const beat = held.beat
  if (turn === "") return { refused: [`\`${playedTurn.said}\` names no turn`] }
  if (beat === undefined) return { refused: [`\`${beatArgument.said}\` names no beat`] }
  const nothing = nothingRefused(held)
  if (nothing !== null) return nothing
  const changing = changesAt(root, held.changesFile)
  if ("refused" in changing) return changing
  const telling = proseAt(root, held.proseFile, beat)
  if ("refused" in telling) return telling
  const remembering = memoryAt(root, held.memoryFile)
  if ("refused" in remembering) return remembering
  const settling = outcomesAt(root, held.outcomesFile)
  if ("refused" in settling) return settling
  return {
    turn,
    beat,
    changes: changing.changes,
    prose: telling.prose,
    memory: remembering.memory,
    outcomes: settling.outcomes,
  }
}
