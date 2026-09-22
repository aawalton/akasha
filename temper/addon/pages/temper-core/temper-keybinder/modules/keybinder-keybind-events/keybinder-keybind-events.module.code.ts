import { normalizeModifiers } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-binding-utils/keybinder-binding-utils.module.code.ts"
import { EVENT_NAMESPACE } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-constants/keybinder-constants.module.code.ts"
import { syncKeybindings } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-share/keybinder-share.module.code.ts"
import { KEYBINDER_STATE } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-state/keybinder-state.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"

function handleBindingsLoaded(this: void): undefined {
  if (KEYBINDER_STATE.bindingsSynchronised) {
    syncKeybindings()
    KEYBINDER_STATE.isDirty = false
  } else {
    KEYBINDER_STATE.isDirty = true
  }
}

function handleBindingCleared(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number
): undefined {
  KEYBINDER_STATE.isDirty = true
  if (KEYBINDER_STATE.editMode) {
    const bind: VkBind = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }
    const [actionName, , isHidden] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
    const ml = KEYBINDER_STATE.masterList[actionName]
    if (!isHidden && ml !== undefined) {
      ml[bindingIndex - 1] = bind
      const acc = KEYBINDER_STATE.account.Keybindings[actionName]
      if (acc !== undefined) {
        acc[bindingIndex - 1] = bind
      }
    }
  }
}

function handleBindingSet(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number
): undefined {
  KEYBINDER_STATE.isDirty = true
  if (KEYBINDER_STATE.editMode) {
    const [actionName] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
    const [keyCode, m1, m2, m3, m4] = GetActionBindingInfo(
      layerIndex,
      categoryIndex,
      actionIndex,
      bindingIndex
    )
    const [mod1, mod2, mod3, mod4] = normalizeModifiers(m1, m2, m3, m4)
    const bind: VkBind = { keyCode, mod1, mod2, mod3, mod4 }
    const ml = KEYBINDER_STATE.masterList[actionName]
    if (ml !== undefined) {
      ml[bindingIndex - 1] = bind
      const acc = KEYBINDER_STATE.account.Keybindings[actionName]
      if (acc !== undefined) {
        acc[bindingIndex - 1] = bind
      }
    }
  }
}

export function registerBindingEvents(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent<[number, number, number, number]>(
    EVENT_NAMESPACE,
    EVENT_KEYBINDING_SET,
    (_eventCode, layerIndex, categoryIndex, actionIndex, bindingIndex) => {
      handleBindingSet(layerIndex, categoryIndex, actionIndex, bindingIndex)
    }
  )
  EVENT_MANAGER.RegisterForEvent<[number, number, number, number]>(
    EVENT_NAMESPACE,
    EVENT_KEYBINDING_CLEARED,
    (_eventCode, layerIndex, categoryIndex, actionIndex, bindingIndex) => {
      handleBindingCleared(layerIndex, categoryIndex, actionIndex, bindingIndex)
    }
  )
  EVENT_MANAGER.RegisterForEvent(EVENT_NAMESPACE, EVENT_KEYBINDINGS_LOADED, () => {
    EVENT_MANAGER.UnregisterForUpdate(EVENT_NAMESPACE)
    EVENT_MANAGER.RegisterForUpdate(EVENT_NAMESPACE, 0, () => {
      EVENT_MANAGER.UnregisterForUpdate(EVENT_NAMESPACE)
      handleBindingsLoaded()
    })
  })
}
