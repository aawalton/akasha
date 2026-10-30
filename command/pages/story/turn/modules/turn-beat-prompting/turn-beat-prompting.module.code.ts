import { beat as beatArgument } from "akasha/command/argument/pages/beat.argument.ts"
import { beatsFile } from "akasha/command/argument/pages/beats-file.argument.ts"
import { changesFile } from "akasha/command/argument/pages/changes-file.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { memoryFile } from "akasha/command/argument/pages/memory-file.argument.ts"
import { picturedFile } from "akasha/command/argument/pages/pictured-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import type { Recorder } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import { storyTurnNext } from "akasha/command/pages/story/turn/next/story-turn-next.command.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { FlowPart } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import {
  type Beats,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { inventory } from "akasha/story/recorder/pages/inventory.story-recorder.ts"
import { plan } from "akasha/story/recorder/pages/plan.story-recorder.ts"
import { recorderOf } from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import { whereSaid } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const PATH = "<path>"

const FRESH =
  "Read each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line."

const NUMBERS_TOO: readonly string[] = [inventory.slug, plan.slug]

export type Flowing = { readonly slug: string; readonly at: string; readonly beats: Beats }

export type BeatAsking = {
  readonly title: string
  readonly calledAs: string
  readonly turn: Flowing
  readonly beat: number
  readonly recorders: readonly Recorder[]
  readonly master: string | null
}

function instructionsOf(recorders: readonly Recorder[], slugs: readonly string[]): string {
  return recorders
    .filter((one) => slugs.includes(one.slug))
    .map((one) => `\`${one.instructionsAt}\``)
    .join(", ")
}

type Said = { readonly who: string; readonly work: string; readonly flags: string }

function restatingSaid(asked: BeatAsking): Said {
  const { beat, turn } = asked
  const beats = besideAt(turn.at, "beats", "jsonl") ?? turn.at
  const issues = (turn.beats.issues ?? []).filter((one) => one.beat === beat)
  const listed = issues.map((one) => `- ${one.issue}`).join("\n")
  return {
    who: "game master",
    work: `The numbers seat refused beat ${beat}:\n\n${listed}\n\nState the turn's beats again from beat ${beat} on, or rule the issue out by stating beat ${beat} as it was. Write a beats file holding beat ${beat} and the beats after it alone, its first line naming beat ${beat}, as the lines in \`${beats}\` are shaped. Hand in none of the beats before beat ${beat}: they are kept as they are, with every part the steps gave them, and every part of beat ${beat} and the beats after it is worked again.`,
    flags: `${beatsFile.said} ${PATH}`,
  }
}

function saidFor(part: FlowPart, asked: BeatAsking): Said {
  const { beat, recorders } = asked
  if (part === "event") return restatingSaid(asked)
  if (part === "prose") {
    const prose = besideAt(asked.turn.at, "prose", "txt") ?? asked.turn.at
    return {
      who: "writer",
      work: `Write this beat's prose alone, going on from the turn's prose so far in \`${prose}\`. Write it to a file as the prose itself, or as one json line \`{"beat": ${beat}, "prose": "…", "continues": true}\` where it goes on with the paragraph before it. Name with \`${character.said}\` each character the prose names.`,
      flags: `${proseFile.said} ${PATH} ${character.said} <address>`,
    }
  }
  const recorder = recorderOf(part) ?? ""
  if (part === "changes") {
    const read = instructionsOf(recorders, [recorder, ...NUMBERS_TOO])
    return {
      who: "numbers seat",
      work: `Work this one beat by each of your instructions, ${read}, from the pages as the beats shown before it left them. Draft no edit: write this beat's changes to a file, one json change to a line naming beat ${beat}, and leave out \`${changesFile.said}\` where the beat changes nothing. Where this beat cannot work, hand in no changes: write each issue to a file instead, one to a line naming beat ${beat}, and hand it in at \`${issuesFile.said}\`, and the game master states the beat again.`,
      flags: `${recorderArgument.said} ${recorder} ${changesFile.said} ${PATH}`,
    }
  }
  const read = instructionsOf(recorders, [recorder])
  if (part === "memory") {
    return {
      who: "memory recorder",
      work: `Record this one beat as your instructions, ${read}, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat ${beat}, and leave out \`${memoryFile.said}\` where the beat settles nothing.`,
      flags: `${recorderArgument.said} ${recorder} ${memoryFile.said} ${PATH}`,
    }
  }
  return {
    who: "picture recorder",
    work: `Picture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, ${read}, says; most beats show nothing new. Write each picture as one json line naming beat ${beat}, and leave out \`${picturedFile.said}\` where the beat shows nothing new.`,
    flags: `${recorderArgument.said} ${recorder} ${picturedFile.said} ${PATH}`,
  }
}

const LAST_WORD = /\S+$/

function nextCallOf(calledAs: string): string {
  return calledAs.replace(LAST_WORD, storyTurnNext.name)
}

export function beatPrompt(part: FlowPart, asked: BeatAsking): string {
  const { beat, turn } = asked
  const said = saidFor(part, asked)
  const line = beatsWritten(turn.beats).split("\n")[beat - 1] ?? ""
  const address = `${storyTurnPlayed.slug}/${turn.slug}`
  const stuck =
    asked.master === null
      ? []
      : [
          "",
          `Where the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with \`akasha seat send --to ${asked.master} --body "<what refused>"\`, then end your turn.`,
        ]
  return [
    `You are the ${said.who} of ${asked.title}, and you take its turns one beat at a time.`,
    "",
    `Beat ${beat} of the turn \`${turn.at}\` is ready for you. Its line in the turn's beats file, as the steps before you left it:`,
    "",
    line,
    "",
    whereSaid(turn.at),
    "",
    said.work,
    ...(part === "event" || part === "prose" ? [] : ["", FRESH]),
    "",
    "Hand in this beat alone, once:",
    "",
    `${asked.calledAs} ${playedTurn.said} ${address} ${beatArgument.said} ${beat} ${said.flags}`,
    "",
    `The advance ends this beat, not this seat. Once it lands, run \`${nextCallOf(asked.calledAs)}\` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.`,
    ...stuck,
  ].join("\n")
}
