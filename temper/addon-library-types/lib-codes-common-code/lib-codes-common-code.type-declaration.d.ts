interface LibCodesCommonCodeApi {
  Int24ToRGB: (this: void, value: number) => LuaMultiReturn<[r: number, g: number, b: number]>
  Int24ToRGBA: (
    this: void,
    value: number
  ) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
  RGBToInt24: (this: void, r: number, g: number, b: number, a?: number) => number
  GetLibAddonMenu: (this: void) => LibAddonMenu2 | undefined
  FormatVersion: (this: void, version: number) => string
  GetAddOnVersion: (this: void, addonName: string) => number
  GetServerName: (this: void) => string
}

declare const LibCodesCommonCode: LibCodesCommonCodeApi
