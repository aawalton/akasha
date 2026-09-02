"use client"

import { BadgeRow } from "@akasha/design-badges/badge"
import { cn } from "@akasha/design-primitives/cn"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { sortEffectsByCategory } from "@akasha/temper-companions-core/companion-effect-category"
import type { CompanionSkillTemplate } from "@akasha/temper-companions-core/companion-skill-activation-effect-types"
import { extractSkillTiming } from "@akasha/temper-companions-core/companion-skill-activation-effect-types"
import { isResourceCostEffect } from "@akasha/temper-companions-core/companion-skill-effect-components"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import {
  extractPrimaryTargeting,
  updateDescriptionWithCalculatedValues,
} from "@akasha/temper-companions-core/companion-skill-tooltip"
import { getEsoIconUrl } from "@akasha/temper-formula-framework/eso-icon-url"
import { formatAbbreviated } from "@akasha/temper-formula-framework/number-format"
import { capitalize } from "@akasha/utils-narrow/capitalize"
import type { ReactNode } from "react"
import { CollapsibleSkillCard } from "../collapsible-skill-card/collapsible-skill-card.module.code.tsx"
import { ConstraintBadges } from "../constraint-badges/constraint-badges.module.code.tsx"
import { EffectBadge } from "../effect-badge/effect-badge.module.code.tsx"
import type { ArmorPieceCounts } from "../effect-badge-types/effect-badge-types.module.code.ts"
import { EffectCard } from "../effect-card/effect-card.module.code.tsx"
import {
  RadiusBadge,
  RangeBadge,
  TargetingBadge,
} from "../targeting-badges/targeting-badges.module.code.tsx"
import { TimingBadges } from "../timing-badges/timing-badges.module.code.tsx"

interface CompanionSkillCardProps {
  skill: CompanionSkillTemplate
  collapsible?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  stats?: CompanionFormulaStats
  armorPieceCounts?: ArmorPieceCounts
  renderAction?: () => ReactNode
  reserveActionSpace?: boolean
  effectsDisplay?: "badges" | "cards"
  className?: string
}

export function CompanionSkillCard({
  skill,
  collapsible,
  open,
  defaultOpen,
  onOpenChange,
  stats,
  armorPieceCounts,
  renderAction,
  reserveActionSpace,
  effectsDisplay = "badges",
  className,
}: CompanionSkillCardProps) {
  const iconUrl = getEsoIconUrl(skill.icon)
  const timing = extractSkillTiming(skill.effects)
  const resourceCost = skill.effects.find(isResourceCostEffect)

  const displayEffects = sortEffectsByCategory(
    skill.effects.filter(
      (e) =>
        e.type !== "cast-time" &&
        e.type !== "channel" &&
        e.type !== "cooldown" &&
        e.type !== "resource-cost"
    )
  )

  const primaryTargeting = extractPrimaryTargeting(skill.effects)

  const subtitleParts: string[] = []
  if (resourceCost && resourceCost.resource !== "ultimate") {
    subtitleParts.push(
      `${formatAbbreviated(resourceCost.amount)} ${capitalize(resourceCost.resource)}`
    )
  }
  const subtitleString = subtitleParts.join(" / ")

  const effectBadges =
    displayEffects.length > 0
      ? displayEffects.map((effect, index) => (
          <EffectBadge
            key={index}
            effect={effect}
            variant="elevation-muted"
            stats={stats}
            armorPieceCounts={armorPieceCounts}
          />
        ))
      : null

  return (
    <CollapsibleSkillCard
      iconUrl={iconUrl}
      name={skill.name}
      subtitle={subtitleString !== "" ? subtitleString : undefined}
      subtitleTrailing={effectBadges}
      collapsible={collapsible}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      renderAction={renderAction}
      reserveActionSpace={reserveActionSpace}
      className={className}
    >
      {}
      <BadgeRow>
        <TimingBadges
          timing={timing}
          variant="elevation-muted"
          ultimateCost={resourceCost?.resource === "ultimate" ? resourceCost.amount : undefined}
          stats={stats}
        />
        {primaryTargeting ? (
          <TargetingBadge targeting={primaryTargeting} variant="elevation-muted" />
        ) : null}
        {primaryTargeting?.range != null ? (
          <RangeBadge range={primaryTargeting.range} variant="elevation-muted" />
        ) : null}
        {primaryTargeting?.radius != null ? (
          <RadiusBadge radius={primaryTargeting.radius} variant="elevation-muted" />
        ) : null}
        {skill.castConditions && skill.castConditions.length > 0 ? (
          <ConstraintBadges conditions={skill.castConditions} variant="elevation-muted" />
        ) : null}
      </BadgeRow>

      {}
      <p className={cn("rounded-lg px-4 py-3 text-secondary text-sm", surfaceClass(3))}>
        {updateDescriptionWithCalculatedValues(skill.description, skill.effects, stats)}
      </p>

      {}
      {effectsDisplay === "cards" && displayEffects.length > 0 ? (
        <div className="flex flex-col gap-2">
          <Heading variant="label">Effects</Heading>
          <div className="flex flex-col gap-2">
            {displayEffects.map((effect, index) => (
              <EffectCard key={index} effect={effect} stats={stats} />
            ))}
          </div>
        </div>
      ) : null}
    </CollapsibleSkillCard>
  )
}
