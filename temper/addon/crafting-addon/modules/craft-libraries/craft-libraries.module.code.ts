import "akasha/temper/addon/library-type/lib-alchemy-station/lib-alchemy-station.type-declaration.d.ts"
import "akasha/temper/addon/library-type/lib-async/lib-async.type-declaration.d.ts"
import "akasha/temper/addon/library-type/lib-slash-commander/lib-slash-commander.type-declaration.d.ts"

interface CraftLibraryTable {
  LibAsync: LibAsyncLib
  LibAlchemyStation: LibAlchemyStationLib
  LibSlashCommander?: LibSlashCommander
}

function asLibraryTable(this: void, value: unknown): CraftLibraryTable {
  return value as CraftLibraryTable
}

export function libAsync(this: void): LibAsyncLib {
  return asLibraryTable(globalThis).LibAsync
}

export function libAlchemyStation(this: void): LibAlchemyStationLib {
  return asLibraryTable(globalThis).LibAlchemyStation
}

export function libSlashCommander(this: void): LibSlashCommander | undefined {
  return asLibraryTable(globalThis).LibSlashCommander
}
