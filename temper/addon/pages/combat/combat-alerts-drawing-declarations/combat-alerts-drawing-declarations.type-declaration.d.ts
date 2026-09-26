interface LibCustomIconsLibrary {
  GetStatic: (
    this: void,
    displayName: string
  ) => LuaMultiReturn<
    [texture: string | undefined, left?: number, right?: number, top?: number, bottom?: number]
  >
}

declare const LibCustomIcons: LibCustomIconsLibrary | undefined

interface ZoColorDefClass {
  LerpRGB: (
    this: void,
    colorA: ZoColorDef,
    colorB: ZoColorDef,
    amount: number
  ) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>
}
