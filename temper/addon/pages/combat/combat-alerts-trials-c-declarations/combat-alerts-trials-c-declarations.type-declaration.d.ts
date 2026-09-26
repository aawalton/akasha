type OsiIconData = LuaMultiReturn<
  [icon: string, color: number[], size: number, anim: unknown, offset: number, isMech: boolean]
>

interface OsiIconConfig {
  dead?: boolean
}

interface OsiLibrary {
  UnitErrorCheck?: (this: void, unitTag: string, allowSelf?: boolean) => number
  GetIconDataForPlayer?: (
    this: void,
    displayName: string,
    config: OsiIconConfig,
    unitTag?: string
  ) => OsiIconData
}

declare const OSI: OsiLibrary | undefined
