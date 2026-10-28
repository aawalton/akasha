import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
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

const RESPEC_NAME = "TemperCharactersTargetSkillRespec"

const AFTER_RESPEC_OPENS_MS = 100

interface SkillNeed {
  readonly name: string
  readonly slot: number
  readonly hotbar: HotBarCategory
  readonly progression: SlottableProgressionData
  readonly skill: SlottableSkillData
}

interface BarWork {
  slotted: number
  refunded: number
  readonly bought: string[]
  readonly morphed: string[]
  readonly unbuyable: string[]
  readonly unmorphable: string[]
  readonly scribed: string[]
}

let barsSaid = (_text: string): undefined => undefined

export function whenBarsSaid(listener: (text: string) => undefined): undefined {
  barsSaid = listener
  return undefined
}

function targetSlots(target: CharacterTarget): readonly [TargetBarSlot[], HotBarCategory][] {
  return [
    [[...target.bars.primary], HOTBAR_CATEGORY_PRIMARY],
    [[...target.bars.backup], HOTBAR_CATEGORY_BACKUP],
  ]
}

function keptOf(target: CharacterTarget): LuaSet<SlottableSkillData> {
  const kept = new LuaSet<SlottableSkillData>()
  for (const [slots] of targetSlots(target)) {
    for (const wanted of slots) {
      if (wanted.abilityId === 0) continue
      const skill = SKILLS_DATA_MANAGER.GetProgressionDataByAbilityId(
        wanted.abilityId
      )?.GetSkillData()
      if (skill !== undefined) kept.add(skill)
    }
  }
  return kept
}

function needsOf(target: CharacterTarget, work: BarWork): SkillNeed[] {
  const needs: SkillNeed[] = []
  for (const [slots, hotbar] of targetSlots(target)) {
    for (let at = 0; at < slots.length; at++) {
      const wanted = slots[at]
      const slot = BAR_SLOT_INDICES[at]
      if (wanted === undefined || slot === undefined || wanted.name === "") continue
      if (slottedNameAt(slot, hotbar) === wanted.name) continue
      if (wanted.abilityId === 0) {
        work.scribed.push(wanted.name)
        continue
      }
      const progression = SKILLS_DATA_MANAGER.GetProgressionDataByAbilityId(wanted.abilityId)
      if (progression === undefined) {
        work.unbuyable.push(wanted.name)
        continue
      }
      needs.push({
        name: wanted.name,
        slot,
        hotbar,
        progression,
        skill: progression.GetSkillData(),
      })
    }
  }
  return needs
}

function pointsWanted(needs: readonly SkillNeed[]): number {
  const counted = new LuaSet<SlottableSkillData>()
  let points = 0
  for (const need of needs) {
    if (counted.has(need.skill)) continue
    counted.add(need.skill)
    const allocator = need.skill.GetPointAllocator()
    const morphed = need.progression.GetMorphSlot() !== MORPH_SLOT_BASE
    if (!allocator.IsPurchased()) points += morphed ? 2 : 1
    else if (morphed && allocator.GetMorphSlot() === MORPH_SLOT_BASE) points += 1
  }
  return points
}

function needsRespec(needs: readonly SkillNeed[]): boolean {
  if (pointsWanted(needs) > SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints()) return true
  return needs.some((need) => {
    const allocator = need.skill.GetPointAllocator()
    const held = allocator.GetMorphSlot()
    return (
      allocator.IsPurchased() &&
      held !== MORPH_SLOT_BASE &&
      held !== need.progression.GetMorphSlot()
    )
  })
}

function refundOne(kept: LuaSet<SlottableSkillData>, work: BarWork): boolean {
  for (const [, typeData] of SKILLS_DATA_MANAGER.SkillTypeIterator()) {
    for (const [, lineData] of typeData.SkillLineIterator()) {
      for (const [, skill] of lineData.SkillIterator()) {
        if (kept.has(skill) || skill.IsPassive() || skill.IsCraftedAbility()) continue
        const allocator = skill.GetPointAllocator()
        if (!allocator.IsPurchased()) continue
        const unmorphed = allocator.Unmorph()
        if (allocator.Sell() || unmorphed) {
          work.refunded++
          return true
        }
      }
    }
  }
  return false
}

function pointsShort(): boolean {
  return SKILL_POINT_ALLOCATION_MANAGER.GetAvailableSkillPoints() <= 0
}

function retryWithRefunds(
  step: () => boolean,
  kept: LuaSet<SlottableSkillData>,
  work: BarWork,
  respec: boolean
): boolean {
  while (!step()) {
    if (!respec || !pointsShort() || !refundOne(kept, work)) return false
  }
  return true
}

function morphTo(
  need: SkillNeed,
  kept: LuaSet<SlottableSkillData>,
  work: BarWork,
  respec: boolean
): boolean {
  const allocator = need.skill.GetPointAllocator()
  const morph = need.progression.GetMorphSlot()
  if (allocator.GetMorphSlot() === morph) return true
  if (morph === MORPH_SLOT_BASE) return respec && allocator.Unmorph()
  return retryWithRefunds(() => allocator.Morph(morph), kept, work, respec)
}

function workOn(
  needs: readonly SkillNeed[],
  kept: LuaSet<SlottableSkillData>,
  work: BarWork,
  respec: boolean
): undefined {
  for (const need of needs) {
    const allocator = need.skill.GetPointAllocator()
    if (!allocator.IsPurchased()) {
      if (!retryWithRefunds(() => allocator.Purchase(), kept, work, respec)) {
        work.unbuyable.push(need.name)
        continue
      }
      work.bought.push(need.name)
    }
    if (allocator.GetMorphSlot() !== need.progression.GetMorphSlot()) {
      if (!morphTo(need, kept, work, respec)) {
        work.unmorphable.push(need.name)
        continue
      }
      work.morphed.push(need.name)
    }
    const hotbar = ACTION_BAR_ASSIGNMENT_MANAGER.GetHotbar(need.hotbar)
    if (hotbar.AssignSkillToSlot(need.slot, need.skill)) work.slotted++
  }
  return undefined
}

function namesSaid(lead: string, names: readonly string[]): string[] {
  return names.length === 0 ? [] : [`${lead}: ${names.join(", ")}.`]
}

function saidOf(work: BarWork): string {
  return [
    `${work.slotted} ${work.slotted === 1 ? "skill" : "skills"} slotted.`,
    ...namesSaid("Bought", work.bought),
    ...namesSaid("Morphed", work.morphed),
    ...(work.refunded > 0 ? [`${work.refunded} other skills refunded.`] : []),
    ...namesSaid("Could not buy", work.unbuyable),
    ...namesSaid("Could not morph", work.unmorphable),
    ...namesSaid("Scribed, left to you", work.scribed),
  ].join(" ")
}

function respecFor(
  needs: readonly SkillNeed[],
  kept: LuaSet<SlottableSkillData>,
  work: BarWork
): undefined {
  EVENT_MANAGER.RegisterForEvent(RESPEC_NAME, EVENT_START_SKILL_RESPEC, () => {
    EVENT_MANAGER.UnregisterForEvent(RESPEC_NAME, EVENT_START_SKILL_RESPEC)
    zo_callLater(() => {
      const mode = SKILLS_AND_ACTION_BAR_MANAGER.GetSkillPointAllocationMode()
      if (mode === SKILL_POINT_ALLOCATION_MODE_PURCHASE_ONLY) {
        barsSaid("The skill respec did not open.")
        return
      }
      workOn(needs, kept, work, true)
      const cost = GetSkillRespecCost(mode)
      const paid = cost > 0 ? ` Skill respec for ${cost} gold.` : ""
      const answered = (_event: number, result: number): undefined => {
        EVENT_MANAGER.UnregisterForEvent(RESPEC_NAME, EVENT_SKILL_RESPEC_RESULT)
        const refused =
          result === RESPEC_RESULT_SUCCESS
            ? ""
            : ` The game refused the respec: ${GetString("SI_RESPECRESULT", result)}`
        return barsSaid(`${saidOf(work)}${paid}${refused}`)
      }
      EVENT_MANAGER.RegisterForEvent(RESPEC_NAME, EVENT_SKILL_RESPEC_RESULT, answered)
      SKILLS_AND_ACTION_BAR_MANAGER.ApplyChanges()
      barsSaid(`Waiting for the skill respec to finish. ${saidOf(work)}${paid}`)
    }, AFTER_RESPEC_OPENS_MS)
  })
  StartSkillRespecFromUI()
  return undefined
}

export function applyBarTarget(target: CharacterTarget): string {
  if (IsUnitInCombat("player")) return "Skills wait until you are out of combat."
  const work: BarWork = {
    slotted: 0,
    refunded: 0,
    bought: [],
    morphed: [],
    unbuyable: [],
    unmorphable: [],
    scribed: [],
  }
  const needs = needsOf(target, work)
  const kept = keptOf(target)
  if (needs.length > 0 && needsRespec(needs)) {
    respecFor(needs, kept, work)
    return "Skills need a respec, which opens the skills window."
  }
  workOn(needs, kept, work, false)
  return saidOf(work)
}
