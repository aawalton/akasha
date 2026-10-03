import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  mechanicsPrompt,
  type Prompting,
  type Recorder,
  type Reviewer,
  recorderPrompt,
  reviewerPrompt,
} from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import type {
  Reach,
  Starting,
  Story,
  Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Start } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  flexOf,
  personaOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

export type Context = {
  readonly game: string
  readonly story: Story | null
  readonly reviewers: readonly Reviewer[]
  readonly recorders: readonly Recorder[]
  readonly prompting: Prompting
}

function recorderStarting(
  recorder: string,
  persona: string,
  at: Context,
  mechanics: boolean
): Starting | string {
  const found = at.recorders.find((one) => one.slug === recorder)
  if (found === undefined) return `\`${recorder}\` is no story recorder page`
  const flex = flexOf(
    at.recorders.map((one) => one.slug),
    found.slug
  )
  const prompt = (mechanics ? mechanicsPrompt : recorderPrompt)(at.prompting, found)
  return { persona, role: storyRecorderRole.slug, game: at.game, flex, prompt }
}

function startingOf(start: Start, persona: string, over: Context): Starting | string {
  const at = { ...over, prompting: { ...over.prompting, master: over.story?.master ?? null } }
  if (start.kind === "recorder") return recorderStarting(start.recorder, persona, at, false)
  if (start.kind === "mechanics") return recorderStarting(start.recorder, persona, at, true)
  const found = at.reviewers.find((one) => one.slug === start.reviewer)
  if (found === undefined) return `\`${start.reviewer}\` is no story reviewer page`
  const flex = flexOf(
    at.reviewers.map((one) => one.slug),
    found.slug
  )
  const prompt = reviewerPrompt(at.prompting, found)
  return { persona, role: reviewerRole.slug, game: at.game, flex, prompt }
}

export function unstartedSaid(turn: string, unstarted: readonly string[]): string {
  return `\`${turn}\` waits on a seat that did not start, and nothing moves it until one does:\n${unstarted.join("\n")}`
}

async function unstartedTold(
  reach: Reach,
  at: Context,
  master: string,
  unstarted: readonly string[],
  after: Told
) {
  if (unstarted.length === 0) return
  const body = unstartedSaid(at.prompting.turnAt, unstarted)
  const toMaster = await reach.notify(master, body)
  if (toMaster === null) after.report.push(`told\t${master}`)
  else after.faults.push(`\`${master}\` was not told a seat did not start: ${toMaster}`)
  const title = `${at.prompting.title} waits on a seat that did not start`
  const toAlan = await reach.alerted?.(title, body)
  if (toAlan === null) after.report.push("told\tAlan")
  else if (toAlan !== undefined)
    after.faults.push(`Alan was not told a seat did not start: ${toAlan}`)
}

export async function seatsStarted(
  reach: Reach,
  at: Context,
  starts: readonly Start[],
  done: string[],
  after: Told
) {
  if (starts.length === 0) return
  const master = at.story?.master ?? null
  const persona = master === null ? null : personaOf(master, at.game)
  if (master === null || persona === null) {
    after.faults.push(
      `\`${at.game}\` names no game master seat spelling a persona, so no seat was started`
    )
    return
  }
  const unstarted: string[] = []
  for (const start of starts) {
    const starting = startingOf(start, persona, at)
    if (typeof starting === "string") {
      after.faults.push(starting)
      continue
    }
    try {
      after.report.push(`started\t${await reach.start(starting, done)}`)
    } catch (thrown) {
      unstarted.push(`no ${starting.role} seat was started: ${whyOf(thrown)}`)
    }
  }
  after.faults.push(...unstarted)
  await unstartedTold(reach, at, master, unstarted, after)
}
