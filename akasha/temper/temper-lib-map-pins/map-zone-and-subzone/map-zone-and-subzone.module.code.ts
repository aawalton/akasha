function splitOnSlash(input: string): string[] {
  const t: string[] = []
  for (const [str] of string.gmatch(input, "([^%/]+)")) {
    if (str !== undefined) {
      t.push(str)
    }
  }
  return t
}

function processMapTexture(
  bStripUIMap: boolean | undefined,
  bKeepMapNum: boolean | undefined
): string {
  let [mapTexture] = string.gsub(string.lower(GetMapTileTexture()), "^.*/maps/", "")
  if (bStripUIMap === true) {
    ;[mapTexture] = string.gsub(mapTexture, "ui_map_", "")
  }
  ;[mapTexture] = string.gsub(mapTexture, "%.dds$", "")
  if (bKeepMapNum !== true) {
    ;[mapTexture] = string.gsub(mapTexture, "%d*$", "")
    ;[mapTexture] = string.gsub(mapTexture, "_+$", "")
  }
  return mapTexture
}

export function getZoneAndSubzone(
  alternative?: boolean,
  bStripUIMap?: boolean,
  bKeepMapNum?: boolean
): string | LuaMultiReturn<string[]> {
  const mapTexture = processMapTexture(bStripUIMap, bKeepMapNum)
  if (alternative === true) {
    return mapTexture
  }
  return unpack(splitOnSlash(mapTexture))
}

export function myPosition(): LuaMultiReturn<
  [x: number, y: number, zone: string, subzone: string, mapName: string]
> {
  if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  }

  const mapName = zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapName())
  const [x, y] = GetMapPlayerPosition("player")
  const segments = splitOnSlash(processMapTexture(undefined, undefined))

  return $multi(x, y, segments[0] ?? "", segments[1] ?? "", mapName)
}
