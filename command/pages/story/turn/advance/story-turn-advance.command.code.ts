import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { beatsFile } from "akasha/command/argument/pages/beats-file.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { issuesFile } from "akasha/command/argument/pages/issues-file.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"
import { turnLore } from "akasha/command/argument/pages/turn-lore.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  INPUT,
  keeping,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import { storyTurnAdvance as page } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.ts"
import { liftedFrom } from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"
import {
  type Prompting,
  type Recorder,
  type Reviewer,
  recorderPrompt,
  reviewerPrompt,
} from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import {
  noticesSent,
  REACHED,
  type Reach,
  type Starting,
  type Story,
  type Told,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  advanced,
  bareOf,
  type Caller,
  type Handed,
  type Held,
  linesIn,
  type Start,
  stepIn,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  flexOf,
  personaOf,
} from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [
  playedTurn,
  turnLore,
  beatsFile,
  reviewerArgument,
  issuesFile,
  proseFile,
  character,
  recorderArgument,
] as const

const COLLECTIONS = "partOfCollections"

const STATUS = "turnStatus"

const LORE = "lore"

const ISSUES = "issues"

const REVIEWED_BY = "reviewedBy"

const RECORDED_BY = "recordedBy"

const PROSE = "prose"

const CHARACTERS = "characters"

const PARTED = "/"

type Taken = { readonly turn: string; readonly handed: Handed }

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
  const turn = held.playedTurn.trim()
  if (turn === "") return { refused: [`\`${playedTurn.said}\` names no turn`] }
  const handed = handedFrom(root, held)
  return "refused" in handed ? handed : { turn, handed }
}

export function heldOf(turn: Turn): Held | { readonly refused: string } {
  const opening = `${storyPlayed.slug}${PARTED}`
  const story = stringsIn(turn.value[COLLECTIONS]).find((one) => one.startsWith(opening))
  if (story === undefined) return { refused: `\`${turn.at}\` is part of no played story` }
  const status = stepIn(turn.value[STATUS])
  if (status === null) return { refused: `\`${turn.at}\` states no turn status` }
  return {
    game: bareOf(story),
    status,
    lore: stringsIn(turn.value[LORE]),
    issues: stringsIn(turn.value[ISSUES]),
    reviewedBy: stringsIn(turn.value[REVIEWED_BY]).map(bareOf),
    recordedBy: stringsIn(turn.value[RECORDED_BY]).map(bareOf),
    written: turn.value[PROSE] !== undefined,
  }
}

type Context = {
  readonly game: string
  readonly story: Story | null
  readonly reviewers: readonly Reviewer[]
  readonly recorders: readonly Recorder[]
  readonly prompting: Prompting
}

function recorderStarting(recorder: string, persona: string, at: Context): Starting | string {
  const found = at.recorders.find((one) => one.slug === recorder)
  if (found === undefined) return `\`${recorder}\` is no story recorder page`
  const flex = flexOf(
    at.recorders.map((one) => one.slug),
    found.slug
  )
  const prompt = recorderPrompt(at.prompting, found)
  return { persona, role: storyRecorderRole.slug, game: at.game, flex, prompt }
}

function startingOf(start: Start, persona: string, at: Context): Starting | string {
  if (start.kind === "recorder") return recorderStarting(start.recorder, persona, at)
  const found = at.reviewers.find((one) => one.slug === start.reviewer)
  if (found === undefined) return `\`${start.reviewer}\` is no story reviewer page`
  const flex = flexOf(
    at.reviewers.map((one) => one.slug),
    found.slug
  )
  const prompt = reviewerPrompt(at.prompting, found)
  return { persona, role: reviewerRole.slug, game: at.game, flex, prompt }
}

async function noticesOver(reach: Reach, root: string, at: Context, status: TurnStep, after: Told) {
  const master = at.story?.master ?? null
  const turn = at.prompting.turnAt
  await noticesSent(reach, root, at.game, master, turn, status, after, at.prompting.lore)
}

async function seatsStarted(
  reach: Reach,
  at: Context,
  starts: readonly Start[],
  done: string[],
  after: Told
) {
  if (starts.length === 0) return
  const master = at.story?.master ?? null
  const persona = master === null ? null : personaOf(master, at.game)
  if (persona === null) {
    after.faults.push(
      `\`${at.game}\` names no game master seat spelling a persona, so no seat was started`
    )
    return
  }
  for (const start of starts) {
    const starting = startingOf(start, persona, at)
    if (typeof starting === "string") {
      after.faults.push(starting)
      continue
    }
    try {
      after.report.push(`started\t${await reach.start(starting, done)}`)
    } catch (thrown) {
      after.faults.push(`no ${starting.role} seat was started: ${whyOf(thrown)}`)
    }
  }
}

async function advancedOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const read = taken(argv, given.calledAs, given.root)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const slug = bareOf(read.turn)
  const placed = reach.turnAt(given.root, slug)
  if (placed === null) return refused(`\`${read.turn}\` names no played turn here`, DATA)
  const holding = async () => await heldOn(done, read, slug, given, landing, reach)
  return await reach.hold(given.root, placed.at, holding)
}

async function heldOn(
  done: string[],
  read: Taken,
  slug: string,
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const turn = reach.turnAt(given.root, slug)
  if (turn === null) return refused(`\`${read.turn}\` names no played turn here`, DATA)
  const held = heldOf(turn)
  if ("refused" in held) return refused(held.refused, DATA)
  const seat = reach.seatOf(given.root, given.agentId)
  const caller: Caller = seat ?? { role: null, game: null }
  const reviewers = reach.reviewersIn(given.root)
  const recorders = reach.recordersIn(given.root)
  const slugs = reviewers.map((one) => one.slug)
  const recorded = recorders.map((one) => one.slug)
  const said = advanced(held, caller, read.handed, slugs, recorded)
  if ("refused" in said) return refused(said.refused, DATA)
  const recording = read.handed.kind === "record"
  const moved = recording ? reach.keep(given.root, given.agentId, turn.at) : []
  if ("refused" in moved) return refused(moved.refused, DATA)
  const back = (why: readonly string[]): Answer => {
    const lost = reach.giveBack(given.root, given.agentId, turn.at, moved)
    const kept = lost === null ? [] : [`the drafted edits stay beside the turn: ${lost}`]
    return refusedBy([...why, ...kept], DATA)
  }
  const kept = recording ? reach.kept(given.root, turn.at) : []
  if ("refused" in kept) return back([kept.refused])
  const lifted = liftedFrom(turn, kept, () => reach.textIn(given.root, turn.at))
  if ("refused" in lifted) return back([lifted.refused])
  const own = kept.filter((one) => !lifted.rest.includes(one))
  const naming: Naming = {
    pageTypeSlug: storyTurnPlayed.slug,
    slug,
    path: turn.at,
    merge: true,
    values: { ...lifted.values, ...said.values },
    ...(said.prose === null ? {} : { bodies: { prose: said.prose } }),
  }
  const asking = reach.fold(given.root, naming)
  if ("refused" in asking) return back([asking.refused])
  const message = `${slug} moves from ${held.status} to ${said.status}`
  const landsWith = said.landsKept ? lifted.rest : []
  const by = { agentId: given.agentId, writer: given.writer, done, kept: landsWith }
  const landed = await landing(given.root, asking, message, by)
  if ("refusals" in landed) return keeping(done, back([...landed.refusals]))
  if (said.landsKept) reach.release(given.root, turn.at)
  const unkept = said.landsKept ? null : reach.unkeep(given.root, turn.at, own)
  const story = reach.storyOf(given.root, held.game)
  const at: Context = {
    game: held.game,
    story,
    reviewers,
    recorders,
    prompting: {
      title: story?.title ?? held.game,
      turnAt: turn.at,
      address: `${storyTurnPlayed.slug}${PARTED}${slug}`,
      calledAs: given.calledAs,
      lore: reach.loreOf(
        given.root,
        stringsIn(said.values[LORE] ?? turn.value[LORE]),
        stringsIn(said.values[CHARACTERS] ?? turn.value[CHARACTERS])
      ),
      written: reach.writtenOn(given.root, turn),
    },
  }
  const moving = `${slug}\t${held.status}\t${said.status}`
  const report = said.landsKept ? [moving, `landed\t${kept.length} kept edit(s)`] : [moving]
  const after: Told = { report, faults: [] }
  if (unkept !== null) after.faults.push(`the folded edits stay beside the turn: ${unkept}`)
  if (said.status !== held.status) await noticesOver(reach, given.root, at, said.status, after)
  await seatsStarted(reach, at, said.starts, done, after)
  if (said.stopsCaller && seat !== null) {
    reach.stop(given.root, seat.name)
    after.report.push(`stopping\t${seat.name}`)
  }
  if (after.faults.length === 0) return told(after.report)
  return answeredWith(after.report, after.faults, OPERATIONAL)
}

export async function storyTurnAdvance(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = REACHED
): Promise<Answer> {
  return await answering(async (done) => await advancedOn(done, argv, given, landing, reach))
}
