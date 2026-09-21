interface LamOrderListBoxUtil {
  GetStringFromValue: (this: void, value: StringValue) => string | number
  GetDefaultValue: <T>(this: void, value: LamValued<T>) => T
  CreateLabelAndContainerControl: (
    this: void,
    parent: LamControl,
    controlData: OrderListBoxData,
    controlName?: string
  ) => LamControl
  GetTopPanel: (this: void, panel: LamControl) => LamControl
  GetColorForState: (this: void, disabled: boolean) => ZoColorDef
  UpdateWarning: (this: void, control: LamControl) => undefined
  RequestRefreshIfNeeded: (this: void, control: LamControl) => undefined
  RegisterForRefreshIfNeeded: (this: void, control: LamControl) => undefined
  RegisterForReloadIfNeeded: (this: void, control: LamControl) => undefined
  CreateFAQTexture: (this: void, control: LamControl) => Control | undefined
}

interface LibAddonMenu2 {
  util: LamOrderListBoxUtil
  RegisterWidget: (this: LibAddonMenu2, widgetType: string, widgetVersion: number) => boolean
}

interface LamCreateControlRegistry {
  orderlistbox?: (
    this: void,
    parent: LamControl,
    orderListBoxData: OrderListBoxData,
    controlName?: string
  ) => LamControl
}

declare const LAMCreateControl: LamCreateControlRegistry
