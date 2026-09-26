import { AKAMATSU_TEXTURES_00 } from "akasha/temper/addon/pages/world/markers/modules/markers-akamatsu-textures-00/markers-akamatsu-textures-00.module.code.ts"
import { AKAMATSU_TEXTURES_01 } from "akasha/temper/addon/pages/world/markers/modules/markers-akamatsu-textures-01/markers-akamatsu-textures-01.module.code.ts"
import { AKAMATSU_TEXTURES_02 } from "akasha/temper/addon/pages/world/markers/modules/markers-akamatsu-textures-02/markers-akamatsu-textures-02.module.code.ts"
import {
  compressLoaded,
  saveIcons,
} from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import { showNotice } from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import { createIcon } from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  CHAT_PREFIX,
  type MarkerIcon,
  MM,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/type/lib-emote/lib-emote.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

interface ElmsIcon {
  bgTexture: string
  text?: string
  size?: number
  colour?: number[]
}

const READ_ONLY = "Markers are Read-Only when multiple profiles are loaded."

export const ELMS_PATTERN = "/(%d+)//(%d+),(%d+),(%d+),(%d+)/"
export const AKAMATSU_PATTERN = "//(%d+)/(%d+)/(%d+)/(%d+)/(%d+)"
export const AKAMATSU_EMOTE_PATTERN = "//(%d+)/(%d+)/(%d+)/(%d+)/(%d[12367890]%d%d%d)"

const ELMS_MAP: Record<number, ElmsIcon | undefined> = {
  [1]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "1", size: 1.5 },
  [2]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "2", size: 1.5 },
  [3]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "3", size: 1.5 },
  [4]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "4", size: 1.5 },
  [5]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "5", size: 1.5 },
  [6]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "6", size: 1.5 },
  [7]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "7", size: 1.5 },
  [8]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "8", size: 1.5 },
  [9]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "9", size: 1.5 },
  [10]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "10", size: 1.5 },
  [11]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "11", size: 1.5 },
  [12]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "12", size: 1.5 },
  [13]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "↓", size: 1.5 },
  [14]: { bgTexture: "M0RMarkers/textures/chevron.dds", colour: [0, 1, 0.65, 1] },
  [15]: { bgTexture: "M0RMarkers/textures/square.dds", colour: [0, 0, 1, 1] },
  [16]: { bgTexture: "M0RMarkers/textures/square.dds", colour: [0, 1, 0, 1] },
  [17]: { bgTexture: "M0RMarkers/textures/square.dds", colour: [1, 0.5, 0, 1] },
  [18]: { bgTexture: "M0RMarkers/textures/hexagon.dds", text: "OT", colour: [1, 0.5, 0, 1] },
  [19]: { bgTexture: "M0RMarkers/textures/square.dds", colour: [1, 0, 0.9, 1] },
  [20]: { bgTexture: "M0RMarkers/textures/square.dds", colour: [1, 0, 0, 1] },
  [21]: { bgTexture: "M0RMarkers/textures/hexagon.dds", text: "MT", colour: [1, 0, 0, 1] },
  [22]: { bgTexture: "M0RMarkers/textures/square.dds", colour: [1, 0.8, 0, 1] },
  [23]: { bgTexture: "M0RMarkers/textures/diamond.dds", colour: [0, 0, 1, 1] },
  [24]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "1", colour: [0, 0, 1, 1] },
  [25]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "2", colour: [0, 0, 1, 1] },
  [26]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "3", colour: [0, 0, 1, 1] },
  [27]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "4", colour: [0, 0, 1, 1] },
  [28]: { bgTexture: "M0RMarkers/textures/diamond.dds", colour: [0, 1, 0, 1] },
  [29]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "1", colour: [0, 1, 0, 1] },
  [30]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "2", colour: [0, 1, 0, 1] },
  [31]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "3", colour: [0, 1, 0, 1] },
  [32]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "4", colour: [0, 1, 0, 1] },
  [33]: { bgTexture: "M0RMarkers/textures/diamond.dds", colour: [1, 0.5, 0, 1] },
  [34]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "1", colour: [1, 0.5, 0, 1] },
  [35]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "2", colour: [1, 0.5, 0, 1] },
  [36]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "3", colour: [1, 0.5, 0, 1] },
  [37]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "4", colour: [1, 0.5, 0, 1] },
  [38]: { bgTexture: "M0RMarkers/textures/diamond.dds", colour: [1, 0, 0.9, 1] },
  [39]: { bgTexture: "M0RMarkers/textures/diamond.dds", colour: [1, 0, 0, 1] },
  [40]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "1", colour: [1, 0, 0, 1] },
  [41]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "2", colour: [1, 0, 0, 1] },
  [42]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "3", colour: [1, 0, 0, 1] },
  [43]: { bgTexture: "M0RMarkers/textures/diamond.dds", text: "4", colour: [1, 0, 0, 1] },
  [44]: { bgTexture: "M0RMarkers/textures/diamond.dds", colour: [1, 0.8, 0, 1] },
  [45]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "a", size: 1.5 },
  [46]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "b", size: 1.5 },
  [47]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "c", size: 1.5 },
  [48]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "d", size: 1.5 },
  [49]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "e", size: 1.5 },
  [50]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "f", size: 1.5 },
  [51]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "g", size: 1.5 },
  [52]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "h", size: 1.5 },
  [53]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "i", size: 1.5 },
  [54]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "j", size: 1.5 },
  [55]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "k", size: 1.5 },
  [56]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "l", size: 1.5 },
  [57]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "m", size: 1.5 },
  [58]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "n", size: 1.5 },
  [59]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "o", size: 1.5 },
  [60]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "p", size: 1.5 },
  [61]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "q", size: 1.5 },
  [62]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "r", size: 1.5 },
  [63]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "s", size: 1.5 },
  [64]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "t", size: 1.5 },
  [65]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "u", size: 1.5 },
  [66]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "v", size: 1.5 },
  [67]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "w", size: 1.5 },
  [68]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "x", size: 1.5 },
  [69]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "y", size: 1.5 },
  [70]: { bgTexture: "M0RMarkers/textures/blank.dds", text: "z", size: 1.5 },
  [71]: { bgTexture: "M0RMarkers/textures/sharkpog.dds", colour: [1, 1, 1, 1] },
}

const AKAMATSU_MAP: Record<number, string | undefined> = {}
for (const part of [AKAMATSU_TEXTURES_00, AKAMATSU_TEXTURES_01, AKAMATSU_TEXTURES_02]) {
  for (const [key, texture] of part) AKAMATSU_MAP[key] = texture
}

function readOnly(this: void): boolean {
  if (!MM.multipleProfilesLoaded) return false
  showNotice("Notice", READ_ONLY, "")
  d(CHAT_PREFIX + READ_ONLY)
  return true
}

function iconFrom(this: void, elms: ElmsIcon | undefined): MarkerIcon {
  return {
    x: 0,
    y: 0,
    z: 0,
    bgTexture: elms?.bgTexture ?? "M0RMarkers/textures/blank.dds",
    colour: elms?.colour ?? [1, 1, 1, 1],
    text: elms?.text ?? "",
    size: elms?.size ?? 1,
  }
}

function saved(this: void, amount: number): LuaMultiReturn<[number, string]> {
  const zoneString = compressLoaded()
  saveIcons(zoneString)
  return $multi(amount, zoneString)
}

export function parseElmsString(
  this: void,
  elmsString: string
): LuaMultiReturn<[number, string] | []> {
  if (readOnly()) return $multi()
  let amountParsed = 0
  const [currentZone] = GetUnitRawWorldPosition("player")
  for (const [zone, x, y, z, iconKey] of string.gmatch(elmsString, ELMS_PATTERN)) {
    const elms = ELMS_MAP[tonumber(iconKey) ?? 0]
    if (elms !== undefined && tonumber(zone) === currentZone) {
      const icon = iconFrom(elms)
      icon.x = tonumber(x) ?? 0
      icon.y = (tonumber(y) ?? 0) + 50 * (elms.size ?? 1)
      icon.z = tonumber(z) ?? 0
      createIcon(icon)
      amountParsed += 1
    }
  }
  return saved(amountParsed)
}

export function parseAkamatsuString(
  this: void,
  markerString: string,
  useLibEmote: boolean
): LuaMultiReturn<[number, string] | []> {
  if (readOnly()) return $multi()
  let amountParsed = 0
  const [currentZone] = GetUnitRawWorldPosition("player")
  const [zone] = string.match(markerString, "(%d+)//")
  if (tonumber(zone) !== currentZone) return $multi(0, "")

  for (const [x, y, z, size, key] of string.gmatch(markerString, AKAMATSU_PATTERN)) {
    let iconKey: number | undefined = tonumber(key) ?? 0
    const [trimmed] = string.gsub(tostring(iconKey), "^15", "")
    const elmsKey = tonumber(trimmed)
    let texture: string | undefined
    if (elmsKey !== undefined && elmsKey <= 70 && elmsKey > 0) {
      iconKey = elmsKey
    } else if (AKAMATSU_MAP[iconKey] !== undefined) {
      texture = AKAMATSU_MAP[iconKey]
      iconKey = undefined
    } else if (useLibEmote && LibEmote !== undefined) {
      texture = LibEmote.GetEmoteByIndex(iconKey).textures[0]
      iconKey = undefined
    } else {
      iconKey = 14
    }
    const elms = iconKey === undefined ? undefined : ELMS_MAP[iconKey]
    if (texture !== undefined || elms !== undefined) {
      const icon = iconFrom(elms)
      if (elms === undefined && texture !== undefined) icon.bgTexture = texture
      icon.size = (tonumber(size) ?? 100) / 100
      icon.x = tonumber(x) ?? 0
      icon.y = (tonumber(y) ?? 0) + 50 * icon.size
      icon.z = tonumber(z) ?? 0
      createIcon(icon)
      amountParsed += 1
    }
  }
  return saved(amountParsed)
}
