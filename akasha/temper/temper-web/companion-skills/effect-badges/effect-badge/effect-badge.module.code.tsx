import { Badge } from "@akasha/design-badges/badge"
import {
  formatCooldown,
  formatDamageType,
} from "@akasha/temper-companions-core/companion-effect-formatters"
import {
  formatBuffType,
  formatDebuffType,
  formatPassiveMetric,
  formatSpecialEffect,
  formatStatusEffect,
} from "@akasha/temper-companions-core/companion-effect-labels"
import type { CompanionEffect } from "@akasha/temper-companions-core/companion-skill-effect-components"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import { calculateEffectValue } from "@akasha/temper-companions-core/companion-skill-tooltip"
import { formatAbbreviated } from "@akasha/temper-formula-framework/number-format"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  ArmorPieceCounts,
  BadgeVariant,
} from "../effect-badge-types/effect-badge-types.module.code.ts"

interface EffectBadgeProps {
  effect: CompanionEffect
  variant: BadgeVariant
  stats?: CompanionFormulaStats
  armorPieceCounts?: ArmorPieceCounts
}

export function EffectBadge({ effect, variant, stats, armorPieceCounts }: EffectBadgeProps) {
  const { label, value } = getEffectBadgeDisplay(effect, stats, armorPieceCounts)

  return (
    <Badge variant={variant}>
      {value != null ? <span className="font-mono">{value}</span> : null}
      <span>{label}</span>
    </Badge>
  )
}

function getEffectBadgeDisplay(
  effect: CompanionEffect,
  stats?: CompanionFormulaStats,
  armorPieceCounts?: ArmorPieceCounts
): { label: string; value: string | null } {
  switch (effect.type) {
    case "damage": {
      const damageValue = calculateEffectValue(effect, stats)
      return {
        value: damageValue != null ? formatAbbreviated(Math.round(damageValue)) : null,
        label: formatDamageType(effect.damageType) + " Damage",
      }
    }

    case "dot": {
      const dotValue = calculateEffectValue(effect, stats)
      return {
        value:
          dotValue != null
            ? `${formatAbbreviated(Math.round(dotValue))} ${formatDamageType(effect.damageType)} Damage / ${effect.duration}s`
            : null,
        label: "",
      }
    }

    case "heal": {
      const healValue = calculateEffectValue(effect, stats)
      return {
        value: healValue != null ? formatAbbreviated(Math.round(healValue)) : null,
        label: "Health",
      }
    }

    case "hot": {
      const hotValue = calculateEffectValue(effect, stats)
      return {
        value:
          hotValue != null
            ? `${formatAbbreviated(Math.round(hotValue))} Health / ${effect.duration}s`
            : null,
        label: "",
      }
    }

    case "shield": {
      const shieldValue = calculateEffectValue(effect, stats)
      return {
        value: shieldValue != null ? formatAbbreviated(Math.round(shieldValue)) : null,
        label: "Damage Shield",
      }
    }

    case "multi-hit": {
      const hitValue = calculateEffectValue(effect, stats)
      return {
        value:
          hitValue != null
            ? `${formatAbbreviated(Math.round(hitValue))} ×${effect.hitCount}`
            : null,
        label: formatDamageType(effect.damageType) + " Damage",
      }
    }

    case "apply-status":
      return {
        value: `${effect.status.duration}s`,
        label: formatStatusEffect(effect.status.status),
      }

    case "apply-buff": {
      let valueStr: string
      if (effect.buff.value !== undefined) {
        if (effect.buff.valueType === "integer") {
          valueStr = `${Math.round(effect.buff.value)}`
        } else {
          const isNegative = effect.buff.buff === "flat-damage-reduction"
          valueStr = `${isNegative ? "-" : ""}${Math.round(effect.buff.value * 100)}%`
        }
      } else {
        valueStr = `${effect.buff.duration}s`
      }
      return {
        value: valueStr,
        label: formatBuffType(effect.buff.buff),
      }
    }

    case "apply-debuff": {
      if (effect.debuff.debuff === "damage-taken-increase" && effect.debuff.value !== undefined) {
        const valueStr = `+${Math.round(effect.debuff.value * 100)}%`
        return {
          value: valueStr,
          label: "Damage Taken",
        }
      }
      return {
        value: `${effect.debuff.duration}s`,
        label: formatDebuffType(effect.debuff.debuff),
      }
    }

    case "ultimate-generation":
      return {
        value: `+${effect.value}`,
        label: "Ultimate",
      }

    case "cast-time":
      return {
        value: `${effect.duration}s`,
        label: "Cast Time",
      }

    case "channel":
      return {
        value: `${effect.duration}s`,
        label: "Channel",
      }

    case "cooldown": {
      const effectiveCooldown = stats
        ? effect.duration * (1 + stats.abilityCooldown)
        : effect.duration
      return {
        value: `${formatCooldown(effectiveCooldown)}s`,
        label: "Cooldown",
      }
    }

    case "cooldown-reduction":
      return {
        value: effect.value === "reset" ? null : `-${effect.value}s`,
        label: effect.value === "reset" ? "Reset Cooldowns" : "CDR",
      }

    case "special":
      return {
        value: effect.duration != null ? `${effect.duration}s` : null,
        label: formatSpecialEffect(effect.effect),
      }

    case "synergy":
      return {
        value: null,
        label: `${effect.name} Synergy`,
      }

    case "retaliation": {
      const retaliationValue = calculateEffectValue(effect, stats)
      return {
        value: retaliationValue != null ? formatAbbreviated(Math.round(retaliationValue)) : null,
        label: "Retaliation Damage",
      }
    }

    case "periodic-trigger":
      return {
        value: `${effect.interval}s/${effect.duration}s`,
        label: "Periodic",
      }

    case "delayed": {
      if (effect.effect.type === "damage") {
        const damageValue = calculateEffectValue(effect.effect, stats)
        return {
          value: damageValue != null ? formatAbbreviated(Math.round(damageValue)) : null,
          label: `${formatDamageType(effect.effect.damageType)} Damage After ${effect.delay}s`,
        }
      }
      return {
        value: `${effect.delay}s`,
        label: "Delayed",
      }
    }

    case "light-attack-heal": {
      const healValue = calculateEffectValue(effect, stats)
      return {
        value:
          healValue != null
            ? `${formatAbbreviated(Math.round(healValue))} / ${effect.duration}s`
            : null,
        label: "Light Attack Heal",
      }
    }

    case "player-trigger": {
      const triggerValue = calculateEffectValue(effect, stats)
      return {
        value: triggerValue != null ? formatAbbreviated(Math.round(triggerValue)) : null,
        label: `${formatDamageType(effect.damageType)} on Player Hit`,
      }
    }

    case "passive": {
      const percent = Math.round(effect.value * 100)
      const sign = percent >= 0 ? "+" : ""
      return {
        value: `${sign}${percent}%`,
        label: formatPassiveMetric(effect.metricId),
      }
    }

    case "armor-piece-scaling": {
      const pieceCount = armorPieceCounts?.[effect.armorWeight] ?? 0
      const totalValue = effect.valuePerPiece * pieceCount * 100
      const sign = totalValue >= 0 ? "+" : ""
      return {
        value: `${sign}${totalValue.toFixed(0)}%`,
        label: formatPassiveMetric(effect.metricId),
      }
    }

    case "multi-heal":
      return {
        value: null,
        label: effect.type,
      }

    case "resource-cost":
      return {
        value: null,
        label: effect.type,
      }

    default:
      assertNever(effect)
  }
}
