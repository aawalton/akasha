import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-settings-declarations/combat-alerts-settings-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  INDIVIDUAL_NAMES,
  refreshIndividualIconNames,
  SETTINGS_STATE,
  selectedIcon,
  unpackColor,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-settings-state/combat-alerts-settings-state.module.code.ts"

function textIsEmpty(this: void): boolean {
  if (SETTINGS_STATE.selectedIndividual === undefined) {
    return true
  }
  const text = selectedIcon().text
  return text === undefined || text === ""
}

export function individualIconSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "Individual Player Icons",
      controls: [
        {
          type: "description",
          text: "You can add individual icons for specific players here when they are in your group. They show over role and crown icons, while death and mechanic icons show over the individual icons. Note: these icons will always show on top of objects.",
          width: "full",
        },
        {
          type: "editbox",
          name: "Add new player icon",
          tooltip:
            'Add a new individual player icon by typing the full account name here, e.g. @Kyzeragon. Case sensitive! If you set an icon for yourself, it will only show if you have "Show group icon for self" enabled under Group Member Icons settings',
          getFunc: () => "",
          setFunc: (name) => {
            if (name === undefined || name === "") {
              return
            }

            if (CRUTCH.savedOptions.drawing.attached.individualIcons[name] === undefined) {
              CRUTCH.AddIndividualIcon(name)
            }

            SETTINGS_STATE.selectedIndividual = name

            TemperCombatAlerts_IndividualIconsAddEditbox.editbox.SetText("")
          },
          isMultiline: false,
          isExtraWide: false,
          width: "full",
          reference: "TemperCombatAlerts_IndividualIconsAddEditbox",
        },
        {
          type: "divider",
          width: "half",
        },
        {
          type: "dropdown",
          name: "Select player to edit",
          tooltip: "Choose a player to edit individual icon for",
          choices: [],
          getFunc: () => {
            refreshIndividualIconNames()
            TemperCombatAlerts_IndividualIconsDropdown.UpdateChoices(
              INDIVIDUAL_NAMES,
              INDIVIDUAL_NAMES
            )
            return SETTINGS_STATE.selectedIndividual
          },
          setFunc: (value) => {
            SETTINGS_STATE.selectedIndividual = value as string
          },
          width: "full",
          reference: "TemperCombatAlerts_IndividualIconsDropdown",
        },
        {
          type: "button",
          name: "Delete player icon",
          tooltip: "Delete this individual player icon. This cannot be undone!",
          func: () => {
            CRUTCH.RemoveIndividualIcon(SETTINGS_STATE.selectedIndividual as string)
            CRUTCH.Drawing.RefreshGroup()

            SETTINGS_STATE.selectedIndividual = undefined

            refreshIndividualIconNames()
            TemperCombatAlerts_IndividualIconsDropdown.UpdateChoices(
              INDIVIDUAL_NAMES,
              INDIVIDUAL_NAMES
            )
          },
          warning: "Delete this individual player icon. This cannot be undone!",
          isDangerous: true,
          width: "full",
          disabled: () => SETTINGS_STATE.selectedIndividual === undefined,
        },
        {
          type: "divider",
        },
        {
          type: "dropdown",
          name: "Texture type",
          tooltip:
            "The base icon texture to display for this player. If choosing LibCustomIcons, you must have LibCustomIcons enabled, or the icon will be blank (but still override role icons)",
          choices: [
            CRUTCH.Constants.ICON_NONE,
            CRUTCH.Constants.CIRCLE,
            CRUTCH.Constants.DIAMOND,
            CRUTCH.Constants.CHEVRON,
            CRUTCH.Constants.CHEVRON_THIN,
            CRUTCH.Constants.LCI,
            CRUTCH.Constants.CUSTOM,
          ],
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return selectedIcon().type
            }
          },
          setFunc: (value) => {
            selectedIcon().type = value as string
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "full",
          disabled: () => SETTINGS_STATE.selectedIndividual === undefined,
        },
        {
          type: "editbox",
          name: "Custom texture path",
          tooltip:
            'If using a "Custom texture," the path of the texture. You can use base game textures or even textures from other addons. Examples: esoui/art/icons/targetdummy_voriplasm_01.dds or TemperCombat/assets/poop.dds\n\nFor base game textures, you can find them by using an addon like Circonians TextureIt, or online sources like UESP.\nFor addon textures, you can find them by browsing to the addon files and seeing where the files are, and using the same path, such as the CrutchAlerts poop path above, or OdySupportIcons/icons/lightning-bolt.dds',
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return selectedIcon().custom
            }
          },
          setFunc: (path) => {
            selectedIcon().custom = path
            CRUTCH.Drawing.RefreshGroup()
          },
          isMultiline: false,
          isExtraWide: true,
          width: "full",
          disabled: () =>
            SETTINGS_STATE.selectedIndividual === undefined ||
            selectedIcon().type !== CRUTCH.Constants.CUSTOM,
        },
        {
          type: "colorpicker",
          name: "Texture color",
          tooltip: "Color of the icon texture",
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return unpackColor(selectedIcon().color as number[])
            }
            return $multi()
          },
          setFunc: (r, g, b, a) => {
            selectedIcon().color = [r, g, b, a] as number[]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => SETTINGS_STATE.selectedIndividual === undefined,
        },
        {
          type: "slider",
          name: "Texture size",
          tooltip: "Size of icon texture",
          min: 0,
          max: 400,
          step: 10,
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return (selectedIcon().size as number) * 100
            }
          },
          setFunc: (value) => {
            selectedIcon().size = value / 100
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: () => SETTINGS_STATE.selectedIndividual === undefined,
        },
        {
          type: "divider",
          width: "half",
        },
        {
          type: "editbox",
          name: "Text",
          tooltip: "The text that appears on the icon",
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return selectedIcon().text
            }
          },
          setFunc: (text) => {
            selectedIcon().text = text
            CRUTCH.Drawing.RefreshGroup()
          },
          isMultiline: true,
          isExtraWide: true,
          width: "full",
          disabled: () => SETTINGS_STATE.selectedIndividual === undefined,
        },
        {
          type: "colorpicker",
          name: "Text color",
          tooltip: "Color of the text",
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return unpackColor(selectedIcon().textColor as number[])
            }
            return $multi()
          },
          setFunc: (r, g, b, a) => {
            selectedIcon().textColor = [r, g, b, a] as number[]
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: textIsEmpty,
        },
        {
          type: "slider",
          name: "Text size",
          tooltip: "Size of the text",
          min: 0,
          max: 200,
          step: 1,
          getFunc: () => {
            if (SETTINGS_STATE.selectedIndividual !== undefined) {
              return selectedIcon().textSize
            }
          },
          setFunc: (value) => {
            selectedIcon().textSize = value
            CRUTCH.Drawing.RefreshGroup()
          },
          width: "half",
          disabled: textIsEmpty,
        },
      ],
    },
  ]
}
