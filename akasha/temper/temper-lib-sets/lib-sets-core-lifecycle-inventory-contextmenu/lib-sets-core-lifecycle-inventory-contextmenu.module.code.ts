import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSlotGpFns,
  asLibSlots,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asLibCustomMenuHandleOpt,
  asUnknown,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"
import { resetCachedNonActiveSetIds } from "../lib-sets-core-set-checking/lib-sets-core-set-checking.module.code.ts"

const lib = LibSets

const MAJOR = "LibSets"
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

  const libSetsGetSetType = lib.GetSetType
  const setType = libSetsGetSetType(setId)
  if (setType === undefined || setType === LIBSETS_SETTYPE_CRAFTED) {
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

let libSets_customInvItemLinkContextMenuAdded = false
function addSetCollectionsSearchItemLinkContextMenuEntry(this: void): undefined {
  const lcm = asLibCustomMenuHandleOpt(lib.libCustomMenu)
  if (
    libSets_customInvItemLinkContextMenuAdded ||
    lcm === undefined ||
    lcm.RegisterContextMenu === undefined ||
    asUnknown(AddCustomSubMenuItem) === undefined ||
    !asPresent(lib.svData)["addSetCollectionsSearchItemLink"]
  ) {
    return
  }

  lcm.RegisterContextMenu(myInvItemLinkCallbackFunc, lcm.CATEGORY_LATE)
  libSets_customInvItemLinkContextMenuAdded = true
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
