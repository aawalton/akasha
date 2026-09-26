import {
  compressLoaded,
  decompressString,
  saveIcons,
} from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import { showNotice } from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import { refreshMarkerPins } from "akasha/temper/addon/pages/world/markers/modules/markers-map-pins/markers-map-pins.module.code.ts"
import { isReadOnly } from "akasha/temper/addon/pages/world/markers/modules/markers-placing/markers-placing.module.code.ts"
import {
  startCulling,
  unloadEverything,
  updateMarkerPositions,
} from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  MM,
  refreshExport,
  refreshLoadedProfile,
  refreshWidget,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"

export const PROFILE_DROPDOWN = "TemperWorldMarkersProfileDropdown"
export const ADDITIONAL_DROPDOWN = "TemperWorldMarkersProfileDropdownAdditional"

function currentZone(this: void): number {
  const [zone] = GetUnitRawWorldPosition("player")
  return zone
}

function storedString(this: void, zone: number, profileName: string): string | undefined {
  const pieces = MM.vars.Profiles[zone]?.[profileName]
  return pieces === undefined ? undefined : table.concat(pieces, "")
}

export function loadZone(this: void, zone: number): string | undefined {
  const zoneString = storedString(zone, MM.vars.loadedProfile[zone] ?? "Default")
  if (zoneString !== undefined && zoneString !== "") {
    decompressString(zoneString)
  }
  MM.exportString = zoneString ?? ""
  refreshExport()
  return zoneString
}

export function importIcons(this: void, given: string, overwrite: boolean): string | undefined {
  if (isReadOnly()) return undefined
  if (overwrite) unloadEverything()
  decompressString(given)
  const zoneString = overwrite ? given : compressLoaded()
  saveIcons(zoneString)
  MM.exportString = zoneString
  refreshExport()
  return zoneString
}

export function emptyCurrentZone(this: void): undefined {
  if (isReadOnly()) return undefined
  unloadEverything()
  saveIcons("")
  MM.exportString = ""
  refreshExport()
  return undefined
}

export function loadProfile(this: void, profileName: string): undefined {
  const zone = currentZone()
  MM.vars.loadedProfile[zone] = profileName
  unloadEverything()
  if (loadZone(zone) === undefined) {
    saveIcons("")
  }
  MM.currentAdditionalProfiles = []
  MM.multipleProfilesLoaded = false
  refreshWidget(PROFILE_DROPDOWN)
  return undefined
}

export function deleteCurrentProfile(this: void): undefined {
  const zone = currentZone()
  const profileName = MM.vars.loadedProfile[zone] ?? "Default"
  const profiles = MM.vars.Profiles[zone]
  if (profiles !== undefined) {
    profiles[profileName] = undefined
  }
  MM.vars.loadedProfile[zone] = undefined
  unloadEverything()
  loadZone(zone)
  MM.currentAdditionalProfiles = []
  MM.multipleProfilesLoaded = false
  showNotice("Notice", `The profile ${tostring(profileName)} was deleted.`, "")
  refreshWidget(PROFILE_DROPDOWN)
  refreshLoadedProfile()
  return undefined
}

export function renameCurrentProfile(
  this: void,
  newName: string | undefined,
  keepOld?: boolean
): undefined {
  if (newName === undefined) {
    showNotice("Notice", "Failed to find a name to rename the current profile to.", "")
    return undefined
  }
  const zone = currentZone()
  const profileName = MM.vars.loadedProfile[zone] ?? "Default"
  const profiles = MM.vars.Profiles[zone]
  const pieces = profiles?.[profileName]
  if (profiles !== undefined && pieces !== undefined) {
    profiles[newName] = ZO_ShallowTableCopy(pieces)
    if (keepOld !== true) {
      profiles[profileName] = undefined
    }
    MM.vars.loadedProfile[zone] = newName
    refreshWidget(PROFILE_DROPDOWN)
    refreshLoadedProfile()
  }
  return undefined
}

export function createMergedProfile(
  this: void,
  newName: string,
  selectedProfiles: readonly string[]
): undefined {
  loadProfile(newName)
  const zone = currentZone()
  let zoneString: string | undefined
  for (const profileName of selectedProfiles) {
    if (MM.vars.Profiles[zone] !== undefined) {
      zoneString = storedString(zone, profileName) ?? zoneString
      decompressString(zoneString ?? "")
    }
  }
  const merged = compressLoaded()
  saveIcons(merged)
  MM.exportString = merged
  refreshExport()
  return undefined
}

export function getCurrentZoneProfiles(this: void): string[] {
  const profiles = MM.vars.Profiles[currentZone()]
  if (profiles === undefined) return ["Default"]
  const names: string[] = []
  if (profiles["Default"] === undefined) names.push("Default")
  for (const [name] of pairs(profiles)) names.push(name)
  return names
}

function updateChoices(this: void, reference: string, refresh: boolean): undefined {
  const widget = _G[reference] as LamRefreshable | undefined
  if (widget === undefined) return undefined
  widget.UpdateChoices(getCurrentZoneProfiles())
  if (refresh) widget.UpdateValue()
  return undefined
}

export function updateProfileDropdown(
  this: void,
  refresh: boolean,
  onlyAdditional?: boolean
): undefined {
  updateChoices(ADDITIONAL_DROPDOWN, refresh)
  if (onlyAdditional !== true) updateChoices(PROFILE_DROPDOWN, refresh)
  return undefined
}

export function loadAdditionalProfiles(this: void, profiles: readonly string[]): undefined {
  const [zone] = GetUnitWorldPosition("player")
  const mainProfile = MM.vars.loadedProfile[zone] ?? "Default"
  MM.multipleProfilesLoaded = false
  unloadEverything()
  for (const profileName of profiles) {
    MM.multipleProfilesLoaded = true
    if (profileName !== mainProfile) {
      const zoneString = storedString(zone, profileName)
      if (zoneString !== undefined && zoneString !== "") decompressString(zoneString)
    }
  }
  loadZone(zone)
  return undefined
}

let oldZone = 0
let oldX = 0
let oldY = 0
let oldZ = 0

export function playerActivated(this: void): undefined {
  const zone = currentZone()
  if (oldZone !== zone) {
    oldZone = zone
    unloadEverything()
    loadZone(zone)
  }
  updateProfileDropdown(true)
  refreshLoadedProfile()
  updateMarkerPositions()
  ;[oldX, oldY, oldZ] = GuiRender3DPositionToWorldPosition(0, 0, 0)
  if (MM.vars.cullingDistance !== 0) startCulling()
  refreshMarkerPins()
  return undefined
}

export function playerZoneChanged(this: void): undefined {
  updateMarkerPositions()
  const [sx, sy, sz] = GuiRender3DPositionToWorldPosition(0, 0, 0)
  if (oldX !== sx || oldY !== sy || oldZ !== sz) {
    oldX = sx
    oldY = sy
    oldZ = sz
    updateMarkerPositions()
  }
  return undefined
}
