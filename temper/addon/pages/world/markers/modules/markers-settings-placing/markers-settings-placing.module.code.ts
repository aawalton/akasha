import { showDialogue } from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  placeIcon,
  removeClosestIcon,
  setYaw,
} from "akasha/temper/addon/pages/world/markers/modules/markers-placing/markers-placing.module.code.ts"
import {
  MM,
  refreshWidget,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import {
  BUILT_IN_TEXTURES,
  drawnTexture,
} from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

export type MarkerOption = Record<string, unknown>

export const COLOUR_PRESETS: readonly string[] = [
  "|cffffffWhite|r",
  "|c0000ffBlue|r",
  "|c00ff00Green|r",
  "|cff8000Orange|r",
  "|cff00e6Pink|r",
  "|cff0000Red|r",
  "|cffcc00Yellow|r",
  "|c00ffa6Lime Green|r",
]

const PRESET_RGBA: readonly number[][] = [
  [1, 1, 1, 1],
  [0, 0, 1, 1],
  [0, 1, 0, 1],
  [1, 0.5, 0, 1],
  [1, 0, 0.9, 1],
  [1, 0, 0, 1],
  [1, 0.8, 0, 1],
  [0, 1, 0.65, 1],
]

export const RGBA_OF_PRESET: Record<string, number[] | undefined> = {}
export const PRESET_OF_HEX: Record<string, string | undefined> = {}
COLOUR_PRESETS.forEach((preset, index) => {
  RGBA_OF_PRESET[preset] = PRESET_RGBA[index]
  PRESET_OF_HEX[string.sub(preset, 3, 8)] = preset
})

export const TEXTURE_CHOICES: string[] = []
export const TEXTURE_OF_CHOICE: Record<string, string | undefined> = {}
export const CHOICE_OF_TEXTURE: Record<string, string | undefined> = {}
for (const texture of BUILT_IN_TEXTURES) {
  const [reversed] = string.match(string.reverse(texture), "sdd.(.-)/")
  const choice = `|t24:24:${drawnTexture(texture)}|t (${string.reverse(reversed ?? "")})`
  TEXTURE_CHOICES.push(choice)
  TEXTURE_OF_CHOICE[choice] = texture
  CHOICE_OF_TEXTURE[texture] = choice
}

export function hexOf(this: void, rgba: readonly number[] | undefined): string {
  const colour = rgba ?? [1, 1, 1, 1]
  return ZO_ColorDef.FloatsToHex(colour[0] ?? 1, colour[1] ?? 1, colour[2] ?? 1, colour[3] ?? 1)
}

export function placingOptions(this: void): MarkerOption[] {
  const selections = MM.currentSelections
  return [
    { type: "description", title: "|cFFD700[Place Markers]|r", width: "full" },
    {
      type: "dropdown",
      name: "Texture",
      choices: TEXTURE_CHOICES,
      tooltip: "",
      getFunc: () => CHOICE_OF_TEXTURE[selections.texture ?? ""],
      setFunc: (value: string) => {
        selections.texture = TEXTURE_OF_CHOICE[value]
      },
    },
    {
      type: "dropdown",
      name: "Preset Colours",
      width: "half",
      tooltip:
        "Select one of a few default colours, or use the colour picker to fully create your own!",
      choices: COLOUR_PRESETS,
      getFunc: () => PRESET_OF_HEX[hexOf(selections.rgba)],
      setFunc: (value: string) => {
        selections.rgba = RGBA_OF_PRESET[value]
      },
    },
    {
      type: "colorpicker",
      name: "Colour Picker",
      tooltip: "",
      width: "half",
      getFunc: () => {
        const colour = selections.rgba ?? [1, 1, 1, 1]
        return $multi(colour[0] ?? 1, colour[1] ?? 1, colour[2] ?? 1, colour[3] ?? 1)
      },
      setFunc: (r: number, g: number, b: number, a: number) => {
        selections.rgba = [r, g, b, a]
      },
    },
    {
      type: "slider",
      name: "Size (cm)",
      tooltip: "This is the diameter of the marker. (1 meter = 100 cm)",
      min: 10,
      max: 1000,
      step: 10,
      width: "half",
      getFunc: () => (selections.size ?? 1) * 100,
      setFunc: (value: number) => {
        selections.size = value / 100
      },
    },
    {
      type: "editbox",
      name: "Text",
      tooltip: "",
      width: "half",
      isMultiline: true,
      getFunc: () => selections.text,
      setFunc: (text: string) => {
        selections.text = text
      },
    },
    {
      type: "button",
      name: "|cFF5555Remove Icon|r",
      warning: "This will remove the closest icon to you.",
      width: "half",
      func: () => {
        showDialogue(
          "Warning: Destructive Action",
          "Are you sure you would like to remove the closest marker on the ground?",
          "This is a destructive action and cannot be undone.",
          () => removeClosestIcon()
        )
      },
    },
    { type: "button", name: "Place Icon", width: "half", func: () => placeIcon() },
    {
      type: "submenu",
      name: "[Advanced Placing]",
      tooltip: "",
      controls: [
        {
          type: "checkbox",
          name: "Facing User",
          tooltip:
            "If this is enabled, markers will be 'floating' in the air and always turn to face the user.",
          warning:
            "When turning off 'Facing User' to create flat icons, it is recommended to set your vertical offset to 0%",
          width: "half",
          getFunc: () => selections.floating,
          setFunc: (value: boolean) => {
            selections.floating = value
          },
        },
        {
          type: "button",
          name: "Set Yaw to Camera Yaw",
          tooltip:
            "This will set the yaw slider below to what your camera was facing before you entered the settings menu.",
          width: "half",
          func: () => {
            setYaw()
            refreshWidget("TemperWorldMarkersAdvancedYaw")
          },
        },
        {
          type: "slider",
          name: "Yaw",
          tooltip: "If 'Facing User' is off, this will rotate the marker around the vertical axis.",
          min: 0,
          max: 360,
          step: 1,
          reference: "TemperWorldMarkersAdvancedYaw",
          width: "half",
          getFunc: () => selections.yaw,
          setFunc: (value: number) => {
            selections.yaw = value
          },
        },
        {
          type: "slider",
          name: "Pitch",
          tooltip: "If 'Facing User' is off, this will rotate the marker up and down vertically.",
          min: -90,
          max: 90,
          step: 1,
          width: "half",
          getFunc: () => selections.pitch,
          setFunc: (value: number) => {
            selections.pitch = value
          },
        },
        {
          type: "editbox",
          name: "Custom Texture",
          tooltip:
            "If you want to use a custom texture (either in base game or included in an addon), type the texture path into this box.",
          getFunc: () => selections.texture,
          setFunc: (value: string) => {
            selections.texture = value
          },
        },
        {
          type: "slider",
          name: "Vertical Offset",
          tooltip:
            "This will adjust the vertical offset of the marker, in percentage.\n50% means that the bottom of the marker will be at the ground, and 0% means that the center of the marker will be on the ground.",
          min: -100,
          max: 300,
          step: 5,
          getFunc: () => selections.offsetYPercent,
          setFunc: (value: number) => {
            selections.offsetYPercent = value
          },
        },
      ],
    },
    {
      type: "button",
      name: "Open Editor",
      tooltip: "Click this button to open the profile editor!",
      width: "full",
      func: () => {
        SCENE_MANAGER.Push("TemperWorldMarkerEditorScene")
      },
    },
    {
      type: "description",
      text: "You can display a marker preview on your world map/mini map by enabling the map filter in your world map!",
      width: "full",
    },
    { type: "divider" },
  ]
}
