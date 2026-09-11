import type { DataMiningPayload } from "akasha/temper/capture-datamining/datamining-payload/datamining-payload.module.code.ts"
import type { CaptureDescriptor } from "akasha/temper/capture-descriptor/descriptor/descriptor.module.code.ts"

const DEFAULTS: DataMiningPayload = {}

export const DATAMINING_CAPTURE_DESCRIPTOR: CaptureDescriptor<DataMiningPayload> = {
  addonName: "TemperDataMining",
  savedVariablesName: "TemperDataMining_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
}
