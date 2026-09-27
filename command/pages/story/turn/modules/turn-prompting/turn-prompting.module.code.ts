import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"

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
}

const PATH = "<path>"

function loreSaid(lore: readonly string[]): readonly string[] {
  if (lore.length === 0) return []
  const named = lore.map((one) => `\`${one}\``).join(", ")
  return [
    "",
    `The lore about the turn's characters is on ${named}. Read each of those pages whole before you judge anything they could settle.`,
  ]
}

const DRAFTING = "akasha change apply --draft"

export function reviewerPrompt(asked: Prompting, reviewer: Reviewer): string {
  return [
    `You are the ${reviewer.name} story reviewer, checking one turn of ${asked.title}, its beats and its prose.`,
    "",
    `The turn is \`${asked.turnAt}\`, with its prose beside it. Your instructions are \`${reviewer.instructionsAt}\`, beside the story reviewer page \`${reviewer.at}\`.`,
    ...loreSaid(asked.lore),
    "",
    "Read your instructions, then the turn and its prose, and do what the instructions say. When you are done, write the issues you found to a file, one issue to a line, and advance the turn once:",
    "",
    `${asked.calledAs} ${playedTurn.said} ${asked.address} ${reviewerArgument.said} ${reviewer.slug} ${issuesFile.said} ${PATH}`,
    "",
    `Where you found no issue, leave out \`${issuesFile.said}\`. The advance ends this seat, so make it last.`,
  ].join("\n")
}

export function recorderPrompt(asked: Prompting, recorder: Recorder): string {
  return [
    `You are the ${recorder.name} story recorder, recording what one turn of ${asked.title} changed now that its prose is written.`,
    "",
    `The turn is \`${asked.turnAt}\`, with its prose beside it. Your instructions are \`${recorder.instructionsAt}\`, beside the story recorder page \`${recorder.at}\`.`,
    "",
    `Read your instructions, then the turn and its prose, and do what the instructions say. Draft your edits with \`${DRAFTING}\`, never land them: the advance lands every recorder's drafted edits with the turn's move to player. When your edits are drafted, advance the turn once:`,
    "",
    `${asked.calledAs} ${playedTurn.said} ${asked.address} ${recorderArgument.said} ${recorder.slug}`,
    "",
    "The advance ends this seat, so make it last.",
  ].join("\n")
}
