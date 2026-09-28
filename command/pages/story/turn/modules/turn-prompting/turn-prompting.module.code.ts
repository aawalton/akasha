import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"
import { writtenChapter } from "akasha/command/argument/pages/written-chapter.argument.ts"

export type Reviewer = {
  readonly slug: string
  readonly name: string
  readonly at: string
  readonly instructionsAt: string
}

export type Recorder = {
  readonly slug: string
  readonly name: string
  readonly at: string
  readonly instructionsAt: string
}

export type Prompting = {
  readonly title: string
  readonly turnAt: string
  readonly address: string
  readonly calledAs: string
  readonly lore: readonly string[]
  readonly written: readonly string[]
  readonly described?: readonly string[]
  readonly noun?: "turn" | "chapter"
  readonly master?: string | null
}

const PATH = "<path>"

const CHAPTER = "chapter"

export function loreLine(lore: readonly string[], noun = "turn"): string {
  const named = lore.map((one) => `\`${one}\``).join(", ")
  return `The lore in play on the ${noun} is on ${named}. Read each of those pages whole first, since any of them can settle what the ${noun} may say.`
}

function loreSaid(lore: readonly string[], noun: string): readonly string[] {
  return lore.length === 0 ? [] : ["", loreLine(lore, noun)]
}

export function writtenLine(written: readonly string[], noun = "turn"): string {
  const named = written.map((one) => `\`${one}\``).join(", ")
  return `The game master has written this ${noun} onto ${named} already, each of which has a history line for the ${noun}. Match what the prose shows against those pages before filing any page, and write none of those changes again.`
}

function writtenSaid(written: readonly string[], noun: string): readonly string[] {
  return written.length === 0 ? [] : ["", writtenLine(written, noun)]
}

export function describedLine(described: readonly string[]): string {
  const named = described.map((one) => `\`${one}\``).join(", ")
  return `The mechanic descriptions new or changed on this turn are on ${named}. Judge those, and no other.`
}

function describedSaid(described: readonly string[] | undefined): readonly string[] {
  return described === undefined || described.length === 0 ? [] : ["", describedLine(described)]
}

export function stuckLine(master: string): string {
  return `Where a draft or the advance is refused and you cannot mend it yourself, never end on it: send the game master the refusal word for word and what you were doing, with \`akasha seat send --to ${master} --body "<what refused and what you were doing>"\`, then end your turn. Its answer comes as your next message; do what it says, then advance.`
}

function stuckSaid(master: string | null | undefined): readonly string[] {
  return master === null || master === undefined ? [] : ["", stuckLine(master)]
}

const DRAFTING = "akasha change apply --draft"

function advancing(asked: Prompting): string {
  const said = asked.noun === CHAPTER ? writtenChapter.said : playedTurn.said
  return `${asked.calledAs} ${said} ${asked.address}`
}

export function reviewerPrompt(asked: Prompting, reviewer: Reviewer): string {
  const noun = asked.noun ?? "turn"
  return [
    `You are the ${reviewer.name} story reviewer, checking one ${noun} of ${asked.title}, its beats and its prose.`,
    "",
    `The ${noun} is \`${asked.turnAt}\`, with its prose beside it. Your instructions are \`${reviewer.instructionsAt}\`, beside the story reviewer page \`${reviewer.at}\`.`,
    ...loreSaid(asked.lore, noun),
    ...describedSaid(asked.described),
    "",
    `Read your instructions, then the ${noun} and its prose, and do what the instructions say. When you are done, write the issues you found to a file, one issue to a line, and advance the ${noun} once:`,
    "",
    `${advancing(asked)} ${reviewerArgument.said} ${reviewer.slug} ${issuesFile.said} ${PATH}`,
    "",
    `Where you found no issue, leave out \`${issuesFile.said}\`. The advance ends this seat, so make it last.`,
    ...stuckSaid(asked.master),
  ].join("\n")
}

export function recorderPrompt(asked: Prompting, recorder: Recorder): string {
  const noun = asked.noun ?? "turn"
  return [
    `You are the ${recorder.name} story recorder, recording what one ${noun} of ${asked.title} changed now that its prose is written.`,
    "",
    `The ${noun} is \`${asked.turnAt}\`, with its prose beside it. Your instructions are \`${recorder.instructionsAt}\`, beside the story recorder page \`${recorder.at}\`.`,
    ...writtenSaid(asked.written, noun),
    "",
    `Read your instructions, then the ${noun} and its prose, and do what the instructions say. Draft your edits with \`${DRAFTING}\`, never land them: the advance lands every recorder's drafted edits with the ${noun}'s move to player. When your edits are drafted, advance the ${noun} once:`,
    "",
    `${advancing(asked)} ${recorderArgument.said} ${recorder.slug}`,
    "",
    "The advance ends this seat, so make it last.",
    ...stuckSaid(asked.master),
  ].join("\n")
}
