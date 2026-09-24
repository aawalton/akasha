interface LuaCoroutineLibrary {
  getname: (this: void, co: LuaThread) => string
  setname: (this: void, co: LuaThread, name: string) => void
}

interface LuaOsLibrary {
  clockpersecond: (this: void) => number
  rawclock: (this: void) => number
}

interface LuaTableLibrary {
  unpack: (<T extends unknown[]>(this: void, list: T) => LuaMultiReturn<T>) &
    (<T>(this: void, list: T[], i: number, j?: number) => LuaMultiReturn<T[]>)
}

declare const expat: unknown

declare function hpairs<T>(this: void, t: T): LuaIterable<LuaMultiReturn<[unknown, unknown]>>

declare function istable(this: void, v: unknown): v is Record<string, unknown>

declare const utf8: {
  char: (this: void, ...codepoints: number[]) => string
  charpattern: string
  codes: (this: void, s: string) => LuaIterable<LuaMultiReturn<[number, number]>>
  codepoint: (this: void, s: string, i?: number, j?: number) => LuaMultiReturn<number[]>
  len: (
    this: void,
    s: string,
    i?: number,
    j?: number
  ) => LuaMultiReturn<[number] | [undefined, number]>
  offset: (this: void, s: string, n: number, i?: number) => number | undefined
}
