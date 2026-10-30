import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import { beatsFile } from "akasha/command/argument/pages/beats-file.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { proseFile } from "akasha/command/argument/pages/prose-file.argument.ts"
import { rulingsFile } from "akasha/command/argument/pages/rulings-file.argument.ts"
import { turnLore } from "akasha/command/argument/pages/turn-lore.argument.ts"
import { beatPrompt } from "akasha/command/pages/story/turn/modules/turn-beat-prompting/turn-beat-prompting.module.code.ts"
import {
  ITEM_ENDING,
  mechanicsPrompt,
  type Prompting,
  type Recorder,
  type Reviewer,
  recorderPrompt,
  reviewerPrompt,
} from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import {
  BEATS_STEP,
  LORE_STEP,
  PROSE_STEP,
  partStep,
  recordStep,
  reviewStep,
} from "akasha/command/pages/story/turn/modules/turn-step-naming/turn-step-naming.module.code.ts"
import {
  type FlowPart,
  filledOn,
  refusedAt,
} from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  BEATS,
  GAME_MASTER,
  MECHANICS,
  RECORDERS,
  REVIEWERS,
  type TurnStep,
  WORLD_BUILDER,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export type Checking = {
  readonly prompting: Prompting
  readonly slug: string
  readonly status: TurnStep
  readonly flows: boolean
  readonly flow: Beats
  readonly reviewedBy: readonly string[]
  readonly recordedBy: readonly string[]
  readonly reviewers: readonly Reviewer[]
  readonly recorders: readonly Recorder[]
  readonly mechanics: readonly string[]
  readonly roles: Readonly<Record<string, string>>
  readonly notice: (step: TurnStep) => string
}

type Item = {
  readonly label: string
  readonly done: boolean
  readonly role: string | null
  readonly said: () => string
  readonly beat?: number
}

const PARTS: readonly FlowPart[] = ["changes", "prose", "memory", "pictured"]

const PART_ROLE: Readonly<Record<FlowPart, string | null>> = {
  event: null,
  changes: storyRecorderRole.slug,
  prose: writerRole.slug,
  memory: storyRecorderRole.slug,
  pictured: storyRecorderRole.slug,
}

const BEFORE_BEATS: readonly TurnStep[] = [WORLD_BUILDER, GAME_MASTER]

const BEFORE_PROSE: readonly TurnStep[] = [...BEFORE_BEATS, MECHANICS, WRITER]

function callOf(checking: Checking, flags: string): string {
  return `${checking.prompting.calledAs} ${playedTurn.said} ${checking.prompting.address} ${flags}`
}

function stepSaid(
  checking: Checking,
  step: TurnStep,
  flags: string,
  more: readonly string[]
): string {
  const said = [checking.notice(step), "", "Hand it in once:", "", callOf(checking, flags)]
  return [...said, ...more.flatMap((one) => ["", one]), "", ITEM_ENDING].join("\n")
}

function loreItem(checking: Checking): Item {
  const flags = `${turnLore.said} <${turnLore.placeholder}>`
  const more = [
    `Name each lore page you landed with a \`${turnLore.said}\` of its own, and leave \`${turnLore.said}\` out where you landed none.`,
  ]
  return {
    label: LORE_STEP,
    done: checking.status !== WORLD_BUILDER,
    role: worldBuilderRole.slug,
    said: () => stepSaid(checking, WORLD_BUILDER, flags, more),
  }
}

function beatsItem(checking: Checking): Item {
  const ruling = (checking.prompting.repairs ?? []).length > 0
  const more = ruling
    ? [`Add \`${rulingsFile.said} <path>\` where you rule an issue out rather than mend it.`]
    : []
  return {
    label: BEATS_STEP,
    done: !BEFORE_BEATS.includes(checking.status),
    role: null,
    said: () => stepSaid(checking, GAME_MASTER, `${beatsFile.said} <path>`, more),
  }
}

function beatItems(checking: Checking): readonly Item[] {
  if (checking.status !== BEATS) {
    const said = () => ""
    const label = "Each beat in turn: its numbers, prose, memory and pictures"
    return [{ label, done: false, role: null, said }]
  }
  const { flow, prompting } = checking
  const turn = { slug: checking.slug, at: prompting.turnAt, beats: flow }
  const refused = refusedAt(flow)
  return flow.beats.flatMap((_, at): Item[] => {
    const beat = at + 1
    const parts: readonly FlowPart[] = beat === refused ? ["event", ...PARTS] : PARTS
    const asked = { ...prompting, turn, beat, recorders: checking.recorders, master: null }
    return parts.map((part) => ({
      label: partStep(part),
      done: part !== "event" && filledOn(flow, beat, part),
      role: PART_ROLE[part],
      said: () => beatPrompt(part, { ...asked, alone: true }),
      beat,
    }))
  })
}

function reviewItems(checking: Checking): readonly Item[] {
  const asked = { ...checking.prompting, alone: true }
  return checking.reviewers.map((one) => ({
    label: reviewStep(one.slug),
    done: checking.reviewedBy.includes(one.slug),
    role: reviewerRole.slug,
    said: () => reviewerPrompt(asked, one),
  }))
}

function offBeatItems(checking: Checking): readonly Item[] {
  const { status, recordedBy } = checking
  const asked = { ...checking.prompting, alone: true }
  const mechanics = checking.recorders.filter((one) => checking.mechanics.includes(one.slug))
  const recording = checking.recorders.filter((one) => !checking.mechanics.includes(one.slug))
  const proseFlags = `${proseFile.said} <path> ${character.said} <${character.placeholder}>`
  return [
    ...mechanics.map((one) => ({
      label: recordStep(one.slug),
      done: !BEFORE_PROSE.includes(status) || recordedBy.includes(one.slug),
      role: storyRecorderRole.slug,
      said: () => mechanicsPrompt(asked, one),
    })),
    {
      label: PROSE_STEP,
      done: status === RECORDERS || status === REVIEWERS,
      role: writerRole.slug,
      said: () => stepSaid(checking, WRITER, proseFlags, []),
    },
    ...recording.map((one) => ({
      label: recordStep(one.slug),
      done: status === REVIEWERS || recordedBy.includes(one.slug),
      role: storyRecorderRole.slug,
      said: () => recorderPrompt(asked, one),
    })),
  ]
}

function itemsOf(checking: Checking): readonly Item[] {
  const middle = checking.flows ? beatItems(checking) : offBeatItems(checking)
  return [loreItem(checking), beatsItem(checking), ...middle, ...reviewItems(checking)]
}

type Row = { readonly beat: number | null; readonly said: string }

function rowsOf(items: readonly Item[], next: Item | undefined): readonly Row[] {
  const rows: Row[] = []
  for (const item of items) {
    const mark = `${item === next ? "[>]" : item.done ? "[x]" : "[ ]"} ${item.label}`
    const last = rows.at(-1)
    if (item.beat !== undefined && last !== undefined && last.beat === item.beat) {
      rows[rows.length - 1] = { beat: item.beat, said: `${last.said} ${mark}` }
    } else rows.push({ beat: item.beat ?? null, said: mark })
  }
  return rows
}

function spanOf(from: Row, to: Row): string {
  if (from.beat === null || to.beat === null) return ""
  return from.beat === to.beat ? `Beat ${to.beat}: ` : `Beats ${from.beat} to ${to.beat}: `
}

function linesOf(rows: readonly Row[]): readonly string[] {
  const lines: string[] = []
  let from: Row | null = null
  for (const [at, row] of rows.entries()) {
    const after = rows[at + 1]
    from = from ?? row
    if (row.beat !== null && after !== undefined && after.beat !== null && after.said === row.said)
      continue
    lines.push(`- ${spanOf(from, row)}${row.said}`)
    from = null
  }
  return lines
}

function titleOf(item: Item): string {
  return item.beat === undefined ? item.label : `Beat ${item.beat}: ${item.label}`
}

function roleSaid(checking: Checking, item: Item): readonly string[] {
  const at = item.role === null ? undefined : checking.roles[item.role]
  if (item.role === null || at === undefined) return []
  const name = item.role.replaceAll("-", " ")
  return [
    "",
    `For this item you hold the ${name} role: its role page is \`${at}\`. Read it with \`akasha read --file-path ${at}\`, and work by it for this item alone.`,
  ]
}

export function checklistSaid(checking: Checking): string {
  const items = itemsOf(checking)
  const next = items.find((one) => !one.done)
  const { turnAt, title } = checking.prompting
  const head = `The checklist of the turn \`${turnAt}\` of ${title}, at ${checking.status}: [x] is done, [>] is the item to work now, [ ] is still to do. The turn reaches player once every item is done.`
  const listed = [head, "", ...linesOf(rowsOf(items, next))]
  if (next === undefined) return listed.join("\n")
  return [
    ...listed,
    "",
    `Now: ${titleOf(next)}`,
    ...roleSaid(checking, next),
    "",
    next.said(),
  ].join("\n")
}
