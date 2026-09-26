import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export type CompanionWeaponTypeId =
  | "no-type"
  | "sword"
  | "axe"
  | "mace"
  | "dagger"
  | "greatsword"
  | "battleaxe"
  | "maul"
  | "bow"
  | "inferno-staff"
  | "ice-staff"
  | "lightning-staff"
  | "restoration-staff"
  | "shield"

const WEAPON_TYPE_IDS: ReadonlySet<unknown> = new Set<CompanionWeaponTypeId>([
  "no-type",
  "sword",
  "axe",
  "mace",
  "dagger",
  "greatsword",
  "battleaxe",
  "maul",
  "bow",
  "inferno-staff",
  "ice-staff",
  "lightning-staff",
  "restoration-staff",
  "shield",
])

export function isCompanionWeaponTypeId(value: unknown): value is CompanionWeaponTypeId {
  return WEAPON_TYPE_IDS.has(value)
}

export interface CompanionWeaponTypeTemplate {
  readonly id: CompanionWeaponTypeId
  readonly name: string
  readonly isTwoHanded: boolean
  readonly isOffHandOnly: boolean
  readonly iconName: string | null
}

export function companionWeaponTypes(): readonly CompanionWeaponTypeTemplate[] {
  return companionCatalog().weaponTypes
}

export function companionWeaponTypeName(id: string): string {
  return companionWeaponTypes().find((one) => one.id === id)?.name ?? id
}

export function isTwoHandedWeapon(id: CompanionWeaponTypeId): boolean {
  return companionWeaponTypes().find((one) => one.id === id)?.isTwoHanded ?? false
}
