import { enableCharacterFragment } from "../fco-bank/fco-bank.module.code.ts"
import { guildHistoryNavigationHelper } from "../fco-guild-history/fco-guild-history.module.code.ts"
import {
  easyDestroy,
  noNewMenuCategoryFlashAnimation,
} from "../fco-inventory/fco-inventory.module.code.ts"
import { verticalScrollbarHacks } from "../fco-inventory-scrollbar/fco-inventory-scrollbar.module.code.ts"
import type { AddonSettings, IconPosBox } from "../fco-types/fco-types.module.code.ts"

export function buildInventoryControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  const learnableIconPos = settings.learnableItemIconPos
  const learnableIconPosDefaults = defaults.learnableItemIconPos
  const posFor = (bagId: number): IconPosBox =>
    learnableIconPos[bagId] ?? { x: 0, y: 0, width: 0, height: 0 }
  const defaultPosFor = (bagId: number): IconPosBox =>
    learnableIconPosDefaults[bagId] ?? { x: 0, y: 0, width: 0, height: 0 }

  const iconPosSliders = (bagId: number, label: string): LamControlData[] => [
    {
      type: "slider",
      name: "Size (" + label + ")",
      tooltip: "Change the size of the learnable item icon in the " + label.toLowerCase(),
      min: 4,
      max: 100,
      step: 2,
      getFunc: () => posFor(bagId).width,
      setFunc: (value) => {
        const pos = posFor(bagId)
        pos.width = value
        pos.height = value
      },
      default: defaultPosFor(bagId).width,
      width: "full",
    },
    {
      type: "slider",
      name: "Position X (" + label + ")",
      tooltip: "Change the X position of the learnable item icon in the " + label.toLowerCase(),
      min: -30,
      max: 600,
      step: 1,
      getFunc: () => posFor(bagId).x,
      setFunc: (value) => {
        posFor(bagId).x = value
      },
      default: defaultPosFor(bagId).x,
      width: "half",
    },
    {
      type: "slider",
      name: "Position Y (" + label + ")",
      tooltip: "Change the Y position of the learnable item icon in the " + label.toLowerCase(),
      min: -50,
      max: 100,
      step: 1,
      getFunc: () => posFor(bagId).y,
      setFunc: (value) => {
        posFor(bagId).y = value
      },
      default: defaultPosFor(bagId).y,
      width: "half",
    },
  ]

  const controls: LamControlData[] = [
    { type: "header", name: "Inventory" },
    {
      type: "checkbox",
      name: 'Remove "New item" icon & animation',
      tooltip: "Remove the animation and icon for new items in the inventories",
      getFunc: () => settings.removeNewItemIcon === true,
      setFunc: (value) => {
        settings.removeNewItemIcon = value
        noNewMenuCategoryFlashAnimation()
      },
      default: defaults.removeNewItemIcon === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: 'Remove "Not sellable item" icon & animation',
      tooltip: "Remove the animation and icon for items which are not sellable at a vendor",
      getFunc: () => settings.removeSellItemIcon === true,
      setFunc: (value) => {
        settings.removeSellItemIcon = value
      },
      default: defaults.removeSellItemIcon === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: 'Remove "Learnable item" icon',
      tooltip: "Remove the icon for learnable items in the inventories",
      getFunc: () => settings.removeLearnableItemIcon === true,
      setFunc: (value) => {
        settings.removeLearnableItemIcon = value
      },
      default: defaults.removeLearnableItemIcon === true,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Keep icon in Loot",
      tooltip: "Keep the learnabkle icon in the loot window",
      getFunc: () => settings.keepLearnableItemIconInLoot === true,
      setFunc: (value) => {
        settings.keepLearnableItemIconInLoot = value
      },
      default: defaults.keepLearnableItemIconInLoot === true,
      disabled: () => settings.removeLearnableItemIcon !== true,
      width: "half",
    },
    {
      type: "colorpicker",
      name: '"Learnable item" icon color',
      tooltip: "Change the color of the learnable item icon",
      getFunc: () => {
        const learnableIconColor = settings.learnableItemIconColor
        return $multi(
          learnableIconColor.r,
          learnableIconColor.g,
          learnableIconColor.b,
          learnableIconColor.a
        )
      },
      setFunc: (r, g, b, a) => {
        settings.learnableItemIconColor = { r, g, b, a: a ?? 1 }
      },
      default: () => {
        const learnableIconColor = defaults.learnableItemIconColor
        return $multi(
          learnableIconColor.r,
          learnableIconColor.g,
          learnableIconColor.b,
          learnableIconColor.a
        )
      },
      width: "full",
    },
  ]

  const bagSections: ReadonlyArray<readonly [number, string]> = [
    [BAG_BACKPACK, "Inventory"],
    [BAG_BANK, "Bank"],
    [BAG_HOUSE_BANK_ONE, "House Bank"],
    [BAG_GUILDBANK, "Guild Bank"],
    [990, "Guild Tradinghouse"],
  ]
  for (const section of bagSections) {
    const bagSliders = iconPosSliders(section[0], section[1])
    for (const slider of bagSliders) {
      controls[controls.length] = slider
    }
  }

  controls[controls.length] = {
    type: "checkbox",
    name: "Enable easy destroy",
    tooltip: "Prefill the destroy dialog for items with the 'Destroy' text",
    getFunc: () => settings.easyDestroy === true,
    setFunc: (value) => {
      settings.easyDestroy = value
      if (value === true) {
        easyDestroy()
      }
    },
    default: defaults.easyDestroy === true,
    width: "full",
  }
  controls[controls.length] = {
    type: "checkbox",
    name: "Show 'Scroll up/down' at scrollbar",
    tooltip: "Show scroll up and scroll down buttons at the top/bottom of the vertical scrollbars",
    getFunc: () => settings.showScrollUpDownButtonsAtVerticalScrollbar === true,
    setFunc: (value) => {
      settings.showScrollUpDownButtonsAtVerticalScrollbar = value
      verticalScrollbarHacks()
    },
    default: defaults.showScrollUpDownButtonsAtVerticalScrollbar === true,
    width: "full",
  }
  return controls
}

export function buildBankControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Bank" },
    {
      type: "checkbox",
      name: "Show character panel",
      tooltip: "Show the equipped items at the bank",
      getFunc: () => settings.showCharacterPanelAtBank === true,
      setFunc: (value) => {
        settings.showCharacterPanelAtBank = value
        enableCharacterFragment("bank")
      },
      default: defaults.showCharacterPanelAtBank === true,
      width: "full",
    },
  ]
}

export function buildGuildBankControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Guild bank" },
    {
      type: "checkbox",
      name: "Show character panel",
      tooltip: "Show the equipped items at the guild bank",
      getFunc: () => settings.showCharacterPanelAtGuildBank === true,
      setFunc: (value) => {
        settings.showCharacterPanelAtGuildBank = value
        enableCharacterFragment("guildbank")
      },
      default: defaults.showCharacterPanelAtGuildBank === true,
      width: "full",
    },
  ]
}

export function buildGuildHistoryControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Guild history" },
    {
      type: "checkbox",
      name: "Add first/last page to navigation",
      tooltip:
        "Add buttons for the first and the last page to the guild history navigation footer. The last page button can only be shown if you have received all events of the active category (via the 'Receive more' keybind)!\nIf this is enabled then presing the get more keybind will automatically advanced to the last page (if possible).",
      getFunc: () => settings.addGuildHistoryNavigationFirstAndLastPage === true,
      setFunc: (value) => {
        settings.addGuildHistoryNavigationFirstAndLastPage = value
        guildHistoryNavigationHelper()
      },
      default: defaults.addGuildHistoryNavigationFirstAndLastPage === true,
      width: "full",
    },
  ]
}
