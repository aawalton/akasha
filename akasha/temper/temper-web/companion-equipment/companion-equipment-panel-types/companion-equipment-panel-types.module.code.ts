import type { CompanionState } from "@akasha/temper-companions-core/companion-types"

export interface CompanionEquipmentPanelProps {
  equipment: CompanionState["equipment"]
  onUpdate: (updates: Partial<CompanionState["equipment"]>) => void
  readOnly?: boolean
}
