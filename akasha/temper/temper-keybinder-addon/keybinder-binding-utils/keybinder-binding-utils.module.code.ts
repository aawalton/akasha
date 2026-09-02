import { KEYBIND_MANAGER } from "../keybinder-keybind-manager/keybinder-keybind-manager.module.code.ts"

export interface ActionRef {
  layerIndex: number
  categoryIndex: number
  actionIndex: number
}

export const maxBindings = GetMaxBindingsPerAction()

export const keybindList = KEYBIND_MANAGER.list

export function normalizeModifiers(
  this: void,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): LuaMultiReturn<[number, number, number, number]> {
  const ctrl = ZO_Keybindings_DoesKeyMatchAnyModifiers(KEY_CTRL, mod1, mod2, mod3, mod4)
    ? KEY_CTRL
    : 0
  const alt = ZO_Keybindings_DoesKeyMatchAnyModifiers(KEY_ALT, mod1, mod2, mod3, mod4) ? KEY_ALT : 0
  const shift = ZO_Keybindings_DoesKeyMatchAnyModifiers(KEY_SHIFT, mod1, mod2, mod3, mod4)
    ? KEY_SHIFT
    : 0
  const cmd = ZO_Keybindings_DoesKeyMatchAnyModifiers(KEY_COMMAND, mod1, mod2, mod3, mod4)
    ? KEY_COMMAND
    : 0
  return $multi(ctrl, alt, shift, cmd)
}

export function compareBinding(this: void, a: VkBind[], b: ActionRef): boolean {
  for (let bindIndex = 1; bindIndex <= maxBindings; bindIndex++) {
    const [keyCode, m1, m2, m3, m4] = GetActionBindingInfo(
      b.layerIndex,
      b.categoryIndex,
      b.actionIndex,
      bindIndex
    )
    const [mod1, mod2, mod3, mod4] = normalizeModifiers(m1, m2, m3, m4)
    const other = a[bindIndex - 1]
    if (other === undefined) {
      return false
    }
    if (
      other.keyCode !== keyCode ||
      other.mod1 !== mod1 ||
      other.mod2 !== mod2 ||
      other.mod3 !== mod3 ||
      other.mod4 !== mod4
    ) {
      return false
    }
  }
  return true
}

export function hasBinding(this: void, b: ActionRef): boolean {
  for (let bindIndex = 1; bindIndex <= maxBindings; bindIndex++) {
    const [keyCode] = GetActionBindingInfo(b.layerIndex, b.categoryIndex, b.actionIndex, bindIndex)
    if (keyCode !== 0) {
      return true
    }
  }
  return false
}

export function keybindingsOfActionName(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number
): VkBind[] {
  const bindings: VkBind[] = []
  for (let bindIndex = 1; bindIndex <= maxBindings; bindIndex++) {
    const [keyCode, m1, m2, m3, m4] = GetActionBindingInfo(
      layerIndex,
      categoryIndex,
      actionIndex,
      bindIndex
    )
    const [mod1, mod2, mod3, mod4] = normalizeModifiers(m1, m2, m3, m4)
    bindings[bindIndex - 1] = { keyCode, mod1, mod2, mod3, mod4 }
  }
  return bindings
}
