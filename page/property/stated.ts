export const VALUES = "values"

export interface NamedSet {
  readonly of: string
  readonly stated: Stated
}

export interface Vocabulary {
  readonly names: ReadonlySet<string> | null
  readonly records: ReadonlyMap<string, readonly RecordField[]> | null
  readonly sets: ReadonlyMap<string, NamedSet> | null
  readonly why: string | null
}

export interface Stated {
  readonly pattern: string | null
  readonly backstop: string | null
  readonly values: Held | null
  readonly max: string | null
}

export type Held = string | readonly Held[] | { readonly [key: string]: Held }

export type Fault =
  | { readonly fault: "text"; readonly at: string }
  | { readonly fault: "held"; readonly measured: string; readonly inside: boolean; readonly wanted?: string }

export const textOf = (fault: Fault): string =>
  fault.fault !== "text" ? fault.measured : fault.at.trim() === "" ? "nothing" : `\`${fault.at}\``

export const nested = (measured: string, from: Fault, wanted?: string): Fault => ({
  fault: "held",
  measured,
  inside: true,
  wanted: (from.fault === "held" ? from.wanted : undefined) ?? wanted,
})

export interface Rule {
  readonly says: string
  readonly holds: (value: Held) => Fault | null
}

const heldAs = (value: Held): string =>
  typeof value === "string" ? "one value" : Array.isArray(value) ? "a list" : "a map"

export const wrongShape = (value: Held): Fault => ({ fault: "held", measured: heldAs(value), inside: false })

export const within = (measured: string): Fault => ({ fault: "held", measured, inside: true })

export function scalarRule(says: string, holds: (text: string) => boolean): Rule {
  return {
    says,
    holds: (value) =>
      typeof value !== "string" ? wrongShape(value) : holds(value.trim()) ? null : { fault: "text", at: value },
  }
}

export interface RecordField {
  readonly name: string
  readonly type: string
  readonly required: boolean
  readonly oneOf: string | null
  readonly stated: Stated
}

export const SLUG_PROPERTY = "slug-property"
