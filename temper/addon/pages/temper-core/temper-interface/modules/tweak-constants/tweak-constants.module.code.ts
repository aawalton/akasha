import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"

export const ADDON_NAME = "TemperTweaks"

export const SAVED_VARIABLES_NAME = "TemperFCOChangeStuff_SavedVariables"

export const SAVED_VARS_VERSION = "0.02"

export const ADDON_VERSION_NUMBER = 0.595

export const ADDON_NAME_MENU = "Temper Interface"
export const ADDON_NAME_MENU_DISPLAY = "|c00FF00Temper |cFFFF00Interface|r"
export const ADDON_NAME_SHORT_COLORED = "|c00FF00T|cFFFF00I|r"
export const ADDON_SETTINGS_NAME = "Temper Interface"
export const ADDON_AUTHOR = "AlanGaming"

export const SPIN_FRAGMENTS: readonly unknown[] = [
  FRAME_PLAYER_FRAGMENT,
  FRAME_EMOTE_FRAGMENT_INVENTORY,
  FRAME_EMOTE_FRAGMENT_SKILLS,
  FRAME_EMOTE_FRAGMENT_JOURNAL,
  FRAME_EMOTE_FRAGMENT_MAP,
  FRAME_EMOTE_FRAGMENT_SOCIAL,
  FRAME_EMOTE_FRAGMENT_AVA,
  FRAME_EMOTE_FRAGMENT_SYSTEM,
  FRAME_EMOTE_FRAGMENT_LOOT,
  FRAME_EMOTE_FRAGMENT_CHAMPION,
]

export const SCENES_BLACKLISTED: Readonly<Record<string, boolean>> = {
  hudui: true,
}

export const SCENE_DELAYS: Readonly<Record<string, number>> = {
  hud: 0,
  hudui: 0,
}

export const KEYBIND_TOGGLE_SETTINGS_COMPASS_QUEST_GIVERS =
  "FCOCS_TOGGLE_SETTINGS_COMPASS_QUEST_GIVERS"
export const KEYBIND_TOGGLE_SETTINGS_INNOCENT_ATTACK = "FCOCS_TOGGLE_SETTINGS_INNOCENT_ATTACK"

export const BINDING_NAME_STRINGS: ReadonlyArray<readonly [string, string]> = [
  ["SI_BINDING_NAME_FCOCS_ADDON_SETTINGS_MENU", "AddOns"],
  ["SI_BINDING_NAME_FCOCS_MAP_PLAYER_PIN_PING_PONG", "Map: Player pin ping pong"],
  ["SI_BINDING_NAME_FCOCS_TOGGLE_SETTINGS_COMPASS_QUEST_GIVERS", "Settings: Compass quest givers"],
  ["SI_BINDING_NAME_FCOCS_TOGGLE_AUDIO_MUTE_SFX", "Mute/restore audio SFX"],
  [
    "SI_BINDING_NAME_FCOCS_TOGGLE_GROUP_ELECTION_AUTO_DECLINE",
    "Toggle Auto decline (group elections)",
  ],
  ["SI_BINDING_NAME_FCOCS_SWITCH_BANK_PANEL", "Switch bank panel (deposit/withdraw)"],
  ["SI_BINDING_NAME_FCOCS_TOGGLE_SETTINGS_INNOCENT_ATTACK", "Toggle innocent attack"],
  ["SI_BINDING_NAME_FCOCS_TOGGLE_TOGGLE_PROM_EVENT_TRACKER", "Toggle golden pursuits UI"],
  ["SI_BINDING_NAME_FCOCS_TOGGLE_SYSTEM", "ESC key behavior"],
]
