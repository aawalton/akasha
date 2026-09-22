import { asPresent } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asLibSlotGpFns,
  asLibSlots,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import {
  asLibCustomMenuHandleOpt,
  asUnknown,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { resetCachedNonActiveSetIds } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-core-set-checking/sets-core-set-checking.module.code.ts"
import "akasha/temper/addon/type/lib-custom-menu/lib-custom-menu.type-declaration.d.ts"
import { SETS_SETTYPE_CRAFTED } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-settype-ids/sets-const-settype-ids.module.code.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const MAJOR = "TemperCraftingSets"
const gil = GetItemLink
const gilsi = GetItemLinkSetInfo
const zoitf = zo_iconTextFormat
const zocstrfor = ZO_CachedStrFormat

function myInvItemLinkCallbackFunc(
  this: void,
  inventorySlot: unknown,
  _slotActions?: unknown,
  _ctrl?: unknown,
  _alt?: unknown,
  _shift?: unknown,
  _command?: unknown
): undefined {
  const [bagId, slotIndex] = ZO_Inventory_GetBagAndIndex(inventorySlot)
  if (bagId === undefined || slotIndex === undefined) {
    return
  }
  const itemLink = gil(bagId, slotIndex, LINK_STYLE_DEFAULT)
  if (itemLink === undefined || itemLink === "") {
    return
  }
  const [hasSet, setName, , , , setId] = gilsi(itemLink, false)
  if (!hasSet || setId === undefined || setName === undefined) {
    return
  }

  const setsGetSetType = lib.GetSetType
  const setType = setsGetSetType(setId)
  if (setType === undefined || setType === SETS_SETTYPE_CRAFTED) {
    return
  }

  let setTypeTexture = lib.GetSetTypeTexture(setType, setId)
  if (setTypeTexture === undefined) {
    setTypeTexture = ""
  }

  const labelLocalizedText = lib.GetLocalizedText(
    "setCollectionsSearchItemLink",
    lib.clientLang,
    zocstrfor("<<1>>", setName)
  )
  if (labelLocalizedText === undefined) {
    return
  }

  const submenuEntris: LibCustomMenuEntry[] = []
  const subMenuEntrySetCollectionsSearchItemLink = {
    label: zoitf(setTypeTexture, 32, 32, labelLocalizedText, undefined),
    callback: () => {
      const localItemLink = itemLink
      lib.OpenSetItemCollectionBookForItemLink(localItemLink)
    },
    itemType: MENU_ADD_OPTION_LABEL,
  }
  submenuEntris.push(subMenuEntrySetCollectionsSearchItemLink)
  AddCustomSubMenuItem(MAJOR, submenuEntris)
  ShowMenu()
}

let sets_customInvItemLinkContextMenuAdded = false
function addSetCollectionsSearchItemLinkContextMenuEntry(this: void): undefined {
  const lcm = asLibCustomMenuHandleOpt(lib.libCustomMenu)
  if (
    sets_customInvItemLinkContextMenuAdded ||
    lcm === undefined ||
    lcm.RegisterContextMenu === undefined ||
    asUnknown(AddCustomSubMenuItem) === undefined ||
    !asPresent(lib.svData)["addSetCollectionsSearchItemLink"]
  ) {
    return
  }

  lcm.RegisterContextMenu(myInvItemLinkCallbackFunc, lcm.CATEGORY_LATE)
  sets_customInvItemLinkContextMenuAdded = true
}
lib.addSetCollectionsSearchItemLinkContextMenuEntry =
  addSetCollectionsSearchItemLinkContextMenuEntry

let itemSetsBookCallbackAdded = false
function createUIStuff(this: void, gamepadPreferred?: boolean): undefined {
  if (gamepadPreferred === false) {
    lib.addUIButtons?.()

    addSetCollectionsSearchItemLinkContextMenuEntry()
    if (!itemSetsBookCallbackAdded) {
      ITEM_SETS_BOOK_FRAGMENT.RegisterCallback("StateChange", (_oldState, newState) => {
        if (newState === SCENE_FRAGMENT_SHOWN) {
          asLibSlots(lib)["_wasSetCollectionsBookOpenedYet"] = true
        }
      })
      itemSetsBookCallbackAdded = true
    }
  }

  const initSearchUI = asLibSlotGpFns(lib)["_InitSearchUI"]
  initSearchUI?.(gamepadPreferred)
}
asLibSlots(lib)["_createUIStuff"] = createUIStuff

function areSetsLoaded(this: void): boolean {
  const result = (lib.setsLoaded && lib.setIds !== undefined) || false
  return result
}
lib.AreSetsLoaded = areSetsLoaded

function isSetsScanning(this: void): boolean {
  return lib.setsScanning
}
lib.IsSetsScanning = isSetsScanning

function checkIfSetsAreLoadedProperly(this: void, setId?: number): boolean {
  if (isSetsScanning() || !areSetsLoaded()) {
    resetCachedNonActiveSetIds()
    return false
  }
  if (setId !== undefined) {
    return lib.IsSetCurrentlyActiveWithAPIVersion(setId)
  }
  return true
}
lib.checkIfSetsAreLoadedProperly = checkIfSetsAreLoadedProperly
