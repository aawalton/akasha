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

export type UsageSlotDef = FigureSlotDef<"usage", UsageReading>

export type WorkstationSlotDef = FigureSlotDef<"workstation", WorkstationReading>

export type SeparatorSlotDef = {
  readonly kind: "separator"
  readonly id: string
  readonly priority: number
}

const STOPLIGHTS_SECTIONS = ["inbox", "upkeep", "attributes", "luck"] as const

export type StoplightsSection = (typeof STOPLIGHTS_SECTIONS)[number]

export type StoplightsSlotDef = {
  readonly kind: "stoplights"
  readonly id: string
  readonly priority: number
  readonly section: StoplightsSection
}

export type SlotDef = WorkstationSlotDef | UsageSlotDef | SeparatorSlotDef | StoplightsSlotDef
