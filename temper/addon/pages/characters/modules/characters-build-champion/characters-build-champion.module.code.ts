import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import type {
  CharacterTarget,
  TargetDiscipline,
  TargetDisciplineKey,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"

const DISCIPLINE_INDEX: Readonly<Record<TargetDisciplineKey, number>> = {
  craft: 1,
  warfare: 2,
  fitness: 3,
}

const SLOT_INDICES: Readonly<Record<TargetDisciplineKey, readonly number[]>> = {
  craft: [1, 2, 3, 4],
  warfare: [5, 6, 7, 8],
  fitness: [9, 10, 11, 12],
}

export interface DisciplinePlan {
  readonly discipline: TargetDisciplineKey
  readonly skillIds: readonly number[]
  readonly points: LuaMap<number, number>
  readonly starsFull: number
  readonly starsWanted: number
  readonly pointsLeft: number
}

function skillIdsOf(disciplineIndex: number): number[] {
  const ids: number[] = []
  const count = GetNumChampionDisciplineSkills(disciplineIndex)
  for (let at = 1; at <= count; at++) ids.push(GetChampionSkillId(disciplineIndex, at))
  return ids
}

function linksOf(skillId: number): number[] {
  return [...GetChampionSkillLinkIds(skillId)].filter((one) => one !== undefined && one !== 0)
}

function unlockCostOf(skillId: number): number {
  const most = GetChampionSkillMaxPoints(skillId)
  for (let points = 1; points <= most; points++) {
    if (WouldChampionSkillNodeBeUnlocked(skillId, points)) return points
  }
  return most
}

interface Planning {
  readonly points: LuaMap<number, number>
  budget: number
}

function haveIn(planning: Planning, skillId: number): number {
  return planning.points.get(skillId) ?? 0
}

function unlockedIn(planning: Planning, skillId: number): boolean {
  return WouldChampionSkillNodeBeUnlocked(skillId, haveIn(planning, skillId))
}

function reachableIn(planning: Planning, skillId: number): boolean {
  if (IsChampionSkillRootNode(skillId) || unlockedIn(planning, skillId)) return true
  return linksOf(skillId).some((linked) => unlockedIn(planning, linked))
}

function raiseTo(planning: Planning, skillId: number, points: number): boolean {
  const give = Math.min(points - haveIn(planning, skillId), planning.budget)
  if (give <= 0) return false
  planning.points.set(skillId, haveIn(planning, skillId) + give)
  planning.budget -= give
  return true
}

function pathTo(planning: Planning, skillIds: readonly number[], goal: number): number[] {
  const cameFrom = new LuaMap<number, number>()
  const queue: number[] = []
  for (const skillId of skillIds) {
    if (unlockedIn(planning, skillId) || IsChampionSkillRootNode(skillId)) {
      cameFrom.set(skillId, skillId)
      queue.push(skillId)
    }
  }
  for (let at = 0; at < queue.length; at++) {
    const here = queue[at]
    if (here === undefined) continue
    if (here === goal) {
      const path: number[] = []
      let step = here
      while (cameFrom.get(step) !== step) {
        path.unshift(step)
        step = cameFrom.get(step) ?? step
      }
      path.unshift(step)
      return path
    }
    for (const next of linksOf(here)) {
      if (cameFrom.has(next)) continue
      cameFrom.set(next, here)
      queue.push(next)
    }
  }
  return []
}

function opensAPath(planning: Planning, skillIds: readonly number[], goal: number): boolean {
  for (const step of pathTo(planning, skillIds, goal)) {
    if (step === goal || unlockedIn(planning, step)) continue
    if (!reachableIn(planning, step)) return false
    return raiseTo(planning, step, unlockCostOf(step)) && unlockedIn(planning, step)
  }
  return false
}

export function planDiscipline(target: TargetDiscipline): DisciplinePlan {
  const disciplineIndex = DISCIPLINE_INDEX[target.discipline]
  const disciplineId = GetChampionDisciplineId(disciplineIndex)
  const skillIds = skillIdsOf(disciplineIndex)
  const planning: Planning = {
    points: new LuaMap<number, number>(),
    budget: GetNumSpentChampionPoints(disciplineId) + GetNumUnspentChampionPoints(disciplineId),
  }
  const wanted = target.stars.map((star) => star.id)
  const full = (skillId: number): boolean =>
    haveIn(planning, skillId) >= GetChampionSkillMaxPoints(skillId)
  let moving = true
  while (moving && planning.budget > 0) {
    moving = false
    for (const skillId of wanted) {
      if (full(skillId) || !reachableIn(planning, skillId)) continue
      if (raiseTo(planning, skillId, GetChampionSkillMaxPoints(skillId))) moving = true
    }
    if (moving) continue
    const stranded = wanted.find((skillId) => !full(skillId) && !reachableIn(planning, skillId))
    if (stranded !== undefined) moving = opensAPath(planning, skillIds, stranded)
  }
  return {
    discipline: target.discipline,
    skillIds,
    points: planning.points,
    starsFull: wanted.filter(full).length,
    starsWanted: wanted.length,
    pointsLeft: planning.budget,
  }
}

export function slottedOf(discipline: TargetDisciplineKey): readonly number[] {
  return SLOT_INDICES[discipline].map((slot) => GetSlotBoundId(slot, HOTBAR_CATEGORY_CHAMPION))
}

function respecNeeded(plans: readonly DisciplinePlan[]): boolean {
  return plans.some((plan) =>
    plan.skillIds.some(
      (skillId) => (plan.points.get(skillId) ?? 0) < GetNumPointsSpentOnChampionSkill(skillId)
    )
  )
}

function addPlan(plan: DisciplinePlan): number {
  let added = 0
  for (const skillId of plan.skillIds) {
    const points = plan.points.get(skillId) ?? 0
    if (points === GetNumPointsSpentOnChampionSkill(skillId)) continue
    AddSkillToChampionPurchaseRequest(skillId, points)
    added++
  }
  return added
}

function addSlots(target: TargetDiscipline): number {
  let added = 0
  const slots = SLOT_INDICES[target.discipline]
  const bound = slottedOf(target.discipline)
  for (let at = 0; at < slots.length; at++) {
    const wanted = target.slotted[at]?.id ?? 0
    const slot = slots[at]
    if (wanted === 0 || slot === undefined || bound[at] === wanted) continue
    AddHotbarSlotToChampionPurchaseRequest(slot, wanted)
    added++
  }
  return added
}

function championPlansOf(target: CharacterTarget): readonly DisciplinePlan[] {
  return target.champion.map(planDiscipline)
}

export function applyChampionTarget(target: CharacterTarget): string {
  if (IsUnitInCombat("player")) return "Champion points wait until you are out of combat."
  const plans = championPlansOf(target)
  const respec = respecNeeded(plans)
  PrepareChampionPurchaseRequest(respec)
  let added = 0
  for (const plan of plans) added += addPlan(plan)
  for (const discipline of target.champion) added += addSlots(discipline)
  if (added === 0) return "Champion points already match the target."
  const expected = GetExpectedResultForChampionPurchaseRequest()
  if (expected !== CHAMPION_PURCHASE_SUCCESS) {
    return GetString("SI_CHAMPIONPURCHASERESULT", expected)
  }
  SendChampionPurchaseRequest()
  return respec
    ? `Champion points respent for ${GetChampionRespecCost()} gold.`
    : "Champion points spent."
}
