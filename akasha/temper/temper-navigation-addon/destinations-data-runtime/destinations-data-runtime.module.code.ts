export function achievementName(achievementId: number): string {
  const [name] = GetAchievementInfo(achievementId)
  return name
}

function asString(value: unknown): string {
  return value as string
}

export function abilityDescription(abilityId: number): string {
  return GetAbilityDescription(abilityId, undefined, asString(undefined))
}
