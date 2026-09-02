import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { dm } from "../destinations-logger/destinations-logger.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import { FishLocs } from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import {
  getRawSavedVariablesRoot,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

type PoiCaptureTable = Record<number, Record<string, string>>

function asPoiCaptureTable(value: unknown): PoiCaptureTable {
  return value as PoiCaptureTable
}

function chatPrint(text: string): undefined {
  const chatEditControl = CHAT_SYSTEM.textEntry.editControl
  if (!chatEditControl.HasFocus()) {
    StartChatInput()
  }
  chatEditControl.InsertText(text)
}

function showMyPosition(this: void): undefined {
  const [x, y] = GetMapPlayerPosition("player")
  const xs = '"X"'
  const locationString = string.format(
    "{ %.6f, %.6f, 0, 0, 1, %s }, -- %s",
    x,
    y,
    xs,
    LibMapData.mapTexture
  )
  chatPrint(locationString)
}
SLASH_COMMANDS["/fishloc"] = showMyPosition

SLASH_COMMANDS["/dhlp"] = function (this: void): undefined {
  dm("Info", getSettingsString("DESTCOMMANDS"))
  dm("Info", getSettingsString("DESTCOMMANDdhlp"))
  dm("Info", getSettingsString("DESTCOMMANDdset"))
}

SLASH_COMMANDS["/dgac"] = function (this: void): undefined {
  dm("Info", "Saving all achievements...")
  const sv = getSavedVariables()
  for (let achId = 1; achId <= 5000; achId++) {
    const [achName] = GetAchievementInfo(achId)
    if (string.len(achName) >= 3) {
      sv.TEMPPINDATA[achId] = "\v" + achName + "\v"
    }
  }
  dm("Info", "Done...")
}

SLASH_COMMANDS["/dgap"] = function (this: void): undefined {
  dm("Info", "Saving all POI's...")
  const zoneIndex = GetCurrentMapZoneIndex()
  const currentMapId = GetZoneId(zoneIndex)
  const root = getRawSavedVariablesRoot()
  const existingPoiCapture = root["pointsOfIntrest"]
  let pointsOfIntrest: PoiCaptureTable
  if (existingPoiCapture == null) {
    pointsOfIntrest = {}
    root["pointsOfIntrest"] = pointsOfIntrest
  } else {
    pointsOfIntrest = asPoiCaptureTable(existingPoiCapture)
  }
  const saveData: Record<string, string> = {}
  pointsOfIntrest[currentMapId] = saveData
  const numPois = GetNumPOIs(zoneIndex)
  for (let i = 1; i <= numPois; i++) {
    const [objectiveName] = GetPOIInfo(zoneIndex, i)
    const [, , , icon] = GetPOIMapInfo(zoneIndex, i)
    let objectiveIcon: string = icon
    const poiIndex = tostring(i)
    saveData[poiIndex] = string.format("{ n = 0x22%s0x22, t = %s },", objectiveName, objectiveIcon)
    dm("Info", poiIndex + ": " + objectiveName)
    const [foundEsoui] = string.find(objectiveIcon, "/esoui/art/icons/poi/")
    if (foundEsoui !== undefined) {
      const [stripped] = string.gsub(objectiveIcon, "/esoui/art/icons/poi/", "")
      objectiveIcon = stripped
    }
    dm("Info", poiIndex + ": " + objectiveIcon)
  }
  dm("Info", "Done...")
}

function formatCoords(value: number): string {
  return string.format("%05.04f", zo_round(value * 10000) / 10000)
}

SLASH_COMMANDS["/dsav"] = function (this: void, param: string): undefined {
  if (param != null && param !== "") {
    let cmdparam: number | string | undefined
    if (param === "ff") {
      dm("Info", "Saving Foul Water Fishing Spot.")
      cmdparam = 40
    } else if (param === "fr") {
      dm("Info", "Saving River Fishing Spot.")
      cmdparam = 41
    } else if (param === "fo") {
      dm("Info", "Saving Ocean Fishing Spot.")
      cmdparam = 42
    } else if (param === "fl") {
      dm("Info", "Saving Lake Fishing Spot.")
      cmdparam = 43
    } else if (string.sub(param, 0, 2) === "co" && string.len(param) >= 5) {
      dm("Info", "Saving Collectible Spot.")
      cmdparam = 100
    } else if (param === "-h") {
      dm("Info", "Write /dsav <param>")
      dm("Info", "The following parameters can be used:")
      dm("Info", "co* > saves Collectible spot")
      dm("Info", "replace the * with the mob name")
      dm("Info", "like: /dsav coMudcrab")
      dm("Info", "ff > saves Foul Fishing spot")
      dm("Info", "fr > saves River Fishing spot")
      dm("Info", "fo > saves Ocean Fishing spot")
      dm("Info", "fl > saves Lake Fishing spot")
      dm("Info", "-h > Shows this help text.")
      dm("Info", "Example: /dsav ff")
      cmdparam = undefined
    } else {
      dm("Info", "Unknown parameter!")
      dm("Info", "Write /dsav -h for help.")
      cmdparam = undefined
    }
    if (cmdparam !== undefined) {
      getMapTextureName()
      if (MAP_STATE.mapTextureName == null) return
      let mapNumber = 1
      const coordData: Record<number, string> = {}
      const mapName: Record<number, string> = {}
      let xtra1: number | string | undefined = " "
      let xtra2: number | string = " "
      let xtra3: string = " "
      const xtra4 = " "
      const xtra5 = " "
      const xtra6 = " "
      const xtra7 = " "
      if (typeof cmdparam === "number" && cmdparam >= 40 && cmdparam <= 43) {
        xtra1 =
          MAP_STATE.zoneTextureName !== undefined ? FishLocs[MAP_STATE.zoneTextureName] : undefined
        xtra2 = 1
        xtra3 = "X"
      } else if (cmdparam === 100) {
        cmdparam = "\\dq" + string.sub(param, 3) + "\\dq"
      }
      SetMapToPlayerLocation()
      while (
        GetMapContentType() === MAP_CONTENT_DUNGEON ||
        GetMapType() === MAPTYPE_SUBZONE ||
        GetMapType() === MAPTYPE_ZONE
      ) {
        getMapTextureName()
        if (MAP_STATE.mapTextureName != null) {
          mapName[mapNumber] = MAP_STATE.mapTextureName
          const [mapX, mapY] = GetMapPlayerPosition("player")
          coordData[mapNumber] =
            mapName[mapNumber] +
            "{" +
            formatCoords(mapX) +
            ", " +
            formatCoords(mapY) +
            ",\\t" +
            tostring(cmdparam) +
            ",\\t" +
            tostring(xtra1) +
            ",\\t" +
            tostring(xtra2) +
            ",\\t" +
            xtra3 +
            ",\\t" +
            xtra4 +
            ",\\t" +
            xtra5 +
            ",\\t" +
            xtra6 +
            ",\\t" +
            xtra7 +
            "},"
          mapNumber = mapNumber + 1
          MapZoomOut()
        }
      }
    }
  } else {
    dm("Info", "Missing parameter!")
    dm("Info", "Write /dsav -h for help.")
  }
}
