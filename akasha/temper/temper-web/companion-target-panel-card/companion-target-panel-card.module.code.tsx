"use client"

import { InputPanelCard } from "@akasha/design-patterns/input-panel-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { type TargetArmorId, targetArmor } from "@akasha/temper-character-sources/target-armors"
import type { CompanionTargetHealthId } from "@akasha/temper-companions-core/companion-types"
import { useCompanionMetadata } from "../use-companion/use-companion.module.code.ts"

interface CompanionTargetPanelCardProps {
  target: {
    armor: TargetArmorId
    targetCount: number
    targetHealth: CompanionTargetHealthId
  }
  onUpdate: (updates: Partial<CompanionTargetPanelCardProps["target"]>) => void
  className?: string
  readOnly?: boolean
}

export function CompanionTargetPanelCard({
  target,
  onUpdate,
  className,
  readOnly,
}: CompanionTargetPanelCardProps) {
  const { updateMeta } = useCompanionMetadata()
  return (
    <InputPanelCard id="companion-targets" collapsible={true} title="Targets" className={className}>
      <InputPanelCard.Row label="Target Armor">
        <Select
          value={target.armor}
          onValueChange={(v) => {
            if (targetArmor.has(v)) onUpdate({ armor: v })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {targetArmor.list.map((ta) => (
              <SelectItem key={ta.id} value={ta.id}>
                {ta.name} ({ta.armor})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label="Target Health">
        <Select
          value={target.targetHealth}
          onValueChange={(v) => {
            if (v === "full" || v === "execute") onUpdate({ targetHealth: v })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full (100%)</SelectItem>
            <SelectItem value="execute">Execute (25%)</SelectItem>
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label="Target Count">
        <Select
          value={String(target.targetCount)}
          onValueChange={(v) => {
            const targetCount = Number(v)
            onUpdate({ targetCount })
            updateMeta({ targetCount })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
