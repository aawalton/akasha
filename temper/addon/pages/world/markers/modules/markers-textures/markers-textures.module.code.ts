import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const UPSTREAM_FOLDER = "m0rmarkers/textures/"

const SHIPPED_FOLDER = "TemperWorld/textures/"

export const BUILT_IN_TEXTURES: readonly string[] = [
  "M0RMarkers/textures/circle.dds",
  "M0RMarkers/textures/hexagon.dds",
  "M0RMarkers/textures/square.dds",
  "M0RMarkers/textures/diamond.dds",
  "M0RMarkers/textures/octagon.dds",
  "M0RMarkers/textures/chevron.dds",
  "M0RMarkers/textures/blank.dds",
  "M0RMarkers/textures/sharkpog.dds",

  "esoui/art/stats/alliancebadge_aldmeri.dds",
  "esoui/art/stats/alliancebadge_ebonheart.dds",
  "esoui/art/stats/alliancebadge_daggerfall.dds",
  "esoui/art/lfg/gamepad/lfg_roleicon_dps.dds",
  "esoui/art/lfg/gamepad/lfg_roleicon_tank.dds",
  "esoui/art/lfg/gamepad/lfg_roleicon_healer.dds",
  "esoui/art/icons/class/gamepad/gp_class_dragonknight.dds",
  "esoui/art/icons/class/gamepad/gp_class_sorcerer.dds",
  "esoui/art/icons/class/gamepad/gp_class_nightblade.dds",
  "esoui/art/icons/class/gamepad/gp_class_warden.dds",
  "esoui/art/icons/class/gamepad/gp_class_necromancer.dds",
  "esoui/art/icons/class/gamepad/gp_class_templar.dds",
  "esoui/art/icons/class/gamepad/gp_class_arcanist.dds",
]

const INDEX_OF_TEXTURE: Record<string, number> = {}
const TEXTURE_AT_INDEX: Record<string, string> = {}

for (let index = 1; index <= BUILT_IN_TEXTURES.length; index++) {
  const lowered = string.lower(BUILT_IN_TEXTURES[index - 1] ?? "")
  TEXTURE_AT_INDEX[tostring(index)] = lowered
  INDEX_OF_TEXTURE[lowered] = index
}

export function builtInIndexOf(this: void, texture: string): number | undefined {
  let lowered = string.lower(canonicalTexture(texture))
  if (string.sub(lowered, 1, 1) === "/") {
    lowered = string.sub(lowered, 2)
  }
  return INDEX_OF_TEXTURE[lowered]
}

export function builtInTextureAt(this: void, index: string): string | undefined {
  return TEXTURE_AT_INDEX[index]
}

export function canonicalTexture(this: void, texture: string): string {
  const start = string.sub(texture, 1, 1) === "/" ? 2 : 1
  const folder = string.sub(texture, start, start + SHIPPED_FOLDER.length - 1)
  if (folder !== SHIPPED_FOLDER) {
    return texture
  }
  return `M0RMarkers/textures/${string.sub(texture, start + SHIPPED_FOLDER.length)}`
}

export function drawnTexture(this: void, texture: string): string {
  const start = string.sub(texture, 1, 1) === "/" ? 2 : 1
  const folder = string.lower(string.sub(texture, start, start + UPSTREAM_FOLDER.length - 1))
  if (folder !== UPSTREAM_FOLDER) {
    return texture
  }
  return SHIPPED_FOLDER + string.sub(texture, start + UPSTREAM_FOLDER.length)
}
