import type {
  AccountAchievementProgress,
  CadwellProgress,
  CharacterAchievementProgress,
  ItemSetPieceProgress,
  MountTrainingProgress,
  ScribingProgress,
  SkillLineProgress,
  SkillPointProgress,
  SparseAntiquityLore,
  SparseLoreLibrary,
  SparsePoiDiscovery,
  SparseRecipes,
  SparseZoneCompletion,
  TraitResearchCraftType,
} from "../completion-progress/completion-progress.module.code.ts"

export interface ItemSetProgress {
  name: string
  categoryName?: string
  subcategoryName?: string
  slotsUnlocked: number
  totalSlots: number
  pieces?: readonly ItemSetPieceProgress[]
}

export interface AccountCompletion {
  achievements: Record<number, AccountAchievementProgress>
  itemSets?: Record<number, ItemSetProgress>
  antiquityLore?: SparseAntiquityLore
  championPointsEarned?: number
  collectibles?: readonly number[]
  subclassingSkillLineProgress?: Record<number, SkillLineProgress>

  tributeCardUpgrades?: Record<number, number[]>
  bankUpgrade?: { current: number; max: number }
  grandMasterStations?: Record<number, { name: string; unlocked: number[] }>
}

export interface CharacterCompletion {
  buildHash?: string
  gender?: number
  level?: number
  classId?: number
  allianceId?: number
  raceId?: number
  curseState?: string
  className?: string
  classIcon?: string
  achievements?: Record<number, CharacterAchievementProgress>
  skillLineProgress?: Record<number, SkillLineProgress>
  loreLibrary?: SparseLoreLibrary
  recipes?: SparseRecipes
  scribing?: ScribingProgress
  skillPoints?: SkillPointProgress
  traitResearch?: Record<number, TraitResearchCraftType>
  companionRapport?: Record<number, number>
  quests?: readonly number[]
  cadwell?: CadwellProgress
  zoneCompletion?: SparseZoneCompletion
  pointsOfInterest?: SparsePoiDiscovery
  mountTraining?: MountTrainingProgress
  bagSize?: number
  allianceRank?: number
  dailyWrits?: {
    date: string
    completed: number
  }
}

export interface CompanionCompletion {
  build?: Record<string, unknown>
  selectedBuild?: string
  targetBuildHash?: string
  level?: number
  currentXP?: number
  rapport?: number
  skillLineProgress?: Record<number, SkillLineProgress>
}
