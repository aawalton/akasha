import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-broadcast/combat-alerts-broadcast.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-format/combat-alerts-alerts-format.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    SetAbilityOverlay: (this: void, abilityId: number) => void
    RemoveAbilityOverlay: (this: void, abilityId: number) => void
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
    StopDamageable: (this: void) => void
  }
}
