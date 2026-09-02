declare const ZO_Keybindings: Control

declare function zo_strupper(this: void, text: string): string

declare function ZO_Keybindings_DoesKeyMatchAnyModifiers(
  this: void,
  key: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): boolean

declare function BindKeyToAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number,
  keyCode: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): undefined

declare function UnbindAllKeysFromAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number
): undefined

declare function ZO_TriStateCheckButton_SetStateChangeFunction(
  this: void,
  checkBox: Control,
  fn: (this: void, control: Control, checkState: number) => void
): undefined

declare function ZO_TriStateCheckButton_SetState(
  this: void,
  checkBox: Control,
  state: number
): undefined

interface Control {
  SetInheritAlpha: (inherit: boolean) => void
}

interface WindowManager {
  GetFocusControl: () => Control | undefined
}
