import { showEditor } from "akasha/temper/addon/pages/world/markers/modules/markers-editor-scene/markers-editor-scene.module.code.ts"
import { initMarkerPins } from "akasha/temper/addon/pages/world/markers/modules/markers-map-pins/markers-map-pins.module.code.ts"
import {
  placeIcon,
  placeQuickMenuIconAtCursor,
  removeClosestIcon,
  setYaw,
  toggleQuickMenu,
} from "akasha/temper/addon/pages/world/markers/modules/markers-placing/markers-placing.module.code.ts"
import {
  insertPremades,
  LATEST_PRESET_VERSION,
} from "akasha/temper/addon/pages/world/markers/modules/markers-premades/markers-premades.module.code.ts"
import { showProfileSelect } from "akasha/temper/addon/pages/world/markers/modules/markers-profile-dialogs/markers-profile-dialogs.module.code.ts"
import {
  playerActivated,
  playerZoneChanged,
} from "akasha/temper/addon/pages/world/markers/modules/markers-profiles/markers-profiles.module.code.ts"
import { initRender } from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  createSettings,
  settingsPanel,
} from "akasha/temper/addon/pages/world/markers/modules/markers-settings/markers-settings.module.code.ts"
import {
  initSharing,
  sendTempMarker,
} from "akasha/temper/addon/pages/world/markers/modules/markers-sharing/markers-sharing.module.code.ts"
import {
  CHAT_PREFIX,
  DEFAULT_VARS,
  type MarkersVars,
  MM,
  refreshWidget,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/type/lib-radial-menu/lib-radial-menu.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

const EVENT_NAMESPACE = "TemperWorldMarkers"
const VAR_VERSION = 1
const INSTALLATION_WIDE = "$InstallationWide"

const BINDING_NAMES: readonly (readonly [string, string])[] = [
  ["SI_BINDING_NAME_M0RMARKERS_TOGGLE_QUICK_MENU", "Toggle Quick Menu Visibility"],
  ["SI_BINDING_NAME_M0RMARKERS_REMOVE_MARKER", "|cFFB6C1Remove Closest Marker|r"],
  ["SI_BINDING_NAME_M0RMARKERS_PLACE_MARKER", "|c98FB98Place Marker (Settings Configured)|r"],
  [
    "SI_BINDING_NAME_M0RMARKERS_PLACE_QUICK_MARKER",
    "|c98FB98Place Marker (Quick Menu Configured)|r",
  ],
  [
    "SI_BINDING_NAME_M0RMARKERS_PLACE_QUICK_MARKER_CURSOR",
    "|c98FB98Place Marker at Cursor (Quick Menu Configured)|r",
  ],
  ["SI_BINDING_NAME_M0RMARKERS_REMOVE_MARKER_CURSOR", "|cFFB6C1Remove Marker at Cursor|r"],
  ["SI_BINDING_NAME_M0RMARKERS_PLACE_TEMP_MARKER", "|c98FB98Send Temporary Marker at Reticle|r"],
]

for (const [id, text] of BINDING_NAMES) ZO_CreateStringId(id, text)

SLASH_COMMANDS["/mmplace"] = () => placeIcon()
SLASH_COMMANDS["/mmremove"] = () => removeClosestIcon()
SLASH_COMMANDS["/mmyaw"] = () => {
  const yaw = setYaw()
  d(string.format(`${CHAT_PREFIX}Set the configured marker yaw to %d degrees.`, yaw))
  refreshWidget("TemperWorldMarkersAdvancedYaw")
}
SLASH_COMMANDS["/mmmenu"] = () => toggleQuickMenu()
SLASH_COMMANDS["/mmshoweditor"] = () => showEditor()

function loadVars(this: void): undefined {
  const evenOlderVars = ZO_SavedVars.NewAccountWide<Record<string, unknown>>(
    "TemperWorldMarkers",
    VAR_VERSION,
    undefined,
    {}
  )
  const oldVars = ZO_SavedVars.NewAccountWide<Record<string, unknown>>(
    "TemperWorldMarkers",
    VAR_VERSION,
    undefined,
    {},
    undefined,
    INSTALLATION_WIDE
  )
  MM.vars = ZO_SavedVars.NewAccountWide<MarkersVars>(
    "TemperWorldSavedMarkers",
    VAR_VERSION,
    undefined,
    ZO_DeepTableCopy(DEFAULT_VARS),
    undefined,
    INSTALLATION_WIDE
  )
  for (const key of ["Profiles", "loadedProfile"]) {
    const older = evenOlderVars[key]
    if (older !== undefined) {
      oldVars[key] = ZO_DeepTableCopy(older)
      evenOlderVars[key] = undefined
    }
  }
  if (oldVars["Profiles"] === undefined) return undefined
  const vars: Record<string, unknown> = MM.vars
  const keys: string[] = ["currentSelections", "quickSelections"]
  for (const [key] of pairs(DEFAULT_VARS)) keys.push(key)
  for (const key of keys) {
    const value = oldVars[key]
    if (value !== undefined) {
      vars[key] = type(value) === "table" ? ZO_DeepTableCopy(value) : value
      oldVars[key] = undefined
    }
  }
  return undefined
}

function registerRadialMenu(this: void): undefined {
  const radial = LibRadialMenu
  if (radial === undefined) return undefined
  radial.RegisterAddon("moremarkers", "More Markers")
  radial.RegisterEntry(
    "moremarkers",
    "Place Marker",
    "place",
    "TemperWorld/textures/PlaceMarker.dds",
    () => placeIcon(),
    "Places a configured marker at your feet."
  )
  radial.RegisterEntry(
    "moremarkers",
    "Remove Marker",
    "remove",
    "TemperWorld/textures/RemoveMarker.dds",
    () => removeClosestIcon(),
    "Removes the closest marker to you."
  )
  radial.RegisterEntry(
    "moremarkers",
    "Place Marker at Reticle",
    "placecursor",
    "TemperWorld/textures/PlaceAtCursor.dds",
    () => placeQuickMenuIconAtCursor(true),
    "Places a configured marker at your current reticle location."
  )
  radial.RegisterEntry(
    "moremarkers",
    "Open Settings",
    "opensettings",
    "TemperWorld/textures/OpenSettings.dds",
    () => TemperAddonMenu.OpenToPanel(settingsPanel()),
    "Opens the More Markers settings page."
  )
  radial.RegisterEntry(
    "moremarkers",
    "Open Editor",
    "openeditor",
    "TemperWorld/textures/EditorIcon.dds",
    () => showEditor(),
    "Opens the More Markers Editor scene."
  )
  radial.RegisterEntry(
    "moremarkers",
    "Change Profiles",
    "changeprofile",
    "TemperWorld/textures/ProfileSelectIcon.dds",
    () => showProfileSelect(),
    "Opens a popup to change the current loaded profile!"
  )
  radial.RegisterEntry(
    "moremarkers",
    "Send Temporary Marker at Reticle",
    "sendtempmarker",
    "TemperWorld/textures/PlaceTempMarker.dds",
    () => sendTempMarker(),
    "Sends your reticle location to everyone else in the group, visible as a temporary marker!"
  )
  return undefined
}

export function initMarkers(this: void): undefined {
  initRender()
  initSharing()
  loadVars()
  if (ZO_IsTableEmpty(MM.vars.Profiles)) {
    insertPremades()
  } else if (MM.vars.currentPresetVersion < LATEST_PRESET_VERSION) {
    insertPremades(true)
    MM.vars.currentPresetVersion = LATEST_PRESET_VERSION
  }
  EVENT_MANAGER.RegisterForEvent(EVENT_NAMESPACE, EVENT_PLAYER_ACTIVATED, playerActivated)
  EVENT_MANAGER.RegisterForEvent(EVENT_NAMESPACE, EVENT_ZONE_CHANGED, playerZoneChanged)
  createSettings()
  registerRadialMenu()
  initMarkerPins()
  return undefined
}
