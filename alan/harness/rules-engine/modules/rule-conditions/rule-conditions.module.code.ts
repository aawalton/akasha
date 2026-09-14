export type FieldType = "text" | "number" | "date" | "enum" | "list"

export interface Field {
  readonly name: string
  readonly type: FieldType
}

export interface RuleSet {
  readonly name: string
  readonly fields: readonly Field[]
}

export interface Condition<F extends string = string, T extends string = string> {
  readonly field: F
  readonly test: T
  readonly negated: boolean
  readonly values: readonly string[]
}

export function typeOf(ruleSet: RuleSet, name: string): FieldType | null {
  return ruleSet.fields.find((one) => one.name === name)?.type ?? null
}
