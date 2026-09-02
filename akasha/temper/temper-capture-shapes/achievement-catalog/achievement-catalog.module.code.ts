export interface AchievementCatalogEntry {
  name: string
  points: number
  totalSteps: number
  isCharacterSpecific: boolean
}

export interface AchievementCatalogSubCategory {
  name: string
  achievements: Record<number, AchievementCatalogEntry>
}

export interface AchievementCatalogCategory {
  name: string
  generalSubCategory?: AchievementCatalogSubCategory
  subCategories: Record<number, AchievementCatalogSubCategory>
}

export interface AchievementCatalogData {
  categories: Record<number, AchievementCatalogCategory>
}
