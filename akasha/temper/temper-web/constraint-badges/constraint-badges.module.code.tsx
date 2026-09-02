import { Badge } from "@akasha/design-badges/badge"
import {
  formatEnemyType,
  formatStatusType,
  formatWeaponType,
} from "@akasha/temper-companions-core/companion-effect-formatters"
import type { EffectCondition } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type { BadgeVariant } from "../effect-badge-types/effect-badge-types.module.code.ts"

interface ConstraintBadgesProps {
  conditions: readonly EffectCondition[]
  variant: BadgeVariant
}

export function ConstraintBadges({ conditions, variant }: ConstraintBadgesProps) {
  return (
    <>
      {conditions.map((condition, index) => (
        <ConstraintBadge key={index} condition={condition} variant={variant} />
      ))}
    </>
  )
}

interface ConstraintBadgeProps {
  condition: EffectCondition
  variant: BadgeVariant
}

function ConstraintBadge({ condition, variant }: ConstraintBadgeProps) {
  const { label, value } = formatCondition(condition)

  return (
    <Badge variant={variant}>
      {value != null ? <span className="font-mono">{value}</span> : null}
      <span>{label}</span>
    </Badge>
  )
}

function formatCondition(condition: EffectCondition): { label: string; value: string | null } {
  switch (condition.type) {
    case "health-threshold": {
      if (condition.below !== undefined) {
        return { value: `<${condition.below}%`, label: "Health" }
      }
      if (condition.above !== undefined) {
        return { value: `>${condition.above}%`, label: "Health" }
      }
      return { value: null, label: "Health Threshold" }
    }

    case "ally-health": {
      if (condition.below !== undefined) {
        return { value: `<${condition.below}%`, label: "Ally Health" }
      }
      if (condition.above !== undefined) {
        return { value: `>${condition.above}%`, label: "Ally Health" }
      }
      return { value: null, label: "Ally Health" }
    }

    case "range": {
      if (condition.minDistance !== undefined && condition.maxDistance !== undefined) {
        return { value: `${condition.minDistance}-${condition.maxDistance}m`, label: "Range" }
      }
      if (condition.minDistance !== undefined) {
        return { value: `>${condition.minDistance}m`, label: "Range" }
      }
      if (condition.maxDistance !== undefined) {
        return { value: `<${condition.maxDistance}m`, label: "Range" }
      }
      return { value: null, label: "Range" }
    }

    case "movable":
      return { value: null, label: condition.isMovable ? "Movable Target" : "Immovable Target" }

    case "enemy-type": {
      const types = condition.enemyTypes.map(formatEnemyType).join(", ")
      return { value: null, label: types }
    }

    case "status": {
      if (condition.hasStatus != null) {
        return { value: null, label: `Has ${formatStatusType(condition.hasStatus)}` }
      }
      if (condition.notStatus != null) {
        return { value: null, label: `No ${formatStatusType(condition.notStatus)}` }
      }
      return { value: null, label: "Status" }
    }

    case "casting":
      return { value: null, label: condition.isCasting ? "Target Casting" : "Target Not Casting" }

    case "nearby": {
      const distance = condition.maxDistance ?? 8
      const target = condition.targetType === "enemy" ? "Enemy" : "Ally"
      return { value: `<${distance}m`, label: `${target} Nearby` }
    }

    case "weapon-type":
      return { value: null, label: `${formatWeaponType(condition.weaponType)} Weapon` }

    case "any":
      return { value: null, label: "Any Condition" }

    case "all":
      return { value: null, label: "All Conditions" }

    default:
      return { value: null, label: "Condition" }
  }
}
