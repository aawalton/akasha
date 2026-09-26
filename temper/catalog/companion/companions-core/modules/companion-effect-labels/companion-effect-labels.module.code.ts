import { companionActivationBuffName } from "akasha/temper/catalog/companion/companions-core/modules/companion-activation-buffs/companion-activation-buffs.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import { companionPassiveMetricName } from "akasha/temper/catalog/companion/companions-core/modules/companion-passive-metrics/companion-passive-metrics.module.code.ts"
import type {
  SpecialEffectType,
  StatusEffectType,
} from "akasha/temper/catalog/skill-kind/modules/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"
import type {
  ActivationBuffType,
  ActivationDebuffType,
} from "akasha/temper/catalog/skill-kind/modules/skill-buff-debuff-types/skill-buff-debuff-types.module.code.ts"
import { specialEffectTypes } from "akasha/temper/catalog/skill-kind/modules/special-effect-types/special-effect-types.module.code.ts"
import { statusEffectTypes } from "akasha/temper/catalog/skill-kind/modules/status-effect-types/status-effect-types.module.code.ts"
import { buffOrDebuff } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

const buffOrDebuffByName: Readonly<Record<string, { name: string }>> = buffOrDebuff.data

function buffLabel(buff: string): string {
  return buffOrDebuffByName[buff]?.name ?? companionActivationBuffName(buff) ?? buff
}

export function formatBuffType(buff: ActivationBuffType): string {
  return buffLabel(buff)
}

export function formatDebuffType(debuff: ActivationDebuffType): string {
  return buffLabel(debuff)
}

export function formatStatusEffect(status: StatusEffectType): string {
  return statusEffectTypes.data[status].name
}

export function formatSpecialEffect(effect: SpecialEffectType): string {
  return specialEffectTypes.data[effect].name
}

export function formatPassiveMetric(metricId: CompanionMetricId): string {
  return companionPassiveMetricName(metricId) ?? metricId
}
