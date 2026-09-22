import "akasha/temper/addon/type/temper-async-global/temper-async-global.type-declaration.d.ts"

interface CraftLibraryTable {
  TemperAsync: TemperAsyncLib
}

function asLibraryTable(this: void, value: unknown): CraftLibraryTable {
  return value as CraftLibraryTable
}

export function libAsync(this: void): TemperAsyncLib {
  return asLibraryTable(globalThis).TemperAsync
}
