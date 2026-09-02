import { join } from "node:path"
import {
  addonsDir as resolveAddonsDir,
  savedVarsDir as resolveSavedVarsDir,
} from "@akasha/temper-eso-paths/eso-paths-resolve"
import type { FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"

export interface WatcherConfig {
  savedVarsDir: string
  addonsDir: string
  temperCharactersPath: string
  temperCompanionsPath: string
  temperCatalogPath: string
  dataMiningPath: string
  inventoryPath: string
  inventoryConfigPath: string
  catalogConfigPath: string
  charactersConfigPath: string
  companionsConfigPath: string
  temperErrorsPath: string
  temperSalesPath: string
}

export interface ConfigDirs {
  readonly savedVarsDir?: string
  readonly addonsDir?: string
}

const SOURCE_KEY = {
  catalog: "temperCatalogPath",
  characters: "temperCharactersPath",
  companions: "temperCompanionsPath",
  "data-mining": "dataMiningPath",
  errors: "temperErrorsPath",
  inventory: "inventoryPath",
  sales: "temperSalesPath",
} as const satisfies Record<FileType, keyof WatcherConfig>

function addonConfig(addonsDir: string, addon: string): string {
  return join(addonsDir, addon, `${addon}Config.lua`)
}

export function buildConfig(dirs: ConfigDirs = {}): WatcherConfig {
  const savedVarsDir = dirs.savedVarsDir ?? resolveSavedVarsDir()
  const addonsDir = dirs.addonsDir ?? resolveAddonsDir()

  return {
    savedVarsDir,
    addonsDir,
    temperCharactersPath: join(savedVarsDir, "TemperCharacters.lua"),
    temperCompanionsPath: join(savedVarsDir, "TemperCompanions.lua"),
    temperCatalogPath: join(savedVarsDir, "TemperCatalog.lua"),
    dataMiningPath: join(savedVarsDir, "TemperDataMining.lua"),
    inventoryPath: join(savedVarsDir, "TemperInventory.lua"),
    inventoryConfigPath: addonConfig(addonsDir, "TemperInventory"),
    catalogConfigPath: addonConfig(addonsDir, "TemperCatalog"),
    charactersConfigPath: addonConfig(addonsDir, "TemperCharacters"),
    companionsConfigPath: addonConfig(addonsDir, "TemperCompanions"),
    temperErrorsPath: join(savedVarsDir, "TemperErrors.lua"),
    temperSalesPath: join(savedVarsDir, "TemperSales.lua"),
  }
}

export function sourcePathFor(fileType: FileType, config: WatcherConfig): string {
  return config[SOURCE_KEY[fileType]]
}
