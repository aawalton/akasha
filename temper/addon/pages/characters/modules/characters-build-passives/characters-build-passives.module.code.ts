import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import type {
  CharacterTarget,
  TargetPassive,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

const NAMES_SAID = 5

function skillDataOf(passive: TargetPassive): SlottableSkillData | undefined {
  return SKILLS_DATA_MANAGER.GetProgressionDataByAbilityId(passive.abilityId)?.GetSkillData()
}

function rankWanted(passive: TargetPassive, skill: SlottableSkillData | undefined): number {
  const top = skill?.GetNumRanks?.()
  return top === undefined ? passive.rank : Math.min(passive.rank, top)
}

export function passiveRankWanted(passive: TargetPassive): number {
  return rankWanted(passive, skillDataOf(passive))
}

function rankHeld(allocator: SlottableSkillAllocator): number {
  return allocator.IsPurchased() ? allocator.GetSkillProgressionKey() : 0
}

export function passiveHeld(passive: TargetPassive): boolean {
  const skill = skillDataOf(passive)
  return skill !== undefined && rankHeld(skill.GetPointAllocator()) >= rankWanted(passive, skill)
}

function raise(allocator: SlottableSkillAllocator, rank: number): boolean {
  if (!allocator.IsPurchased() && !allocator.Purchase()) return false
  while (rankHeld(allocator) < rank) {
    if (!allocator.IncreaseRank()) return false
  }
  return true
}

function namesSaid(lead: string, names: readonly string[]): string[] {
  if (names.length === 0) return []
  const shown = names.slice(0, NAMES_SAID).join(", ")
  const more = names.length > NAMES_SAID ? ` and ${names.length - NAMES_SAID} more` : ""
  return [`${lead}: ${shown}${more}.`]
}

export function applyPassiveTarget(target: CharacterTarget): string {
  if (IsUnitInCombat("player")) return "Passives wait until you are out of combat."
  let raised = 0
  const unbought: string[] = []
  for (const passive of target.passives) {
    const skill = skillDataOf(passive)
    if (skill === undefined) {
      unbought.push(passive.name)
      continue
    }
    const allocator = skill.GetPointAllocator()
    const rank = rankWanted(passive, skill)
    if (rankHeld(allocator) >= rank) continue
    if (raise(allocator, rank)) raised++
    else unbought.push(passive.name)
  }
  return [
    `${raised} ${raised === 1 ? "passive" : "passives"} bought or raised.`,
    ...namesSaid("Could not buy", unbought),
  ].join(" ")
}
