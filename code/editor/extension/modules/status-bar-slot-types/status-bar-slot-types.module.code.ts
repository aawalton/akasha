import type { UsageReading } from "akasha/code/editor/extension/modules/status-bar-usage/status-bar-usage.module.code.ts"
import type { WorkstationReading } from "akasha/code/editor/extension/modules/status-bar-workstation/status-bar-workstation.module.code.ts"

export type FigureSlotDef<Kind extends string, Reading> = {
  readonly kind: Kind
  readonly id: string
  readonly priority: number
  readonly label: string
  readonly hex: string
  readonly read: (reading: Reading) => string
}

type UsageSlotDef = FigureSlotDef<"usage", UsageReading>

type WorkstationSlotDef = FigureSlotDef<"workstation", WorkstationReading>

type SeparatorSlotDef = {
  readonly kind: "separator"
  readonly id: string
  readonly priority: number
}

const STOPLIGHTS_SECTIONS = ["inbox", "upkeep", "attributes"] as const

export type StoplightsSection = (typeof STOPLIGHTS_SECTIONS)[number]

type StoplightsSlotDef = {
  readonly kind: "stoplights"
  readonly id: string
  readonly priority: number
  readonly section: StoplightsSection
}

export type SlotDef = WorkstationSlotDef | UsageSlotDef | SeparatorSlotDef | StoplightsSlotDef
