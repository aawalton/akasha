"use client"

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { TextAreaPanelCard } from "../text-area-panel-card/text-area-panel-card.module.code.tsx"

interface BuildDescriptionPanelCardProps {
  buildDescription: string
  onUpdateMeta: (updates: { description?: string }) => void
  className?: string
  readOnly?: boolean
}

export function BuildDescriptionPanelCard({
  buildDescription,
  onUpdateMeta,
  className,
  readOnly,
}: BuildDescriptionPanelCardProps) {
  const surface = useSurface()
  return (
    <TextAreaPanelCard
      id="build-description"
      title="Description"
      placeholder="Notes about this build, playstyle, rotation tips..."
      value={buildDescription}
      onChange={(value) => onUpdateMeta({ description: value })}
      collapsible
      className={className}
      textareaClassName={surfaceClass(surface + 1)}
      readOnly={readOnly}
    />
  )
}
