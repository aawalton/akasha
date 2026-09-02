export type GlobalTable = Record<string, unknown>

export type IpairsFn = (
  this: void,
  t: unknown
) => LuaMultiReturn<
  [(this: void, t: unknown, i: number) => LuaMultiReturn<[number, unknown]>, unknown, number]
>
export function asIpairsFn(value: unknown): IpairsFn {
  return value as IpairsFn
}

export type RefreshFn = (this: void, ...args: unknown[]) => unknown
export function asRefreshFn(value: unknown): RefreshFn {
  return value as RefreshFn
}

export interface MenuClass {
  RefreshCategoryIndicators: RefreshFn
  [key: string]: unknown
}
export interface MenuMetatable {
  __index: MenuClass
}
export function asMenuMetatable(value: unknown): MenuMetatable {
  return value as MenuMetatable
}

export interface MenuButton {
  m_buttonData: LmmButtonData
}
export interface MenuBarObject {
  ButtonObjectForDescriptor: (
    this: MenuBarObject,
    descriptor: number | string
  ) => MenuButton | undefined
}
export interface MenuBarHost {
  m_object: MenuBarObject
}
export function asMenuBarHost(value: unknown): MenuBarHost {
  return value as MenuBarHost
}

export interface MultiIcon {
  ClearIcons: (this: MultiIcon) => undefined
  AddIcon: (this: MultiIcon, texture: string) => undefined
  Show: (this: MultiIcon) => undefined
  Hide: (this: MultiIcon) => undefined
}
export function asMultiIcon(value: unknown): MultiIcon {
  return value as MultiIcon
}

export type TextureArray = readonly string[]
export function asTextureArray(value: unknown): TextureArray {
  return value as TextureArray
}
export type TextureFn = (this: void) => readonly string[]

export type CategoryLayoutArray = LmmCategoryLayoutInfo[]
export function asCategoryLayoutArray(value: unknown): CategoryLayoutArray {
  return value as CategoryLayoutArray
}

export function asLmmCategoryLayoutInfo(value: unknown): LmmCategoryLayoutInfo {
  return value as LmmCategoryLayoutInfo
}

export function asLmmCategoryInfo(value: unknown): LmmCategoryInfo {
  return value as LmmCategoryInfo
}
export function asLmmSceneInfo(value: unknown): LmmSceneInfo {
  return value as LmmSceneInfo
}
export function asLmmSceneGroupInfo(value: unknown): LmmSceneGroupInfo {
  return value as LmmSceneGroupInfo
}

export interface TabClickable {
  OnSceneGroupTabClicked: (this: TabClickable, sceneGroupName: string) => undefined
}
export function asTabClickable(value: unknown): TabClickable {
  return value as TabClickable
}
