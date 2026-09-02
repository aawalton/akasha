import { ADDON_NAME, REPORT_SCENE_NAME } from "@akasha/temper-combat-addon/combat-constants"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type {
  CmxFight,
  CoreLogLine,
  CurrentData,
} from "@akasha/temper-combat-addon/combat-core-types"
import {
  registerForCombatEvent,
  unregisterForCombatEvent,
} from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_DAMAGE_SELF,
  LIBCOMBAT_EVENT_FIGHTRECAP,
  LIBCOMBAT_EVENT_FIGHTSUMMARY,
  LIBCOMBAT_EVENT_GROUPRECAP,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_PERFORMANCE,
  LIBCOMBAT_EVENT_QUICKSLOT,
  LIBCOMBAT_EVENT_UNITS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { DATA as libCombatData } from "@akasha/temper-combat-addon/combat-lib-state"
import type {
  Fight,
  FightRecapData,
  GroupRecapData,
  UnitEntry,
} from "@akasha/temper-combat-addon/combat-lib-types"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import {
  checkNumberOfFights,
  getFightName,
  LAST_FIGHTS,
} from "@akasha/temper-combat-addon/combat-selection"
import {
  toggleLiveReport,
  updateLiveReport,
} from "@akasha/temper-combat-addon/combat-ui-live-report"

let updateReportHook: ((this: void) => void) | undefined

export function setUpdateReportHook(fn: (this: void) => void): undefined {
  updateReportHook = fn
  return undefined
}

let currentdata: CurrentData = makeCurrentData()

function makeCurrentData(): CurrentData {
  return {
    log: [],
    DPSOut: 0,
    DPSIn: 0,
    HPSOut: 0,
    HPSAOut: 0,
    HPSIn: 0,
    dpstime: 0,
    hpstime: 0,
    groupDPSOut: 0,
    groupDPSIn: 0,
    groupHPSOut: 0,
    groupHPS: 0,
  }
}

export function initCurrentData(): undefined {
  currentdata = makeCurrentData()
  return undefined
}

export function getCurrentData(): CurrentData {
  return currentdata
}

export type CombatLogStringFormatter = (
  this: void,
  fight: CmxFight | undefined,
  logline: CoreLogLine,
  fontsize: number,
  showIds: boolean
) => LuaMultiReturn<[text: string | undefined, color: [number, number, number] | undefined]>

let combatLogStringFormatter: CombatLogStringFormatter | undefined

export function setCombatLogStringFormatter(fn: CombatLogStringFormatter): undefined {
  combatLogStringFormatter = fn
  return undefined
}

export function getCombatLogString(
  fight: CmxFight | undefined,
  logline: CoreLogLine,
  fontsize: number
): LuaMultiReturn<[string | undefined, [number, number, number] | undefined]> {
  if (combatLogStringFormatter === undefined) {
    return $multi(undefined, undefined)
  }
  return combatLogStringFormatter(fight, logline, fontsize, getDb().showDebugIds)
}

let chatContainer: ChatContainer | undefined
let chatWindow: ChatWindow | undefined

function addtoChatLog(
  this: void,
  logType: number,
  ...args: (number | string | undefined)[]
): undefined {
  const logLine: CoreLogLine = [logType, ...args]
  const chatLog = getDb().chatLog

  const isEnabled =
    ((logType === LIBCOMBAT_EVENT_DAMAGE_OUT || logType === LIBCOMBAT_EVENT_DAMAGE_SELF) &&
      chatLog.damageOut === true) ||
    ((logType === LIBCOMBAT_EVENT_HEAL_OUT || logType === LIBCOMBAT_EVENT_HEAL_SELF) &&
      chatLog.healingOut === true) ||
    ((logType === LIBCOMBAT_EVENT_DAMAGE_IN || logType === LIBCOMBAT_EVENT_DAMAGE_SELF) &&
      chatLog.damageIn === true) ||
    ((logType === LIBCOMBAT_EVENT_HEAL_IN || logType === LIBCOMBAT_EVENT_HEAL_SELF) &&
      chatLog.healingIn === true) ||
    logType === LIBCOMBAT_EVENT_MESSAGES

  if (isEnabled) {
    const [text, color] = getCombatLogString(undefined, logLine, 12)

    if (chatContainer !== undefined && chatWindow !== undefined && text != null && color != null) {
      chatContainer.AddMessageToWindow(chatWindow, text, color[0], color[1], color[2])
    }
  }
  return undefined
}

function fixCombatLog(cc: ChatContainer, window: ChatWindow): undefined {
  const tabIndex = window.tab.index

  cc.SetInteractivity(tabIndex, true)
  cc.SetLocked(tabIndex, true)

  for (let category = 1; category <= GetNumChatCategories(); category++) {
    cc.SetWindowFilterEnabled(tabIndex, category, false)
  }
  return undefined
}

function getCombatLog(): LuaMultiReturn<[ChatContainer, ChatWindow]> {
  const name = getDb().chatLog.name

  for (const [, cc] of ipairs(CHAT_SYSTEM.containers)) {
    for (let i = 1; i <= cc.windows.length; i++) {
      if (cc.GetTabName(i) === name) {
        const window = cc.windows[i - 1]
        if (window !== undefined) {
          return $multi(cc, window)
        }
      }
    }
  }

  const cc = CHAT_SYSTEM.primaryContainer
  const [window, key] = cc.windowPool.AcquireObject()

  window.key = key

  cc.AddRawWindow(window, name)

  fixCombatLog(cc, window)

  return $multi(cc, window)
}

export function initializeChat(this: void): undefined {
  if (CHAT_SYSTEM.containers[0] !== undefined) {
    const [cc, window] = getCombatLog()

    chatContainer = cc
    chatWindow = window
  } else {
    zo_callLater(initializeChat, 200)
  }
  return undefined
}

export function changeCombatLogLabel(name: string): undefined {
  if (chatContainer === undefined || chatWindow === undefined) {
    return undefined
  }

  if (chatWindow.key != null) {
    chatContainer.SetTabName(chatWindow.key, name)
  }
  return undefined
}

export function removeCombatLog(): undefined {
  if (chatContainer !== undefined && chatWindow !== undefined && chatWindow.key != null) {
    chatContainer.RemoveWindow(chatWindow.key)
  }

  chatContainer = undefined
  chatWindow = undefined
  return undefined
}

function addToLog(
  this: void,
  logType: number,
  ...args: (number | string | undefined)[]
): undefined {
  if (libCombatData.inCombat !== true && logType === LIBCOMBAT_EVENT_PERFORMANCE) {
    return undefined
  }
  const logLine: CoreLogLine = [logType, ...args]
  table.insert(currentdata.log, logLine)
  if (getDb().chatLog.enabled) {
    addtoChatLog(logType, ...args)
  }
  return undefined
}

function unitsCallback(this: void, _eventId: number, units: Record<number, UnitEntry>): undefined {
  currentdata.units = units
  return undefined
}

function fightRecapCallback(this: void, _eventId: number, newdata: FightRecapData): undefined {
  ZO_DeepTableCopy(newdata, currentdata)
  updateLiveReport(currentdata)
  return undefined
}

function groupFightRecapCallback(this: void, _eventId: number, newdata: GroupRecapData): undefined {
  ZO_DeepTableCopy(newdata, currentdata)
  return undefined
}

interface SummaryFight extends Fight {
  log?: CoreLogLine[]
  fightlabel?: string
}

function isCmxFight(fight: SummaryFight): fight is CmxFight {
  return fight.starttime !== undefined && fight.endtime !== undefined && fight.log !== undefined
}

function fightSummaryCallback(this: void, _eventId: number, fight: Fight): undefined {
  const cmxFight: SummaryFight = fight

  cmxFight.log = currentdata.log
  initCurrentData()

  if (!isCmxFight(cmxFight)) {
    error("fight summary received before the fight was finished")
  }

  getFightName(cmxFight)

  if (cmxFight.dpsstart != null || cmxFight.hpsstart != null) {
    table.insert(LAST_FIGHTS, cmxFight)
  }
  checkNumberOfFights()

  if (SCENE_MANAGER.currentScene.name === REPORT_SCENE_NAME && updateReportHook !== undefined) {
    updateReportHook()
  }
  return undefined
}

const STATUS_DISABLED = 0
const STATUS_LIGHTMODE = 1
const STATUS_ENABLED = 2

let registrationStatus: number | undefined
let registeredGroup: boolean | undefined

export function updateEvents(this: void): undefined {
  const db = getDb()
  const isGrouped = IsUnitGrouped("player")
  const ava = IsPlayerInAvAWorld() || IsActiveWorldBattleground()

  const isLightMode = db.lightmode || (db.lightmodeincyrodil && ava === true)
  const isOff = ava === true && db.offincyrodil === true

  const newstatus =
    isOff === true ? STATUS_DISABLED : isLightMode === true ? STATUS_LIGHTMODE : STATUS_ENABLED

  toggleLiveReport(newstatus !== STATUS_DISABLED && db.liveReport.enabled)

  if (registrationStatus !== newstatus) {
    if (newstatus === STATUS_DISABLED) {
      for (let i = LIBCOMBAT_EVENT_DAMAGE_OUT; i <= LIBCOMBAT_EVENT_PERFORMANCE; i++) {
        unregisterForCombatEvent(ADDON_NAME, i)
      }

      unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_QUICKSLOT)
      unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_UNITS)
      unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_FIGHTRECAP)
      unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_FIGHTSUMMARY)
    } else if (newstatus === STATUS_LIGHTMODE) {
      for (let i = LIBCOMBAT_EVENT_DAMAGE_OUT; i <= LIBCOMBAT_EVENT_PERFORMANCE; i++) {
        unregisterForCombatEvent(ADDON_NAME, i)
      }

      unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_QUICKSLOT)
      registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_UNITS, unitsCallback)
      registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_FIGHTRECAP, fightRecapCallback)
      unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_FIGHTSUMMARY)
    } else if (newstatus === STATUS_ENABLED) {
      for (let i = LIBCOMBAT_EVENT_DAMAGE_OUT; i <= LIBCOMBAT_EVENT_PERFORMANCE; i++) {
        registerForCombatEvent(ADDON_NAME, i, addToLog)
      }
      registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_QUICKSLOT, addToLog)
      registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_UNITS, unitsCallback)
      registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_FIGHTRECAP, fightRecapCallback)
      registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_FIGHTSUMMARY, fightSummaryCallback)
    }

    registrationStatus = newstatus
  }

  const loadgroupevents =
    isGrouped &&
    db.recordgrp === true &&
    (GetGroupSize() < 5 || db.recordgrpinlarge === true) &&
    newstatus !== STATUS_DISABLED

  if (loadgroupevents === true && registeredGroup !== true) {
    registerForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_GROUPRECAP, groupFightRecapCallback)
    registeredGroup = true
  } else if (loadgroupevents === false && registeredGroup === true) {
    unregisterForCombatEvent(ADDON_NAME, LIBCOMBAT_EVENT_GROUPRECAP)
    registeredGroup = false
  }

  log(
    "group",
    LOG_LEVEL_DEBUG,
    "State: %d, Group: %s",
    registrationStatus ?? 0,
    tostring(registeredGroup ?? false)
  )
  return undefined
}
