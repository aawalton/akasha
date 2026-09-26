import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import {
  grave,
  removeAllGraves,
} from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/grave/combat-alerts-drawing-grave.module.code.ts"
import {
  formatDate,
  GRAVE_INTROS,
} from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/grave-elements/combat-alerts-drawing-grave-elements.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const M = CRUTCH.Drawing.Model

function areDepthBuffersSupported(this: void): boolean {
  if (IsConsoleUI()) {
    return false
  }
  const subSampling: unknown = GetCVar("SUB_SAMPLING")
  return subSampling === SUB_SAMPLING_MODE_NORMAL
}

function onDeathStateChanged(
  this: void,
  _eventCode: number,
  unitTag: string,
  isDead: boolean
): undefined {
  const [groupMatch] = string.find(unitTag, "^group%d+$")
  if (unitTag !== "player" && groupMatch === undefined) {
    return
  }

  if (unitTag !== "player" && AreUnitsEqual("player", unitTag)) {
    return
  }

  if (isDead) {
    if (CRUTCH.Drawing.ShouldUnitBeShown(unitTag)) {
      const [name] = string.gsub(GetUnitDisplayName(unitTag), "@", "")
      grave(
        unitTag,
        GRAVE_INTROS[math.random(GRAVE_INTROS.length) - 1],
        name,
        unitTag === "player" ? formatDate(GetAchievementTimestamp(17)) : undefined
      )
    }
  } else {
    M.RemoveGrave(unitTag)
  }
}

function refreshUnitTags(this: void, reason: string): undefined {
  if (reason === "Left" || reason === "Update") {
    CRUTCH.dbgOther("Removing all graves because " + reason)
    removeAllGraves()
  }
}

function refreshUnitTagsTimeout(this: void, reason: string): undefined {
  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "GraveRefreshTimeout", 200, () => {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "GraveRefreshTimeout")
    refreshUnitTags(reason)
  })
}

function areGravesEnabled(this: void): boolean {
  const options = CRUTCH.savedOptions
  if (!options.general.showSpeshul) {
    return false
  }
  if (options.experimental === true || options.memes.graves === true) {
    return true
  }
  return CRUTCH.GetSpeshulDate() === 1031 && areDepthBuffersSupported()
}
M.AreGravesEnabled = areGravesEnabled

M.InitializeGrave = () => {
  CRUTCH.UnregisterUnitTagListener("CrutchAlertsGraveUnitTags")
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "GraveGroupDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED
  )
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "GravePlayerDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED
  )
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GravePlayerActivated", EVENT_PLAYER_ACTIVATED)

  removeAllGraves()

  if (!areGravesEnabled()) {
    return
  }

  CRUTCH.RegisterUnitTagListener("CrutchAlertsGraveUnitTags", refreshUnitTagsTimeout)

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GraveGroupDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    onDeathStateChanged
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "GraveGroupDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "group"
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GravePlayerDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    onDeathStateChanged
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "GravePlayerDeathState",
    EVENT_UNIT_DEATH_STATE_CHANGED,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GravePlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    removeAllGraves
  )
}
