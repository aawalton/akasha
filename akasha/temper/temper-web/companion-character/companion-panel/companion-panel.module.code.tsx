"use client"

import { MultiSelect, type MultiSelectItem } from "@akasha/design-forms/multi-select"
import { InputPanelCard } from "@akasha/design-patterns/input-panel-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
} from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { type CompanionId, companions } from "@akasha/temper-companions-core/companions"

interface CompanionPanelProps {
  companion: CompanionState["companion"]
  onUpdateCompanion: (updates: Partial<CompanionState["companion"]>) => void
  readOnly?: boolean
  roleReadOnly?: boolean
}

const ROLE_ITEMS: MultiSelectItem[] = companionBaseRoles.list.map((role) => ({
  value: role.id,
  label: role.name,
}))

function toRoleIds(items: readonly MultiSelectItem[]): readonly CompanionBaseRoleId[] {
  const ids: CompanionBaseRoleId[] = []
  for (const item of items) {
    if (companionBaseRoles.has(item.value)) ids.push(item.value)
  }
  return ids
}

export function CompanionPanel({
  companion,
  onUpdateCompanion,
  readOnly,
  roleReadOnly,
}: CompanionPanelProps) {
  const selectedRoleItems = ROLE_ITEMS.filter(
    (item) => companionBaseRoles.has(item.value) && companion.baseRoles.includes(item.value)
  )

  return (
    <InputPanelCard id="companion" collapsible title="Companion">
      <InputPanelCard.Row label="Companion">
        <Select
          value={companion.id}
          onValueChange={(value: CompanionId) => onUpdateCompanion({ id: value })}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
            <SelectValue placeholder="Select companion">
              {companions.data[companion.id]?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {companions.list
              .toSorted((a, b) => {
                if (a.id === "no-companion") return -1
                if (b.id === "no-companion") return 1
                return a.name.localeCompare(b.name)
              })
              .map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Roles"
        description={roleReadOnly ? "Role is set by the live build." : undefined}
      >
        <MultiSelect
          items={ROLE_ITEMS}
          value={selectedRoleItems}
          onSelect={(items) => onUpdateCompanion({ baseRoles: toRoleIds(items) })}
          caption="Select roles"
          className="w-full min-w-0 max-w-[240px]"
          disabled={readOnly || roleReadOnly}
        />
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
