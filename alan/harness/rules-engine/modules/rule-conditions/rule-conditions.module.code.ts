export interface Condition<F extends string = string, T extends string = string> {
  readonly field: F
  readonly test: T
  readonly negated: boolean
  readonly values: readonly string[]
}
