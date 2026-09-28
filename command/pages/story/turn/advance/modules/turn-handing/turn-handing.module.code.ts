import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { beatsFile } from "akasha/command/argument/pages/beats-file.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"
import { turnLore } from "akasha/command/argument/pages/turn-lore.argument.ts"
import { writtenChapter } from "akasha/command/argument/pages/written-chapter.argument.ts"
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { storyTurnAdvance as page } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.ts"
import {
  type Handed,
  linesIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NAMED = [
  playedTurn,
  writtenChapter,
  turnLore,
  beatsFile,
  reviewerArgument,
  issuesFile,
  proseFile,
  character,
  recorderArgument,
] as const

export type Taken = { readonly turn: string; readonly chapter: boolean; readonly handed: Handed }

type Refusal = { readonly refused: readonly string[] }

type Said = {
  readonly turnLore: readonly string[]
  readonly beatsFile?: string | undefined
  readonly reviewer?: string | undefined
  readonly issuesFile?: string | undefined
  readonly proseFile?: string | undefined
  readonly character: readonly string[]
  readonly recorder?: string | undefined
}

function kindsIn(said: Said): readonly Handed["kind"][] {
  const kinds: Handed["kind"][] = []
  if (said.turnLore.length > 0) kinds.push("lore")
  if (said.beatsFile !== undefined) kinds.push("beats")
  if (said.reviewer !== undefined || said.issuesFile !== undefined) kinds.push("review")
  if (said.proseFile !== undefined || said.character.length > 0) kinds.push("prose")
  if (said.recorder !== undefined) kinds.push("record")
  return kinds
}

function recordIn(said: Said): Handed | Refusal {
  const recorder = said.recorder?.trim() ?? ""
  if (recorder !== "") return { kind: "record", recorder }
  return { refused: [`\`${recorderArgument.said}\` names no story recorder`] }
}

function reviewIn(root: string, said: Said): Handed | Refusal {
  const reviewer = said.reviewer?.trim() ?? ""
  if (reviewer === "") {
    return {
      refused: [
        `a reviewer's issues are handed in with \`${reviewerArgument.said}\`, and this names no reviewer`,
      ],
    }
  }
  if (said.issuesFile === undefined) return { kind: "review", reviewer, issues: [] }
  const read = heldAt(root, issuesFile.said, said.issuesFile)
  return "refused" in read ? read : { kind: "review", reviewer, issues: linesIn(read.text) }
}

function characterRefused(said: Said): Refusal | null {
  if (said.character.length === 0 || said.proseFile !== undefined) return null
  const others = kindsIn({ ...said, character: [] })
  if (others.length === 0) return null
  return {
    refused: [
      `\`${character.said}\` names who is present in the writer's prose, so it belongs to the writer's step with \`${proseFile.said}\`, and this advance hands in ${others.join(" and ")}`,
    ],
  }
}

function handedFrom(root: string, said: Said): Handed | Refusal {
  const misplaced = characterRefused(said)
  if (misplaced !== null) return misplaced
  const kinds = kindsIn(said)
  if (kinds.length > 1) {
    return {
      refused: [`an advance hands in one step's output, and this hands in ${kinds.join(" and ")}`],
    }
  }
  const kind = kinds[0] ?? "lore"
  if (kind === "lore") return { kind, lore: said.turnLore }
  if (kind === "review") return reviewIn(root, said)
  if (kind === "record") return recordIn(said)
  if (kind === "beats" && said.beatsFile !== undefined) {
    const read = heldAt(root, beatsFile.said, said.beatsFile)
    return "refused" in read ? read : { kind, beats: linesIn(read.text) }
  }
  if (said.proseFile === undefined) {
    return {
      refused: [
        `a writer hands in its prose at \`${proseFile.said}\`, and this names only who is present`,
      ],
    }
  }
  const read = heldAt(root, proseFile.said, said.proseFile)
  return "refused" in read ? read : { kind: "prose", prose: read.text, characters: said.character }
}

export function taken(argv: readonly string[], calledAs: string, root: string): Taken | Refusal {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const held = read.taken
  const turn = held.playedTurn?.trim() ?? ""
  const chapter = held.writtenChapter?.trim() ?? ""
  if ((turn === "") === (chapter === "")) {
    return {
      refused: [
        `an advance names one turn at \`${playedTurn.said}\` or one chapter at \`${writtenChapter.said}\``,
      ],
    }
  }
  const handed = handedFrom(root, held)
  if ("refused" in handed) return handed
  return turn === "" ? { turn: chapter, chapter: true, handed } : { turn, chapter: false, handed }
}
