import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import type { TargetAttributes } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"

const RESPEC_STARTED = `${ADDON_NAME}_TargetAttributeRespec`

export function spentAttributes(): TargetAttributes {
  return {
    health: GetAttributeSpentPoints(ATTRIBUTE_HEALTH),
    magicka: GetAttributeSpentPoints(ATTRIBUTE_MAGICKA),
    stamina: GetAttributeSpentPoints(ATTRIBUTE_STAMINA),
  }
}

export function applyAttributeTarget(target: TargetAttributes): string {
  if (IsUnitInCombat("player")) return "Attributes wait until you are out of combat."
  const spent = spentAttributes()
  const health = target.health - spent.health
  const magicka = target.magicka - spent.magicka
  const stamina = target.stamina - spent.stamina
  if (health === 0 && magicka === 0 && stamina === 0) return "Attributes already match the target."
  if (health + magicka + stamina > GetAttributeUnspentPoints()) {
    return "The target spends more attribute points than this character has."
  }
  if (health >= 0 && magicka >= 0 && stamina >= 0) {
    PurchaseAttributes(health, magicka, stamina)
    return "Attribute points spent."
  }
  EVENT_MANAGER.RegisterForEvent<[number, RespecPaymentType]>(
    RESPEC_STARTED,
    EVENT_START_ATTRIBUTE_RESPEC,
    (_eventCode, _allocationMode, paymentType) => {
      EVENT_MANAGER.UnregisterForEvent(RESPEC_STARTED, EVENT_START_ATTRIBUTE_RESPEC)
      SendAttributePointAllocationRequest(paymentType, health, magicka, stamina)
    }
  )
  StartAttributeRespecFromUI()
  return "Attributes respecced."
}
