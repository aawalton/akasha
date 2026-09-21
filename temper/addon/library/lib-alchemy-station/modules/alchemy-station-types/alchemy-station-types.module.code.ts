export type AlchemyDescriptor = number | string

export interface LasTabData {
  name: number | string
  descriptor: AlchemyDescriptor
  normal?: string
  pressed?: string
  highlight?: string
  disabled?: string
  callback?: (this: void, tabData: LasTabData) => undefined
  control?: Control
}

export interface Lib {
  tabs: Record<AlchemyDescriptor, LasTabData>
  content?: Control
  Init: (this: Lib) => undefined
  AddTab: (this: Lib, tabData: LasTabData) => Control
  SelectTab: (this: Lib, descriptor: AlchemyDescriptor) => boolean
  GetSelectedTab: (this: Lib) => AlchemyDescriptor
  SetText: (this: Lib, text: string) => undefined
}
