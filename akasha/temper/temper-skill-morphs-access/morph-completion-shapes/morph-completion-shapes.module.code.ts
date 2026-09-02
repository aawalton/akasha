import type { MorphSkillLineProgressMap } from "@akasha/temper-skill-morphs/character-morph-progress-eso"

export interface MorphCharacterCompletion {
  classId?: number | null
  raceId?: number | null
  skillLineProgress?: MorphSkillLineProgressMap | null
}

export interface MorphCharacterRow {
  id: string
  completion?: MorphCharacterCompletion | null
}

export interface MorphItemPickerLevel {
  label: string
  options: readonly { value: string | number; label: string }[]
}

export interface MorphCardChecker {
  isCardComplete: (completion: MorphCharacterCompletion | null) => boolean
  isItemComplete?: (
    completion: MorphCharacterCompletion | null,
    itemPath: readonly (string | number)[]
  ) => boolean
  getItemPickerLevels?: (
    completions: readonly MorphCharacterCompletion[],
    currentPath: readonly (string | number)[]
  ) => MorphItemPickerLevel | null
}
