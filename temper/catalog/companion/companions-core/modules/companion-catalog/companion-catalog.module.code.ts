import type { CompanionBaseRoleTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionEquipmentQualityTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type { CompanionTraitTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionWeaponRoleTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import type { CompanionWeaponTypeTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import type { CompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/modules/eso-companion-equipment-constant-pages/eso-companion-equipment-constant-pages.module.code.ts"

export type CompanionSkillId = string

export type CompanionSkillLineId = string

export type CompanionSkillLineCategory = "class" | "weapon" | "guild" | "armor"

export interface CompanionSkillLineTemplate {
  readonly id: string
  readonly name: string
  readonly companionId: string | null
  readonly category: CompanionSkillLineCategory
}

export interface CompanionTemplate {
  readonly id: string
  readonly name: string
  readonly esoCompanionId: number
  readonly classPassiveId: CompanionSkillId | null
}

export interface CompanionRoleTemplate {
  readonly id: string
  readonly name: string
}

export interface CompanionCatalogParts {
  readonly companions: readonly CompanionTemplate[]
  readonly skills: readonly CompanionSkillTemplate[]
  readonly skillLines: readonly CompanionSkillLineTemplate[]
  readonly traits: readonly CompanionTraitTemplate[]
  readonly roles: readonly CompanionRoleTemplate[]
  readonly baseRoles: readonly CompanionBaseRoleTemplate[]
  readonly qualities: readonly CompanionEquipmentQualityTemplate[]
  readonly weaponRoles: readonly CompanionWeaponRoleTemplate[]
  readonly weaponTypes: readonly CompanionWeaponTypeTemplate[]
  readonly equipmentConstants: readonly CompanionEquipmentConstant[]
  readonly activationBuffs: readonly CompanionRoleTemplate[]
  readonly passiveMetrics: readonly CompanionRoleTemplate[]
}

export interface CompanionCatalog {
  readonly weaponTypes: readonly CompanionWeaponTypeTemplate[]
  readonly equipmentConstants: readonly CompanionEquipmentConstant[]
  readonly activationBuffs: readonly CompanionRoleTemplate[]
  readonly passiveMetrics: readonly CompanionRoleTemplate[]
  readonly roles: readonly CompanionRoleTemplate[]
  readonly baseRoles: readonly CompanionBaseRoleTemplate[]
  readonly qualities: readonly CompanionEquipmentQualityTemplate[]
  readonly weaponRoles: readonly CompanionWeaponRoleTemplate[]
  readonly companions: readonly CompanionTemplate[]
  readonly companionsById: Readonly<Record<string, CompanionTemplate>>
  readonly skills: readonly CompanionSkillTemplate[]
  readonly skillIds: readonly string[]
  readonly skillsById: Readonly<Record<string, CompanionSkillTemplate>>
  readonly skillLines: readonly CompanionSkillLineTemplate[]
  readonly skillLinesById: Readonly<Record<string, CompanionSkillLineTemplate>>
  readonly traits: readonly CompanionTraitTemplate[]
  readonly traitIds: readonly string[]
  readonly traitsById: Readonly<Record<string, CompanionTraitTemplate>>
}

const UNREAD =
  "the companion catalogue is read from pages, and nothing has read it yet — await `loadCompanionCatalog()` where the work starts, or hand the browser what the server read"

export class CompanionCatalogUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "CompanionCatalogUnread"
  }
}

let held: CompanionCatalog | null = null

export function catalogOf({
  companions,
  skills,
  skillLines,
  traits,
  roles,
  baseRoles,
  qualities,
  weaponRoles,
  weaponTypes,
  equipmentConstants,
  activationBuffs,
  passiveMetrics,
}: CompanionCatalogParts): CompanionCatalog {
  const companionsById: Record<string, CompanionTemplate> = {}
  for (const companion of companions) companionsById[companion.id] = companion
  const skillsById: Record<string, CompanionSkillTemplate> = {}
  for (const skill of skills) skillsById[skill.id] = skill
  const skillLinesById: Record<string, CompanionSkillLineTemplate> = {}
  for (const line of skillLines) skillLinesById[line.id] = line
  const traitsById: Record<string, CompanionTraitTemplate> = {}
  for (const trait of traits) traitsById[trait.id] = trait
  return {
    roles,
    baseRoles,
    qualities,
    weaponRoles,
    weaponTypes,
    equipmentConstants,
    activationBuffs,
    passiveMetrics,
    companions,
    companionsById,
    skills,
    skillIds: skills.map((skill) => skill.id),
    skillsById,
    skillLines,
    skillLinesById,
    traits,
    traitIds: traits.map((trait) => trait.id),
    traitsById,
  }
}

export function holdCompanionCatalog(catalog: CompanionCatalog): CompanionCatalog {
  held = catalog
  return catalog
}

export function heldCompanionCatalog(): CompanionCatalog | null {
  return held
}

export function companionCatalog(): CompanionCatalog {
  if (held === null) throw new CompanionCatalogUnread()
  return held
}

export interface CompanionTable<Held> {
  readonly data: Readonly<Record<string, Held>>
  readonly ids: readonly string[]
  readonly list: readonly Held[]
  readonly has: (id: string) => boolean
}

export function companionSkills(): CompanionTable<CompanionSkillTemplate> {
  const catalog = companionCatalog()
  return {
    data: catalog.skillsById,
    ids: catalog.skillIds,
    list: catalog.skills,
    has: (id) => catalog.skillsById[id] !== undefined,
  }
}

export function companionSkillAt(id: string): CompanionSkillTemplate {
  const skill = companionCatalog().skillsById[id]
  if (skill === undefined) throw new Error(`no companion skill page answers to \`${id}\``)
  return skill
}

export function companionSkillLineAt(id: string): CompanionSkillLineTemplate {
  const line = companionCatalog().skillLinesById[id]
  if (line === undefined) throw new Error(`no companion skill line page answers to \`${id}\``)
  return line
}
