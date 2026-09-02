import "@akasha/temper-eso-types/eso-functions-02"
import { EU_LIBRARY_DATA } from "../housing-library-data-eu/housing-library-data-eu.module.code.ts"
import { NA_LIBRARY_DATA } from "../housing-library-data-na/housing-library-data-na.module.code.ts"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { LibraryEntry } from "../housing-types/housing-types.module.code.ts"

function createEuDataList(this: void) {
  portToFriend.libData.euData = EU_LIBRARY_DATA
}
portToFriend.libData.CreateEuDataList = createEuDataList

function createNaDataList(this: void) {
  portToFriend.libData.naData = NA_LIBRARY_DATA
}
portToFriend.libData.CreateNaDataList = createNaDataList

function createDataList(this: void) {
  if (GetWorldName() === "EU Megaserver") {
    portToFriend.libData.CreateEuDataList()
  } else {
    portToFriend.libData.CreateNaDataList()
  }
}
portToFriend.libData.CreateDataList = createDataList

function getLibraryData(this: void): LibraryEntry[] {
  portToFriend.libData.CreateDataList()
  return GetWorldName() === "EU Megaserver"
    ? portToFriend.libData.euData
    : portToFriend.libData.naData
}
portToFriend.libData.GetLibraryData = getLibraryData
