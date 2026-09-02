import { verticalScrollbarHacks } from "../fco-inventory-scrollbar/fco-inventory-scrollbar.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import type { IconPosBox, RGBAColor } from "../fco-types/fco-types.module.code.ts"

const playerInv = PLAYER_INVENTORY

interface BrandNewSlotData {
  brandNew?: boolean
}
function isBrandNewSlotData(this: void, value: unknown): value is BrandNewSlotData {
  return type(value) === "table"
}

let NO_NEW_ITEM_ICON_HOOKED = false
function fcocsNoNewItemIcon(this: void): undefined {
  if (!NO_NEW_ITEM_ICON_HOOKED) {
    ZO_PreHook(playerInv, "OnInventoryItemAdded", (...args: unknown[]): unknown => {
      if (STATE.settingsVars.settings.removeNewItemIcon !== true) {
        return false
      }
      const newSlotData = args[4]
      if (isBrandNewSlotData(newSlotData) && newSlotData.brandNew === true) {
        newSlotData.brandNew = false
        playerInv.suppressItemAlert = true
      }
      return false
    })

    ZO_PreHook(playerInv, "PlayItemAddedAlert", (): unknown => {
      if (STATE.settingsVars.settings.removeNewItemIcon !== true) {
        return false
      }
      playerInv.suppressItemAddedAlert = true
      playerInv.newItemList = []
      return true
    })
    ZO_PreHook(COMPANION_EQUIPMENT_KEYBOARD, "PlayItemAddedAlert", (): unknown => {
      if (STATE.settingsVars.settings.removeNewItemIcon !== true) {
        return false
      }
      return true
    })

    NO_NEW_ITEM_ICON_HOOKED = true
  }
}

let NO_SELLABLE_ITEM_HOOK_DONE = false
function fcocsNoNotSellableItemIcon(this: void): undefined {
  if (!NO_SELLABLE_ITEM_HOOK_DONE) {
    ZO_PreHook("ZO_UpdateSellInformationControlIcon", (): unknown => {
      const settingsRemoveSellIconEnabled = STATE.settingsVars.settings.removeSellItemIcon
      return settingsRemoveSellIconEnabled
    })
    NO_SELLABLE_ITEM_HOOK_DONE = true
  }
}

let NO_NEW_ITEMS_LIST_HOOK_DONE = false
function fcocsNoNewItemItemsList(this: void): undefined {
  const stateChangeRegistry = INVENTORY_FRAGMENT.callbackRegistry?.StateChange
  if (
    !NO_NEW_ITEMS_LIST_HOOK_DONE &&
    stateChangeRegistry !== undefined &&
    stateChangeRegistry[0] !== undefined &&
    stateChangeRegistry[0][0] !== undefined
  ) {
    const origStateChangeFunc = stateChangeRegistry[0][0]
    const newStateChangeFunc = (oldState: number, newState: number): undefined => {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        if (STATE.settingsVars.settings.removeNewItemIcon === true) {
          playerInv.suppressItemAddedAlert = true
          playerInv.newItemList = []
        }
      }
      origStateChangeFunc(oldState, newState)
    }
    stateChangeRegistry[0][0] = newStateChangeFunc
    NO_NEW_ITEMS_LIST_HOOK_DONE = true
  }
}

interface StatusIconControl extends Control {
  HasIcon: (this: StatusIconControl) => boolean
  ClearIcons: (this: StatusIconControl) => void
  AddIcon: (this: StatusIconControl, texture: string, color: ZoColorDef) => void
  SetColor: (this: StatusIconControl, r: number, g: number, b: number, a?: number) => void
  Show: (this: StatusIconControl) => void
  Hide: (this: StatusIconControl) => void
}

interface LearnableSlotData {
  canBeUsedToLearn?: boolean
  bagId?: number
  slotIndex?: number
}

interface SearchResultRow {
  isGuildSpecificItem?: boolean
  itemLink: string
}

function isLearnableSlotData(this: void, value: unknown): value is LearnableSlotData {
  return type(value) === "table"
}

let NO_LEARNABLE_ITEM_ICON_HOOKED = false
function fcocsLearnableItemIconChanges(this: void): undefined {
  if (!NO_LEARNABLE_ITEM_ICON_HOOKED) {
    const canLearnIconTexture = "EsoUI/Art/Inventory/inventory_can_learn_icon.dds"

    const defaultBagPositions: IconPosBox = { x: 0, y: 0, width: 32, height: 32 }
    let lastLearnableItemIconColor: RGBAColor | undefined
    let lastLearnableItemIconColorDef: ZoColorDef | undefined

    const recolorStatusIconEnabled = (): ZoColorDef => {
      let learnableItemIconColorDef: ZoColorDef
      const learnableItemIconColor = STATE.settingsVars.settings.learnableItemIconColor
      if (
        learnableItemIconColor !== lastLearnableItemIconColor ||
        lastLearnableItemIconColorDef === undefined
      ) {
        lastLearnableItemIconColor = learnableItemIconColor
        learnableItemIconColorDef = ZO_ColorDef.New(
          learnableItemIconColor.r,
          learnableItemIconColor.g,
          learnableItemIconColor.b,
          learnableItemIconColor.a
        )
        lastLearnableItemIconColorDef = learnableItemIconColorDef
      } else {
        learnableItemIconColorDef = lastLearnableItemIconColorDef
      }
      return learnableItemIconColorDef
    }

    const getStatusIconPosition = (
      slotData: LearnableSlotData
    ): LuaMultiReturn<[number, number, number, number]> => {
      const settings = STATE.settingsVars.settings
      let bagId = slotData.bagId ?? BAG_BACKPACK
      if (bagId === BAG_SUBSCRIBER_BANK) {
        bagId = BAG_BANK
      }
      if (IsHouseBankBag(bagId) && !IsFurnitureVault(bagId)) {
        bagId = BAG_HOUSE_BANK_ONE
      }

      const iconPos = settings.learnableItemIconPos
      const bagPositions = iconPos[bagId] ?? defaultBagPositions
      return $multi(bagPositions.x, bagPositions.y, bagPositions.width, bagPositions.height)
    }

    const recolorStatusIconNow = (
      inventorySlot: Control,
      slotData: LearnableSlotData
    ): undefined => {
      if (slotData.canBeUsedToLearn === true) {
        const statusControl =
          inventorySlot.GetNamedChild<StatusIconControl>("StatusTexture") ??
          inventorySlot.GetNamedChild<StatusIconControl>("StatusIcon")
        if (statusControl !== undefined) {
          const recolor = recolorStatusIconEnabled()
          if (statusControl.HasIcon()) {
            statusControl.ClearIcons()
          }
          statusControl.AddIcon(canLearnIconTexture, recolor)
          const [r, g, b, a] = recolor.UnpackRGBA()
          statusControl.SetColor(r, g, b, a)

          const parent = statusControl.GetParent()
          statusControl.ClearAnchors()
          const [x, y, width, height] = getStatusIconPosition(slotData)
          statusControl.SetAnchor(LEFT, parent, LEFT, x, y)
          statusControl.SetDimensions(width, height)

          statusControl.Show()
        }
      }
    }

    SecurePostHook(
      "ZO_UpdateStatusControlIcons",
      (inventorySlot: Control, slotData: LearnableSlotData): undefined => {
        recolorStatusIconNow(inventorySlot, slotData)
      }
    )

    const searchResultsDataType = 1
    const guildSpecificItemDataType = 3
    SecurePostHook(TRADING_HOUSE, "InitializeSearchResults", (): undefined => {
      const baseLearnableItemStatusIconCheck = (
        rowControl: Control,
        result: SearchResultRow
      ): undefined => {
        if (result.isGuildSpecificItem !== true) {
          const canBeUsedToLearn = CanItemLinkBeUsedToLearn(result.itemLink)
          if (canBeUsedToLearn) {
            const slotData: LearnableSlotData = { bagId: 990, canBeUsedToLearn: true }
            recolorStatusIconNow(rowControl, slotData)
          }
        }
      }

      const setupSearchResultRowHook = (
        rowControl: Control,
        result: SearchResultRow
      ): undefined => {
        baseLearnableItemStatusIconCheck(rowControl, result)
      }
      const setupGuildSpecificItemRowHook = (
        rowControl: Control,
        result: SearchResultRow
      ): undefined => {
        baseLearnableItemStatusIconCheck(rowControl, result)
      }

      const searchResultsDataTypeId =
        TRADING_HOUSE.searchResultsList.dataTypes[searchResultsDataType]
      const guildSpecificDataType =
        TRADING_HOUSE.searchResultsList.dataTypes[guildSpecificItemDataType]
      if (searchResultsDataTypeId !== undefined) {
        SecurePostHook(searchResultsDataTypeId, "setupCallback", setupSearchResultRowHook)
      }
      if (guildSpecificDataType !== undefined) {
        SecurePostHook(guildSpecificDataType, "setupCallback", setupGuildSpecificItemRowHook)
      }
    })

    const checkCanBeUsedToLearn = (tabData: unknown, isLootArg?: boolean): boolean => {
      const isLoot = isLootArg ?? false
      const settings = STATE.settingsVars.settings
      const removeLearnableItemIcon = settings.removeLearnableItemIcon === true
      if (
        !removeLearnableItemIcon ||
        (removeLearnableItemIcon &&
          isLoot === true &&
          settings.keepLearnableItemIconInLoot === true)
      ) {
        return false
      }

      if (isLearnableSlotData(tabData)) {
        if (tabData.canBeUsedToLearn === true) {
          tabData.canBeUsedToLearn = false
          return true
        }
      }
      return false
    }

    const refreshStatusSortOrderTarget =
      MasterMerchant !== undefined ? ZO_SharedInventoryManager : SHARED_INVENTORY
    ZO_PreHook(
      refreshStatusSortOrderTarget,
      "RefreshStatusSortOrder",
      (...args: unknown[]): unknown => {
        const slotData = args[1]
        return checkCanBeUsedToLearn(slotData, false)
      }
    )

    SecurePostHook(
      LOOT_WINDOW,
      "SetUpLootItem",
      (_zoLootObject: unknown, control: Control, data: unknown): undefined => {
        if (!checkCanBeUsedToLearn(data, true)) {
          return
        }
        const statusIcon = control.GetNamedChild<StatusIconControl>("StatusIcon")
        if (statusIcon !== undefined) {
          statusIcon.ClearIcons()
          statusIcon.Hide()
        }
      }
    )

    NO_LEARNABLE_ITEM_ICON_HOOKED = true
  }
}

export function noNewItemIcon(this: void): undefined {
  fcocsNoNewItemIcon()
  fcocsNoNewItemItemsList()
}

export function learnableItemIconChanges(this: void): undefined {
  fcocsLearnableItemIconChanges()
}

export function noNotSellableItemIcon(this: void): undefined {
  fcocsNoNotSellableItemIcon()
}

let PRE_HOOK_NEW_MENU_CATEGORY_FLASH_WAS_DONE = false
function onStop(this: void): undefined {
  playerInv.flashingSlots = {}
  playerInv.listeningControls = {}
}
export function noNewMenuCategoryFlashAnimation(this: void): undefined {
  if (
    PRE_HOOK_NEW_MENU_CATEGORY_FLASH_WAS_DONE === true ||
    STATE.settingsVars.settings.removeNewItemIcon !== true
  ) {
    return
  }

  ZO_PreHook("ZO_Inventory_NewItemCategory_FlashAnimation_OnUpdate", (): unknown => {
    if (STATE.settingsVars.settings.removeNewItemIcon !== true) {
      return false
    }

    const listeningControls = playerInv.listeningControls
    if (listeningControls !== undefined) {
      for (const key in listeningControls) {
        const control = listeningControls[key]
        if (control !== undefined) {
          control.SetAlpha(0)
        }
      }
    }
    onStop()
    return true
  })
  PRE_HOOK_NEW_MENU_CATEGORY_FLASH_WAS_DONE = true
}

let PRE_HOOK_ZO_DIALOGS_SHOW_DIALOG_WAS_DONE = false

function initializeEasyDestroy(this: void): undefined {
  if (!PRE_HOOK_ZO_DIALOGS_SHOW_DIALOG_WAS_DONE) {
    const autofillDestroyConfirm = (...args: unknown[]): undefined => {
      const dialogName = args[0]
      if (
        dialogName === "CONFIRM_DESTROY_ITEM_PROMPT" &&
        STATE.settingsVars.settings.easyDestroy === true
      ) {
        zo_callLater((): undefined => {
          const mainTextParams = ZO_Dialog1.textParams?.mainTextParams
          if (mainTextParams === undefined) {
            return
          }

          for (const confirmText of mainTextParams) {
            if (confirmText === LocaleAwareToUpper(confirmText)) {
              ZO_Dialog1EditBox.SetText(confirmText)
              ZO_Dialog1EditBox.LoseFocus()
              break
            }
          }
        }, 0)
      }
    }

    ZO_PreHook("ZO_Dialogs_ShowDialog", autofillDestroyConfirm)
    PRE_HOOK_ZO_DIALOGS_SHOW_DIALOG_WAS_DONE = true
  }
}

export function easyDestroy(this: void): undefined {
  if (STATE.settingsVars.settings.easyDestroy !== true) {
    return
  }
  initializeEasyDestroy()
}

export function inventoryChanges(this: void): undefined {
  noNewItemIcon()
  noNotSellableItemIcon()
  noNewMenuCategoryFlashAnimation()
  learnableItemIconChanges()

  verticalScrollbarHacks()
  easyDestroy()
}
