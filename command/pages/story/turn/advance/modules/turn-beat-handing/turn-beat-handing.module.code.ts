import { gameMaster as gameMasterRole } from "akasha/agent/role/pages/game-master.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
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
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  inOrder,
  type Paged,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import type { Starting } from "akasha/command/pages/story/turn/modules/turn-job-handing/turn-job-handing.module.code.ts"
import type { Recorder } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import type {
  Reach,
  Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Context } from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { FlowPart } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import {
  type Beats,
  beatsWritten,
  NO_BEATS,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { inventory } from "akasha/story/recorder/pages/inventory.story-recorder.ts"
import { plan } from "akasha/story/recorder/pages/plan.story-recorder.ts"
import {
  type BeatJob,
  beatJobsOf,
  recorderOf,
} from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import {
  BEATS,
  CHAPTER,
  type Held,
  type Moved,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  coordinatorOf,
  flexOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const STATUS = "stepStatus"

const PATH = "<path>"

const NUMBERS_TOO: readonly string[] = [inventory.slug, plan.slug]

type Flowing = { readonly slug: string; readonly at: string; readonly beats: Beats }

export function flowingIn(story: readonly Paged[], turn: string): readonly Flowing[] {
  const flowing = statusOf(BEATS)
  return inOrder(story).flatMap((one): Flowing[] => {
    if (one.closed === true || one.at === undefined) return []
    if (one.slug !== turn && one.value[STATUS] !== flowing) return []
    const read = one.beats ?? NO_BEATS
    return [{ slug: one.slug, at: one.at, beats: "refused" in read ? NO_BEATS : read }]
  })
}

type BeatAsking = {
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
    work: `The numbers seat refused beat ${beat}:\n\n${listed}\n\nState the turn's beats again from beat ${beat} on, or rule the issue out by stating beat ${beat} as it was. Write the whole beats file: every beat before beat ${beat} word for word as it is in \`${beats}\`, then beat ${beat} and the beats after it as they should be. The beats before beat ${beat} keep every part the steps gave them, and every part of beat ${beat} and the beats after it is worked again.`,
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
    said.work,
    "",
    "Hand in this beat alone, once:",
    "",
    `${asked.calledAs} ${playedTurn.said} ${address} ${beatArgument.said} ${beat} ${said.flags}`,
    "",
    "The advance ends this beat, not this seat. Once it lands, take up at once any message handing you another beat that reached you while you worked. End your turn only when none has: the next beat ready for you comes as a message of its own.",
    ...stuck,
  ].join("\n")
}

function startingOf(job: BeatJob, asked: BeatAsking, persona: string, game: string): Starting {
  const prompt = beatPrompt(job.part, asked)
  const recorder = recorderOf(job.part)
  if (job.part === "event") return { persona, role: gameMasterRole.slug, game, flex: null, prompt }
  if (recorder === null) return { persona, role: writerRole.slug, game, flex: null, prompt }
  const flex = flexOf(
    asked.recorders.map((one) => one.slug),
    recorder
  )
  return { persona, role: storyRecorderRole.slug, game, flex, prompt }
}

export async function beatsHanded(
  reach: Reach,
  root: string,
  at: Context,
  held: Held,
  said: Moved,
  slug: string,
  done: string[],
  after: Told
): Promise<undefined> {
  if (held.roleplayed === true || held.noun === CHAPTER) return undefined
  if (held.status !== BEATS && said.status !== BEATS) return undefined
  const master = at.story?.master ?? null
  const persona = master === null ? null : (coordinatorOf(master, at.game)?.persona ?? null)
  if (master === null || persona === null) {
    after.faults.push(
      `\`${at.game}\` names no game master seat spelling a persona, so no beat was handed out`
    )
    return undefined
  }
  const flowing = flowingIn(storyIndexed(root, held.game, false), slug)
  const now = flowing.map((one) => one.beats)
  const was = held.status === BEATS && said.again !== true ? (held.flow ?? NO_BEATS) : NO_BEATS
  const before = flowing.map((one, index) => {
    if (said.again === true) return NO_BEATS
    return one.slug === slug ? was : (now[index] ?? NO_BEATS)
  })
  for (const job of beatJobsOf(before, now)) {
    const turn = flowing[job.turn]
    if (turn === undefined) continue
    const asked = {
      title: at.prompting.title,
      calledAs: at.prompting.calledAs,
      turn,
      beat: job.beat,
      recorders: at.recorders,
      master,
    }
    const starting = startingOf(job, asked, persona, at.game)
    try {
      const handed = await reach.start(starting, done)
      after.report.push(`${handed.how}\t${handed.name}\tbeat ${job.beat} of ${turn.slug}`)
    } catch (thrown) {
      after.faults.push(`beat ${job.beat} of \`${turn.slug}\` was not handed out: ${whyOf(thrown)}`)
    }
  }
  return undefined
}
