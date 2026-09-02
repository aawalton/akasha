declare const ZO_ScrollList_Initialize: (this: void, listControl: Control) => void

declare const ZO_ScrollList_AddResizeOnScreenResize: (this: void, listControl: Control) => void

declare const ZO_ScrollList_SelectData: (
  this: void,
  list: object,
  data: unknown,
  control?: unknown,
  reselectingDuringRebuild?: boolean,
  animateInstantly?: boolean
) => undefined

interface ZoObjectPool<TObject = Control> {
  m_Factory: (this: void, pool: ZoObjectPool<TObject>, objectKey?: unknown) => TObject
}

interface ZoScrollListDataType {
  hideCallback?: (this: void, rowControl: Control, slotData: InventoryRowSlotData) => void
  pool: ZoObjectPool
}

declare const ZO_ObjectPool_DefaultResetControl: (this: void, control: Control) => void

interface ZoControlPool<TControl extends Control = Control> {
  SetCustomFactoryBehavior: (
    this: ZoControlPool<TControl>,
    behavior: (this: void, control: TControl) => void
  ) => void
  SetCustomResetBehavior: (
    this: ZoControlPool<TControl>,
    behavior: (this: void, control: TControl) => void
  ) => void
  AcquireObject: (this: ZoControlPool<TControl>) => TControl
  ReleaseAllObjects: (this: ZoControlPool<TControl>) => void
}

interface ZoControlPoolClass {
  New: <TControl extends Control = Control>(
    this: ZoControlPoolClass,
    templateName: string,
    parent: Control,
    namePrefix: string
  ) => ZoControlPool<TControl>
}

declare const ZO_ControlPool: ZoControlPoolClass
