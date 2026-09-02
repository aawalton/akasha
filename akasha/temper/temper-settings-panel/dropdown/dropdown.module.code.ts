import { buildLookup } from "../build-lookup/build-lookup.module.code.ts"

export interface LamDropdownData {
  type: "dropdown"
  name: string
  tooltip?: string
  choices: readonly string[]
  choicesValues?: readonly (string | number)[]
  choicesTooltips?: readonly string[]
  scrollable?: boolean
  width?: "full" | "half"
  getFunc: (this: void) => string | number
  setFunc: (this: void, value: string | number) => void
  default?: string | number
  disabled?: (this: void) => boolean
}

export interface DropdownSpec {
  name: string
  tooltip?: string
  choices: readonly string[]
  get: (this: void) => number
  set: (this: void, index: number) => void
  defaultIndex: number
  width?: "full" | "half"
  disabled?: (this: void) => boolean
}

export function dropdown(this: void, spec: DropdownSpec): LamDropdownData {
  const lookup = buildLookup(spec.choices)
  return {
    type: "dropdown",
    name: spec.name,
    tooltip: spec.tooltip,
    choices: spec.choices,
    width: spec.width,
    getFunc: () => spec.choices[spec.get()] ?? "",
    setFunc: (value) => {
      if (typeof value === "string") {
        const index = lookup[value]
        if (index !== undefined) {
          spec.set(index)
        }
      }
    },
    default: spec.choices[spec.defaultIndex] ?? "",
    disabled: spec.disabled,
  }
}

export interface ValueDropdownSpec<V extends string | number> {
  name: string
  tooltip?: string
  choices: readonly string[]
  values: readonly V[]
  choicesTooltips?: readonly string[]
  get: (this: void) => V
  set: (this: void, value: V) => void
  default?: V
  scrollable?: boolean
  width?: "full" | "half"
  disabled?: (this: void) => boolean
}

export function valueDropdown<V extends string | number>(
  this: void,
  spec: ValueDropdownSpec<V>
): LamDropdownData {
  return {
    type: "dropdown",
    name: spec.name,
    tooltip: spec.tooltip,
    choices: spec.choices,
    choicesValues: spec.values,
    choicesTooltips: spec.choicesTooltips,
    scrollable: spec.scrollable,
    width: spec.width,
    getFunc: () => spec.get(),
    setFunc: (value) => {
      for (const v of spec.values) {
        if (v === value) {
          spec.set(v)
          return
        }
      }
    },
    default: spec.default,
    disabled: spec.disabled,
  }
}
