import { addonsFile, savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"

export const DEFAULT_SAVED_VARIABLES_PATH = savedVarsFile("TemperCatalog.lua")

export const DEFAULT_SIDE_FILE_PATH = addonsFile("TemperCatalog/TemperCatalogConfig.lua")

export function resolveSavedVariablesPath(override: string | undefined): string {
  return override ?? DEFAULT_SAVED_VARIABLES_PATH
}

export function resolveSideFilePath(override: string | undefined): string {
  return override ?? DEFAULT_SIDE_FILE_PATH
}
