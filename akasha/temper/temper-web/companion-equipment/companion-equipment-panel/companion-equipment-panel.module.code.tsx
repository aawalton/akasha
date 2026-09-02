"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { CompanionArmorPanelCard } from "../companion-armor-panel-card/companion-armor-panel-card.module.code.tsx"
import type { CompanionEquipmentPanelProps } from "../companion-equipment-panel-types/companion-equipment-panel-types.module.code.ts"
import { CompanionJewelryPanelCard } from "../companion-jewelry-panel-card/companion-jewelry-panel-card.module.code.tsx"
import { CompanionWeaponBarPanelCard } from "../companion-weapon-bar-panel-card/companion-weapon-bar-panel-card.module.code.tsx"

interface Props extends CompanionEquipmentPanelProps {
  columnCount: 1 | 2
}

export function CompanionEquipmentPanel({ equipment, onUpdate, readOnly, columnCount }: Props) {
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <CompanionWeaponBarPanelCard equipment={equipment} onUpdate={onUpdate} readOnly={readOnly} />
      <CompanionJewelryPanelCard equipment={equipment} onUpdate={onUpdate} readOnly={readOnly} />
      <CompanionArmorPanelCard equipment={equipment} onUpdate={onUpdate} readOnly={readOnly} />
    </ResponsiveColumns>
  )
}
