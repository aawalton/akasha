export interface ChampionStarCatalogEntry {
  esoChampionSkillId: number
  maxPoints: number
  isSlottable: boolean
  jumpPoints?: readonly number[]
}

export type ChampionStarCatalogData = Record<number, ChampionStarCatalogEntry>
