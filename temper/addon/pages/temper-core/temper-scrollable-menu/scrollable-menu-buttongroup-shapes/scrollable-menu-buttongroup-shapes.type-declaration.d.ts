interface ButtonGroupButtonLabel {
  SetColor: (this: ButtonGroupButtonLabel, ...rgb: number[]) => undefined
  [key: string]: unknown
}
interface ButtonGroupButton extends ButtonControl {
  label?: ButtonGroupButtonLabel
  toggleFunction?: (this: ButtonGroupButton, checked: boolean) => undefined
  enabled?: unknown
  checked?: unknown
  [key: string]: unknown
}

interface ButtonGroupClass {
  [key: string]: unknown
  New: (this: ButtonGroupClass, ...args: unknown[]) => ButtonGroupObject
  Add: ButtonGroupObject["Add"]
  Remove: ButtonGroupObject["Remove"]
  SetButtonState: ButtonGroupObject["SetButtonState"]
  HandleClick: ButtonGroupObject["HandleClick"]
  SetChecked: ButtonGroupObject["SetChecked"]
  SetInverse: ButtonGroupObject["SetInverse"]
  SetStateChangedCallback: ButtonGroupObject["SetStateChangedCallback"]
}

interface ButtonGroupButtonData {
  originalHandler: ((...args: unknown[]) => unknown) | undefined
  isValidOption: boolean
  entryType: unknown
}
