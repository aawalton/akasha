import { asSceneFragment } from "../fco-casts/fco-casts.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

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
