import { showDialogue } from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import { emptyCurrentZone } from "akasha/temper/addon/pages/world/markers/modules/markers-profiles/markers-profiles.module.code.ts"
import { initQuickMenu } from "akasha/temper/addon/pages/world/markers/modules/markers-quick-menu/markers-quick-menu.module.code.ts"
import { startCulling } from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  appendImport,
  overwriteImport,
} from "akasha/temper/addon/pages/world/markers/modules/markers-settings-import/markers-settings-import.module.code.ts"
import {
  type MarkerOption,
  placingOptions,
} from "akasha/temper/addon/pages/world/markers/modules/markers-settings-placing/markers-settings-placing.module.code.ts"
import { profileOptions } from "akasha/temper/addon/pages/world/markers/modules/markers-settings-profiles/markers-settings-profiles.module.code.ts"
import {
  MM,
  refreshExport,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import { BUILT_IN_TEXTURES } from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

export const SETTINGS_PANEL = "TemperWorldMarkersSettingsPanel"

const IMPORT_HINT =
  "Insert either a More Markers Profile String here, or insert an Elm's Markers or Akamatsu's Marker Import String to automatically convert it."

const FONT_FACES: Record<string, string> = {
  GAMEPAD_BOLD_FONT: "Bold",
  GAMEPAD_MEDIUM_FONT: "Medium",
  GAMEPAD_LIGHT_FONT: "Light",
  GAMEPAD_MEDIUM_FONT_LATIN: "Latin",
  ANTIQUE_FONT: "Antique",
  HANDWRITTEN_FONT: "Handwritten",
  STONE_TABLET_FONT: "Stone Tablet",
}

const FONT_EFFECTS: Record<string, string> = {
  "|thick-outline": "Thick Outline",
  "|soft-shadow-thick": "Soft Shadow Thick",
  "|soft-shadow-thin": "Soft Shadow Thin",
  "": "No Effect",
}

function inverted(
  this: void,
  names: Record<string, string>
): LuaMultiReturn<[Record<string, string>, string[]]> {
  const lookup: Record<string, string> = {}
  const displays: string[] = []
  for (const [key, display] of pairs(names)) {
    lookup[display] = key
    displays.push(display)
  }
  table.sort(displays)
  return $multi(lookup, displays)
}

let panel: Control | undefined

function asOptionControls(this: void, options: unknown): LamControlData[] {
  return options as LamControlData[]
}

export function settingsPanel(this: void): Control | undefined {
  return panel
}

function fontOptions(this: void): MarkerOption[] {
  const [faceOf, faces] = inverted(FONT_FACES)
  const [effectOf, effects] = inverted(FONT_EFFECTS)
  return [
    {
      type: "dropdown",
      name: "Change Font",
      width: "half",
      tooltip: "Click this button to change the font!",
      warning: "Changes will only take affect after you load a new profile/zone.",
      choices: faces,
      getFunc: () => FONT_FACES[MM.vars.fontface],
      setFunc: (value: string) => {
        MM.vars.fontface = faceOf[value] ?? "GAMEPAD_BOLD_FONT"
      },
    },
    {
      type: "dropdown",
      name: "Change Font Effect",
      width: "half",
      tooltip: "Click this button to change the font effect!",
      warning: "Changes will only take affect after you load a new profile/zone.",
      choices: effects,
      getFunc: () => FONT_EFFECTS[MM.vars.fonteffect],
      setFunc: (value: string) => {
        MM.vars.fonteffect = effectOf[value] ?? "|thick-outline"
      },
    },
  ]
}

function importOptions(this: void): MarkerOption[] {
  let importString = ""
  return [
    {
      type: "editbox",
      name: "Import Markers String / Convert Elms Markers or Akamatsu's Marker String",
      tooltip: IMPORT_HINT,
      width: "full",
      isMultiline: true,
      maxChars: 10000,
      reference: "TemperWorldMarkersImportEditBox",
      default: IMPORT_HINT,
      isExtraWide: true,
      getFunc: () => importString,
      setFunc: (text: string) => {
        importString = text
      },
    },
    {
      type: "button",
      name: "Append to Profile",
      tooltip:
        "Clicking this button will add the markers to your current profile without removing anything.",
      width: "half",
      func: () => appendImport(importString),
    },
    {
      type: "button",
      name: "|cFF5555Overwrite Profile|r",
      warning:
        "Clicking this button will add the markers to your current profile, replacing all of the markers loaded.",
      width: "half",
      func: () => overwriteImport(importString),
    },
    { type: "divider" },
    {
      type: "editbox",
      name: "Export String",
      tooltip:
        "Sharing this string to other people will allow them to import your currently loaded profile.",
      width: "full",
      isMultiline: true,
      maxChars: 10000,
      reference: "TemperWorldMarkersExportEditBox",
      isExtraWide: true,
      getFunc: () => MM.exportString,
      setFunc: () => undefined,
    },
    {
      type: "button",
      name: "|cFF5555Clear Zone|r",
      tooltip: "",
      warning:
        "This will delete all markers in the current zone, similar to the 'Delete Profile' button above.",
      width: "full",
      func: () => {
        showDialogue(
          "Warning: Destructive Action",
          "Are you sure you would like to empty the current zone?",
          "This is a destructive action and cannot be undone.",
          () => {
            emptyCurrentZone()
            refreshExport()
          }
        )
      },
    },
    { type: "divider" },
  ]
}

function globalOptions(this: void): MarkerOption[] {
  return [
    { type: "description", title: "|cFFD700[Global Settings]|r", width: "full" },
    {
      type: "slider",
      name: "Global Size Multiplier (%)",
      tooltip:
        "This multiplier gets applied to all markers, on top of their normal size multipliers.\n\nChanges will only take affect after you load a new profile/zone.",
      warning:
        "The markers are made to match in game units, changing the global size may make certain markers inaccurate (ie. vAS Jumps).",
      min: 10,
      max: 200,
      step: 5,
      width: "half",
      getFunc: () => MM.vars.globalMult * 100,
      setFunc: (value: number) => {
        MM.vars.globalMult = value / 100
      },
    },
    {
      type: "slider",
      name: "Culling Distance (m)",
      tooltip:
        "Markers further than this distance will be hidden from the player. Setting this to 0 will disable culling.",
      min: 0,
      max: 200,
      step: 10,
      width: "half",
      getFunc: () => MM.vars.cullingDistance,
      setFunc: (value: number) => {
        MM.vars.cullingDistance = value
        startCulling()
      },
    },
    {
      type: "slider",
      name: "Font Scale Multiplier (%)",
      tooltip:
        "This multiplier will apply to all text elements in markers, on top of their normal size multipliers.\n\nChanges will only take affect after you load a new profile/zone.",
      min: 5,
      max: 200,
      step: 5,
      width: "half",
      getFunc: () => MM.vars.fontScale * 100,
      setFunc: (value: number) => {
        MM.vars.fontScale = value / 100
      },
    },
  ]
}

export function createSettings(this: void): undefined {
  const vars = MM.vars
  vars.currentSelections = vars.currentSelections ?? {
    text: "",
    offsetYPercent: 50,
    texture: BUILT_IN_TEXTURES[0],
    floating: true,
    rgba: [1, 1, 1, 1],
    size: 1,
    yaw: 0,
    pitch: -90,
  }
  MM.currentSelections = vars.currentSelections
  vars.quickSelections = vars.quickSelections ?? {
    text: "",
    offsetY: 50,
    texture: BUILT_IN_TEXTURES[0],
    floating: true,
    rgba: [1, 1, 1, 1],
    size: 1,
    yaw: 0,
    pitch: -90,
  }
  MM.quickSelections = vars.quickSelections
  initQuickMenu()

  MM.exportString = ""
  MM.currentLoadProfileName = "Default"
  MM.currentAdditionalProfiles = []
  MM.multipleProfilesLoaded = false

  const options: MarkerOption[] = []
  for (const part of [
    placingOptions(),
    profileOptions(),
    importOptions(),
    globalOptions(),
    fontOptions(),
  ]) {
    for (const option of part) options.push(option)
  }
  panel = TemperAddonMenu.RegisterAddonPanel(SETTINGS_PANEL, {
    type: "panel",
    name: "|cFFD700More Markers|r",
    author: "|c0DC1CF@M0R_Gaming|r",
    slashCommand: "/mmarkers",
  })
  TemperAddonMenu.RegisterOptionControls(SETTINGS_PANEL, asOptionControls(options))
  return undefined
}
