import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

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
