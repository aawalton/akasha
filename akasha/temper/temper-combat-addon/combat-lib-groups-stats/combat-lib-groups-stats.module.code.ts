import {
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_DEATH,
  LIBCOMBAT_EVENT_DEATHRECAP,
  LIBCOMBAT_EVENT_FIGHTSUMMARY,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_PERFORMANCE,
  LIBCOMBAT_EVENT_QUICKSLOT,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  onCombatEventGrpDmgIn,
  onDeath,
  onDeathStateChanged,
  onPlayerReincarnated,
  onResurrect,
  onResurrectRequest,
  onResurrectResult,
} from "@akasha/temper-combat-addon/combat-lib-death"
import {
  createEventGroup,
  registerEvent,
  registerPlayerActivatedEvent,
  setGroupActive,
  updateSkillEvents,
} from "@akasha/temper-combat-addon/combat-lib-events"
import { onCombatEventGrpHealIn } from "@akasha/temper-combat-addon/combat-lib-heal"
import {
  onBaseResourceChangedGroup,
  onQuickSlotChanged,
  onQuickSlotUsed,
} from "@akasha/temper-combat-addon/combat-lib-resources"
import {
  onProjectileEvent,
  onQueueEvent,
  onWeaponSwap,
} from "@akasha/temper-combat-addon/combat-lib-skill-bars"
import {
  getCurrentSkillBarsDelayed,
  onSlotUpdate,
  onSlotUsed,
} from "@akasha/temper-combat-addon/combat-lib-skill-casts"
import {
  onBossHealthChanged,
  onPlayerActivated2,
  onPlayerDeactivated,
} from "@akasha/temper-combat-addon/combat-lib-stats-boss"

createEventGroup(
  "Messages",
  [LIBCOMBAT_EVENT_MESSAGES, LIBCOMBAT_EVENT_FIGHTSUMMARY, LIBCOMBAT_EVENT_SKILL_TIMINGS],
  (group) => {
    registerEvent(group, EVENT_ACTION_SLOTS_FULL_UPDATE, onWeaponSwap)

    setGroupActive(group, true)
    return undefined
  }
)

createEventGroup("Deaths", [LIBCOMBAT_EVENT_DEATH, LIBCOMBAT_EVENT_DEATHRECAP], (group) => {
  registerEvent(
    group,
    EVENT_COMBAT_EVENT,
    onDeath,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_KILLING_BLOW
  )
  registerEvent(
    group,
    EVENT_COMBAT_EVENT,
    onDeath,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_DIED
  )
  registerEvent(
    group,
    EVENT_COMBAT_EVENT,
    onResurrect,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_RESURRECT
  )
  registerEvent(
    group,
    EVENT_COMBAT_EVENT,
    onResurrect,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_REINCARNATING
  )
  registerEvent(
    group,
    EVENT_UNIT_DEATH_STATE_CHANGED,
    onDeathStateChanged,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "group"
  )
  registerEvent(
    group,
    EVENT_UNIT_DEATH_STATE_CHANGED,
    onDeathStateChanged,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )
  registerEvent(group, EVENT_PLAYER_REINCARNATED, onPlayerReincarnated)

  registerEvent(group, EVENT_RESURRECT_RESULT, onResurrectResult)
  registerEvent(group, EVENT_RESURRECT_REQUEST, onResurrectRequest)

  setGroupActive(group, true)
  return undefined
})

createEventGroup("DeathRecap", [LIBCOMBAT_EVENT_DEATHRECAP], (group) => {
  const filters = [
    ACTION_RESULT_DAMAGE,
    ACTION_RESULT_DOT_TICK,
    ACTION_RESULT_BLOCKED_DAMAGE,
    ACTION_RESULT_DAMAGE_SHIELDED,
    ACTION_RESULT_CRITICAL_DAMAGE,
    ACTION_RESULT_DOT_TICK_CRITICAL,
    ACTION_RESULT_FALL_DAMAGE,
    ACTION_RESULT_DODGED,
  ]

  for (const filter of filters) {
    registerEvent(
      group,
      EVENT_COMBAT_EVENT,
      onCombatEventGrpDmgIn,
      REGISTER_FILTER_COMBAT_RESULT,
      filter,
      REGISTER_FILTER_IS_ERROR,
      false
    )
  }

  const filters2 = [
    ACTION_RESULT_HOT_TICK,
    ACTION_RESULT_HEAL,
    ACTION_RESULT_CRITICAL_HEAL,
    ACTION_RESULT_HOT_TICK_CRITICAL,
  ]

  for (const filter of filters2) {
    registerEvent(
      group,
      EVENT_COMBAT_EVENT,
      onCombatEventGrpHealIn,
      REGISTER_FILTER_COMBAT_RESULT,
      filter,
      REGISTER_FILTER_IS_ERROR,
      false
    )
  }

  registerEvent(
    group,
    EVENT_POWER_UPDATE,
    onBaseResourceChangedGroup,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "group"
  )
  registerEvent(
    group,
    EVENT_POWER_UPDATE,
    onBaseResourceChangedGroup,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )

  setGroupActive(group, true)
  return undefined
})

createEventGroup("Slots", [LIBCOMBAT_EVENT_RESOURCES, LIBCOMBAT_EVENT_SKILL_TIMINGS], (group) => {
  registerEvent(group, EVENT_ACTION_SLOT_ABILITY_USED, onSlotUsed)

  setGroupActive(group, true)
  return undefined
})

createEventGroup("Skills", [LIBCOMBAT_EVENT_SKILL_TIMINGS], (group) => {
  for (const abilityId of [24785, 24806, 24804]) {
    registerEvent(
      group,
      EVENT_COMBAT_EVENT,
      getCurrentSkillBarsDelayed,
      REGISTER_FILTER_COMBAT_RESULT,
      ACTION_RESULT_EFFECT_GAINED,
      REGISTER_FILTER_ABILITY_ID,
      abilityId
    )
  }
  registerEvent(group, EVENT_ACTION_SLOT_UPDATED, onSlotUpdate)
  registerEvent(
    group,
    EVENT_COMBAT_EVENT,
    onQueueEvent,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_QUEUED,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )
  registerEvent(
    group,
    EVENT_COMBAT_EVENT,
    onProjectileEvent,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_EFFECT_GAINED,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )

  group.update = updateSkillEvents

  updateSkillEvents(group)

  setGroupActive(group, true)
  group.resetIds = true
  return undefined
})

createEventGroup("BossHP", [LIBCOMBAT_EVENT_BOSSHP], (group) => {
  registerEvent(
    group,
    EVENT_POWER_UPDATE,
    onBossHealthChanged,
    REGISTER_FILTER_UNIT_TAG,
    "boss1",
    REGISTER_FILTER_POWER_TYPE,
    COMBAT_MECHANIC_FLAGS_HEALTH
  )
  setGroupActive(group, true)
  return undefined
})

createEventGroup("Performance", [LIBCOMBAT_EVENT_PERFORMANCE], (group) => {
  registerEvent(group, EVENT_PLAYER_DEACTIVATED, onPlayerDeactivated)
  registerPlayerActivatedEvent(group, onPlayerActivated2)
  setGroupActive(group, true)
  return undefined
})

createEventGroup("QuickSlot", [LIBCOMBAT_EVENT_QUICKSLOT], (group) => {
  registerEvent(group, EVENT_INVENTORY_ITEM_USED, onQuickSlotUsed)
  registerEvent(group, EVENT_ACTIVE_QUICKSLOT_CHANGED, onQuickSlotChanged)
  setGroupActive(group, true)
  return undefined
})
