import type { UsageReading } from "akasha/code/editor/extension/status-bar-usage/status-bar-usage.module.code.ts"

export type UsageSlotDef = {
  readonly kind: "usage"
  readonly id: string
  readonly priority: number
  readonly label: string
  readonly hex: string
  readonly read: (u: UsageReading) => string
}

export type SeparatorSlotDef = {
  readonly kind: "separator"
  readonly id: string
  readonly priority: number
}

const STOPLIGHTS_SECTIONS = ["inbox", "upkeep", "attributes"] as const

export type StoplightsSection = (typeof STOPLIGHTS_SECTIONS)[number]

export type StoplightsSlotDef = {
  readonly kind: "stoplights"
  readonly id: string
  readonly priority: number
  readonly section: StoplightsSection
}

export type SlotDef = UsageSlotDef | SeparatorSlotDef | StoplightsSlotDef
