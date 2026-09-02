"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { ItemCard } from "@akasha/design-patterns/item-card"
import { Button } from "@akasha/design-primitives/button"
import type { ChampionPointId } from "@akasha/temper-champion-points/champion-point-source"
import {
  getCPSkillDescription,
  getCPSkillDisplayName,
} from "@akasha/temper-characters-stats/extract-champion-points"
import { Hammer, Plus, Shield, Swords } from "lucide-react"
import { useState } from "react"
import { StarSelectionDialog } from "../star-selection-dialog/star-selection-dialog.module.code.tsx"

interface ConstellationPanelCardProps {
  constellation: "warfare" | "fitness" | "craft"
  slottedStars: readonly ChampionPointId[]
  onUpdate: (slottedStars: readonly ChampionPointId[]) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

const CONSTELLATION_CONFIG = {
  warfare: {
    name: "Warfare",
    icon: Swords,
    noStarId: "no-warfare-star",
  },
  fitness: {
    name: "Fitness",
    icon: Shield,
    noStarId: "no-fitness-star",
  },
  craft: {
    name: "Craft",
    icon: Hammer,
    noStarId: "no-craft-star",
  },
} as const satisfies Record<string, { name: string; icon: unknown; noStarId: ChampionPointId }>

export function ConstellationPanelCard({
  constellation,
  slottedStars,
  onUpdate,
  className,
  readOnly,
  collapseProtected,
}: ConstellationPanelCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const config = CONSTELLATION_CONFIG[constellation]
  const Icon = config.icon
  const noStarId = config.noStarId

  const actualStars = slottedStars.filter((id) => !id.startsWith("no-"))
  const hasEmptySlots = slottedStars.some((id) => id.startsWith("no-"))

  const handleRemoveStar = (index: number) => {
    const updated = [...slottedStars]
    updated[index] = noStarId
    onUpdate(updated)
  }

  const handleAddStar = (starId: ChampionPointId) => {
    if (starId.startsWith("no-")) {
      return
    }

    const emptyIndex = slottedStars.findIndex((id) => id.startsWith("no-"))
    if (emptyIndex !== -1 && !actualStars.includes(starId)) {
      const updated = [...slottedStars]
      updated[emptyIndex] = starId
      onUpdate(updated)
    }
  }

  return (
    <>
      <PanelCard
        id={`cp-${constellation}`}
        collapsible={true}
        collapseProtected={collapseProtected}
        title={config.name}
        className={className}
      >
        {actualStars.length > 0 ? (
          <div className="space-y-2">
            {slottedStars.map((starId, index) => {
              if (starId.startsWith("no-")) {
                return null
              }

              const name = getCPSkillDisplayName(starId)
              const description = getCPSkillDescription(starId)

              return (
                <ItemCard
                  key={`${starId}-${index}`}
                  renderIcon={() => <Icon className="h-5 w-5" />}
                  renderContent={() => (
                    <>
                      <div className="font-medium text-sm">{name}</div>
                      <div className="line-clamp-2 text-secondary text-xs">{description}</div>
                    </>
                  )}
                  onRemove={readOnly ? undefined : () => handleRemoveStar(index)}
                  removeLabel={`Remove ${name}`}
                />
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-tertiary">
            No stars slotted. Click the button below to add up to 4 stars.
          </p>
        )}

        {!readOnly && hasEmptySlots && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setDialogOpen(true)}
            type="button"
          >
            <Plus className="h-4 w-4" />
            Add Star
          </Button>
        )}
      </PanelCard>

      {!readOnly && (
        <StarSelectionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          constellation={constellation}
          slottedStars={slottedStars}
          onSelect={handleAddStar}
        />
      )}
    </>
  )
}
