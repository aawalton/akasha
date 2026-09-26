import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"

export type BuffCategory = "damage" | "healing" | "protection"

export function isBuffCategory(value: unknown): value is BuffCategory {
  return value === "damage" || value === "healing" || value === "protection"
}

type EffectCategory = BuffCategory | "control" | "utility"

function placeOf(category: EffectCategory): number {
  const place = companionCatalog().effectCategoryOrder[category]
  if (place === undefined) throw new Error(`no effect category page answers to \`${category}\``)
  return place
}

function categoryOfBuff(id: string): EffectCategory {
  return companionCatalog().effectCategories[id] ?? "utility"
}

function getEffectCategory(effect: CompanionEffect): EffectCategory {
  if (effect.type === "delayed") {
    return getEffectCategory(effect.effect)
  }

  switch (effect.type) {
    case "damage":
    case "dot":
    case "multi-hit":
    case "retaliation":
    case "player-trigger":
      return "damage"
    case "heal":
    case "hot":
    case "light-attack-heal":
      return "healing"
    case "shield":
      return "protection"
    case "apply-status":
      return "control"
    case "apply-buff":
      return categoryOfBuff(effect.buff.buff)
    case "apply-debuff":
      return categoryOfBuff(effect.debuff.debuff)
    case "passive":
    case "multi-heal":
    case "ultimate-generation":
    case "cooldown-reduction":
    case "special":
    case "synergy":
    case "periodic-trigger":
    case "resource-cost":
    case "armor-piece-scaling":
    case "cooldown":
    case "cast-time":
    case "channel":
      return "utility"
    default:
      assertNever(effect)
  }
}

export function sortEffectsByCategory<T extends CompanionEffect>(
  effects: readonly T[]
): readonly T[] {
  return [...effects].sort((a, b) => placeOf(getEffectCategory(a)) - placeOf(getEffectCategory(b)))
}
