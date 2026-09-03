import type { StoplightsSection } from "../status-bar-slot-types/status-bar-slot-types.module.code.ts"

export type StoplightLegends = Readonly<Record<StoplightsSection, string | undefined>>

export const NO_LEGENDS: StoplightLegends = {
  inbox: undefined,
  upkeep: undefined,
  attributes: undefined,
}
