"use client"

import { InputPanelCard } from "@akasha/design-patterns/input-panel-card"
import { Input } from "@akasha/design-primitives/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { toVisibility } from "@akasha/temper-companions-core/companion-types"
import { useEffect, useState } from "react"
import { useCompanionMetadata } from "../use-companion/use-companion.module.code.ts"

interface CompanionInfoPanelCardProps {
  buildName: string
  onUpdateMeta: (updates: { name?: string }) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

export function CompanionInfoPanelCard({
  buildName,
  onUpdateMeta,
  className,
  readOnly,
  collapseProtected,
}: CompanionInfoPanelCardProps) {
  const surface = useSurface()
  const { visibility, isOwner, setVisibility } = useCompanionMetadata()
  const nameReadOnly = !isOwner

  const [draftName, setDraftName] = useState(buildName)
  useEffect(() => {
    setDraftName(buildName)
  }, [buildName])

  return (
    <InputPanelCard
      id="companion-build-info"
      collapsible={true}
      collapseProtected={collapseProtected}
      title="Build Info"
      className={className}
    >
      <InputPanelCard.Row label="Build Name">
        <Input
          placeholder="Build name..."
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={() => {
            if (draftName !== buildName) onUpdateMeta({ name: draftName })
          }}
          className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          readOnly={nameReadOnly}
        />
      </InputPanelCard.Row>
      {visibility !== "live" && visibility !== "target" && (
        <InputPanelCard.Row label="Visibility">
          <Select
            value={visibility}
            onValueChange={(v) => {
              const parsed = toVisibility(v)
              if (parsed !== "live" && parsed !== "target") setVisibility(parsed)
            }}
            disabled={readOnly}
          >
            <SelectTrigger className={`w-full max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      )}
    </InputPanelCard>
  )
}
