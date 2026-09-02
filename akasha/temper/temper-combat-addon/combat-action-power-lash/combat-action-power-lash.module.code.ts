import { getDuration } from "@akasha/temper-combat-addon/combat-action-duration"
import { STATE } from "@akasha/temper-combat-addon/combat-action-queue"
import type { Action } from "@akasha/temper-combat-addon/combat-action-types"

const DRAGONKNIGHT_CLASS_ID = 1
const FLAME_LASH_ICON_KEYWORD = "dragonknight_001_a"
const OFF_BALANCE_ICON_KEYWORD = "ability_debuff_offbalance"
const POWER_LASH_ABILITY_ID = 20824

const POWER_LASH_COOLDOWN_MIN_MS = 19000
const POWER_LASH_COOLDOWN_MAX_MS = 21000

const PROMPT_CONTROL_NAME = "TemperActions_PowerLashGuide"
const PROMPT_SIZE = 64

interface PowerLashGuideState {
  isDragonknight?: boolean
  lastGuideType?: "show" | "hide"
  prompt?: TextureControl
}

const GUIDE_STATE: PowerLashGuideState = {
  isDragonknight: undefined,
  lastGuideType: undefined,
  prompt: undefined,
}

function isPlayerDragonknight(): boolean {
  if (GUIDE_STATE.isDragonknight === undefined) {
    GUIDE_STATE.isDragonknight = GetUnitClassId("player") === DRAGONKNIGHT_CLASS_ID
  }
  return GUIDE_STATE.isDragonknight
}

function findFlameLashSlot(): { hotbarCategory: number; slotNum: number } | undefined {
  for (let hotbarCategory = 0; hotbarCategory <= 1; hotbarCategory++) {
    for (let slotNum = 3; slotNum <= 8; slotNum++) {
      const [texture] = GetSlotTexture(slotNum, hotbarCategory)
      if (texture.includes(FLAME_LASH_ICON_KEYWORD)) {
        return { hotbarCategory, slotNum }
      }
    }
  }
  return undefined
}

function getActionBySlot(hotbarCategory: number, slotNum: number): Action | undefined {
  for (const action of STATE.idActionMap.values()) {
    if (action.hotbarCategory === hotbarCategory && action.slotNum === slotNum) {
      return action
    }
  }
  return undefined
}

function targetHasOffBalance(): boolean {
  if (!DoesUnitExist("reticleover")) {
    return false
  }
  const numBuffs = GetNumBuffs("reticleover")
  for (let i = 1; i <= numBuffs; i++) {
    const [, , , , , iconFilename] = GetUnitBuffInfo("reticleover", i)
    if (iconFilename.includes(OFF_BALANCE_ICON_KEYWORD)) {
      return true
    }
  }
  return false
}

function ensurePrompt(): TextureControl {
  const existing = GUIDE_STATE.prompt
  if (existing !== undefined) {
    return existing
  }
  const control = WINDOW_MANAGER.CreateControl(PROMPT_CONTROL_NAME, GuiRoot, CT_TEXTURE)
  control.SetDimensions(PROMPT_SIZE, PROMPT_SIZE)
  control.SetAnchor(CENTER, GuiRoot, CENTER, 0, -PROMPT_SIZE * 2)
  control.SetTexture(GetAbilityIcon(POWER_LASH_ABILITY_ID))
  control.SetHidden(true)
  GUIDE_STATE.prompt = control
  return control
}

function sendPowerLashGuide(show: boolean): undefined {
  const desired = show ? "show" : "hide"
  if (GUIDE_STATE.lastGuideType === desired) {
    return undefined
  }
  GUIDE_STATE.lastGuideType = desired
  ensurePrompt().SetHidden(!show)
  return undefined
}

export function isPowerLashReady(): boolean {
  return GUIDE_STATE.lastGuideType === "show"
}

export function powerLashPoll(now: number): undefined {
  if (!isPlayerDragonknight()) {
    return undefined
  }
  if (!IsUnitInCombat("player")) {
    sendPowerLashGuide(false)
    return undefined
  }

  const slot = findFlameLashSlot()
  if (slot === undefined) {
    sendPowerLashGuide(false)
    return undefined
  }

  const flameLashAction = getActionBySlot(slot.hotbarCategory, slot.slotNum)
  if (flameLashAction !== undefined) {
    const { duration, source } = getDuration(flameLashAction, { now })
    if (
      source === "priority" &&
      duration >= POWER_LASH_COOLDOWN_MIN_MS &&
      duration <= POWER_LASH_COOLDOWN_MAX_MS
    ) {
      sendPowerLashGuide(false)
      return undefined
    }
  }

  sendPowerLashGuide(targetHasOffBalance())
  return undefined
}
