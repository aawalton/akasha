import type { LocationTypeId } from "../location-type-data/location-type-data.module.code.ts"

function isAllDigits(s: string): boolean {
  if (s.length === 0) return false
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i)
    if (code < 48 || code > 57) return false
  }
  return true
}

export function getLocationDisplayName(key: string, storedDisplayName: string): string {
  if (key === "CraftBag") return "Crafting Bag"
  if (key === "FurnitureVault") return "Furniture Vault"
  return storedDisplayName
}

export function classifyLocation(key: string): LocationTypeId {
  if (key === "Bank") return "bank"
  if (key === "CraftBag") return "craftbag"
  if (key === "FurnitureVault") return "housing-storage"
  if (key.startsWith("HouseBank:")) return "housing-storage"
  if (key.startsWith("Storage Chest")) return "housing-storage"
  if (key.startsWith("Storage Coffer")) return "housing-storage"
  if (key.startsWith("House:")) return "house"
  if (key.startsWith("Companion:")) return "companion"
  if (isAllDigits(key)) return "character"
  return "guild"
}
