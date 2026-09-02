import "@akasha/temper-combat-addon/combat-lib-groups-combat"
import "@akasha/temper-combat-addon/combat-lib-groups-tracking"
import "@akasha/temper-combat-addon/combat-lib-groups-stats"

import { initResources } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import { LIB_EVENT_NAMESPACE } from "@akasha/temper-combat-addon/combat-lib-constants"
import { onBossesChanged } from "@akasha/temper-combat-addon/combat-lib-fight"
import { createFight } from "@akasha/temper-combat-addon/combat-lib-fight-lifecycle"
import { DATA, setCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import { initAdvancedStats } from "@akasha/temper-combat-addon/combat-lib-stats"
import { initStatusEffectBonuses } from "@akasha/temper-combat-addon/combat-lib-stats-boss"

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
