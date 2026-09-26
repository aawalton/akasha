import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import type {
  DrawingGetCompositeTexture,
  DrawingIcon,
  DrawingKey,
  DrawingSetText,
  DrawingSetTextureHidden,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchRockgrove {
    linesHidden: boolean
    PANEL_PORTAL_DIRECTION_INDEX: number
    PANEL_PORTAL_COUNT_INDEX: number
    PANEL_PORTAL_PLAYERS_INDEX: number
    PANEL_PORTAL_TIMER_INDEX: number
    PANEL_SCYTHE_INDEX: number
    PANEL_CURSED_GROUND_INDEX: number
  }
  interface CrutchHub {
    TestCurseLines: (this: void) => void
    OnDeathTouch: EffectChangedCallback
  }
}

const RG = CRUTCH.Rockgrove
RG.linesHidden = false
RG.PANEL_PORTAL_DIRECTION_INDEX = 5
RG.PANEL_PORTAL_COUNT_INDEX = 6
RG.PANEL_PORTAL_PLAYERS_INDEX = 7
RG.PANEL_PORTAL_TIMER_INDEX = 8
RG.PANEL_SCYTHE_INDEX = 10
RG.PANEL_CURSED_GROUND_INDEX = 11
const C = CRUTCH.Constants

const CURSE_LINE_Y_OFFSET = 5

function lineCallback(this: void, icon: DrawingIcon): undefined {
  const setTextureHidden = icon.SetTextureHidden as DrawingSetTextureHidden
  setTextureHidden(icon, RG.linesHidden)
}

function drawConfirmedCurseLines(
  this: void,
  x: number,
  y: number,
  z: number,
  angle: number,
  color: readonly number[],
  duration: number
): undefined {
  const key = CRUTCH.Drawing.CreateWorldTexture(
    "TemperCombat/assets/floor/curse.dds",
    x,
    y + CURSE_LINE_Y_OFFSET,
    z,
    44.5,
    44.5,
    color,
    false,
    false,
    [-math.pi / 2, angle, 0],
    lineCallback
  )

  const activeIcon = CRUTCH.Drawing.activeIcons[key] as DrawingIcon
  const setTextureHidden = activeIcon.SetTextureHidden as DrawingSetTextureHidden
  setTextureHidden(activeIcon, RG.linesHidden)

  zo_callLater(function (this: void) {
    CRUTCH.Drawing.RemoveWorldTexture(key)
  }, duration)
}

let playerCurseLinesKey: DrawingKey | undefined
function drawInProgressCurseLines(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "BahseiInProgress")

  removePlayerCurseLines()

  if (!CRUTCH.savedOptions.rockgrove.showCursePreview) return

  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const [, , heading] = GetMapPlayerPosition("player")
  playerCurseLinesKey = CRUTCH.Drawing.CreateOrientedTexture(
    "TemperCombat/assets/floor/curse.dds",
    x,
    y + CURSE_LINE_Y_OFFSET,
    z,
    44.5,
    CRUTCH.savedOptions.rockgrove.cursePreviewColor,
    [-math.pi / 2, heading, 0],
    function (this: void, icon: DrawingIcon) {
      const [, iconX, iconY, iconZ] = GetUnitRawWorldPosition("player")
      const [, , iconHeading] = GetMapPlayerPosition("player")
      icon.SetPosition(icon, iconX, iconY + CURSE_LINE_Y_OFFSET, iconZ)
      icon.SetOrientation(icon, -math.pi / 2, iconHeading, 0)
    }
  )
}

export function removePlayerCurseLines(this: void): undefined {
  if (playerCurseLinesKey !== undefined) {
    CRUTCH.Drawing.RemoveWorldTexture(playerCurseLinesKey)
    playerCurseLinesKey = undefined
  }
}

const EXPLOSIONS: Record<string, number[]> = {}

CRUTCH.OnGroupMemberCurseReceived = function (this: void, unitTag, x, y, z, heading) {
  if (AreUnitsEqual("player", unitTag)) return

  const explosionTimes = EXPLOSIONS[unitTag]
  if (explosionTimes === undefined) {
    CRUTCH.dbgOther("|cFF0000Didn't find explosion for " + GetUnitDisplayName(unitTag))
    return
  }

  const currentTime = GetTimeStamp()

  let explosion: number | undefined
  while (explosionTimes.length > 0) {
    const explosionTime = explosionTimes.shift() as number
    if (currentTime - explosionTime < 8) {
      explosion = explosionTime
      break
    }
  }

  if (!CRUTCH.savedOptions.rockgrove.showOthersCurseLines) return

  if (explosion === undefined) {
    CRUTCH.dbgOther(
      "|cFF0000Curse event for " +
        GetUnitDisplayName(unitTag) +
        " received out of range of known EXPLOSIONS"
    )
    return
  }

  const remainingDuration = (explosion + 9 - GetTimeStamp()) * 1000
  if (remainingDuration < 0) {
    CRUTCH.dbgOther(
      "|cFF0000Curse event for " +
        GetUnitDisplayName(unitTag) +
        " has < 0 remaining duration?! Should not be possible"
    )
    return
  }

  drawConfirmedCurseLines(
    x,
    y,
    z,
    heading,
    CRUTCH.savedOptions.rockgrove.othersCurseLineColor,
    remainingDuration
  )
}

function onDeathTouchLinesTimeout(
  this: void,
  changeType: number,
  unitTag: string,
  playerX: number,
  playerY: number,
  playerZ: number,
  playerHeading: number
): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "CurseLineTimeout" + unitTag)

  if (!AreUnitsEqual("player", unitTag)) {
    if (changeType === EFFECT_RESULT_FADED) {
      let times = EXPLOSIONS[unitTag]
      if (times === undefined) {
        times = []
        EXPLOSIONS[unitTag] = times
      }
      times.push(GetTimeStamp())
    }
    return
  }

  if (changeType === EFFECT_RESULT_GAINED) {
    if (CRUTCH.savedOptions.rockgrove.curseLineDelay > 0) {
      EVENT_MANAGER.RegisterForUpdate(
        CRUTCH.name + "BahseiInProgress",
        CRUTCH.savedOptions.rockgrove.curseLineDelay,
        drawInProgressCurseLines
      )
    } else {
      drawInProgressCurseLines()
    }
  } else if (changeType === EFFECT_RESULT_FADED) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "BahseiInProgress")

    removePlayerCurseLines()

    if (CRUTCH.savedOptions.rockgrove.showCurseLines) {
      drawConfirmedCurseLines(
        playerX,
        playerY,
        playerZ,
        playerHeading,
        CRUTCH.savedOptions.rockgrove.curseLineColor,
        8000
      )
    }

    CRUTCH.Broadcast.SendCurseExplosion()
  }
}

export function onDeathTouchLines(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  const [, playerX, playerY, playerZ] = GetUnitRawWorldPosition("player")
  const [, , playerHeading] = GetMapPlayerPosition("player")
  if (changeType === EFFECT_RESULT_FADED) {
    EVENT_MANAGER.RegisterForUpdate(
      CRUTCH.name + "CurseLineTimeout" + unitTag,
      10,
      function (this: void) {
        onDeathTouchLinesTimeout(changeType, unitTag, playerX, playerY, playerZ, playerHeading)
      }
    )
  } else {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "CurseLineTimeout" + unitTag)
    onDeathTouchLinesTimeout(changeType, unitTag, playerX, playerY, playerZ, playerHeading)
  }
}

CRUTCH.TestCurseLines = function (this: void) {
  CRUTCH.RegisterForEffectChanged("DeathTouchLinesTest", onDeathTouchLines, 61509, "group")
}

export function clearCurseExplosions(this: void): undefined {
  ZO_ClearTable(EXPLOSIONS)
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "BahseiInProgress")
}

const CURSE_UNIQUE_NAME = "CrutchAlertsRGDeathTouch"

const CYCLE_TIME = 700
function deathTouchIconUpdate(
  this: void,
  icon: DrawingIcon,
  unitTag: string,
  endTime: number
): undefined {
  const duration = endTime * 1000 - GetGameTimeMilliseconds()
  if (duration < -1000) {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, CURSE_UNIQUE_NAME)
    return
  }

  let text: string
  if (duration <= 0) {
    text = "!"
  } else if (duration <= 1100) {
    text = string.format("%.1f", duration / 1000)
  } else {
    text = tostring(math.ceil(duration / 1000))
  }
  const setText = icon.SetText as DrawingSetText
  setText(icon, text)

  if (duration <= 2500) {
    const getCompositeTexture = icon.GetCompositeTexture as DrawingGetCompositeTexture
    const t = ((2500 - duration) % CYCLE_TIME) / CYCLE_TIME

    if (duration < 1000) {
      CRUTCH.Drawing.Animation.PulseUpdate(getCompositeTexture(icon), t, C.RED)
    } else {
      CRUTCH.Drawing.Animation.PulseUpdate(getCompositeTexture(icon), t, C.REDORANGE)
    }
  }
}

export function onDeathTouch(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
  _beginTime: number,
  endTime: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) {
    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      CURSE_UNIQUE_NAME,
      C.PRIORITY.MECHANIC_1_PRIORITY,
      undefined,
      120,
      undefined,
      false,
      function (this: void, icon: DrawingIcon) {
        deathTouchIconUpdate(icon, unitTag, endTime)
      },
      {
        label: {
          text: "9",
          size: 45,
          color: [1, 1, 1, 0.8],
        },
        composite: {
          size: 1.7,
          init: function (this: void, composite: TextureCompositeControl) {
            CRUTCH.Drawing.Animation.PulseInitial(
              composite,
              "TemperCombat/assets/shape/diamond.dds",
              0.5,
              [1, 0.5, 0, 1]
            )
            composite.SetAlpha(0.8)
          },
        },
      }
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, CURSE_UNIQUE_NAME)
  }
}
CRUTCH.OnDeathTouch = onDeathTouch
