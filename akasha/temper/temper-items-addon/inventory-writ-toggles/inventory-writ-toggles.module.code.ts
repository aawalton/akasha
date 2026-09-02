import type { SavedVariablesData } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export type WritAutomation = SavedVariablesData["automation"]

export type WritResolveKey =
  | "dailyWrits"
  | "dailyWritBlacksmithing"
  | "dailyWritClothier"
  | "dailyWritWoodworking"
  | "dailyWritJewelrycrafting"
  | "dailyWritEnchanting"
  | "dailyWritAlchemy"
  | "dailyWritProvisioning"
  | "dailyWritAutoCraft"
  | "masterWrits"
  | "masterWritBlacksmithing"
  | "masterWritClothier"
  | "masterWritWoodworking"
  | "masterWritJewelrycrafting"
  | "masterWritEnchanting"
  | "masterWritAlchemy"
  | "masterWritProvisioning"

export interface WritToggles {
  dailyWrits: boolean
  dailyWritBlacksmithing: boolean
  dailyWritClothier: boolean
  dailyWritWoodworking: boolean
  dailyWritJewelrycrafting: boolean
  dailyWritEnchanting: boolean
  dailyWritAlchemy: boolean
  dailyWritProvisioning: boolean
  dailyWritAutoCraft: boolean
}

export function resolveWritToggle(
  this: void,
  automation: WritAutomation,
  charId: string,
  key: WritResolveKey
): boolean | undefined {
  const perChar = automation?.characters[charId]?.[key]
  if (typeof perChar === "boolean") return perChar
  const globalVal = automation?.global?.characters?.[key]
  if (typeof globalVal === "boolean") return globalVal
  return undefined
}

export function computeWritToggles(
  this: void,
  automation: WritAutomation,
  charId: string
): WritToggles | undefined {
  if (resolveWritToggle(automation, charId, "dailyWrits") !== true) return undefined
  return {
    dailyWrits: true,
    dailyWritBlacksmithing:
      resolveWritToggle(automation, charId, "dailyWritBlacksmithing") !== false,
    dailyWritClothier: resolveWritToggle(automation, charId, "dailyWritClothier") !== false,
    dailyWritWoodworking: resolveWritToggle(automation, charId, "dailyWritWoodworking") !== false,
    dailyWritJewelrycrafting:
      resolveWritToggle(automation, charId, "dailyWritJewelrycrafting") !== false,
    dailyWritEnchanting: resolveWritToggle(automation, charId, "dailyWritEnchanting") !== false,
    dailyWritAlchemy: resolveWritToggle(automation, charId, "dailyWritAlchemy") !== false,
    dailyWritProvisioning: resolveWritToggle(automation, charId, "dailyWritProvisioning") !== false,
    dailyWritAutoCraft: resolveWritToggle(automation, charId, "dailyWritAutoCraft") !== false,
  }
}

export function computeMasterWritEnabled(
  this: void,
  automation: WritAutomation,
  charId: string
): boolean {
  return resolveWritToggle(automation, charId, "masterWrits") === true
}

export interface MasterWritToggles {
  masterWritBlacksmithing: boolean
  masterWritClothier: boolean
  masterWritWoodworking: boolean
  masterWritJewelrycrafting: boolean
  masterWritEnchanting: boolean
  masterWritAlchemy: boolean
  masterWritProvisioning: boolean
}

export function computeMasterWritToggles(
  this: void,
  automation: WritAutomation,
  charId: string
): MasterWritToggles {
  return {
    masterWritBlacksmithing:
      resolveWritToggle(automation, charId, "masterWritBlacksmithing") !== false,
    masterWritClothier: resolveWritToggle(automation, charId, "masterWritClothier") !== false,
    masterWritWoodworking: resolveWritToggle(automation, charId, "masterWritWoodworking") !== false,
    masterWritJewelrycrafting:
      resolveWritToggle(automation, charId, "masterWritJewelrycrafting") !== false,
    masterWritEnchanting: resolveWritToggle(automation, charId, "masterWritEnchanting") !== false,
    masterWritAlchemy: resolveWritToggle(automation, charId, "masterWritAlchemy") !== false,
    masterWritProvisioning:
      resolveWritToggle(automation, charId, "masterWritProvisioning") !== false,
  }
}
