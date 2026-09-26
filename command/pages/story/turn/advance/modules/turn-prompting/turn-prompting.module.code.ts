import { character } from "akasha/command/argument/pages/character.argument.ts"
import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"

export type Reviewer = {
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
}

const PATH = "<path>"

const ADDRESS = "<address>"

export function reviewerPrompt(asked: Prompting, reviewer: Reviewer): string {
  return [
    `You are the ${reviewer.name} story reviewer, checking one turn of ${asked.title} before its prose is written.`,
    "",
    `The turn is \`${asked.turnAt}\`. Your instructions are \`${reviewer.instructionsAt}\`, beside the story reviewer page \`${reviewer.at}\`.`,
    "",
    "Read your instructions, then the turn, and do what the instructions say. When you are done, write the issues you found to a file, one issue to a line, and advance the turn once:",
    "",
    `${asked.calledAs} ${playedTurn.said} ${asked.address} ${reviewerArgument.said} ${reviewer.slug} ${issuesFile.said} ${PATH}`,
    "",
    `Where you found no issue, leave out \`${issuesFile.said}\`. The advance ends this seat, so make it last.`,
  ].join("\n")
}

export function writerPrompt(asked: Prompting, rulesAt: string): string {
  return [
    `You are the writer of one turn of ${asked.title}.`,
    "",
    `The turn is \`${asked.turnAt}\`. Write its prose from its action and its beats, the story's recent published prose (its turns before this one whose status is player), its characters and its lore, holding to every style rule under \`${rulesAt}\`.`,
    "",
    "When the prose is done, write it to a file and advance the turn once, naming each character present in it by its address:",
    "",
    `${asked.calledAs} ${playedTurn.said} ${asked.address} ${proseFile.said} ${PATH} ${character.said} ${ADDRESS} ${character.said} ${ADDRESS}`,
    "",
    "The advance ends this seat, so make it last.",
  ].join("\n")
}
