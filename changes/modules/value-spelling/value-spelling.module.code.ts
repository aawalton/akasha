const BOOLEAN = "boolean"

const NUMBER = "number"

const TRUE = "true"

const FALSE = "false"

const NUMERAL = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/

export function spelledAs(value: string, holds: string | undefined): string | null {
  if (holds === BOOLEAN) return value === TRUE || value === FALSE ? value : null
  if (holds === NUMBER) return NUMERAL.test(value) ? value : null
  return JSON.stringify(value)
}
