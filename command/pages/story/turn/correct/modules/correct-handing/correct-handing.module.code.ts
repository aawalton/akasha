import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { beat as beatArgument } from "akasha/command/argument/pages/beat.argument.ts"
import { changesFile } from "akasha/command/argument/pages/changes-file.argument.ts"
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
  type BeatProse,
  proseIn,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import { linesIn } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NAMED = [playedTurn, beatArgument, changesFile, proseFile] as const

type Refusal = { readonly refused: readonly string[] }

export type Asked = {
  readonly turn: string
  readonly beat: number
  readonly changes: readonly BeatChange[] | null
  readonly prose: BeatProse | string | null
}

function changesAt(root: string, path: string | undefined) {
  if (path === undefined) return { changes: null }
  const read = heldAt(root, changesFile.said, path)
  if ("refused" in read) return read
  const changes = changesIn(linesIn(read.text), Number.MAX_SAFE_INTEGER)
  return "refused" in changes ? { refused: [changes.refused] } : { changes }
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

export function taken(argv: readonly string[], calledAs: string, root: string): Asked | Refusal {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const held = read.taken
  const turn = held.playedTurn.trim()
  const beat = held.beat
  if (turn === "") return { refused: [`\`${playedTurn.said}\` names no turn`] }
  if (beat === undefined) return { refused: [`\`${beatArgument.said}\` names no beat`] }
  if (held.changesFile === undefined && held.proseFile === undefined) {
    return {
      refused: [
        `a correction hands in the beat's changes at \`${changesFile.said}\`, its prose at \`${proseFile.said}\`, or both`,
      ],
    }
  }
  const changing = changesAt(root, held.changesFile)
  if ("refused" in changing) return changing
  const telling = proseAt(root, held.proseFile, beat)
  if ("refused" in telling) return telling
  return { turn, beat, changes: changing.changes, prose: telling.prose }
}
