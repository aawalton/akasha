import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import {
  type CompanionSkillLineTemplate,
  readCompanionSkillLines,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import { readCompanionSkills } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"

export type CompanionSkillId = string

export type CompanionSkillLineId = string

export interface CompanionCatalog {
  readonly skills: readonly CompanionSkillTemplate[]
  readonly skillIds: readonly string[]
  readonly skillsById: Readonly<Record<string, CompanionSkillTemplate>>
  readonly skillLines: readonly CompanionSkillLineTemplate[]
  readonly skillLinesById: Readonly<Record<string, CompanionSkillLineTemplate>>
}

const UNREAD =
  "the companion catalogue is read from pages, and nothing has read it yet — await `loadCompanionCatalog()` where the work starts, or hand the browser what the server read"

let held: CompanionCatalog | null = null

export function catalogOf(
  skills: readonly CompanionSkillTemplate[],
  skillLines: readonly CompanionSkillLineTemplate[]
): CompanionCatalog {
  const skillsById: Record<string, CompanionSkillTemplate> = {}
  for (const skill of skills) skillsById[skill.id] = skill
  const skillLinesById: Record<string, CompanionSkillLineTemplate> = {}
  for (const line of skillLines) skillLinesById[line.id] = line
  return {
    skills,
    skillIds: skills.map((skill) => skill.id),
    skillsById,
    skillLines,
    skillLinesById,
  }
}

export function holdCompanionCatalog(catalog: CompanionCatalog): CompanionCatalog {
  held = catalog
  return catalog
}

export function companionCatalog(): CompanionCatalog {
  if (held === null) throw new Error(UNREAD)
  return held
}

export function companionCatalogRead(): boolean {
  return held !== null
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

export function companionSkillLines(): CompanionTable<CompanionSkillLineTemplate> {
  const catalog = companionCatalog()
  return {
    data: catalog.skillLinesById,
    ids: catalog.skillLines.map((line) => line.id),
    list: catalog.skillLines,
    has: (id) => catalog.skillLinesById[id] !== undefined,
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

export async function loadCompanionCatalog(): Promise<CompanionCatalog> {
  if (held !== null) return held
  const [skills, skillLines] = await Promise.all([readCompanionSkills(), readCompanionSkillLines()])
  const catalog = catalogOf(skills, skillLines)
  held = catalog
  return catalog
}
