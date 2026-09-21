export const ADDON_NAME = "TemperCompanions"
export const SAVED_VARIABLES_NAME = "TemperCompanions_SavedVariables"

type SavedVariablesDefaultsShape = {
  companions: Record<number, never>
  selectedCompanionId: number | undefined
} & Record<string, unknown>

export const SAVED_VARIABLES_DEFAULTS: SavedVariablesDefaultsShape = {
  companions: {},
  selectedCompanionId: undefined,
}
