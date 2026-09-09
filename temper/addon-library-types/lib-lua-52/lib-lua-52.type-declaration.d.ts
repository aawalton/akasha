interface LibLua52Library {
  rawnext: (this: void, table: object, key?: unknown) => LuaMultiReturn<[unknown, unknown]>
  rawipairs: (this: void, table: object) => LuaIterable<LuaMultiReturn<[number, unknown]>>
}

declare const LibLua52: LibLua52Library | undefined
