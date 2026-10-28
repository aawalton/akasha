import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import type {
  CharacterTarget,
  TargetBarSlot,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

export const BAR_SLOT_INDICES: readonly number[] = [3, 4, 5, 6, 7, 8]

export function slottedNameAt(slot: number, hotbar: HotBarCategory): string {
  return zo_strformat("<<1>>", GetSlotName(slot, hotbar))
}

interface BarWork {
  slotted: number
  readonly unbought: string[]
  readonly unmorphed: string[]
  readonly scribed: string[]
}

function slotOne(
  work: BarWork,
  wanted: TargetBarSlot,
  slot: number,
  hotbar: HotBarCategory
): undefined {
  if (wanted.abilityId === 0) {
    work.scribed.push(wanted.name)
    return undefined
  }
  const progression = SKILLS_DATA_MANAGER.GetProgressionDataByAbilityId(wanted.abilityId)
  const skill = progression?.GetSkillData()
  const allocator = skill?.GetPointAllocator()
  if (progression === undefined || skill === undefined || allocator === undefined) {
    work.unbought.push(wanted.name)
    return undefined
  }
  if (!allocator.IsPurchased()) {
    work.unbought.push(wanted.name)
    return undefined
  }
  if (allocator.GetMorphSlot() !== progression.GetMorphSlot()) {
    work.unmorphed.push(wanted.name)
    return undefined
  }
  if (ACTION_BAR_ASSIGNMENT_MANAGER.GetHotbar(hotbar).AssignSkillToSlot(slot, skill)) work.slotted++
  return undefined
}

function slotBar(
  work: BarWork,
  slots: readonly TargetBarSlot[],
  hotbar: HotBarCategory
): undefined {
  for (let at = 0; at < slots.length; at++) {
    const wanted = slots[at]
    const slot = BAR_SLOT_INDICES[at]
    if (wanted === undefined || slot === undefined || wanted.name === "") continue
    if (slottedNameAt(slot, hotbar) === wanted.name) continue
    slotOne(work, wanted, slot, hotbar)
  }
  return undefined
}

function namesSaid(lead: string, names: readonly string[]): string[] {
  return names.length === 0 ? [] : [`${lead}: ${names.join(", ")}.`]
}

export function applyBarTarget(target: CharacterTarget): string {
  if (IsUnitInCombat("player")) return "Skills wait until you are out of combat."
  const work: BarWork = { slotted: 0, unbought: [], unmorphed: [], scribed: [] }
  slotBar(work, target.bars.primary, HOTBAR_CATEGORY_PRIMARY)
  slotBar(work, target.bars.backup, HOTBAR_CATEGORY_BACKUP)
  return [
    `${work.slotted} ${work.slotted === 1 ? "skill" : "skills"} slotted.`,
    ...namesSaid("Not bought", work.unbought),
    ...namesSaid("Another morph", work.unmorphed),
    ...namesSaid("Scribed, left to you", work.scribed),
  ].join(" ")
}
