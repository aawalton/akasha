import { companionActivationBuffName } from "akasha/temper/catalog/companion/companions-core/modules/companion-activation-buffs/companion-activation-buffs.module.code.ts"
import {
  companionCatalog,
  companionNameAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import { companionPassiveMetricName } from "akasha/temper/catalog/companion/companions-core/modules/companion-passive-metrics/companion-passive-metrics.module.code.ts"
import type { SpecialEffectType } from "akasha/temper/catalog/effect/temper-special-effect-type/modules/special-effect-type-ids/special-effect-type-ids.data-table.code.ts"
import type { StatusEffectType } from "akasha/temper/catalog/effect/temper-status-effect-type/modules/status-effect-type-ids/status-effect-type-ids.data-table.code.ts"
import type {
  ActivationBuffType,
  ActivationDebuffType,
} from "akasha/temper/catalog/skill-kind/modules/skill-buff-debuff-types/skill-buff-debuff-types.module.code.ts"
import { buffOrDebuff } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

function buffLabel(buff: string): string {
  return buffOrDebuff().data[buff]?.name ?? companionActivationBuffName(buff) ?? buff
}

export function formatBuffType(buff: ActivationBuffType): string {
  return buffLabel(buff)
}

export function formatDebuffType(debuff: ActivationDebuffType): string {
  return buffLabel(debuff)
}

export function formatStatusEffect(status: StatusEffectType): string {
  return companionNameAt(companionCatalog().statusEffectTypes, status, "status effect type")
}

export function formatSpecialEffect(effect: SpecialEffectType): string {
  return companionNameAt(companionCatalog().specialEffectTypes, effect, "special effect type")
}

export function formatPassiveMetric(metricId: CompanionMetricId): string {
  return companionPassiveMetricName(metricId) ?? metricId
}
