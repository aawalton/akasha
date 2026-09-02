export const CURSE_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
  [40359]: "vampire",
  [35658]: "werewolf",
  [32455]: "werewolf",
}
export const VAMPIRE_STAGE_ABILITY_ID_TO_TEMPER_ID: Record<number, string> = {
  [135397]: "stage-1",
  [135399]: "stage-2",
  [135400]: "stage-3",
  [135402]: "stage-4",
}

export const VAMPIRE_STAGE_ABILITY_ID_TO_INDEX: Record<number, number> = {
  [135397]: 1,
  [135399]: 2,
  [135400]: 3,
  [135402]: 4,
}

export const CURSE_TEMPER_ID_TO_INDEX: Record<string, number> = {
  "no-curse": 0,
  "vampire": 1,
  "werewolf": 2,
}
export function getCurseTemperId(abilityId: number): string | undefined {
  return CURSE_ABILITY_ID_TO_TEMPER_ID[abilityId]
}
export function getVampireStageTemperId(abilityId: number): string | undefined {
  return VAMPIRE_STAGE_ABILITY_ID_TO_TEMPER_ID[abilityId]
}
export function getVampireStageIndex(abilityId: number): number {
  return VAMPIRE_STAGE_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}
export function getCurseIndex(temperId: string): number {
  return CURSE_TEMPER_ID_TO_INDEX[temperId] ?? 0
}
