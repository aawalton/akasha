import { createDataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { inGearOrder } from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"

interface WeaponBarTemplate {
  id: string
  name: string
}

const TEMPER_WEAPON_BARS = {
  "primary-weapon-bar": { id: "primary-weapon-bar", name: "Primary Bar" },
  "backup-weapon-bar": { id: "backup-weapon-bar", name: "Backup Bar" },
} as const satisfies Record<string, WeaponBarTemplate>

export const weaponBars = createDataFile<WeaponBarTemplate>()(TEMPER_WEAPON_BARS)

export type WeaponBar = (typeof weaponBars.ids)[number]

function isWeaponBar(slug: string): slug is WeaponBar {
  return weaponBars.has(slug)
}

let barPages: readonly WeaponBar[] | null = null

export function holdWeaponBarPages(pages: Iterable<Readonly<Record<string, unknown>>>): undefined {
  barPages = inGearOrder(pages, "displayOrder")
    .map((row) => String(row.slug))
    .filter(isWeaponBar)
  return undefined
}

export function weaponBarsInOrder(): readonly WeaponBar[] {
  if (barPages === null) throw new Error("the weapon bar pages are held with the gear, unread")
  return barPages
}
