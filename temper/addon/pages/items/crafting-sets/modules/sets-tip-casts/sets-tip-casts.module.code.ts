import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-constant-shapes/sets-constant-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"

type Never = never
export function asNever(value: unknown): Never {
  return value as Never
}

type AnyNotNilTable = { [k: number]: AnyNotNil }
export function asAnyNotNilTable(value: unknown): AnyNotNilTable {
  return value as AnyNotNilTable
}

type StrTab = { [idx: number]: unknown }
export function asStrTab(value: unknown): StrTab {
  return value as StrTab
}

type NumIndexTable = { [idx: number]: number }

type NumIndexTableOpt = NumIndexTable | undefined
export function asNumIndexTableOpt(value: unknown): NumIndexTableOpt {
  return value as NumIndexTableOpt
}

type LangNameIndexTable = { [idx: number]: { [lang: string]: string } }
type LangNameIndexTableOpt = LangNameIndexTable | undefined
export function asLangNameIndexTableOpt(value: unknown): LangNameIndexTableOpt {
  return value as LangNameIndexTableOpt
}

type ZoneIdGroups = { [zoneId: number]: number[] }
type ZoneIdGroupsOpt = ZoneIdGroups | undefined
export function asZoneIdGroupsOpt(value: unknown): ZoneIdGroupsOpt {
  return value as ZoneIdGroupsOpt
}

type ZoneMechanicGroups = { [zoneId: number]: { [idx: number]: number } }
type ZoneMechanicGroupsOpt = ZoneMechanicGroups | undefined
export function asZoneMechanicGroupsOpt(value: unknown): ZoneMechanicGroupsOpt {
  return value as ZoneMechanicGroupsOpt
}

type UnknownRecordArray = { [n: number]: unknown }[]
export function asUnknownRecordArray(value: unknown): UnknownRecordArray {
  return value as UnknownRecordArray
}

type NumKeyTable = { [k: number]: unknown }
export function asNumKeyTable(value: unknown): NumKeyTable {
  return value as NumKeyTable
}

type ChestNameTable = { [chestIndex: number]: string }
export function asChestNameTable(value: unknown): ChestNameTable {
  return value as ChestNameTable
}

type NumStrOpt = number | string | undefined
export function asNumStrOpt(value: unknown): NumStrOpt {
  return value as NumStrOpt
}

type EquipBoolTable = { [equipType: number]: boolean }
export function asEquipBoolTable(value: unknown): EquipBoolTable {
  return value as EquipBoolTable
}

type SetLangNames = { [setId: number]: { [lang: string]: string } }
type SetLangNamesOpt = SetLangNames | undefined
export function asSetLangNamesOpt(value: unknown): SetLangNamesOpt {
  return value as SetLangNamesOpt
}

type SetInfoPartMap = { [part: string]: SetsSetInfoPart }
export function asSetInfoPartMap(value: unknown): SetInfoPartMap {
  return value as SetInfoPartMap
}

type IifaProbe = { IIfA?: unknown }
export function asIifaProbe(value: unknown): IifaProbe {
  return value as IifaProbe
}

type FcoisProbe = { FCOIS?: { IIfAclicked?: { bagId: Bag; slotIndex: number } } }
export function asFcoisProbe(value: unknown): FcoisProbe {
  return value as FcoisProbe
}

type MasterMerchantProbe = { MasterMerchant?: unknown }
export function asMasterMerchantProbe(value: unknown): MasterMerchantProbe {
  return value as MasterMerchantProbe
}

type SlotTable = { [slot: string]: unknown }
export function asSlotTable(value: unknown): SlotTable {
  return value as SlotTable
}

type SvFetchThunk = (this: void) => { [key: string]: unknown } | undefined
export function asSvFetchThunk(value: unknown): SvFetchThunk {
  return value as SvFetchThunk
}

type VoidThunk = (this: void) => void
export function asVoidThunk(value: unknown): VoidThunk {
  return value as VoidThunk
}

type BoolThunkOpt = (this: void) => boolean | undefined
export function asBoolThunkOpt(value: unknown): BoolThunkOpt {
  return value as BoolThunkOpt
}

type VariadicThunk = (this: void, ...args: unknown[]) => unknown
export function asVariadicThunk(value: unknown): VariadicThunk {
  return value as VariadicThunk
}

type TooltipCtrlProbe =
  | { GetName?: (this: unknown) => string; GetType?: (this: unknown) => number }
  | undefined
export function asTooltipCtrlProbe(value: unknown): TooltipCtrlProbe {
  return value as TooltipCtrlProbe
}

type GetNameCtrl = { GetName?: (this: unknown) => string }
export function asGetNameCtrl(value: unknown): GetNameCtrl {
  return value as GetNameCtrl
}

type NeededHookArray = { tooltipCtrlName?: string }[]
export function asNeededHookArray(value: unknown): NeededHookArray {
  return value as NeededHookArray
}

type HooksCountView = { hooksCount?: number }
export function asHooksCountView(value: unknown): HooksCountView {
  return value as HooksCountView
}

type ActivatedFlagView = { eventPlayerActivatedCalled?: boolean }
export function asActivatedFlagView(value: unknown): ActivatedFlagView {
  return value as ActivatedFlagView
}

type LibAddonMenu2SurfaceOpt = LibAddonMenu2Surface | undefined
export function asLibAddonMenu2SurfaceOpt(value: unknown): LibAddonMenu2SurfaceOpt {
  return value as LibAddonMenu2SurfaceOpt
}

type HiddenProbeCtrl = { IsControlHidden: (this: void) => boolean }
export function asHiddenProbeCtrl(value: unknown): HiddenProbeCtrl {
  return value as HiddenProbeCtrl
}

type FavoritesAccessor = {
  GetAllFavoritesCategories: (this: void, self: unknown, setId: number) => unknown
}
export function asFavoritesAccessor(value: unknown): FavoritesAccessor {
  return value as FavoritesAccessor
}

type SetIdNodeProbe = { GetItemSetId?: (this: unknown) => number | undefined } | undefined
export function asSetIdNodeProbe(value: unknown): SetIdNodeProbe {
  return value as SetIdNodeProbe
}

type BagValue = Bag
export function asBagValue(value: unknown): BagValue {
  return value as BagValue
}
