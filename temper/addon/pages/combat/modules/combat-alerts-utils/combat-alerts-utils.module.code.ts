import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const QUEUED_MESSAGES: string[] = []

CRUTCH.msg = function (this: void, message) {
  if (message === undefined || message === false) return
  const text = "|c3bdb5e[CrutchAlerts]|caaaaaa " + tostring(message)
  if (CHAT_ROUTER !== undefined) {
    CHAT_ROUTER.AddSystemMessage(text)
  } else {
    QUEUED_MESSAGES.push(text)
  }
}

CRUTCH.Warn = function (this: void, message) {
  if (message === undefined || message === false) return
  const chatWarning =
    "|c3bdb5e[CrutchAlerts] |cFF0000W" +
    "|cFF7F00A" +
    "|cFFFF00R" +
    "|c00FF00N" +
    "|c0000FFI" +
    "|c2E2B5FN" +
    "|c8B00FFG" +
    "|cFF00FF: " +
    tostring(message)
  if (CHAT_ROUTER !== undefined) {
    CHAT_ROUTER.AddSystemMessage(chatWarning)
  } else {
    QUEUED_MESSAGES.push(chatWarning)
  }
}

CRUTCH.ShowQueuedMessages = function (this: void) {
  if (CHAT_ROUTER !== undefined) {
    for (const queued of QUEUED_MESSAGES) {
      CHAT_ROUTER.AddSystemMessage(queued)
    }
  }
}

CRUTCH.GetCapitalizedString = function (this: void, text) {
  return zo_strformat("<<C:1>>", text)
}

CRUTCH.GetSquaredDistance = function (this: void, x1, y1, z1, x2, y2, z2) {
  const dx = x1 - x2
  const dy = y1 - y2
  const dz = z1 - z2
  return dx * dx + dy * dy + dz * dz
}

CRUTCH.GetUnitTagsDistance = function (this: void, unitTag1, unitTag2) {
  if (unitTag1 === unitTag2) return 0
  const [p1zone, p1x, p1y, p1z] = GetUnitWorldPosition(unitTag1)
  const [p2zone, p2x, p2y, p2z] = GetUnitWorldPosition(unitTag2)
  if (p1zone !== p2zone) {
    return 2147483647
  }
  return zo_sqrt(CRUTCH.GetSquaredDistance(p1x, p1y, p1z, p2x, p2y, p2z)) / 100
}

function hueToRGB(this: void, p: number, q: number, t: number): number {
  if (t < 0) t = t + 1
  if (t > 1) t = t - 1
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t
  }
  if (t < 0.5) {
    return q
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6
  }
  return p
}

CRUTCH.ConvertHSLToRGB = function (this: void, h, s, l) {
  if (s === 0) {
    return $multi(l, l, l)
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return $multi(hueToRGB(p, q, h + 1 / 3), hueToRGB(p, q, h), hueToRGB(p, q, h - 1 / 3))
}

const BITMASKS: Record<number, number> = {
  [LFG_ROLE_TANK]: 4,
  [LFG_ROLE_HEAL]: 2,
  [LFG_ROLE_DPS]: 1,
}

CRUTCH.IsValidRole = function (this: void, role) {
  return BITMASKS[role] !== undefined
}

CRUTCH.IsRoleSet = function (this: void, setting, role) {
  const mask = BITMASKS[role]
  if (mask === undefined) {
    return undefined
  }
  return BitAnd(setting, mask) !== 0
}

function withRoles(this: void, tank: boolean, healer: boolean, dps: boolean): number {
  return (
    (tank ? (BITMASKS[LFG_ROLE_TANK] ?? 0) : 0) +
    (healer ? (BITMASKS[LFG_ROLE_HEAL] ?? 0) : 0) +
    (dps ? (BITMASKS[LFG_ROLE_DPS] ?? 0) : 0)
  )
}

CRUTCH.RoleValueToTable = function (this: void, setting) {
  const tab: number[] = []
  for (const [role] of pairs(BITMASKS)) {
    if (CRUTCH.IsRoleSet(setting, role) === true) {
      tab.push(role)
    }
  }
  return tab
}

CRUTCH.RoleTableToValue = function (this: void, roles) {
  let tank = false
  let healer = false
  let dps = false
  for (const role of roles) {
    if (role === LFG_ROLE_TANK) tank = true
    if (role === LFG_ROLE_HEAL) healer = true
    if (role === LFG_ROLE_DPS) dps = true
  }
  return withRoles(tank, healer, dps)
}

const ROLE_STRING_TO_CONSTANT: Record<string, number> = {
  Tank: LFG_ROLE_TANK,
  Healer: LFG_ROLE_HEAL,
  DPS: LFG_ROLE_DPS,
}

const ROLE_CONSTANT_TO_STRING: Record<number, string> = {
  [LFG_ROLE_TANK]: "Tank",
  [LFG_ROLE_HEAL]: "Healer",
  [LFG_ROLE_DPS]: "DPS",
}

CRUTCH.ConvertRoleStringsToValue = function (this: void, values) {
  const result: number[] = []
  for (const roleString of values) {
    const role = ROLE_STRING_TO_CONSTANT[roleString]
    if (role !== undefined) result.push(role)
  }
  return CRUTCH.RoleTableToValue(result)
}

CRUTCH.ConvertRoleValueToStrings = function (this: void, setting) {
  const result: string[] = []
  for (const role of CRUTCH.RoleValueToTable(setting)) {
    const name = ROLE_CONSTANT_TO_STRING[role]
    if (name !== undefined) result.push(name)
  }
  return result
}

const ROLE_SETTING_TO_STRING: Record<number, string> = {
  [0]: "Off",
  [1]: "DPS",
  [2]: "Healer",
  [3]: "Healer + DPS",
  [4]: "Tank",
  [5]: "Tank + DPS",
  [6]: "Tank + Healer",
  [7]: "All roles",
}

CRUTCH.ConvertRoleValueToConsoleString = function (this: void, setting) {
  return ROLE_SETTING_TO_STRING[setting]
}

CRUTCH.GetSpeshulDate = function (this: void) {
  return GetDate() % 10000
}

const IMPORTANT_TABLE: Record<string, string[]> = {
  ["Pragmatic Fatecarver"]: [
    "Pragmatic Fartcarver",
    "Pragfatic Nordcarver",
    "Pragnordic Fatcarver",
  ],
  ["Exhausting Fatecarver"]: [
    "Exhausting Fartcarver",
    "Exhausted Fatecarver",
    "Exaggerating Fatecarver",
  ],
  ["Fatecarver"]: ["Fartcarver", "Fatcarver"],
}

CRUTCH.DecorateNotificationText = function (this: void, textLabel) {
  const yes = math.random()
  if (yes < 0.6) return textLabel

  const importants = IMPORTANT_TABLE[textLabel]
  if (importants === undefined) return textLabel

  return importants[math.random(importants.length) - 1] ?? "???"
}

CRUTCH.CheckGroupBuffs = function (this: void, idsToCallbacks, finalCallback) {
  const buffsToCheck: Record<number, (this: void, unitTag: string, hasBuff: boolean) => void> = {}
  for (let i = 1; i <= GetGroupSize(); i++) {
    const unitTag = GetGroupUnitTagByIndex(i)
    if (unitTag !== undefined) {
      let hasAnyBuffs = false

      ZO_ClearTable(buffsToCheck)
      ZO_ShallowTableCopy(idsToCallbacks, buffsToCheck)

      for (let j = 1; j <= GetNumBuffs(unitTag); j++) {
        const [, , , , , , , , , , abilityId] = GetUnitBuffInfo(unitTag, j)
        const callback = buffsToCheck[abilityId]
        if (callback !== undefined) {
          hasAnyBuffs = true
          callback(unitTag, true)
          delete buffsToCheck[abilityId]
        }
      }

      for (const [, callback] of pairs(buffsToCheck)) {
        callback(unitTag, false)
      }

      finalCallback(unitTag, hasAnyBuffs)
    }
  }
}

function playMultiSound(
  this: void,
  sound: string,
  volume?: number,
  times?: number,
  delay?: number,
  attenuate?: boolean
): undefined {
  if (times === undefined || times < 1) return
  const loud = volume ?? 1

  for (let i = 1; i <= loud; i++) {
    PlaySound(sound)
  }

  if (delay === undefined || times === 1) return
  zo_callLater(function (this: void) {
    playMultiSound(sound, attenuate === true ? loud - 1 : loud, times - 1, delay, attenuate)
  }, delay)
}

CRUTCH.PlayMultiSound = playMultiSound

CRUTCH.GetGroupTagNumber = function (this: void, unitTag) {
  const [tagNumber] = string.gsub(unitTag, "group", "")
  const tagId = tonumber(tagNumber)
  if (tagId !== undefined) return tagId
  return 15
}
