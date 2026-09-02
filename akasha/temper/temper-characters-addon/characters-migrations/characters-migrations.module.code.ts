import { stripMorphVariantFields } from "@akasha/temper-characters-skills-morphs-addon/skill-morph-strip"
import type { SkillLineProgress } from "@akasha/temper-completion/completion-progress"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import type { SavedVariablesData } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { collectAchievements } from "../characters-achievements/characters-achievements.module.code.ts"

export interface Migration {
  domain: string
  version: number
  description: string
  migrate: (this: void, savedVars: SavedVariablesData) => void
}

export function clearAtMorphFlags(
  progress: Record<number, SkillLineProgress> | undefined
): undefined {
  if (progress === undefined) return
  for (const [, line] of Object.entries(progress)) {
    if (line.skills === undefined) continue
    for (const [, skill] of Object.entries(line.skills)) {
      skill.atMorph = undefined
    }
  }
}

const DK_REWORKED_LINES = [36, 37] as const

function clearSkillsOfReworkedLines(
  progress: Record<number, SkillLineProgress> | undefined
): undefined {
  if (progress === undefined) return
  for (const lineId of DK_REWORKED_LINES) {
    const line = progress[lineId]
    if (line !== undefined) {
      line.skills = undefined
    }
  }
}

export const MIGRATIONS: Migration[] = [
  {
    domain: "achievements",
    version: 1,
    description: "Re-capture achievements to populate criteriaProgress",
    migrate: (_savedVars: SavedVariablesData): undefined => {
      collectAchievements(true)
    },
  },
  {
    domain: "skill-morphs",
    version: 1,
    description: "Clear stale atMorph flags caused by wrong API return offset",
    migrate: (savedVars: SavedVariablesData): undefined => {
      for (const [, charEntry] of Object.entries(savedVars.characters)) {
        clearAtMorphFlags(charEntry?.skillLineProgress)
      }
      clearAtMorphFlags(savedVars.account.subclassingSkillLineProgress)
    },
  },
  {
    domain: "scribing",
    version: 1,
    description: "Clear scribing data to re-scan — previous bug could leave stale unlock states",
    migrate: (savedVars: SavedVariablesData): undefined => {
      for (const [, charEntry] of Object.entries(savedVars.characters)) {
        if (charEntry !== undefined) {
          charEntry.scribing = undefined
        }
      }
    },
  },
  {
    domain: "skill-morphs",
    version: 2,
    description: "Clear stale DK morph data after Draconic Power / Earthen Heart rework",
    migrate: (savedVars: SavedVariablesData): undefined => {
      for (const [, charEntry] of Object.entries(savedVars.characters)) {
        clearSkillsOfReworkedLines(charEntry?.skillLineProgress)
      }
      clearSkillsOfReworkedLines(savedVars.account.subclassingSkillLineProgress)
    },
  },
  {
    domain: "skill-morph-fields",
    version: 1,
    description: "Strip dead-state id/totalXPNeeded/totalXPProgress from captured morph variants",
    migrate: (savedVars: SavedVariablesData): undefined => {
      for (const [, charEntry] of Object.entries(savedVars.characters)) {
        stripMorphVariantFields(charEntry?.skillLineProgress)
      }
      stripMorphVariantFields(savedVars.account.subclassingSkillLineProgress)
    },
  },
]

export function runMigrations(): undefined {
  const savedVars = getSavedVariables()
  let migrated = 0

  for (const migration of MIGRATIONS) {
    const currentVersion = savedVars.migrationVersions[migration.domain] ?? 0
    if (currentVersion >= migration.version) continue

    d(
      `[${ADDON_NAME}] Migrating ${migration.domain} v${currentVersion} → v${migration.version}: ${migration.description}`
    )
    migration.migrate(savedVars)
    savedVars.migrationVersions[migration.domain] = migration.version
    migrated++
  }

  if (migrated > 0) {
    d(`[${ADDON_NAME}] Completed ${migrated} migration(s)`)
  }
}
