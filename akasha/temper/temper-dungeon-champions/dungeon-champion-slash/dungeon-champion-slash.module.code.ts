import { getCombinedZone } from "../dungeon-champion-map-zone/dungeon-champion-map-zone.module.code.ts"

function myPrint(message: string): undefined {
  CHAT_SYSTEM.AddMessage(message)
  return undefined
}

function showPosition(label: string | number): undefined {
  if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  }
  const [x, y] = GetMapPlayerPosition("player")
  const locX = string.format("%05.02f", zo_round(x * 10000) / 100)
  const locY = string.format("%05.02f", zo_round(y * 10000) / 100)
  myPrint(zo_strformat("<<1>>: <<2>>×<<3>> (<<4>>)", label, locX, locY, getCombinedZone()))
  return undefined
}

function showMyPosition(this: void): undefined {
  return showPosition(GetMapName())
}

function showMyPosition2(this: void): undefined {
  return showPosition(GetCurrentMapId())
}

export function registerSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/dc_mypos"] = showMyPosition
  SLASH_COMMANDS["/dc_mypos2"] = showMyPosition2
  return undefined
}
