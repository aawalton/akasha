import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const BHB = CRUTCH.BossHealthBar

const VISUALS: Record<number, string> = {
  [ATTRIBUTE_VISUAL_AUTOMATIC]: "AUTOMATIC",
  [ATTRIBUTE_VISUAL_DECREASED_MAX_POWER]: "DECREASED_MAX_POWER",
  [ATTRIBUTE_VISUAL_DECREASED_REGEN_POWER]: "DECREASED_REGEN_POWER",
  [ATTRIBUTE_VISUAL_DECREASED_STAT]: "DECREASED_STAT",
  [ATTRIBUTE_VISUAL_FORCE_INCREASED_POWER_STAT_VISUAL]: "FORCE_INCREASED_POWER_STAT_VISUAL",
  [ATTRIBUTE_VISUAL_INCREASED_MAX_POWER]: "INCREASED_MAX_POWER",
  [ATTRIBUTE_VISUAL_INCREASED_REGEN_POWER]: "INCREASED_REGEN_POWER",
  [ATTRIBUTE_VISUAL_INCREASED_STAT]: "INCREASED_STAT",
  [ATTRIBUTE_VISUAL_NONE]: "NONE",
  [ATTRIBUTE_VISUAL_NO_HEALING]: "NO_HEALING",
  [ATTRIBUTE_VISUAL_POSSESSION]: "POSSESSION",
  [ATTRIBUTE_VISUAL_POWER_SHIELDING]: "POWER_SHIELDING",
  [ATTRIBUTE_VISUAL_TRAUMA]: "TRAUMA",
  [ATTRIBUTE_VISUAL_UNWAVERING_POWER]: "UNWAVERING_POWER",
}

const STAT_TYPES: Record<number, string> = {
  [STAT_ARMOR_RATING]: "ARMOR_RATING",
  [STAT_ATTACK_POWER]: "ATTACK_POWER",
  [STAT_BLOCK]: "BLOCK",
  [STAT_CRITICAL_CHANCE]: "CRITICAL_CHANCE",
  [STAT_CRITICAL_RESISTANCE]: "CRITICAL_RESISTANCE",
  [STAT_CRITICAL_STRIKE]: "CRITICAL_STRIKE",
  [STAT_DAMAGE_RESIST_BLEED]: "DAMAGE_RESIST_BLEED",
  [STAT_DAMAGE_RESIST_COLD]: "DAMAGE_RESIST_COLD",
  [STAT_DAMAGE_RESIST_DISEASE]: "DAMAGE_RESIST_DISEASE",
  [STAT_DAMAGE_RESIST_DROWN]: "DAMAGE_RESIST_DROWN",
  [STAT_DAMAGE_RESIST_EARTH]: "DAMAGE_RESIST_EARTH",
  [STAT_DAMAGE_RESIST_FIRE]: "DAMAGE_RESIST_FIRE",
  [STAT_DAMAGE_RESIST_GENERIC]: "DAMAGE_RESIST_GENERIC",
  [STAT_DAMAGE_RESIST_MAGIC]: "DAMAGE_RESIST_MAGIC",
  [STAT_DAMAGE_RESIST_OBLIVION]: "DAMAGE_RESIST_OBLIVION",
  [STAT_DAMAGE_RESIST_PHYSICAL]: "DAMAGE_RESIST_PHYSICAL",
  [STAT_DAMAGE_RESIST_POISON]: "DAMAGE_RESIST_POISON",
  [STAT_DAMAGE_RESIST_SHOCK]: "DAMAGE_RESIST_SHOCK",
  [STAT_DAMAGE_RESIST_START]: "DAMAGE_RESIST_START",
  [STAT_DEPRECATED_0]: "DEPRECATED_0",
  [STAT_DEPRECATED_1]: "DEPRECATED_1",
  [STAT_DEPRECATED_2]: "DEPRECATED_2",
  [STAT_DEPRECATED_3]: "DEPRECATED_3",
  [STAT_DODGE]: "DODGE",
  [STAT_HEALING_DONE]: "HEALING_DONE",
  [STAT_HEALING_TAKEN]: "HEALING_TAKEN",
  [STAT_HEALTH_MAX]: "HEALTH_MAX",
  [STAT_HEALTH_REGEN_COMBAT]: "HEALTH_REGEN_COMBAT",
  [STAT_HEALTH_REGEN_IDLE]: "HEALTH_REGEN_IDLE",
  [STAT_MAGICKA_MAX]: "MAGICKA_MAX",
  [STAT_MAGICKA_REGEN_COMBAT]: "MAGICKA_REGEN_COMBAT",
  [STAT_MAGICKA_REGEN_IDLE]: "MAGICKA_REGEN_IDLE",
  [STAT_MISS]: "MISS",
  [STAT_MITIGATION]: "MITIGATION",
  [STAT_MOUNT_STAMINA_MAX]: "MOUNT_STAMINA_MAX",
  [STAT_MOUNT_STAMINA_REGEN_COMBAT]: "MOUNT_STAMINA_REGEN_COMBAT",
  [STAT_MOUNT_STAMINA_REGEN_MOVING]: "MOUNT_STAMINA_REGEN_MOVING",
  [STAT_NONE]: "NONE",
  [STAT_OFFENSIVE_PENETRATION]: "OFFENSIVE_PENETRATION",
  [STAT_PHYSICAL_PENETRATION]: "PHYSICAL_PENETRATION",
  [STAT_PHYSICAL_RESIST]: "PHYSICAL_RESIST",
  [STAT_POWER]: "POWER",
  [STAT_SPELL_CRITICAL]: "SPELL_CRITICAL",
  [STAT_SPELL_MITIGATION]: "SPELL_MITIGATION",
  [STAT_SPELL_PENETRATION]: "SPELL_PENETRATION",
  [STAT_SPELL_POWER]: "SPELL_POWER",
  [STAT_SPELL_RESIST]: "SPELL_RESIST",
  [STAT_STAMINA_MAX]: "STAMINA_MAX",
  [STAT_STAMINA_REGEN_COMBAT]: "STAMINA_REGEN_COMBAT",
  [STAT_STAMINA_REGEN_IDLE]: "STAMINA_REGEN_IDLE",
  [STAT_WEAPON_AND_SPELL_DAMAGE]: "WEAPON_AND_SPELL_DAMAGE",
}

const ATTRIBUTES: Record<number, string> = {
  [ATTRIBUTE_HEALTH]: "HEALTH",
  [ATTRIBUTE_MAGICKA]: "MAGICKA",
  [ATTRIBUTE_NONE]: "NONE",
  [ATTRIBUTE_STAMINA]: "STAMINA",
}

const POWER_TYPES: Record<number, string> = {
  [COMBAT_MECHANIC_FLAGS_DAEDRIC]: "DAEDRIC",
  [COMBAT_MECHANIC_FLAGS_HEALTH]: "HEALTH",
  [COMBAT_MECHANIC_FLAGS_MAGICKA]: "MAGICKA",
  [COMBAT_MECHANIC_FLAGS_MOUNT_STAMINA]: "MOUNT_STAMINA",
  [COMBAT_MECHANIC_FLAGS_STAMINA]: "STAMINA",
  [COMBAT_MECHANIC_FLAGS_ULTIMATE]: "ULTIMATE",
  [COMBAT_MECHANIC_FLAGS_WEREWOLF]: "WEREWOLF",
}

const BARS: Record<number, string> = {
  [ATTRIBUTE_VISUAL_POWER_SHIELDING]: "Shield",
  [ATTRIBUTE_VISUAL_UNWAVERING_POWER]: "Invuln",
}

function getSubBar(
  this: void,
  unitTag: string,
  barName: string | undefined
): StatusBarControl | undefined {
  const index = tonumber(string.sub(unitTag, 5, 5))
  const statusBar = TemperCombatAlertsBossHealthBarContainer.GetNamedChild("Bar" + tostring(index))
  if (statusBar !== undefined) {
    return statusBar.GetNamedChild<StatusBarControl>(barName as string)
  }
  return undefined
}

BHB.UpdateBar = function (this: void, unitTag, unitAttributeVisual, hide, value, maxValue) {
  const subBar = getSubBar(unitTag, BARS[unitAttributeVisual])
  if (subBar === undefined) {
    CRUTCH.dbgOther(BARS[unitAttributeVisual] + " bar doesn't exist for " + unitTag + "?!")
    return
  }

  subBar.SetHidden(hide)
  ZO_StatusBar_SmoothTransition(subBar, value, maxValue)
}

function onVisualAdded(
  this: void,
  _eventCode: number,
  unitTag: string,
  unitAttributeVisual: number,
  statType: number,
  attributeType: number,
  powerType: number,
  value: number,
  maxValue: number,
  sequenceId: number
): undefined {
  if (
    unitAttributeVisual !== ATTRIBUTE_VISUAL_POWER_SHIELDING &&
    unitAttributeVisual !== ATTRIBUTE_VISUAL_UNWAVERING_POWER
  )
    return

  CRUTCH.dbgSpam(
    zo_strformat(
      "ADDED <<1>> - visual: <<2>>, statType: <<3>>, attributeType: <<4>>, powerType: <<5>>, value/max: <<6>> / <<7>>, sequenceId: <<8>>",
      unitTag,
      VISUALS[unitAttributeVisual],
      STAT_TYPES[statType],
      ATTRIBUTES[attributeType],
      POWER_TYPES[powerType],
      value,
      maxValue,
      sequenceId
    )
  )

  BHB.UpdateBar(unitTag, unitAttributeVisual, false, value, maxValue)
}

function onVisualRemoved(
  this: void,
  _eventCode: number,
  unitTag: string,
  unitAttributeVisual: number,
  statType: number,
  attributeType: number,
  powerType: number,
  value: number,
  maxValue: number,
  sequenceId: number
): undefined {
  if (
    unitAttributeVisual !== ATTRIBUTE_VISUAL_POWER_SHIELDING &&
    unitAttributeVisual !== ATTRIBUTE_VISUAL_UNWAVERING_POWER
  )
    return

  CRUTCH.dbgSpam(
    zo_strformat(
      "REMOVED <<1>> - visual: <<2>>, statType: <<3>>, attributeType: <<4>>, powerType: <<5>>, value/max: <<6>> / <<7>>, sequenceId: <<8>>",
      unitTag,
      VISUALS[unitAttributeVisual],
      STAT_TYPES[statType],
      ATTRIBUTES[attributeType],
      POWER_TYPES[powerType],
      value,
      maxValue,
      sequenceId
    )
  )

  BHB.UpdateBar(unitTag, unitAttributeVisual, false, 0, maxValue)
}

function onVisualUpdated(
  this: void,
  _eventCode: number,
  unitTag: string,
  unitAttributeVisual: number,
  statType: number,
  attributeType: number,
  powerType: number,
  oldValue: number,
  newValue: number,
  oldMaxValue: number,
  newMaxValue: number,
  sequenceId: number
): undefined {
  if (
    unitAttributeVisual !== ATTRIBUTE_VISUAL_POWER_SHIELDING &&
    unitAttributeVisual !== ATTRIBUTE_VISUAL_UNWAVERING_POWER
  )
    return

  CRUTCH.dbgSpam(
    zo_strformat(
      "UPDATED <<1>> - visual: <<2>>, statType: <<3>>, attributeType: <<4>>, powerType: <<5>>, value/max: <<6>> / <<7>> -> <<8>> / <<9>>, sequenceId: <<10>>",
      unitTag,
      VISUALS[unitAttributeVisual],
      STAT_TYPES[statType],
      ATTRIBUTES[attributeType],
      POWER_TYPES[powerType],
      oldValue,
      newValue,
      oldMaxValue,
      newMaxValue,
      sequenceId
    )
  )

  BHB.UpdateBar(unitTag, unitAttributeVisual, false, newValue, newMaxValue)
}

BHB.UpdateAttributeVisuals = function (this: void, unitTag) {
  CRUTCH.dbgSpam("forcing attribute visuals update for " + unitTag)

  const [invulnValue, invulnMax] = GetUnitAttributeVisualizerEffectInfo(
    unitTag,
    ATTRIBUTE_VISUAL_UNWAVERING_POWER,
    STAT_MITIGATION,
    ATTRIBUTE_HEALTH,
    COMBAT_MECHANIC_FLAGS_HEALTH
  )
  BHB.UpdateBar(
    unitTag,
    ATTRIBUTE_VISUAL_UNWAVERING_POWER,
    invulnMax === undefined,
    invulnValue ?? 0,
    invulnMax ?? 1
  )

  const [shieldValue, shieldMax] = GetUnitAttributeVisualizerEffectInfo(
    unitTag,
    ATTRIBUTE_VISUAL_POWER_SHIELDING,
    STAT_MITIGATION,
    ATTRIBUTE_HEALTH,
    COMBAT_MECHANIC_FLAGS_HEALTH
  )
  BHB.UpdateBar(
    unitTag,
    ATTRIBUTE_VISUAL_POWER_SHIELDING,
    shieldMax === undefined,
    shieldValue ?? 0,
    shieldMax ?? 1
  )
}

function updateExistingBossVisuals(this: void): undefined {
  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const unitTag = "boss" + tostring(i)
    if (DoesUnitExist(unitTag)) {
      BHB.UpdateAttributeVisuals(unitTag)
    }
  }
}

BHB.RegisterVisualizers = function (this: void) {
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "BHBAttrVisualAdded",
    EVENT_UNIT_ATTRIBUTE_VISUAL_ADDED,
    onVisualAdded
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "BHBAttrVisualAdded",
    EVENT_UNIT_ATTRIBUTE_VISUAL_ADDED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "boss"
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "BHBAttrVisualRemoved",
    EVENT_UNIT_ATTRIBUTE_VISUAL_REMOVED,
    onVisualRemoved
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "BHBAttrVisualRemoved",
    EVENT_UNIT_ATTRIBUTE_VISUAL_REMOVED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "boss"
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "BHBAttrVisualUpdated",
    EVENT_UNIT_ATTRIBUTE_VISUAL_UPDATED,
    onVisualUpdated
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "BHBAttrVisualUpdated",
    EVENT_UNIT_ATTRIBUTE_VISUAL_UPDATED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "boss"
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "BHBAttrVisualPlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    updateExistingBossVisuals
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "BHBAttrVisualBossesChanged",
    EVENT_BOSSES_CHANGED,
    updateExistingBossVisuals
  )
}

BHB.UnregisterVisualizers = function (this: void) {
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "BHBAttrVisualAdded",
    EVENT_UNIT_ATTRIBUTE_VISUAL_ADDED
  )
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "BHBAttrVisualRemoved",
    EVENT_UNIT_ATTRIBUTE_VISUAL_REMOVED
  )
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "BHBAttrVisualUpdated",
    EVENT_UNIT_ATTRIBUTE_VISUAL_UPDATED
  )
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "BHBAttrVisualPlayerActivated",
    EVENT_PLAYER_ACTIVATED
  )
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "BHBAttrVisualBossesChanged", EVENT_BOSSES_CHANGED)
}
