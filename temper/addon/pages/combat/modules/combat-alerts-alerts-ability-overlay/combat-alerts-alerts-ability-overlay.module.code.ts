import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-alerts-declarations/combat-alerts-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    SetAbilityOverlay: (this: void, abilityId: number) => void
    RemoveAbilityOverlay: (this: void, abilityId: number) => void
  }
}

const ABILITIES_TO_OVERLAY: Record<number, boolean> = {}

function getSlotTrueBoundId(this: void, index: number, bar: number): number {
  const id = GetSlotBoundId(index, bar)
  const actionType = GetSlotType(index, bar)
  if (actionType !== ACTION_TYPE_CRAFTED_ABILITY) {
    return id
  }
  return GetAbilityIdForCraftedAbilityId(id)
}
CRUTCH.GetSlotTrueBoundId = getSlotTrueBoundId

function getButton(this: void, actionSlotIndex: number): Control | undefined {
  let button: ActionBarButton | undefined
  if (FancyActionBar !== undefined && FancyActionBar.GetActionButton !== undefined) {
    button = FancyActionBar.GetActionButton(actionSlotIndex)
  } else if (actionSlotIndex <= 8) {
    button = ZO_ActionBar_GetButton(actionSlotIndex)
  }
  if (button !== undefined) {
    return button.slot
  }
  return undefined
}

function getOrCreateOverlay(this: void, actionSlotIndex: number): Control | undefined {
  const button = getButton(actionSlotIndex)
  if (button === undefined) {
    return undefined
  }

  const existing = button.GetNamedChild("TemperCombatAlertsOverlay")
  if (existing !== undefined) {
    return existing
  }

  CRUTCH.dbgOther("Creating slot " + actionSlotIndex)
  const overlay = WINDOW_MANAGER.CreateControl(
    "$(parent)TemperCombatAlertsOverlay",
    button,
    CT_TEXTURE
  ) as TextureControl
  overlay.SetTexture("/esoui/art/miscellaneous/eso_icon_warning.dds")
  overlay.SetAnchorFill()
  overlay.SetDrawLayer(DL_CONTROLS)
  overlay.SetColor(1, 0.5, 0, 0.6)

  return overlay
}

function updateOverlay(this: void, actionSlotIndex: number, show: boolean): undefined {
  const button = getButton(actionSlotIndex)
  if (button === undefined) {
    return
  }

  if (!show && button.GetNamedChild("TemperCombatAlertsOverlay") === undefined) {
    return
  }

  const overlay = getOrCreateOverlay(actionSlotIndex) as Control
  overlay.SetHidden(!show)
}

function updateAllOverlays(this: void): undefined {
  for (let i = 3; i <= 8; i++) {
    const abilityId = getSlotTrueBoundId(i, GetActiveHotbarCategory())
    updateOverlay(i, ABILITIES_TO_OVERLAY[abilityId] === true)
  }

  if (FancyActionBar !== undefined) {
    const otherBar =
      GetActiveHotbarCategory() === HOTBAR_CATEGORY_PRIMARY
        ? HOTBAR_CATEGORY_BACKUP
        : HOTBAR_CATEGORY_PRIMARY
    for (let i = 3; i <= 8; i++) {
      const otherBarAbilityId = getSlotTrueBoundId(i, otherBar)
      updateOverlay(i + 20, ABILITIES_TO_OVERLAY[otherBarAbilityId] === true)
    }
  }
}

CRUTCH.SetAbilityOverlay = function (this: void, abilityId) {
  ABILITIES_TO_OVERLAY[abilityId] = true
  updateAllOverlays()
}

CRUTCH.RemoveAbilityOverlay = function (this: void, abilityId) {
  delete ABILITIES_TO_OVERLAY[abilityId]
  updateAllOverlays()
}

CRUTCH.InitializeAbilityOverlay = function (this: void) {
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AbilityOverlayHotbarsUpdated",
    EVENT_ACTION_SLOTS_ALL_HOTBARS_UPDATED,
    updateAllOverlays
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "AbilityOverlaySlotUpdated",
    EVENT_ACTION_SLOT_UPDATED,
    updateAllOverlays
  )
}
