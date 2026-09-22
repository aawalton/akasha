interface TemperCodesCommonCodeApi {
  RegisterString: (this: void, name: string, value: string) => void
  GetZoneName: (this: void, zoneId: number) => string
  MonitorZoneChanges: (this: void, name: string, callback: (this: void) => void) => void
  GetZoneId: (this: void) => number
  GetServerAndAccountList?: (this: void, includeCurrent: boolean) => unknown
  Int32ToRGBA: (this: void, value: number) => LuaMultiReturn<[number, number, number, number]>
  HSLToRGB: (
    this: void,
    h: number,
    s: number,
    l: number,
    a?: number
  ) => LuaMultiReturn<[number, number, number, number]>
  RunAfterInitialLoadscreen: (this: void, fn: (this: void) => void) => void
  Int24ToRGB: (this: void, value: number) => LuaMultiReturn<[r: number, g: number, b: number]>
  Int24ToRGBA: (
    this: void,
    value: number
  ) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
  RGBToInt24: (this: void, r: number, g: number, b: number, a?: number) => number
  GetLibAddonMenu: (this: void) => TemperAddonMenu | undefined
  FormatVersion: (this: void, version: number) => string
  GetAddOnVersion: (this: void, addonName: string) => number
  GetServerName: (this: void) => string
}

declare const TemperCodesCommonCode: TemperCodesCommonCodeApi
