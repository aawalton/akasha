import {
  type CompanionSkillLine,
  readCompanionSkillLines,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import {
  type CompanionSkill,
  readCompanionSkills,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"

export interface CompanionCatalog {
  readonly skills: readonly CompanionSkill[]
  readonly skillIds: readonly string[]
  readonly skillsById: Readonly<Record<string, CompanionSkill>>
  readonly skillLines: readonly CompanionSkillLine[]
  readonly skillLinesById: Readonly<Record<string, CompanionSkillLine>>
}

const UNREAD =
  "the companion catalogue is read from pages, and nothing has read it yet — await `loadCompanionCatalog()` where the work starts, or hand the browser what the server read"

let held: CompanionCatalog | null = null

export function catalogOf(
  skills: readonly CompanionSkill[],
  skillLines: readonly CompanionSkillLine[]
): CompanionCatalog {
  const skillsById: Record<string, CompanionSkill> = {}
  for (const skill of skills) skillsById[skill.id] = skill
  const skillLinesById: Record<string, CompanionSkillLine> = {}
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

export async function loadCompanionCatalog(): Promise<CompanionCatalog> {
  if (held !== null) return held
  const [skills, skillLines] = await Promise.all([readCompanionSkills(), readCompanionSkillLines()])
  const catalog = catalogOf(skills, skillLines)
  held = catalog
  return catalog
}
