import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { DAMAGEABLE_DUNGEON_LINES } from "akasha/temper/addon/pages/combat/combat-alerts-panels/modules/combat-alerts-damageable-dungeon-lines/combat-alerts-damageable-dungeon-lines.module.code.ts"
import { DAMAGEABLE_TRIAL_LINES } from "akasha/temper/addon/pages/combat/combat-alerts-panels/modules/combat-alerts-damageable-trial-lines/combat-alerts-damageable-trial-lines.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export interface DamageableTimeDetail {
  time: number
  singleZoneId?: number
  displayFormat?: string
}

export type DamageableTime = number | DamageableTimeDetail

export type DamageableLines = Record<string, DamageableTime>

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    MergeDamageable: (this: void, other: Record<string, DamageableLines>) => void
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
    StopDamageable: (this: void) => void
  }
}

const SUBTITLE_CHANNELS: Record<number, boolean> = {
  [CHAT_CHANNEL_MONSTER_WHISPER]: true,
  [CHAT_CHANNEL_MONSTER_EMOTE]: true,
  [CHAT_CHANNEL_MONSTER_YELL]: true,
  [CHAT_CHANNEL_MONSTER_SAY]: true,
}

const SUBTITLE_TIMES: Record<string, DamageableLines> = {}
for (const part of [DAMAGEABLE_TRIAL_LINES, DAMAGEABLE_DUNGEON_LINES]) {
  for (const [npc, lines] of pairs(part)) {
    SUBTITLE_TIMES[npc] = lines
  }
}

CRUTCH.MergeDamageable = function (this: void, other) {
  for (const [npc, lines] of pairs(other)) {
    let existing = SUBTITLE_TIMES[npc]
    if (existing === undefined) {
      existing = {}
      SUBTITLE_TIMES[npc] = existing
    }

    let numLinesMerged = 0
    for (const [line, value] of pairs(lines)) {
      if (existing[line] !== undefined) {
        CRUTCH.dbgOther("Skipping because already exists: " + line)
      } else {
        existing[line] = value
        numLinesMerged = numLinesMerged + 1
      }
    }
    CRUTCH.dbgOther(string.format("Merged %d lines for %s", numLinesMerged, npc))
  }
}

let isPolling = false
let pollTime = 0

function getTimerColor(this: void, timer: number): string {
  if (timer > 5000) {
    return "ffee00"
  } else if (timer > 3000) {
    return "ff8c00"
  } else {
    return "ff0000"
  }
}

let dmgDisplayFormat = "Boss in |c%s%.1f|r"

function updateDisplay(this: void): undefined {
  const currTime = GetGameTimeMilliseconds()
  const millisRemaining = pollTime - currTime
  if (
    (CRUTCH.savedOptions.general.hideNailguns && millisRemaining < 0) ||
    millisRemaining < -1000
  ) {
    isPolling = false
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "PollDamageable")
    TemperCombatAlertsDamageableLabel.SetHidden(true)
  } else if (millisRemaining < 0) {
    TemperCombatAlertsDamageableLabel.SetText("|c0fff43Fire the nailguns!|r")
  } else {
    TemperCombatAlertsDamageableLabel.SetText(
      string.format(dmgDisplayFormat, getTimerColor(millisRemaining), millisRemaining / 1000)
    )
  }
}

CRUTCH.DisplayDamageable = function (this: void, time, displayFormat) {
  if (CRUTCH.savedOptions.general.consolidateDamageableInInfoPanel) {
    CRUTCH.InfoPanel.CountDownDamageable(time, displayFormat ?? "Boss in ")
  } else {
    dmgDisplayFormat = displayFormat ?? "Boss in "
    dmgDisplayFormat = dmgDisplayFormat + "|c%s%.1f|r"
    pollTime = GetGameTimeMilliseconds() + time * 1000
    TemperCombatAlertsDamageableLabel.SetFont(
      CRUTCH.GetStyles().GetDamageableFont(CRUTCH.savedOptions.general.damageableSize)
    )
    TemperCombatAlertsDamageableLabel.SetText(
      string.format(dmgDisplayFormat, getTimerColor(time * 1000), time)
    )
    TemperCombatAlertsDamageableLabel.SetHidden(false)

    if (!isPolling) {
      isPolling = true
      EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "PollDamageable", 100, updateDisplay)
    }
  }
}

CRUTCH.StopDamageable = function (this: void) {
  pollTime = GetGameTimeMilliseconds()
  TemperCombatAlertsDamageableLabel.SetHidden(true)
  CRUTCH.InfoPanel.StopDamageable()
}

let isInstanceFresh = true

function onPlayerActivated(this: void): undefined {
  isInstanceFresh = true
}

function handleChat(
  this: void,
  _eventCode: number,
  channelType: number,
  fromName: string,
  text: string,
  _isCustomerService: boolean,
  _fromDisplayName: string
): undefined {
  if (SUBTITLE_CHANNELS[channelType] === undefined) {
    return
  }

  const name = zo_strformat("<<C:1>>", fromName)
  if (CRUTCH.savedOptions.showSubtitles) {
    const ignored = CRUTCH.savedOptions.subtitlesIgnoredZones[GetZoneId(GetUnitZoneIndex("player"))]
    if (ignored === undefined || ignored === false) {
      CHAT_ROUTER.AddSystemMessage(string.format("|c88FFFF%s: |cAAAAAA%s", name, text))
    } else {
      CRUTCH.dbgSpam(string.format("|c88FFFF%s: |cAAAAAA%s", name, text))
    }
  }

  if (!CRUTCH.savedOptions.general.showDamageable) {
    return
  }

  const lines = SUBTITLE_TIMES[name]
  if (lines === undefined) {
    return
  }

  let time = lines[text]
  if (time !== undefined) {
    CRUTCH.dbgSpam("|c00FF00[DMG]|r Found time using exact string: " + text)
  } else {
    for (const [line, t] of pairs(lines)) {
      const [start] = string.find(text, line, 1, true)
      if (start !== undefined) {
        time = t
        CRUTCH.dbgSpam("|c00FF00[DMG]|r Found time using |cFF0000find|r: " + text)
      }
    }

    if (time === undefined) {
      return
    }
  }

  let displayFormat: string | undefined
  if (typeof time === "object") {
    if (
      time.singleZoneId !== undefined &&
      time.singleZoneId === GetZoneId(GetUnitZoneIndex("player"))
    ) {
      if (!isInstanceFresh) {
        CRUTCH.dbgSpam("|c88FF88Skipping damageable because this is not a fresh instance.|r")
        return
      }
      isInstanceFresh = false
      CRUTCH.dbgSpam("|c88FF88Single-time line found, will only display this time.|r")
    }

    displayFormat = time.displayFormat
    if (displayFormat !== undefined) {
      CRUTCH.dbgSpam("|c88FF88Displayformat|r: " + displayFormat)
    }

    time = time.time
  }

  CRUTCH.DisplayDamageable(time, displayFormat)
}

CRUTCH.InitializeDamageable = function (this: void) {
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "ChatHandler",
    EVENT_CHAT_MESSAGE_CHANNEL,
    handleChat
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "DamageablePlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    onPlayerActivated
  )
}
