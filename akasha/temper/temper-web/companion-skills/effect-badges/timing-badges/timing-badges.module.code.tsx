import { Badge } from "@akasha/design-badges/badge"
import { formatCooldown } from "@akasha/temper-companions-core/companion-effect-formatters"
import type { ExtractedSkillTiming } from "@akasha/temper-companions-core/companion-skill-activation-effect-types"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import type { BadgeVariant } from "../effect-badge-types/effect-badge-types.module.code.ts"

interface TimingBadgesProps {
  timing: ExtractedSkillTiming
  variant: BadgeVariant
  ultimateCost?: number
  stats?: CompanionFormulaStats
}

export function TimingBadges({ timing, variant, ultimateCost, stats }: TimingBadgesProps) {
  const effectiveCooldown =
    timing.cooldown > 0 && stats ? timing.cooldown * (1 + stats.abilityCooldown) : timing.cooldown

  return (
    <>
      {ultimateCost != null ? (
        <Badge variant={variant}>
          <span className="font-mono">{ultimateCost}</span>
          <span>Ultimate</span>
        </Badge>
      ) : null}
      {timing.castTime > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">{timing.castTime}s</span>
          <span>Cast Time</span>
        </Badge>
      ) : null}
      {timing.channelDuration > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">{timing.channelDuration}s</span>
          <span>Channel</span>
        </Badge>
      ) : null}
      {effectiveCooldown > 0 ? (
        <Badge variant={variant}>
          <span className="font-mono">{formatCooldown(effectiveCooldown)}s</span>
          <span>Cooldown</span>
        </Badge>
      ) : null}
    </>
  )
}
