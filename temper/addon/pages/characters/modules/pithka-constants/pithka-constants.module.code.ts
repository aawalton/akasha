import {
  colorOf,
  hexOf,
  type TextRole,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"

export type Rgba = readonly [number, number, number, number]

export type TextureBundle = {
  readonly up: string
  readonly down: string
  readonly over: string
  readonly disabled: string
  readonly pressed: string
}

export const SCREEN_DIMENSIONS = {
  baseDungeons: [650, 550],
  trifectaDungeons: [950, 850],
  trials: [1150, 600],
  scoresAndTris: [950, 850],
} as const

const OPAQUE = 1

function roleRgba(this: void, role: TextRole): Rgba {
  const [red, green, blue] = colorOf(role)
  return [red, green, blue, OPAQUE]
}

export const TEXT_STRONG: Rgba = roleRgba("strong")
export const TEXT_MUTED: Rgba = roleRgba("muted")
export const TEXT_BODY: Rgba = roleRgba("body")
export const TEXT_ACCENT: Rgba = roleRgba("accent")
export const RGB_GREEN: Rgba = [0.2, 1, 0.2, 1]
export const HEX_ACCENT = `c${hexOf("accent")}`

export const DEFAULT_FONT = "ZoFontGame"
export const SMALL_FONT = "ZoFontGameSmall"

export const ICON_TEXTURE = "esoui/art/tutorial/ava_rankicon64_general.dds"
export const ICON_SIZE = 23
export const NAV_ICON_SIZE = 45

export const TEXTURES = {
  STAR: "esoui/art/tutorial/ava_rankicon64_general.dds",
  DUNGEON: "esoui/art/icons/poi/poi_dungeon_complete.dds",
  INSTANCE: "esoui/art/icons/poi/poi_groupinstance_complete.dds",
  TRIAL: "esoui/art/icons/mapkey/mapkey_solotrial.dds",
  CHECK: "esoui/art/buttons/accept_down.dds",
  BOX: "esoui/art/buttons/swatchframe_down.dds",
  X: "esoui/art/buttons/decline_up.dds",
  LOCK: "esoui/art/miscellaneous/locked_up.dds",
}

function bundle(this: void, stem: string): TextureBundle {
  return {
    up: `${stem}_up.dds`,
    down: `${stem}_down.dds`,
    over: `${stem}_over.dds`,
    disabled: `${stem}_disabled.dds`,
    pressed: `${stem}_pressed.dds`,
  }
}

export const TEXTURE_BUNDLES = {
  HEALER: bundle("esoui/art/lfg/lfg_healer"),
  TANK: bundle("esoui/art/lfg/lfg_tank"),
  DPS: bundle("esoui/art/lfg/lfg_dps"),
  NORMAL: bundle("/esoui/art/lfg/lfg_normaldungeon"),
  VETERAN: bundle("/esoui/art/lfg/lfg_veterandungeon"),
  DUNGEON: bundle("/esoui/art/lfg/lfg_indexicon_dungeon"),
  TRIAL: bundle("/esoui/art/lfg/lfg_indexicon_trial"),
  COMPOSE: bundle("/esoui/art/mail/mail_tabicon_compose"),
}
