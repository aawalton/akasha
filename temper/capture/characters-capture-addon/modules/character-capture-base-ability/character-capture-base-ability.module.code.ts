import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
export function getBaseAbilityId(abilityId: number): number {
  if (abilityId === 0) return 0
  return SKILLS_DATA_MANAGER.abilityIdToProgressionDataMap?.[abilityId]?.abilityId ?? abilityId
}
