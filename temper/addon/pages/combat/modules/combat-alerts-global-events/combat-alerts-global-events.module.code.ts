import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

type Listener = (this: void) => void

const ENTERED_LISTENERS: Record<string, Listener> = {}
const EXITED_LISTENERS: Record<string, Listener> = {}

CRUTCH.RegisterEnteredGroupCombatListener = function (this: void, name, listener) {
  ENTERED_LISTENERS[name] = listener
  CRUTCH.dbgSpam("Registered entering group combat listener " + name)
}

CRUTCH.RegisterExitedGroupCombatListener = function (this: void, name, listener) {
  EXITED_LISTENERS[name] = listener
  CRUTCH.dbgSpam("Registered exiting group combat listener " + name)
}

CRUTCH.UnregisterEnteredGroupCombatListener = function (this: void, name) {
  delete ENTERED_LISTENERS[name]
  CRUTCH.dbgSpam("Unregistered entering group combat listener " + name)
}

CRUTCH.UnregisterExitedGroupCombatListener = function (this: void, name) {
  delete EXITED_LISTENERS[name]
  CRUTCH.dbgSpam("Unregistered exiting group combat listener " + name)
}

CRUTCH.groupInCombat = false

function setGroupInCombat(this: void, value: boolean): undefined {
  if (CRUTCH.groupInCombat && !value) {
    CRUTCH.groupInCombat = false
    for (const [, listener] of pairs(EXITED_LISTENERS)) {
      listener()
    }
  } else if (!CRUTCH.groupInCombat && value) {
    CRUTCH.groupInCombat = true
    for (const [, listener] of pairs(ENTERED_LISTENERS)) {
      listener()
    }
  }
}

function isGroupInCombat(this: void): boolean {
  if (IsUnitInCombat("player")) {
    CRUTCH.dbgSpam("player is in combat; true")
    return true
  }

  if (!IsUnitGrouped("player")) {
    CRUTCH.dbgSpam("player is not grouped; false")
    return false
  }

  for (let i = 1; i <= GetGroupSize(); i++) {
    const groupTag = GetGroupUnitTagByIndex(i)
    if (groupTag !== undefined && IsUnitInCombat(groupTag) && IsUnitOnline(groupTag)) {
      CRUTCH.dbgSpam(GetUnitDisplayName(groupTag) + "(" + groupTag + ") is still in combat; true")
      return true
    }
  }

  CRUTCH.dbgSpam("group is not in combat; false")
  return false
}

function onCombatStateChanged(this: void, eventCode: number, inCombat: boolean): undefined {
  if (inCombat) {
    setGroupInCombat(true)
    CRUTCH.dbgSpam("self inCombat true")
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "GlobalCombatStateUpdate")
  } else {
    setGroupInCombat(isGroupInCombat())
    if (CRUTCH.groupInCombat) {
      EVENT_MANAGER.RegisterForUpdate(
        CRUTCH.name + "GlobalCombatStateUpdate",
        1000,
        function (this: void) {
          onCombatStateChanged(eventCode, IsUnitInCombat("player"))
        }
      )
    } else {
      EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "GlobalCombatStateUpdate")
    }
  }
}

const BOSS_LISTENERS: Record<string, (this: void, boss1IsSame: boolean) => void> = {}

CRUTCH.RegisterBossChangedListener = function (this: void, name, listener) {
  BOSS_LISTENERS[name] = listener
  CRUTCH.dbgSpam("Registered boss change listener " + name)
}

CRUTCH.UnregisterBossChangedListener = function (this: void, name) {
  delete BOSS_LISTENERS[name]
  CRUTCH.dbgSpam("Unregistered boss change listener " + name)
}

function getUnitNameIfExists(this: void, unitTag: string): string | undefined {
  if (DoesUnitExist(unitTag)) {
    return GetUnitName(unitTag)
  }
  return undefined
}

function getFirstValidBossTag(this: void): string {
  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const unitTag = "boss" + tostring(i)
    if (DoesUnitExist(unitTag)) {
      return unitTag
    }
  }
  return ""
}

let prevBosses = ""
let prevBoss1 = ""

function onBossesChanged(this: void): undefined {
  let bossHash = ""

  for (let i = 1; i <= BOSS_RANK_ITERATION_END; i++) {
    const name = getUnitNameIfExists("boss" + tostring(i))
    if (name !== undefined && name !== "") {
      bossHash = bossHash + name
    }
  }

  if (bossHash !== prevBosses) {
    prevBosses = bossHash
    const boss1 = GetUnitName(getFirstValidBossTag()) ?? ""

    for (const [, listener] of pairs(BOSS_LISTENERS)) {
      listener(prevBoss1 === boss1)
    }
    prevBoss1 = boss1
  }
}

const UPDATE_LISTENERS: Record<string, Listener> = {}

function poll(this: void): undefined {
  for (const [, listener] of pairs(UPDATE_LISTENERS)) {
    listener()
  }
}

let polling = false

function updatePolling(this: void): undefined {
  const empty = ZO_IsTableEmpty(UPDATE_LISTENERS)
  if (!polling && !empty) {
    EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "GlobalPolling", 100, poll)
    poll()
    polling = true
  } else if (polling && empty) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "GlobalPolling")
    polling = false
  }
}

CRUTCH.RegisterUpdateListener = function (this: void, name, listener) {
  UPDATE_LISTENERS[name] = listener
  CRUTCH.dbgSpam("Registered update listener " + name)
  listener()
  updatePolling()
}

CRUTCH.UnregisterUpdateListener = function (this: void, name) {
  delete UPDATE_LISTENERS[name]
  CRUTCH.dbgSpam("Unregistered update listener " + name)
  updatePolling()
}

let maxVitality = 0
let vitality = 0

function onTrialStarted(this: void): undefined {
  vitality = GetRaidReviveCountersRemaining()
  maxVitality = GetCurrentRaidStartingReviveCounters()
}

function onVitalityChanged(
  this: void,
  _eventCode: number,
  currentCounter: number,
  _countDelta: number
): undefined {
  vitality = currentCounter
  maxVitality = GetCurrentRaidStartingReviveCounters()
}

CRUTCH.OnTrialComplete = function (this: void, _eventCode, _trialName, score, totalTime) {
  if (CRUTCH.savedOptions.general.showSpeshul) {
    if (CRUTCH.savedOptions.memes.scoreJets === true || CRUTCH.GetSpeshulDate() === 401) {
      const [formattedTime] = FormatTimeSeconds(totalTime / 1000, TIME_FORMAT_STYLE_COLONS)
      const result = string.format(
        "%d - |t100%%:100%%:esoui/art/trials/vitalitydepletion.dds|t %d/%d - %s",
        score,
        vitality,
        maxVitality,
        formattedTime
      )
      CRUTCH.dbgOther(result)
      CRUTCH.Drawing.CircleJet("Congration you Done it\n" + result, 60000)
      CRUTCH.Drawing.CircleJet("Congration you Done it\n" + result, 60000)
      CRUTCH.Drawing.CircleJet("Congration you Done it\n" + result, 60000)
    }
  }
  vitality = 0
  maxVitality = 0
}

const UNIT_TAG_LISTENERS: Record<string, (this: void, reason: string) => void> = {}
const PREV_TAGS: Record<string, string> = {}

function updateUnitTags(this: void, reason: string): undefined {
  let changed = false
  for (let i = 1; i <= MAX_GROUP_SIZE_THRESHOLD; i++) {
    const unitTag = "group" + tostring(i)
    const charName = GetUnitName(unitTag)
    if (PREV_TAGS[unitTag] !== charName) {
      changed = true
      CRUTCH.dbgSpam(
        string.format(
          "[%s] unit tag %s changed: %s -> %s",
          reason,
          unitTag,
          tostring(PREV_TAGS[unitTag]),
          tostring(charName)
        )
      )
    }

    PREV_TAGS[unitTag] = charName
  }

  if (changed) {
    for (const [, listener] of pairs(UNIT_TAG_LISTENERS)) {
      listener(reason)
    }
  }
}

CRUTCH.RegisterUnitTagListener = function (this: void, name, listener) {
  UNIT_TAG_LISTENERS[name] = listener
}

CRUTCH.UnregisterUnitTagListener = function (this: void, name) {
  delete UNIT_TAG_LISTENERS[name]
}

function onTrialCompleteEvent(
  this: void,
  eventCode: number,
  trialName: string,
  score: number,
  totalTime: number
): undefined {
  CRUTCH.OnTrialComplete(eventCode, trialName, score, totalTime)
}

CRUTCH.InitializeGlobalEvents = function (this: void) {
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalCombat",
    EVENT_PLAYER_COMBAT_STATE,
    onCombatStateChanged
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalBossesChanged",
    EVENT_BOSSES_CHANGED,
    onBossesChanged
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalPlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    onBossesChanged
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalTagsActivated",
    EVENT_PLAYER_ACTIVATED,
    function (this: void) {
      updateUnitTags("Activated")
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalTagsJoined",
    EVENT_GROUP_MEMBER_JOINED,
    function (this: void) {
      updateUnitTags("Joined")
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalTagsLeft",
    EVENT_GROUP_MEMBER_LEFT,
    function (this: void) {
      updateUnitTags("Left")
    }
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "GlobalTagsUpdate",
    EVENT_GROUP_UPDATE,
    function (this: void) {
      updateUnitTags("Update")
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "TrialComplete",
    EVENT_RAID_TRIAL_COMPLETE,
    onTrialCompleteEvent
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "TrialStart",
    EVENT_RAID_TRIAL_STARTED,
    onTrialStarted
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "TrialVitalityChange",
    EVENT_RAID_REVIVE_COUNTER_UPDATE,
    onVitalityChanged
  )
  const raidId = GetCurrentParticipatingRaidId()
  if (raidId !== undefined && raidId !== 0) {
    onTrialStarted()
  }
}

CRUTCH.UninitializeGlobalEvents = function (this: void) {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalCombat", EVENT_PLAYER_COMBAT_STATE)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalBossesChanged", EVENT_BOSSES_CHANGED)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalPlayerActivated", EVENT_PLAYER_ACTIVATED)

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalTagsActivated", EVENT_PLAYER_ACTIVATED)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalTagsJoined", EVENT_GROUP_MEMBER_JOINED)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalTagsLeft", EVENT_GROUP_MEMBER_LEFT)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GlobalTagsUpdate", EVENT_GROUP_UPDATE)

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "TrialComplete", EVENT_RAID_TRIAL_COMPLETE)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "TrialStart", EVENT_RAID_TRIAL_STARTED)
  EVENT_MANAGER.UnregisterForEvent(
    CRUTCH.name + "TrialVitalityChange",
    EVENT_RAID_REVIVE_COUNTER_UPDATE
  )
}
