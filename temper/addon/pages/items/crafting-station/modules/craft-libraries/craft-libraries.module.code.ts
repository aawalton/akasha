import "akasha/temper/addon/type/lib-async/lib-async.type-declaration.d.ts"

interface CraftLibraryTable {
  LibAsync: LibAsyncLib
}

function asLibraryTable(this: void, value: unknown): CraftLibraryTable {
  return value as CraftLibraryTable
}

export function libAsync(this: void): LibAsyncLib {
  return asLibraryTable(globalThis).LibAsync
}
