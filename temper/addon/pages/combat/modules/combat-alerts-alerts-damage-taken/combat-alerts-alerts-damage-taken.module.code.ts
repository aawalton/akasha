import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

interface DamageTakenEntry {
  prominent: boolean
  sound: string | undefined
  isDot?: boolean
  preqFunc?: (this: void) => boolean
}

const dragonstarNormal = () =>
  CRUTCH.savedOptions.dragonstar.normalDamageTaken &&
  GetCurrentZoneDungeonDifficulty() !== DUNGEON_DIFFICULTY_VETERAN

const maelstromNormal = () =>
  CRUTCH.savedOptions.maelstrom.normalDamageTaken &&
  GetCurrentZoneDungeonDifficulty() !== DUNGEON_DIFFICULTY_VETERAN

const DAMAGE_TAKEN_DATA: Record<number, DamageTakenEntry> = {
  83468: { prominent: true, sound: SOUNDS.DUEL_START, preqFunc: dragonstarNormal },
  72525: { prominent: true, sound: SOUNDS.DUEL_START, preqFunc: maelstromNormal },
  70822: { prominent: true, sound: SOUNDS.DUEL_START, preqFunc: maelstromNormal },
  69855: { prominent: true, sound: SOUNDS.DUEL_START, isDot: true, preqFunc: maelstromNormal },
  71862: { prominent: true, sound: SOUNDS.DUEL_START, preqFunc: maelstromNormal },
  70765: { prominent: true, sound: SOUNDS.DUEL_START, preqFunc: maelstromNormal },
}

CRUTCH.InitializeDamageTaken = function (this: void) {
  for (const [abilityId, data] of pairs(DAMAGE_TAKEN_DATA)) {
    const eventName = CRUTCH.name + "DmgTaken" + tostring(abilityId)
    EVENT_MANAGER.RegisterForEvent(eventName, EVENT_COMBAT_EVENT, () => {
      if (data.preqFunc !== undefined && !data.preqFunc()) {
        return
      }
      if (data.sound !== undefined) {
        PlaySound(data.sound)
      }
      if (data.prominent) {
        CRUTCH.DisplayProminent(CRUTCH.Constants.ID.DAMAGE_TAKEN)
      }
    })
    EVENT_MANAGER.AddFilterForEvent(
      eventName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_COMBAT_RESULT,
      data.isDot === true ? ACTION_RESULT_DOT_TICK : ACTION_RESULT_DAMAGE
    )
    EVENT_MANAGER.AddFilterForEvent(
      eventName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_PLAYER
    )
    EVENT_MANAGER.AddFilterForEvent(
      eventName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_ABILITY_ID,
      abilityId
    )
  }
}
