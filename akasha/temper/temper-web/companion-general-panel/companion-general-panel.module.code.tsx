"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { BuildDescriptionPanelCard } from "../build-description-panel-card/build-description-panel-card.module.code.tsx"
import { CompanionInfoPanelCard } from "../companion-info-panel-card/companion-info-panel-card.module.code.tsx"
import { CompanionManagementPanelCard } from "../companion-management-panel-card/companion-management-panel-card.module.code.tsx"

interface CompanionGeneralPanelProps {
  buildId: BuildId
  buildName: string
  buildDescription: string
  onUpdateMeta: (updates: { name?: string; description?: string }) => void
  columnCount: 1 | 2
  readOnly?: boolean
  buildFieldsReadOnly?: boolean
}

export function CompanionGeneralPanel({
  buildId,
  buildName,
  buildDescription,
  onUpdateMeta,
  columnCount,
  readOnly,
  buildFieldsReadOnly,
}: CompanionGeneralPanelProps) {
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <CompanionInfoPanelCard
        buildName={buildName}
        onUpdateMeta={onUpdateMeta}
        readOnly={readOnly}
        collapseProtected
      />
      <BuildDescriptionPanelCard
        buildDescription={buildDescription}
        onUpdateMeta={onUpdateMeta}
        readOnly={buildFieldsReadOnly ?? readOnly}
      />
      {!readOnly && <CompanionManagementPanelCard buildId={buildId} buildName={buildName} />}
    </ResponsiveColumns>
  )
}
