import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import { EU_LIBRARY_DATA } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-library-data-eu/housing-library-data-eu.module.code.ts"
import { NA_LIBRARY_DATA } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-library-data-na/housing-library-data-na.module.code.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import type { LibraryEntry } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-types/housing-types.module.code.ts"

function createEuDataList(this: void) {
  houseTravel.libData.euData = EU_LIBRARY_DATA
}
houseTravel.libData.CreateEuDataList = createEuDataList

function createNaDataList(this: void) {
  houseTravel.libData.naData = NA_LIBRARY_DATA
}
houseTravel.libData.CreateNaDataList = createNaDataList

function createDataList(this: void) {
  if (GetWorldName() === "EU Megaserver") {
    houseTravel.libData.CreateEuDataList()
  } else {
    houseTravel.libData.CreateNaDataList()
  }
}
houseTravel.libData.CreateDataList = createDataList

function getLibraryData(this: void): LibraryEntry[] {
  houseTravel.libData.CreateDataList()
  return GetWorldName() === "EU Megaserver"
    ? houseTravel.libData.euData
    : houseTravel.libData.naData
}
houseTravel.libData.GetLibraryData = getLibraryData
