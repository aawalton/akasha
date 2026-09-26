import {
  compressLoaded,
  PROFILE_PATTERN,
} from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import {
  showDialogue,
  showNotice,
} from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import { cursorWorldPosition } from "akasha/temper/addon/pages/world/markers/modules/markers-placing/markers-placing.module.code.ts"
import {
  loadProfile,
  PROFILE_DROPDOWN,
} from "akasha/temper/addon/pages/world/markers/modules/markers-profiles/markers-profiles.module.code.ts"
import {
  CHAT_PREFIX,
  MM,
  refreshLoadedProfile,
  refreshWidget,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import { createTemporaryGroupIcon } from "akasha/temper/addon/pages/world/markers/modules/markers-temporary/markers-temporary.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-group-broadcast/lib-group-broadcast.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

const CHUNK = 25

let header: GroupBroadcastProtocol | undefined
let data: GroupBroadcastProtocol | undefined
let tempMarker: GroupBroadcastProtocol | undefined

function sendOn(
  this: void,
  protocol: GroupBroadcastProtocol | undefined,
  what: string,
  payload: GroupBroadcastData
): undefined {
  if (protocol === undefined) {
    showNotice("Notice", `You cannot send ${what} without LibGroupBroadcast.`, "")
    d(`You cannot send ${what} without LibGroupBroadcast`)
    return undefined
  }
  protocol.Send(payload)
  return undefined
}

let currentlySending = false
let currentString = ""
let currentPosition = -1
let currentLength = -2
let lastTime = 0
let startTime = 0
let received: Record<number, string | undefined> = {}
let times: number[] = []

function sendTick(this: void): undefined {
  const splice = string.sub(
    currentString,
    currentPosition * CHUNK + 1,
    currentPosition * CHUNK + CHUNK
  )
  if (splice === "") {
    sendOn(header, "markers locally", { sending: false, length: currentLength })
    return undefined
  }
  sendOn(data, "markers locally", { position: currentPosition + 1, data: splice })
  currentPosition += 1
  return undefined
}

function send(this: void, zoneString: string): undefined {
  if (currentlySending) {
    showNotice(
      "Notice",
      "You cannot start sending new markers until the current send is finished!",
      ""
    )
    d(`${CHAT_PREFIX}Cant start sending, as previous send is in progress`)
    return undefined
  }
  if (!IsUnitGrouped("player")) {
    showNotice("Notice", "You must be in a group to share markers!", "")
    return undefined
  }
  if (!IsUnitGroupLeader("player")) {
    showNotice("Notice", "You must be the group leader to share markers!", "")
    return undefined
  }
  currentString = zoneString
  currentPosition = 0
  currentLength = math.ceil(zoneString.length / CHUNK)
  currentlySending = true
  sendTick()
  lastTime = GetGameTimeMilliseconds()
  startTime = GetGameTimeMilliseconds()
  if (LibGroupBroadcast !== undefined) {
    TemperWorldMarkerProgressMeterBar.SetValue(0)
    TemperWorldMarkerProgressMeterEstimated.SetText(
      string.format("Estimated Time Remaining: %.1fs", 0)
    )
    TemperWorldMarkerProgressMeterElapsed.SetText(string.format("Elapsed Time: %.1fs", 0))
    TemperWorldMarkerProgressMeter.SetHidden(false)
  }
  return undefined
}

export function shareCurrentZone(this: void): undefined {
  if (MM.multipleProfilesLoaded) {
    showNotice("Notice", "You cannot share markers while multiple profiles are loaded.", "")
    return undefined
  }
  send(compressLoaded())
  return undefined
}

function saveReceived(this: void, zone: number, profileName: string, parsed: string): undefined {
  MM.vars.loadedProfile[zone] = profileName
  const strings: string[] = []
  for (let i = 1; i <= 10; i++) {
    const piece = string.sub(parsed, (i - 1) * 1900 + 1, i * 1900)
    if (piece === "") break
    strings.push(piece)
  }
  const profiles = MM.vars.Profiles[zone]
  if (profiles !== undefined) {
    profiles[profileName] = strings
  } else {
    MM.vars.Profiles[zone] = { [profileName]: strings }
  }
  const [currentZone] = GetUnitWorldPosition("player")
  if (currentZone === zone) loadProfile(profileName)
  MM.currentAdditionalProfiles = []
  MM.multipleProfilesLoaded = false
  refreshWidget(PROFILE_DROPDOWN)
  refreshLoadedProfile()
  d(`${CHAT_PREFIX}Saved Transmitted Markers!`)
  return undefined
}

function onHeader(this: void, unitTag: string, message: GroupBroadcastData): undefined {
  if (AreUnitsEqual("player", unitTag)) {
    currentlySending = false
    TemperWorldMarkerProgressMeter.SetHidden(true)
    d(`${CHAT_PREFIX}Finished Sending Profile!`)
    d(
      string.format(
        `${CHAT_PREFIX}Time Taken: %.1f seconds`,
        (GetGameTimeMilliseconds() - startTime) / 1000
      )
    )
    return undefined
  }
  const length = tonumber(message["length"]) ?? 0
  received[length + 1] = undefined
  let failed = false
  const pieces: string[] = []
  for (let i = 1; i <= length; i++) {
    const piece = received[i]
    if (piece === undefined) {
      d(`${CHAT_PREFIX}Failed to read transmitted Data with index: ${i}`)
      failed = true
    } else {
      pieces.push(piece)
    }
  }
  if (failed) {
    d(`${CHAT_PREFIX}Something Failed when reading the transmitted profile`)
    return undefined
  }
  const parsed = table.concat(pieces)
  received = {}
  const [zone, timestamp] = string.match(parsed, PROFILE_PATTERN)
  const intZone = tonumber(zone)
  if (intZone === undefined || timestamp === undefined) {
    d(`${CHAT_PREFIX}Something Failed when reading the transmitted profile`)
    return undefined
  }
  const userName = GetUnitDisplayName(unitTag)
  const profileName = string.format(
    "%s Shared: %s",
    userName,
    os.date("%Y/%m/%d %I:%M %p", tonumber(timestamp))
  )
  showDialogue(
    `Recieved Markers from ${userName}`,
    string.format(
      "Would you like to import these markers for %s?\nThis will be saved to a profile called: |cFFD700%s|r",
      GetZoneNameById(intZone),
      profileName
    ),
    string.format(
      "These Markers were last edited at:\n|c0DC1CF%s|r",
      os.date("%a, %b %d %Y - %I:%M %p", MM.currentTimestamp)
    ),
    () => {
      saveReceived(intZone, profileName, parsed)
    }
  )
  return undefined
}

function average(this: void, values: readonly number[]): number {
  let total = 0
  for (const value of values) total += value
  return total / values.length
}

function onData(this: void, unitTag: string, message: GroupBroadcastData): undefined {
  const position = tonumber(message["position"]) ?? 0
  if (AreUnitsEqual("player", unitTag)) {
    times.unshift(GetGameTimeMilliseconds() - lastTime)
    times = times.slice(0, 10)
    const averageTime = average(times)
    lastTime = GetGameTimeMilliseconds()
    ZO_StatusBar_SmoothTransition(
      TemperWorldMarkerProgressMeterBar,
      (position / currentLength) * 100,
      100
    )
    TemperWorldMarkerProgressMeterEstimated.SetText(
      string.format(
        "Estimated Time Remaining: %.1fs",
        (averageTime * (currentLength - position)) / 1000
      )
    )
    TemperWorldMarkerProgressMeterElapsed.SetText(
      string.format("Elapsed Time: %.1fs", (GetGameTimeMilliseconds() - startTime) / 1000)
    )
    sendTick()
  }
  const piece = message["data"]
  received[position] = typeof piece === "string" ? piece : undefined
  return undefined
}

function onTempMarker(this: void, unitTag: string, message: GroupBroadcastData): undefined {
  createTemporaryGroupIcon(
    unitTag,
    tonumber(message["x"]) ?? 0,
    tonumber(message["y"]) ?? 0,
    tonumber(message["z"]) ?? 0
  )
  return undefined
}

export function sendTempMarker(this: void): undefined {
  const [x, y, z] = cursorWorldPosition(
    "You cannot send temporary markers at your cursor unless there is a minimum 2 degree angle from the horizon"
  )
  if (x === undefined || y === undefined || z === undefined) return undefined
  sendOn(tempMarker, "temporary markers", { x, y: y + 30, z })
  return undefined
}

export function initSharing(this: void): undefined {
  const lgb = LibGroupBroadcast
  if (lgb === undefined) return undefined
  const handler = lgb.RegisterHandler("TemperWorldMarkers")
  handler.SetDisplayName("More Markers")
  handler.SetDescription("Tool for placing markers in the 3d world!")

  const headerProtocol = handler.DeclareProtocol(123, "M0RMarkersHeader")
  headerProtocol.AddField(
    lgb.CreateOptionalField(lgb.CreateNumericField("length", { numBits: 11, trimValues: true }))
  )
  headerProtocol.AddField(lgb.CreateFlagField("sending"))
  headerProtocol.OnData(onHeader)
  headerProtocol.Finalize({ replaceQueuedMessages: false })
  header = headerProtocol

  const dataProtocol = handler.DeclareProtocol(122, "M0RMarkersData")
  dataProtocol.AddField(lgb.CreateNumericField("position", { numBits: 11, trimValues: true }))
  dataProtocol.AddField(lgb.CreateStringField("data", { minLength: 0, maxLength: 26 }))
  dataProtocol.OnData(onData)
  dataProtocol.Finalize({ replaceQueuedMessages: false })
  data = dataProtocol

  const tempProtocol = handler.DeclareProtocol(124, "M0RMarkersTempMarker")
  tempProtocol.AddField(lgb.CreateNumericField("x"))
  tempProtocol.AddField(lgb.CreateNumericField("y"))
  tempProtocol.AddField(lgb.CreateNumericField("z"))
  tempProtocol.OnData(onTempMarker)
  tempProtocol.Finalize({ replaceQueuedMessages: true })
  tempMarker = tempProtocol
  return undefined
}
