import "akasha/temper/addon/pages/combat/modules/combat-lib-groups-combat/combat-lib-groups-combat.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-lib-groups-tracking/combat-lib-groups-tracking.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-lib-groups-stats/combat-lib-groups-stats.module.code.ts"

import { initResources } from "akasha/temper/addon/pages/combat/modules/combat-lib-callbacks/combat-lib-callbacks.module.code.ts"
import { LIB_EVENT_NAMESPACE } from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import { onBossesChanged } from "akasha/temper/addon/pages/combat/modules/combat-lib-fight/combat-lib-fight.module.code.ts"
import { createFight } from "akasha/temper/addon/pages/combat/modules/combat-lib-fight-lifecycle/combat-lib-fight-lifecycle.module.code.ts"
import {
  DATA,
  setCurrentFight,
} from "akasha/temper/addon/pages/combat/modules/combat-lib-state/combat-lib-state.module.code.ts"
import { initAdvancedStats } from "akasha/temper/addon/pages/combat/modules/combat-lib-stats/combat-lib-stats.module.code.ts"
import { initStatusEffectBonuses } from "akasha/temper/addon/pages/combat/modules/combat-lib-stats-boss/combat-lib-stats-boss.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

export function initializeLibCombat(): undefined {
  DATA.inCombat = IsUnitInCombat("player")
  DATA.inGroup = IsUnitGrouped("player")
  DATA.rawPlayername = GetRawUnitName("player")
  DATA.playername = ZO_CachedStrFormat(SI_UNIT_NAME, DATA.rawPlayername)
  DATA.accountname = ZO_CachedStrFormat(SI_UNIT_NAME, GetDisplayName())
  DATA.bossInfo = {}
  DATA.groupInfo = { nameToId: {}, tagToId: {}, nameToTag: {}, nameToDisplayname: {} }
  DATA.PlayerPets = {}
  DATA.lastabilities = []
  DATA.backstabber = 0
  DATA.critBonusMundus = 0
  const [activeWeaponPair] = GetActiveWeaponPairInfo()
  DATA.bar = activeWeaponPair
  DATA.resources = {}
  DATA.stats = {}
  DATA.advancedStats = {}
  DATA.currentQuickslotIndex = GetCurrentQuickslot()

  setCurrentFight(createFight())

  initResources()
  onBossesChanged()
  initAdvancedStats()
  initStatusEffectBonuses()

  if (DATA.LoadCustomizations !== undefined) {
    DATA.LoadCustomizations()
  }

  EVENT_MANAGER.RegisterForEvent(`${LIB_EVENT_NAMESPACE}Active`, EVENT_PLAYER_ACTIVATED, () => {
    DATA.isUIActivated = true
  })
  EVENT_MANAGER.RegisterForEvent(`${LIB_EVENT_NAMESPACE}Active`, EVENT_PLAYER_DEACTIVATED, () => {
    DATA.isUIActivated = false
  })
  return undefined
}
