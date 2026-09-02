import { STATE } from "../fco-state/fco-state.module.code.ts"

export const VERTICAL_SCROLLBAR_PARENT_CONTROLS: ScrollbarParentControl[] = [
  ZO_PlayerInventoryList,
  ZO_PlayerBankBackpack,
  ZO_GuildBankBackpack,
  ZO_HouseBankBackpack,
  ZO_CraftBagList,
  ZO_FurnitureVaultList,
]

if (ZO_VengeanceInventory !== undefined) {
  VERTICAL_SCROLLBAR_PARENT_CONTROLS.push(ZO_VengeanceInventoryList)
}

function ppScrollBarAdjustments(
  this: void,
  scrollbar: ScrollbarControl,
  scrollButtonCtrl: Control | undefined,
  isVertical: boolean,
  topOrLeft: boolean
): undefined {
  if (PerfectPixel !== undefined && scrollButtonCtrl !== undefined) {
    if (isVertical === true) {
      scrollButtonCtrl.ClearAnchors()
      const scrollbarButtonParent = scrollButtonCtrl.GetParent()
      if (scrollbarButtonParent !== undefined) {
        if (topOrLeft === true) {
          scrollButtonCtrl.SetAnchor(
            BOTTOMLEFT,
            scrollbarButtonParent.GetNamedChild("Up"),
            BOTTOMLEFT,
            0,
            0
          )
        } else {
          scrollButtonCtrl.SetAnchor(
            TOPLEFT,
            scrollbarButtonParent.GetNamedChild("Down"),
            TOPLEFT,
            0,
            0
          )
          const scrollBarList = scrollbar.GetParent<ScrollListWithScroll>()
          if (scrollBarList !== undefined && scrollBarList.scroll !== undefined) {
            ZO_Scroll_UpdateScrollBar(scrollBarList)
          }
        }
      }
    }
  }
}

interface ScrollListWithScroll extends Control {
  scroll?: Control
}

function createOrUpdateScrollBarButton(
  this: void,
  scrollbar: ScrollbarControl | undefined,
  isVertical: boolean | undefined,
  topOrBottom: boolean | undefined,
  doShow: boolean,
  doCreate: boolean
): Control | undefined {
  if (scrollbar === undefined || isVertical === undefined || topOrBottom === undefined) {
    return undefined
  }
  const scrollbarTypeStr = isVertical === true ? "vertical" : "horizontal"
  const buttonsCache = scrollbar.FCOChangeStuffScrollbarButtons
  if (buttonsCache === undefined || buttonsCache[scrollbarTypeStr] === undefined) {
    return undefined
  }
  const directionCache = buttonsCache[scrollbarTypeStr]
  const topOrBottomKey = topOrBottom === true ? "true" : "false"

  let scrollButtonCtrl: Control | undefined

  if (doCreate === true) {
    if (isVertical === true) {
      if (topOrBottom === true) {
        scrollButtonCtrl = CreateControlFromVirtual(
          scrollbar.GetName() + "_FCOCS_ScrollToTopButton",
          scrollbar,
          "FCOCS_VerticalScroll_ToTop_Template"
        )
      } else {
        scrollButtonCtrl = CreateControlFromVirtual(
          scrollbar.GetName() + "_FCOCS_ScrollToBottomButton",
          scrollbar,
          "FCOCS_VerticalScroll_ToBottom_Template"
        )
      }
      if (scrollButtonCtrl !== undefined && directionCache !== undefined) {
        directionCache[topOrBottomKey] = scrollButtonCtrl
        scrollButtonCtrl.SetHidden(!doShow)
        if (doShow === true) {
          ppScrollBarAdjustments(scrollbar, scrollButtonCtrl, isVertical, topOrBottom)
        }
        return scrollButtonCtrl
      }
    }
    return undefined
  }

  scrollButtonCtrl = directionCache === undefined ? undefined : directionCache[topOrBottomKey]
  if (scrollButtonCtrl === undefined) {
    return undefined
  }
  if (doShow === true) {
    ppScrollBarAdjustments(scrollbar, scrollButtonCtrl, isVertical, topOrBottom)
  }
  scrollButtonCtrl.SetHidden(!doShow)
  return scrollButtonCtrl
}

function addScrollbarButton(
  this: void,
  scrollbar: ScrollbarControl | undefined,
  isVertical: boolean | undefined,
  topOrBottom: boolean | undefined
): undefined {
  if (scrollbar === undefined || isVertical === undefined || topOrBottom === undefined) {
    return
  }
  const cache: ScrollbarButtonsCache = scrollbar.FCOChangeStuffScrollbarButtons ?? {}
  scrollbar.FCOChangeStuffScrollbarButtons = cache
  const scrollbarTypeStr = isVertical === true ? "vertical" : "horizontal"
  cache[scrollbarTypeStr] = cache[scrollbarTypeStr] ?? {}

  createOrUpdateScrollBarButton(scrollbar, isVertical, topOrBottom, true, true)
}

export function verticalScrollbarHacks(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const showScrollUpDownButtonsAtVerticalScrollbar =
    settings.showScrollUpDownButtonsAtVerticalScrollbar === true

  for (const scrollbarParentCtrl of VERTICAL_SCROLLBAR_PARENT_CONTROLS) {
    if (
      scrollbarParentCtrl !== undefined &&
      scrollbarParentCtrl.useScrollbar === true &&
      scrollbarParentCtrl.scrollbar !== undefined
    ) {
      const scrollbarCtrl = scrollbarParentCtrl.scrollbar
      if (scrollbarCtrl !== undefined) {
        if (
          scrollbarCtrl.FCOChangeStuffScrollbarButtons === undefined ||
          scrollbarCtrl.FCOChangeStuffScrollbarButtons.vertical === undefined
        ) {
          if (showScrollUpDownButtonsAtVerticalScrollbar === true) {
            addScrollbarButton(scrollbarCtrl, true, true)
            addScrollbarButton(scrollbarCtrl, true, false)
          }
        } else {
          createOrUpdateScrollBarButton(
            scrollbarCtrl,
            true,
            true,
            showScrollUpDownButtonsAtVerticalScrollbar,
            false
          )
          createOrUpdateScrollBarButton(
            scrollbarCtrl,
            true,
            false,
            showScrollUpDownButtonsAtVerticalScrollbar,
            false
          )
        }
      }
    }
  }
}

interface ScrollListControl extends Control {
  data?: ReadonlyArray<unknown>
  uniformControlHeight?: number
}

export function scrollScrollList(
  this: void,
  scrollBarButton: Control | undefined,
  top: boolean
): undefined {
  const scrollToTopOrBottom = top
  if (scrollBarButton === undefined || scrollToTopOrBottom === undefined) {
    return
  }

  const parent = scrollBarButton.GetParent()

  if (parent !== undefined && parent.GetParent !== undefined) {
    const scrollList = parent.GetParent<ScrollListControl>()
    if (scrollList !== undefined) {
      if (scrollToTopOrBottom === true) {
        ZO_ScrollList_ResetToTop(scrollList)
      } else if (scrollToTopOrBottom === false) {
        const numEntries = scrollList.data === undefined ? 0 : scrollList.data.length
        const controlHeight =
          scrollList.uniformControlHeight === undefined ? 60 : scrollList.uniformControlHeight
        let downOffset = numEntries * controlHeight
        if (downOffset <= 0) {
          return
        }
        downOffset = downOffset + controlHeight
        ZO_ScrollList_ScrollAbsolute(scrollList, downOffset)
      }
    }
  }
}
