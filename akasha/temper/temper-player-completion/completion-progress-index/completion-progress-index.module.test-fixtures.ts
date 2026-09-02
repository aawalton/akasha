import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterEntry } from "../completion-next-character/completion-next-character.module.code.ts"

export function mkMount(
  speed: number,
  stamina: number,
  carry: number,
  max = 60
): CharacterCompletion["mountTraining"] {
  return {
    speed,
    maxSpeed: max,
    stamina,
    maxStamina: max,
    carryCapacity: carry,
    maxCarryCapacity: max,
  }
}

export const CHAR_FULL: CharacterCompletion = { mountTraining: mkMount(60, 60, 60) }
export const CHAR_PARTIAL: CharacterCompletion = { mountTraining: mkMount(30, 0, 0) }
export const CHAR_EMPTY: CharacterCompletion = { mountTraining: mkMount(0, 0, 0) }

export function mkRosterEntry(
  id: string,
  name: string,
  sortOrder: number | null,
  completion: CharacterCompletion | null
): CompletionCharacterEntry {
  return { id, name, firstName: name, sortOrder, completion }
}

export const EMPTY_ACCOUNT: AccountCompletion = { achievements: {} }

export const CHAR_SKILL_POINTS: CharacterCompletion = {
  skillPoints: {
    total: 0,
    unassigned: 0,
    level: 0,
    mainQuests: 0,
    tutorial: 0,
    foliumDiscognitum: 2,
    pvpRank: 0,
    maelstromArena: 0,
    endlessArchive: 0,
    skyshardPoints: 0,
    totalSkyshards: 0,
    zoneQuestTotal: 0,
    groupDungeonTotal: 0,
    publicDungeonTotal: 0,
    skyshards: {},
    zoneQuests: {},
    groupDungeons: {},
    publicDungeons: {},
  },
}

export const CHAR_MORPHS: CharacterCompletion = {
  classId: 1,
  raceId: 1,
  skillLineProgress: { 35: { currentRank: 0, currentXP: 0, nextRankXP: 0, skills: {} } },
}
