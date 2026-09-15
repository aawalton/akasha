export interface CompanionSkillCatalogAbility {
  abilityId: number
  name: string
  description: string
  icon: string
  rankRequired: number
}

export interface CompanionSkillCatalogLine {
  name: string
  skillType: number
  lineIndex: number
  maxRank: number
  abilities: Record<number, CompanionSkillCatalogAbility>
}
