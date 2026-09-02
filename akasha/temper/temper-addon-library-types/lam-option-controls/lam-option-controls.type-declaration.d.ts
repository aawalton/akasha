interface LamHeaderControl {
  type: "header"
  name: string
  width?: "full"
}

interface LamCheckboxControl {
  type: "checkbox"
  name: string
  tooltip?: string
  getFunc: (this: void) => boolean
  setFunc: (this: void, value: boolean) => undefined
  default?: boolean
  disabled?: boolean | ((this: void) => boolean)
}

interface LamDropdownControl {
  type: "dropdown"
  name: string
  tooltip?: string
  choices: string[]
  getFunc: (this: void) => string
  setFunc: (this: void, value: string) => undefined
  default?: string
  warning?: string
}

type LamOptionControl =
  | LamHeaderControl
  | LamCheckboxControl
  | LamDropdownControl
  | LamEditboxControl
