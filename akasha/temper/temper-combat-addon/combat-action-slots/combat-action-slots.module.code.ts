import {
  buildAbility,
  parseDescriptionDuration,
  parseDescriptionNums,
} from "@akasha/temper-combat-addon/combat-action-ability"
import {
  buildAction,
  TARGET_AREA,
  TARGET_CONE,
  TARGET_ENEMY,
  TARGET_GROUND,
  TARGET_SELF,
} from "@akasha/temper-combat-addon/combat-action-build"
import type { LfgRole } from "@akasha/temper-combat-addon/combat-action-priority"
import type { Ability, Action } from "@akasha/temper-combat-addon/combat-action-types"

const PLAYER_UNIT_TAG = "player"

export function getNow(this: void): number {
  return GetGameTimeMilliseconds()
}

export function getActiveHotbarCategory(this: void): number {
  return GetActiveHotbarCategory()
}

export function getAbilityFrequencyMs(this: void, abilityId: number): number {
  return GetAbilityFrequencyMS(abilityId, PLAYER_UNIT_TAG) ?? 0
}

export function isSlotToggled(this: void, slotNum: number, hotbarCategory: number): boolean {
  return IsSlotToggled(slotNum, hotbarCategory)
}

export function getSelectedRole(this: void): LfgRole {
  const role = GetSelectedLFGRole()
  if (role === LFG_ROLE_TANK) {
    return "tank"
  }
  if (role === LFG_ROLE_HEAL) {
    return "heal"
  }
  return "dps"
}

function resolveSlotAbilityId(slotNum: number, hotbarCategory: number): number {
  let abilityId = GetSlotBoundId(slotNum, hotbarCategory)
  if (GetSlotType(slotNum, hotbarCategory) === ACTION_TYPE_CRAFTED_ABILITY) {
    abilityId = GetAbilityIdForCraftedAbilityId(abilityId)
  }
  return abilityId
}

function resolveProgression(
  abilityId: number,
  name: string,
  slotIcon: string
): { progressionName?: string; icon3?: string } {
  const [hasProgression, progressionIndex] = GetAbilityProgressionXPInfoFromAbilityId(abilityId)
  if (!hasProgression) {
    return {}
  }
  const out: { progressionName?: string; icon3?: string } = {}
  const [progressionName] = GetAbilityProgressionInfo(progressionIndex)
  if (progressionName.length > 0 && progressionName !== name) {
    out.progressionName = zo_strformat("<<1>>", progressionName)
  }
  const [, icon3] = GetAbilityProgressionAbilityInfo(progressionIndex, 0, 1)
  if (icon3 !== slotIcon) {
    out.icon3 = icon3
  }
  return out
}

export function readSlotAbility(
  this: void,
  slotNum: number,
  hotbarCategory: number
): Ability | undefined {
  const abilityId = resolveSlotAbilityId(slotNum, hotbarCategory)
  if (abilityId <= 0) {
    return undefined
  }
  const [slotIcon] = GetSlotTexture(slotNum, hotbarCategory)
  const name = zo_strformat("<<1>>", GetSlotName(slotNum, hotbarCategory))
  const description = zo_strformat(
    "<<1>>",
    GetAbilityDescription(abilityId, undefined, PLAYER_UNIT_TAG)
  )

  const params: {
    id: number
    name: string
    icon: string
    icon2?: string
    icon3?: string
    progressionName?: string
    description: string
    type: number
  } = {
    id: abilityId,
    name,
    icon: slotIcon,
    description,
    type: 0,
  }

  const abilityIcon = GetAbilityIcon(abilityId)
  if (abilityIcon !== slotIcon) {
    params.icon2 = abilityIcon
  }

  const progression = resolveProgression(abilityId, name, slotIcon)
  if (progression.progressionName !== undefined) {
    params.progressionName = progression.progressionName
  }
  if (progression.icon3 !== undefined) {
    params.icon3 = progression.icon3
  }

  return buildAbility(params)
}

function normalizeTargetDescription(raw: string | undefined): string | undefined {
  if (raw === undefined) {
    return undefined
  }
  if (raw === GetString(SI_TARGETTYPE0)) {
    return TARGET_ENEMY
  }
  if (raw === GetString(SI_ABILITY_TOOLTIP_TARGET_TYPE_AREA)) {
    return TARGET_AREA
  }
  if (raw === GetString(SI_ABILITY_TOOLTIP_TARGET_TYPE_CONE)) {
    return TARGET_CONE
  }
  if (raw === GetString(SI_ABILITY_TOOLTIP_TARGET_TYPE_GROUND)) {
    return TARGET_GROUND
  }
  if (raw === GetString(SI_ABILITY_TOOLTIP_RANGE_SELF) || raw === "自己") {
    return TARGET_SELF
  }
  return raw
}

function resolveForTank(abilityId: number, icon: string): boolean {
  const [isTank] = GetAbilityRoles(abilityId)
  if (isTank) {
    return true
  }
  return icon.includes("destructionstaff_005_a")
}

export function buildActionFromSlot(
  this: void,
  slotNum: number,
  hotbarCategory: number,
  sn: number,
  now: number
): Action | undefined {
  const ability = readSlotAbility(slotNum, hotbarCategory)
  if (ability === undefined) {
    return undefined
  }
  const abilityId = ability.id

  const [channeled, castDuration] = GetAbilityCastInfo(abilityId, undefined, PLAYER_UNIT_TAG)
  const rawDuration = GetAbilityDuration(abilityId, undefined, PLAYER_UNIT_TAG) ?? 0

  const targetDescription = normalizeTargetDescription(
    GetAbilityTargetDescription(abilityId, undefined, PLAYER_UNIT_TAG)
  )
  const radius = GetAbilityRadius(abilityId, undefined, PLAYER_UNIT_TAG)
  const forTank = resolveForTank(abilityId, ability.icon)

  return buildAction({
    sn,
    slotNum,
    hotbarCategory,
    ability,
    channeled: channeled === true,
    castTime: castDuration ?? 0,
    startTime: now,
    rawDuration,
    descriptionDuration: parseDescriptionDuration(ability.description),
    descriptionNums: parseDescriptionNums(ability.description),
    radius,
    roles: { forTank },
    targetDescription,
    onlyOneTarget: false,
  })
}
