import { keybindList } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-binding-utils/keybinder-binding-utils.module.code.ts"
import { EVENT_NAMESPACE } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-constants/keybinder-constants.module.code.ts"
import { KEYBIND_MANAGER } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-keybind-manager/keybinder-keybind-manager.module.code.ts"
import { hookKeybindsScrollList } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-scroll-list/keybinder-scroll-list.module.code.ts"
import { setupControl } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-search-box/keybinder-search-box.module.code.ts"
import {
  createBindingList,
  firstRun,
  syncKeybindings,
  toggleShareState,
} from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-share/keybinder-share.module.code.ts"
import {
  KEYBINDER_STATE,
  resetBindingSyncState,
} from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-state/keybinder-state.module.code.ts"
import { getUiString } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-ui-strings/keybinder-ui-strings.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function isKeybindingsEmpty(this: void, held: Record<string, VkBind[] | undefined>): boolean {
  return Object.keys(held).length === 0
}

function handleControlsPageOpened(this: void): undefined {
  KEYBINDINGS_FRAGMENT.RegisterCallback("StateChange", (_oldState: number, newState: number) => {
    if (newState === SCENE_FRAGMENT_SHOWING) {
      if (KEYBINDER_STATE.isDirty) {
        KEYBIND_MANAGER.RefreshList()
        KEYBINDER_STATE.isDirty = false
      }
      keybindList.SetLockedForUpdates(false)
      createBindingList()
      KEYBINDER_STATE.editMode = true
    } else if (newState === SCENE_FRAGMENT_HIDING) {
      keybindList.SetLockedForUpdates(true)
      resetBindingSyncState()
    }
  })
}

function keepBindButtonEnabled(this: void): undefined {
  const bindButton = BIND_KEY_DIALOG.control.bindButton
  const orgEnabled = bindButton.SetEnabled
  bindButton.SetEnabled = function (this: BindKeyDialogButton, _enabled: boolean): undefined {
    orgEnabled.call(this, true)
  }
}

export function initialize(this: void): undefined {
  handleControlsPageOpened()
  if (isKeybindingsEmpty(KEYBINDER_STATE.account.Keybindings)) {
    EVENT_MANAGER.RegisterForEvent(EVENT_NAMESPACE, EVENT_PLAYER_ACTIVATED, () => {
      firstRun()
    })
  } else if (IsUnitInCombat("player")) {
    EVENT_MANAGER.RegisterForEvent<[boolean]>(
      EVENT_NAMESPACE,
      EVENT_PLAYER_COMBAT_STATE,
      (_eventCode, inCombat) => {
        if (!inCombat) {
          EVENT_MANAGER.UnregisterForEvent(EVENT_NAMESPACE, EVENT_PLAYER_COMBAT_STATE)
          syncKeybindings()
        }
      }
    )
  } else {
    syncKeybindings()
  }

  const control = WINDOW_MANAGER.CreateControlFromVirtual<KeybindButtonControl>(
    "$(parent)KeybinderToggle",
    ZO_Keybindings,
    "ZO_DialogButton"
  )
  control.SetAnchor(TOPLEFT, ZO_KeybindingsLoadGamepadDefaults, TOPRIGHT, 15, 0)
  control.nameLabel.SetDimensionConstraints(0, 0, 200, 0)
  ZO_KeybindButtonTemplate_Setup(
    control,
    "TEMPER_KEYBINDER_TOGGLE",
    () => {
      toggleShareState()
    },
    getUiString("TOGGLE")
  )

  setupControl()
  hookKeybindsScrollList()

  const limitWidth = (keybindButton: KeybindButtonControl | undefined): undefined => {
    if (keybindButton === undefined) {
      return
    }
    keybindButton.nameLabel.SetDimensionConstraints(0, 0, 200, 0)
  }
  limitWidth(ZO_KeybindingsLoadKeyboardDefaults)
  limitWidth(ZO_KeybindingsLoadGamepadDefaults)

  KEYBINDINGS_FRAGMENT.RegisterCallback("StateChange", (_oldState: number, newState: number) => {
    if (newState === SCENE_FRAGMENT_HIDING) {
      RemoveActionLayerByName("KeybindWindow")
    }
  })

  keepBindButtonEnabled()
}
