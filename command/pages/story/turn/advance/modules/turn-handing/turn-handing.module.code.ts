import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { beatsFile } from "akasha/command/argument/pages/beats-file.argument.ts"
import { changesFile } from "akasha/command/argument/pages/changes-file.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { memoryFile } from "akasha/command/argument/pages/memory-file.argument.ts"
import { picturedFile } from "akasha/command/argument/pages/pictured-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"
import { rulingsFile } from "akasha/command/argument/pages/rulings-file.argument.ts"
import { title as titleArgument } from "akasha/command/argument/pages/title.argument.ts"
import { turnLore } from "akasha/command/argument/pages/turn-lore.argument.ts"
import { writtenChapter } from "akasha/command/argument/pages/written-chapter.argument.ts"
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { storyTurnAdvance as page } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import { changesIn } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { memoryIn } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import { picturedIn } from "akasha/story/engine/beat-state/modules/beat-pictures/beat-pictures.module.code.ts"
import {
  proseIn,
  proseWritten,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import { plannedIn } from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import {
  type Handed,
  linesIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { rulingsIn } from "akasha/story/world/stories/played/turns/modules/turn-mechanics/turn-mechanics.module.code.ts"

const NAMED = [
  playedTurn,
  writtenChapter,
  turnLore,
  beatsFile,
  rulingsFile,
  reviewerArgument,
  issuesFile,
  proseFile,
  character,
  recorderArgument,
  changesFile,
  memoryFile,
  picturedFile,
  titleArgument,
] as const

const APOSTROPHES = /['’]/g

const PARTED = "/"

const JOINED = "-"

export type Taken = {
  readonly turn: string
  readonly chapter: boolean
  readonly handed: Handed
  readonly title?: string
}

type Refusal = { readonly refused: readonly string[] }

export function numberedOf(slug: string, story: string): string {
  const number = slug.slice(story.length + JOINED.length).split(JOINED)[0] ?? ""
  return `${story}${JOINED}${number}`
}

function titleSlugOf(title: string): string {
  return slugOf(title.replace(APOSTROPHES, ""))
}

export function titledOf(slug: string, story: string, title: string): string {
  return `${numberedOf(slug, story)}${JOINED}${titleSlugOf(title)}`
}

export function renamedOf(read: Taken, slug: string, game: string): string | null {
  if (read.title === undefined) return null
  const to = titledOf(slug, game, read.title)
  return to === slug ? null : to
}

export function movedTo(at: string, slug: string, to: string): string {
  const folder = at.lastIndexOf(PARTED) + PARTED.length
  return `${at.slice(0, folder)}${to}${at.slice(folder + slug.length)}`
}

function titleRefused(chapter: boolean, handed: Handed, title: string | undefined): Refusal | null {
  const writing = chapter && handed.kind === "prose"
  if (!writing && title !== undefined) {
    return {
      refused: [
        `\`${titleArgument.said}\` names a written chapter, and only as its writer hands in the chapter's prose`,
      ],
    }
  }
  if (writing && titleSlugOf(title ?? "") === "") {
    return {
      refused: [
        `a writer names the chapter at \`${titleArgument.said}\` as it hands in the chapter's prose, and this names no title`,
      ],
    }
  }
  return null
}

type Said = {
  readonly turnLore: readonly string[]
  readonly beatsFile?: string | undefined
  readonly rulingsFile?: string | undefined
  readonly reviewer?: string | undefined
  readonly issuesFile?: string | undefined
  readonly proseFile?: string | undefined
  readonly character: readonly string[]
  readonly recorder?: string | undefined
  readonly changesFile?: string | undefined
  readonly memoryFile?: string | undefined
  readonly picturedFile?: string | undefined
}

function kindsIn(said: Said): readonly Handed["kind"][] {
  const kinds: Handed["kind"][] = []
  const recording = [said.recorder, said.changesFile, said.memoryFile, said.picturedFile].some(
    (one) => one !== undefined
  )
  if (said.turnLore.length > 0) kinds.push("lore")
  if (said.beatsFile !== undefined || said.rulingsFile !== undefined) kinds.push("beats")
  if (said.reviewer !== undefined || (said.issuesFile !== undefined && !recording)) {
    kinds.push("review")
  }
  if (said.proseFile !== undefined || said.character.length > 0) kinds.push("prose")
  if (recording) kinds.push("record")
  return kinds
}

function linesAt(root: string, flag: string, path: string | undefined) {
  if (path === undefined) return { lines: [] }
  const read = heldAt(root, flag, path)
  return "refused" in read ? read : { lines: linesIn(read.text) }
}

function recordIn(root: string, said: Said): Handed | Refusal {
  const recorder = said.recorder?.trim() ?? ""
  if (recorder === "") return { refused: [`\`${recorderArgument.said}\` names no story recorder`] }
  const changing = linesAt(root, changesFile.said, said.changesFile)
  if ("refused" in changing) return changing
  const issuing = linesAt(root, issuesFile.said, said.issuesFile)
  if ("refused" in issuing) return issuing
  const remembering = linesAt(root, memoryFile.said, said.memoryFile)
  if ("refused" in remembering) return remembering
  const changes = changesIn(changing.lines, Number.MAX_SAFE_INTEGER)
  if ("refused" in changes) return { refused: [changes.refused] }
  const memory = memoryIn(remembering.lines, Number.MAX_SAFE_INTEGER)
  if ("refused" in memory) return { refused: [memory.refused] }
  const picturing = linesAt(root, picturedFile.said, said.picturedFile)
  if ("refused" in picturing) return picturing
  const pictured = picturedIn(picturing.lines, Number.MAX_SAFE_INTEGER)
  if ("refused" in pictured) return { refused: [pictured.refused] }
  return { kind: "record", recorder, changes, issues: issuing.lines, memory, pictured }
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

function rulingsAt(root: string, path: string | undefined) {
  const read = linesAt(root, rulingsFile.said, path)
  if ("refused" in read) return read
  const rulings = rulingsIn(read.lines)
  return "refused" in rulings ? { refused: [rulings.refused] } : { rulings }
}

function beatsIn(root: string, said: Said): Handed | Refusal {
  if (said.beatsFile === undefined) {
    return {
      refused: [
        `a game master hands in its rulings at \`${rulingsFile.said}\` with its beats at \`${beatsFile.said}\`, and this names no beats`,
      ],
    }
  }
  const read = heldAt(root, beatsFile.said, said.beatsFile)
  if ("refused" in read) return read
  const planned = plannedIn(linesIn(read.text))
  if ("refused" in planned) return { refused: [planned.refused] }
  const ruling = rulingsAt(root, said.rulingsFile)
  if ("refused" in ruling) return ruling
  const rulings = ruling.rulings.length === 0 ? {} : { rulings: ruling.rulings }
  return { kind: "beats", ...planned, ...rulings }
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
  if (kind === "record") return recordIn(root, said)
  if (kind === "beats") return beatsIn(root, said)
  if (said.proseFile === undefined) {
    return {
      refused: [
        `a writer hands in its prose at \`${proseFile.said}\`, and this names only who is present`,
      ],
    }
  }
  const read = heldAt(root, proseFile.said, said.proseFile)
  if ("refused" in read) return read
  const beatProse = proseIn(linesIn(read.text), Number.MAX_SAFE_INTEGER)
  if ("refused" in beatProse) {
    return { kind: "prose", prose: read.text, characters: said.character }
  }
  return {
    kind: "prose",
    prose: proseWritten(beatProse),
    characters: said.character,
    beatProse,
  }
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
  const misnamed = titleRefused(turn === "", handed, held.title)
  if (misnamed !== null) return misnamed
  if (turn !== "") return { turn, chapter: false, handed }
  const title = held.title?.trim()
  return { turn: chapter, chapter: true, handed, ...(title === undefined ? {} : { title }) }
}
