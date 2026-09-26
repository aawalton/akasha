import { createIcon } from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  CHAT_PREFIX,
  type MarkerIcon,
  MM,
  refreshExport,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import {
  builtInIndexOf,
  builtInTextureAt,
  canonicalTexture,
} from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

export const PROFILE_PATTERN = "<(.-)](.-)](.-)](.-)](.-)](.-)](.-)](.-)](.-)>"

const ESCAPED: readonly (readonly [string, string])[] = [
  [":", string.char(0xee, 0x80, 0x80)],
  [",", string.char(0xee, 0x80, 0x81)],
  ["]", string.char(0xee, 0x80, 0x82)],
  [";", string.char(0xee, 0x80, 0x83)],
  [">", string.char(0xee, 0x80, 0x84)],
]

type Groups = Record<string, number[] | undefined>

function grouped(this: void, groups: Groups, key: string, index: number): undefined {
  const found = groups[key]
  if (found === undefined) {
    groups[key] = [index]
  } else {
    found.push(index)
  }
  return undefined
}

function joined(this: void, groups: Groups, skip?: string): string {
  const out: string[] = []
  for (const [key, indexes] of pairs(groups)) {
    if (key !== skip) {
      out.push(`${key}:${table.concat(indexes, ",")}`)
    }
  }
  return table.concat(out, ";")
}

function escapedText(this: void, text: string): string {
  let [out] = string.gsub(text, "\n", "\\n")
  for (const [plain, escaped] of ESCAPED) {
    ;[out] = string.gsub(out, plain, escaped)
  }
  return out
}

function unescapedText(this: void, text: string): string {
  let [out] = string.gsub(text, "\\n", "\n")
  for (const [plain, escaped] of ESCAPED) {
    ;[out] = string.gsub(out, escaped, plain)
  }
  return out
}

export function loadedIcons(this: void): MarkerIcon[] {
  const merged: MarkerIcon[] = []
  for (const icon of MM.facing) merged.push(icon)
  for (const icon of MM.ground) merged.push(icon)
  return merged
}

export function compressLoaded(this: void): string {
  const [zone] = GetUnitRawWorldPosition("player")
  const merged = loadedIcons()
  if (merged.length === 0) {
    MM.exportString = ""
    refreshExport()
    return ""
  }

  let minX = math.huge
  let minY = math.huge
  let minZ = math.huge
  for (const icon of merged) {
    minX = math.min(minX, icon.x)
    minY = math.min(minY, icon.y)
    minZ = math.min(minZ, icon.z)
  }

  const colours: Groups = {}
  const textures: Groups = {}
  const pitches: Groups = {}
  const yaws: Groups = {}
  const sizes: Groups = {}
  const positions: string[] = []
  for (let index = 1; index <= merged.length; index++) {
    const icon = merged[index - 1]
    if (icon === undefined) continue
    if (icon.colourHex === undefined) {
      icon.colourHex = ZO_ColorDef.FloatsToHex(
        icon.colour[0] ?? 1,
        icon.colour[1] ?? 1,
        icon.colour[2] ?? 1,
        icon.colour[3] ?? 1
      )
    }
    grouped(colours, icon.colourHex, index)
    grouped(sizes, tostring(icon.size), index)
    if (icon.orientation !== undefined) {
      grouped(pitches, tostring(zo_floor(zo_deg(icon.orientation[0] ?? 0))), index)
      grouped(yaws, tostring(zo_floor(zo_deg(icon.orientation[1] ?? 0))), index)
    }
    grouped(textures, icon.bgTexture ?? "", index)
    positions.push(
      string.format(
        "%x:%x:%x:%s",
        icon.x - minX,
        icon.y - minY,
        icon.z - minZ,
        escapedText(icon.text)
      )
    )
  }

  let timestamp = MM.currentTimestamp
  if (timestamp === -1) {
    timestamp = os.time()
  }

  const shared: Groups = {}
  for (const [texture, indexes] of pairs(textures)) {
    const builtIn = builtInIndexOf(texture)
    shared[builtIn === undefined ? canonicalTexture(texture) : `^${builtIn}`] = indexes
  }

  const out =
    `${tostring(zone)}]` +
    string.format("%d]%x:%x:%x]", timestamp, minX, minY, minZ) +
    `${joined(sizes, "1")}]${joined(pitches)}]${joined(yaws)}]${joined(colours)}]${joined(shared)}]` +
    table.concat(positions, ",")

  MM.exportString = `<${out}>`
  refreshExport()
  return MM.exportString
}

function eachIndex(
  this: void,
  groups: string,
  apply: (this: void, value: string, index: number) => void
): undefined {
  for (const [group] of string.gmatch(groups, "[^;]+")) {
    if (group === undefined) continue
    const [value, indexes] = zo_strsplit(":", group)
    if (value === undefined || indexes === undefined) continue
    for (const [index] of string.gmatch(indexes, "[^,]+")) {
      const at = tonumber(index)
      if (at !== undefined) apply(value, at)
    }
  }
  return undefined
}

export function decompressString(this: void, exportString: string): undefined {
  const [zone, timestamp, mins, sizes, pitch, yaw, colour, texture, positions] = string.match(
    exportString,
    PROFILE_PATTERN
  )
  const [currentZone] = GetUnitRawWorldPosition("player")
  if (zone === undefined) {
    d(`${CHAT_PREFIX}The currently loaded markers are improperly formatted!`)
  }
  if (zone !== tostring(currentZone)) {
    d(`${CHAT_PREFIX}These markers are for a different zone!`)
    return undefined
  }

  const [minXH, minYH, minZH] = zo_strsplit(":", mins ?? "")
  const minX = tonumber(minXH, 16) ?? 0
  const minY = tonumber(minYH, 16) ?? 0
  const minZ = tonumber(minZH, 16) ?? 0

  const icons: Record<number, MarkerIcon | undefined> = {}
  let count = 0
  for (const [position] of string.gmatch(positions ?? "", "[^,]+")) {
    if (position === undefined) continue
    const [cXH, cYH, cZH, cText] = zo_strsplit(":", position)
    count += 1
    icons[count] = {
      x: (tonumber(cXH, 16) ?? 0) + minX,
      y: (tonumber(cYH, 16) ?? 0) + minY,
      z: (tonumber(cZH, 16) ?? 0) + minZ,
      text: cText === undefined ? "" : unescapedText(cText),
      size: 1,
      colour: [1, 1, 1, 1],
    }
  }

  eachIndex(sizes ?? "", (value, index) => {
    const icon = icons[index]
    if (icon !== undefined) icon.size = value
  })
  eachIndex(texture ?? "", (value, index) => {
    let path = value
    if (string.find(value, "%^")[0] !== undefined) {
      const [, builtIn] = zo_strsplit("^", value)
      path = builtInTextureAt(builtIn ?? "") ?? ""
    }
    const icon = icons[index]
    if (icon !== undefined) icon.bgTexture = path
  })
  eachIndex(colour ?? "", (value, index) => {
    const icon = icons[index]
    if (icon === undefined) return
    const [r, g, b, a] = ZO_ColorDef.HexToFloats(value)
    icon.colour = [r ?? 1, g ?? 1, b ?? 1, a ?? 1]
    icon.colourHex = value
  })
  eachIndex(pitch ?? "", (value, index) => {
    const icon = icons[index]
    if (icon !== undefined) icon.orientation = [zo_rad(tonumber(value) ?? 0), 0]
  })
  eachIndex(yaw ?? "", (value, index) => {
    const icon = icons[index]
    if (icon === undefined) return
    const angle = zo_rad(tonumber(value) ?? 0)
    if (icon.orientation !== undefined) {
      icon.orientation[1] = angle
    } else {
      icon.orientation = [0, angle]
    }
  })

  for (let index = 1; index <= count; index++) {
    const icon = icons[index]
    if (icon !== undefined) createIcon(icon)
  }
  MM.currentTimestamp = tonumber(timestamp) ?? -1
  return undefined
}

export function saveIcons(this: void, given: string | undefined): undefined {
  const [currentZone] = GetUnitRawWorldPosition("player")
  const profileName = MM.vars.loadedProfile[currentZone] ?? "Default"
  const zoneString = given ?? ""
  const strings: string[] = []
  for (let i = 1; i <= 10; i++) {
    const piece = string.sub(zoneString, (i - 1) * 1900 + 1, i * 1900)
    if (piece === "") break
    strings.push(piece)
  }
  const profiles = MM.vars.Profiles[currentZone]
  if (profiles !== undefined) {
    profiles[profileName] = strings
  } else {
    MM.vars.Profiles[currentZone] = { [profileName]: strings }
  }
  return undefined
}

export function markersChanged(this: void): undefined {
  MM.currentTimestamp = os.time()
  saveIcons(compressLoaded())
  return undefined
}
