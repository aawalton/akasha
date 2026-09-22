import { asSceneFragment } from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-casts/fco-casts.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/hud/temper-interface/modules/fco-state/fco-state.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

declare const _G: Record<string, unknown>

const endInworldInteractionFragment = END_IN_WORLD_INTERACTIONS_FRAGMENT
const inventoryScene = SCENE_MANAGER.GetScene("inventory")
const treasureMapInvScene = TREASURE_MAP_INVENTORY_SCENE
const playerFrameFragment = asSceneFragment(FRAME_PLAYER_FRAGMENT)
const targetCenteredFrameFragment = FRAME_TARGET_CENTERED_FRAGMENT

const orgIsCharacterPreviewingAvailable = IsCharacterPreviewingAvailable

ZO_PreHook(endInworldInteractionFragment, "Show", (): boolean | undefined => {
  if (STATE.otherAddons.NoThankYou === true) {
    return false
  }
  if (STATE.settingsVars.settings.doNotInterruptInWorldOnMenuOpen !== true) {
    return undefined
  }
  EndPendingInteraction()
  endInworldInteractionFragment.OnShown()
  return true
})

function removeInteractionAbortOnMenuOpen(this: void, doRemove: boolean): undefined {
  if (STATE.otherAddons.NoThankYou === true) {
    return
  }
  if (doRemove) {
    _G.IsCharacterPreviewingAvailable = (): boolean => {
      if (inventoryScene.IsShowing()) {
        return true
      }
      return orgIsCharacterPreviewingAvailable()
    }
  } else {
    _G.IsCharacterPreviewingAvailable = (): boolean => orgIsCharacterPreviewingAvailable()
  }
}

function removePlayerSpinFragment(this: void, doRemove: boolean): undefined {
  if (STATE.otherAddons.NoThankYou === true) {
    return
  }

  const settings = STATE.settingsVars.settings

  if (doRemove) {
    const spinStopAtScenes = settings.spinStopAtScenes
    if (inventoryScene.HasFragment(playerFrameFragment) && spinStopAtScenes.inventory === true) {
      inventoryScene.RemoveFragment(playerFrameFragment)
    }
    if (treasureMapInvScene.HasFragment(targetCenteredFrameFragment)) {
      treasureMapInvScene.RemoveFragment(targetCenteredFrameFragment)
    }
    if (treasureMapInvScene.HasFragment(playerFrameFragment)) {
      treasureMapInvScene.RemoveFragment(playerFrameFragment)
    }
  } else {
    if (!inventoryScene.HasFragment(playerFrameFragment)) {
      inventoryScene.AddFragment(playerFrameFragment)
    }
    if (!treasureMapInvScene.HasFragment(targetCenteredFrameFragment)) {
      treasureMapInvScene.AddFragment(targetCenteredFrameFragment)
    }
    if (!treasureMapInvScene.HasFragment(playerFrameFragment)) {
      treasureMapInvScene.AddFragment(playerFrameFragment)
    }
  }
}

export function overallSetDoNotInterruptInWorldOnMenuOpen(
  this: void,
  doNotInterruptInWorldOnMenuOpen: boolean
): undefined {
  if (STATE.otherAddons.NoThankYou === true) {
    return
  }

  removePlayerSpinFragment(doNotInterruptInWorldOnMenuOpen)
  removeInteractionAbortOnMenuOpen(doNotInterruptInWorldOnMenuOpen)
}

export function overallFunctions(this: void): undefined {
  overallSetDoNotInterruptInWorldOnMenuOpen(
    STATE.settingsVars.settings.doNotInterruptInWorldOnMenuOpen === true
  )
}
