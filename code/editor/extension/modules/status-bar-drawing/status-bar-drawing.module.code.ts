import type { StoplightLegends } from "akasha/code/editor/extension/modules/status-bar-legends/status-bar-legends.module.code.ts"
import type { FigureSlotDef } from "akasha/code/editor/extension/modules/status-bar-slot-types/status-bar-slot-types.module.code.ts"
import { SLOTS } from "akasha/code/editor/extension/modules/status-bar-slots/status-bar-slots.module.code.ts"
import type { UsageReading } from "akasha/code/editor/extension/modules/status-bar-usage/status-bar-usage.module.code.ts"
import type { WorkstationReading } from "akasha/code/editor/extension/modules/status-bar-workstation/status-bar-workstation.module.code.ts"
import type * as vscode from "vscode"

export type SectionResult<T> = {
  readonly value: T | undefined
  readonly stale: boolean
  readonly lastFreshAt: number | undefined
}

export type SettledReads = {
  readonly inbox: SectionResult<string>
  readonly upkeep: SectionResult<string>
  readonly attributes: SectionResult<string>
  readonly luck: SectionResult<string>
  readonly usage: SectionResult<UsageReading>
  readonly workstation: SectionResult<WorkstationReading>
}

export type ReadOutcomes = {
  readonly inbox: PromiseSettledResult<string>
  readonly upkeep: PromiseSettledResult<string>
  readonly attributes: PromiseSettledResult<string>
  readonly luck: PromiseSettledResult<string>
  readonly usage: PromiseSettledResult<UsageReading>
  readonly workstation: PromiseSettledResult<WorkstationReading>
}

export type FreshAts = {
  readonly inbox: number | undefined
  readonly upkeep: number | undefined
  readonly attributes: number | undefined
  readonly luck: number | undefined
  readonly usage: number | undefined
  readonly workstation: number | undefined
}

export type RenderItem = {
  text: string
  tooltip: string | vscode.MarkdownString | undefined
}

function settleSection<T>(
  settled: PromiseSettledResult<T>,
  prevFreshAt: number | undefined,
  now: number
): SectionResult<T> {
  if (settled.status === "fulfilled") {
    return { value: settled.value, stale: false, lastFreshAt: now }
  }
  return { value: undefined, stale: true, lastFreshAt: prevFreshAt }
}

export function settleReads(outcomes: ReadOutcomes, prev: FreshAts, now: number): SettledReads {
  return {
    inbox: settleSection(outcomes.inbox, prev.inbox, now),
    upkeep: settleSection(outcomes.upkeep, prev.upkeep, now),
    attributes: settleSection(outcomes.attributes, prev.attributes, now),
    luck: settleSection(outcomes.luck, prev.luck, now),
    usage: settleSection(outcomes.usage, prev.usage, now),
    workstation: settleSection(outcomes.workstation, prev.workstation, now),
  }
}

function formatStaleSuffix(stale: boolean, lastFreshAt: number | undefined): string {
  if (!stale) {
    return ""
  }
  if (lastFreshAt !== undefined) {
    const t = new Date(lastFreshAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return ` (stale since ${t})`
  }
  return " (stale — no successful poll yet)"
}

function legendTooltip(legend: string | undefined, suffix: string): string | undefined {
  const shown = `${legend ?? ""}${suffix}`.trim()
  return shown === "" ? undefined : shown
}

function drawFigure<Kind extends string, Reading>(
  item: RenderItem,
  slot: FigureSlotDef<Kind, Reading>,
  section: SectionResult<Reading>
): undefined {
  const suffix = formatStaleSuffix(section.stale, section.lastFreshAt)
  const text = section.value === undefined ? undefined : slot.read(section.value)
  item.text = text === undefined ? item.text : text
  item.tooltip = `${slot.label}${suffix}`
  return undefined
}

export function applyToItems(
  items: readonly RenderItem[],
  reads: SettledReads,
  legends: StoplightLegends
): undefined {
  for (let i = 0; i < SLOTS.length; i++) {
    const slot = SLOTS[i]
    const item = items[i]
    if (slot === undefined || item === undefined || slot.kind === "separator") {
      continue
    }
    if (slot.kind === "usage") {
      drawFigure(item, slot, reads.usage)
    } else if (slot.kind === "workstation") {
      drawFigure(item, slot, reads.workstation)
    } else {
      const section = reads[slot.section]
      const suffix = formatStaleSuffix(section.stale, section.lastFreshAt)
      const value = section.value
      const legend = legends[slot.section]
      if (value !== undefined) {
        item.text = value
      }
      item.tooltip = legendTooltip(legend, suffix)
    }
  }
  return undefined
}
