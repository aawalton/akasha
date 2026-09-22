import type { DataMiningPayload } from "akasha/temper/capture/datamining/modules/datamining-payload/datamining-payload.module.code.ts"
import type { CaptureDescriptor } from "akasha/temper/modules/descriptor/descriptor.module.code.ts"

const DEFAULTS: DataMiningPayload = {}

export const DATAMINING_CAPTURE_DESCRIPTOR: CaptureDescriptor<DataMiningPayload> = {
  addonName: "TemperCatalog",
  savedVariablesName: "TemperDataMining_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
