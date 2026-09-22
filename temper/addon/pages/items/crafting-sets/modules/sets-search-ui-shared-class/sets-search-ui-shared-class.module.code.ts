import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-globals/sets-search-ui-globals.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-2/sets-search-ui-shapes-2.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"

const sharedClass = ZO_InitializingObject.Subclass<SetsSearchUISharedClass>()

export function getSharedSearchUIClass(this: void): SetsSearchUISharedClass {
  return sharedClass
}

type SharedSearchUIClassGlobal = typeof LibSets_SearchUI_Shared
function asSharedSearchUIClassGlobal(value: unknown): SharedSearchUIClassGlobal {
  return value as SharedSearchUIClassGlobal
}
export function brandSharedSearchUIClassGlobal(
  this: void,
  value: SetsSearchUISharedClass
): SharedSearchUIClassGlobal {
  return asSharedSearchUIClassGlobal(value)
}

interface SharedSuperDispatch {
  Initialize: (this: void, self: SetsSearchUISharedObject, control: SearchUIControl) => void
  ShowUI: (this: void, self: SetsSearchUISharedObject) => void
  ResetUI: (this: void, self?: SetsSearchUISharedObject) => void
  ValidateSearchParams: (this: void, self: SetsSearchUISharedObject) => boolean | undefined
  StartSearch: (
    this: void,
    self: SetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  OnFilterChanged: (
    this: void,
    self: SetsSearchUISharedObject,
    dropdownControl?: SearchUIControl
  ) => void
}

function asSharedSuperDispatch(value: unknown): SharedSuperDispatch {
  return value as SharedSuperDispatch
}

export function getSharedSuper(this: void): SharedSuperDispatch {
  return asSharedSuperDispatch(sharedClass)
}
