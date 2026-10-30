import { changesFile } from "akasha/command/argument/pages/changes-file.argument.ts"
import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"
import { writtenChapter } from "akasha/command/argument/pages/written-chapter.argument.ts"
import { storyTurnCorrect } from "akasha/command/pages/story/turn/correct/story-turn-correct.command.ts"
import {
  type Noun,
  type Repair,
  repairSaid,
  ruledIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export type Reviewer = {
  readonly slug: string
  readonly name: string
  readonly at: string
  readonly instructionsAt: string
  readonly step?: string | null
}

export type Recorder = {
  readonly slug: string
  readonly name: string
  readonly at: string
  readonly instructionsAt: string
  readonly step?: string | null
}

export type Prompting = {
  readonly title: string
  readonly turnAt: string
  readonly address: string
  readonly calledAs: string
  readonly lore: readonly string[]
  readonly written: readonly string[]
  readonly described?: readonly string[]
  readonly noun?: Noun
  readonly master?: string | null
  readonly repairs?: readonly Repair[]
  readonly alone?: boolean
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

function describedLine(described: readonly string[]): string {
  const named = described.map((one) => `\`${one}\``).join(", ")
  return `The mechanic descriptions new or changed on this turn are on ${named}. Judge them only where your instructions say to.`
}

function describedSaid(described: readonly string[] | undefined): readonly string[] {
  return described === undefined || described.length === 0 ? [] : ["", describedLine(described)]
}

function stuckLine(master: string): string {
  return `Where a draft or the advance is refused and you cannot mend it yourself, never end on it: send the game master the refusal word for word and what you were doing, with \`akasha seat send --to ${master} --body "<what refused and what you were doing>"\`, then end your turn. Its answer comes as your next message; do what it says, then advance.`
}

function stuckSaid(master: string | null | undefined): readonly string[] {
  return master === null || master === undefined ? [] : ["", stuckLine(master)]
}

const DRAFTING = "akasha change apply --draft"

const ENDING =
  "The advance ends this job, not this seat: once it lands, wait for your next job. Never end this job in words: words naming the next read do not read it, " +
  "and this seat then sits idle while the turn waits on it. Every output of yours is a tool call until the advance has landed."

const ITEM_ENDING =
  "The advance ends this item, not this seat: its answer is the checklist's next item, so take that up at once, whatever messages say. Never end an item in words: words naming the next read do not read it, " +
  "and the turn then waits on this seat. Every output of yours is a tool call until an answer says the turn is at player."

const LAST_WORD = /\S+$/

function youAre(alone: boolean | undefined): string {
  return alone === true ? "For this item, you are" : "You are"
}

function endingOf(asked: Prompting): string {
  return asked.alone === true ? ITEM_ENDING : ENDING
}

function stuckOf(asked: Prompting): readonly string[] {
  return stuckSaid(asked.alone === true ? null : asked.master)
}

function mendingLine(asked: Prompting, noun: string): string {
  const correct = asked.calledAs.replace(LAST_WORD, storyTurnCorrect.name)
  return `Mend each fault you find before you hand this review in: a shown beat with \`${correct}\`, whose \`--help\` says what it takes. A beat not yet shown is stated again at the game master step alone, so hand in a fault in such a beat as an issue, and the ${noun} comes back to you at that step to state it again.`
}

function reviewDoneLine(asked: Prompting, noun: string): string {
  if (asked.alone !== true) {
    return `When you are done, write the issues you found to a file, one issue to a line, and advance the ${noun} once:`
  }
  return `${mendingLine(asked, noun)} Then write the issues you left unmended to a file, one issue to a line, and advance the ${noun} once:`
}

function freshLine(noun: string): string {
  return `This seat may have done jobs before this one, and none of them is this job. Read your instructions, the ${noun} and whatever beats, prose and issues files sit beside it afresh with \`akasha read --file-path <path> --full\`, never from what you remember of an earlier job.`
}

function advancing(asked: Prompting): string {
  const said = asked.noun === CHAPTER ? writtenChapter.said : playedTurn.said
  return `${asked.calledAs} ${said} ${asked.address}`
}

function mechanicsIssuesLine(noun: string): string {
  return `Any \`.mechanics-issues.txt\` file beside the ${noun} holds what the mechanics step found in its beats: check each against the beats and the prose, and raise as your own issue each one that still holds and your instructions cover.`
}

function recordedLine(noun: string): string {
  return `What the steps before you recorded of the ${noun} is in its beats file, the \`.beats.jsonl\` file beside it, one json line to a beat: its \`event\`, its time, place and who is there, the numbers and items it changes under \`changes\`, and who learns which fact and what the reader is shown under \`memory\`, and what each picture shows under \`pictured\`. Its images are on the ${noun} at \`cover\` and \`scenes\`. Numbers and knowers reach their pages only as the ${noun} reaches its player, so read this ${noun}'s part in those files rather than on the pages. ${mechanicsIssuesLine(noun)}`
}

const KEPT_LINE =
  "The beats file keeps what the run before settled of every beat before the first one the mend moved: work from that beat on, and hand in nothing again that the file already holds."

export const RULINGS_FINAL =
  "The game master's rulings are final: never raise a ruled-out issue again, in the same words or in others."

function repairsSaid(asked: Prompting, noun: Noun, own: string): readonly string[] {
  const repairs = asked.repairs ?? []
  if (repairs.length === 0) return []
  return ["", repairSaid(noun, repairs), own, ...(ruledIn(repairs) ? [RULINGS_FINAL] : [])]
}

export function reviewerPrompt(asked: Prompting, reviewer: Reviewer): string {
  const noun = asked.noun ?? "turn"
  return [
    `${youAre(asked.alone)} the ${reviewer.name} story reviewer, checking one ${noun} of ${asked.title}, its beats and its prose.`,
    "",
    `The ${noun} is \`${asked.turnAt}\`, with its prose beside it. Your instructions are \`${reviewer.instructionsAt}\`, beside the story reviewer page \`${reviewer.at}\`.`,
    ...loreSaid(asked.lore, noun),
    ...describedSaid(asked.described),
    "",
    recordedLine(noun),
    ...repairsSaid(
      asked,
      noun,
      `Your own earlier issues are the lines opening \`${reviewer.slug}: \`: check whether the mend answered each, and hand in again each one it left and any new fault the mend made.`
    ),
    "",
    freshLine(noun),
    "",
    `Read your instructions, then the ${noun} and its prose, and do what the instructions say. ${reviewDoneLine(asked, noun)}`,
    "",
    `${advancing(asked)} ${reviewerArgument.said} ${reviewer.slug} ${issuesFile.said} ${PATH}`,
    "",
    `Where you ${asked.alone === true ? "left no issue unmended" : "found no issue"}, leave out \`${issuesFile.said}\`. ${endingOf(asked)}`,
    ...stuckOf(asked),
  ].join("\n")
}

export function mechanicsPrompt(asked: Prompting, recorder: Recorder): string {
  const noun = asked.noun ?? "turn"
  return [
    `${youAre(asked.alone)} the ${recorder.name} story recorder at the mechanics step of ${asked.title}, working out what each beat of one ${noun} changes in numbers and items.`,
    "",
    `The ${noun} is \`${asked.turnAt}\`, its beats in the \`.beats.jsonl\` file beside it. Your instructions are \`${recorder.instructionsAt}\`, beside the story recorder page \`${recorder.at}\`.`,
    ...writtenSaid(asked.written, noun),
    "",
    mechanicsIssuesLine(noun),
    ...repairsSaid(asked, noun, KEPT_LINE),
    "",
    freshLine(noun),
    "",
    `Read your instructions, then the ${noun} and its beats, and do what the instructions say. Draft no edit: write your changes to a file, one json change to a line, and each beat that cannot work to an issues file, one issue to a line. Then advance the ${noun} once:`,
    "",
    `${advancing(asked)} ${recorderArgument.said} ${recorder.slug} ${changesFile.said} ${PATH} ${issuesFile.said} ${PATH}`,
    "",
    `Leave out \`${changesFile.said}\` where the beats change nothing, and \`${issuesFile.said}\` where every beat can work. ${endingOf(asked)}`,
    ...stuckOf(asked),
  ].join("\n")
}

export function recorderPrompt(asked: Prompting, recorder: Recorder): string {
  const noun = asked.noun ?? "turn"
  return [
    `${youAre(asked.alone)} the ${recorder.name} story recorder, recording what one ${noun} of ${asked.title} changed now that its prose is written.`,
    "",
    `The ${noun} is \`${asked.turnAt}\`, with its prose beside it. Your instructions are \`${recorder.instructionsAt}\`, beside the story recorder page \`${recorder.at}\`.`,
    ...writtenSaid(asked.written, noun),
    "",
    mechanicsIssuesLine(noun),
    ...repairsSaid(asked, noun, KEPT_LINE),
    "",
    freshLine(noun),
    "",
    `Read your instructions, then the ${noun} and its prose, and do what the instructions say. Draft your edits with \`${DRAFTING}\`, never land them: your advance lands them with your move. When your edits are drafted, advance the ${noun} once:`,
    "",
    `${advancing(asked)} ${recorderArgument.said} ${recorder.slug}`,
    "",
    endingOf(asked),
    ...stuckOf(asked),
  ].join("\n")
}
