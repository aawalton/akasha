import {
  type ActionRef,
  hasBinding,
  keybindingsOfActionName,
} from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-binding-utils/keybinder-binding-utils.module.code.ts"
import { KEYBINDER_STATE } from "akasha/temper/addon/pages/temper-core/temper-keybinder/modules/keybinder-state/keybinder-state.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-keybinder/keybinder-declarations/keybinder-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const BINDING_NAME = "SI_BINDING_NAME_"

function namingOf(this: void, ref: ActionRef, actionName: string): KeybindingNaming {
  const [layer] = GetActionLayerInfo(ref.layerIndex)
  const [category] = GetActionLayerCategoryInfo(ref.layerIndex, ref.categoryIndex)
  return { title: GetString(BINDING_NAME, actionName), layer, category }
}

export function recordChange(this: void, ref: ActionRef): undefined {
  if (KEYBINDER_STATE.applying) return
  const [actionName, , isHidden] = GetActionInfo(ref.layerIndex, ref.categoryIndex, ref.actionIndex)
  if (isHidden) return
  const account = KEYBINDER_STATE.account
  account.Changes[actionName] = {
    ...namingOf(ref, actionName),
    at: GetTimeStamp(),
    shared: account.Keybindings[actionName] !== undefined,
    bindings: keybindingsOfActionName(ref.layerIndex, ref.categoryIndex, ref.actionIndex),
  }
}

export function captureBindings(this: void): undefined {
  const actions: Record<string, CapturedKeybinding | undefined> = {}
  const shared = KEYBINDER_STATE.account.Keybindings
  for (let layerIndex = 1; layerIndex <= GetNumActionLayers(); layerIndex++) {
    const [, numCategories] = GetActionLayerInfo(layerIndex)
    for (let categoryIndex = 1; categoryIndex <= numCategories; categoryIndex++) {
      const [, numActions] = GetActionLayerCategoryInfo(layerIndex, categoryIndex)
      for (let actionIndex = 1; actionIndex <= numActions; actionIndex++) {
        const ref: ActionRef = { layerIndex, categoryIndex, actionIndex }
        const [actionName, , isHidden] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
        if (isHidden || (!hasBinding(ref) && shared[actionName] === undefined)) continue
        actions[actionName] = {
          ...namingOf(ref, actionName),
          bindings: keybindingsOfActionName(layerIndex, categoryIndex, actionIndex),
        }
      }
    }
  }
  KEYBINDER_STATE.account.Captured = { at: GetTimeStamp(), actions }
}
