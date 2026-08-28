export const VALUES = "values"

export interface NamedSet {
  readonly of: string
  readonly stated: Stated
}

/**
 * The type names a tree states, and what each name is built from.
 *
 * NAMES, RECORDS AND SETS STAND OR GO NULL TOGETHER: all three hold where the vocabulary was read,
 * and all three are null where it could not be, with `why` saying what stopped it. None of them is
 * optional, so a caller cannot reach past a vocabulary nothing read with `?.` and take the
 * `undefined` for an answer — an absent map and a slug the map does not hold gave back the same
 * `undefined`, and a key typed against a record or a set was then reported as a type nothing states
 * a rule for, which is a claim about a lookup that never happened.
 */
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

/**
 * A rule over one scalar: the text is trimmed for the test and reported as it stands.
 *
 * WHAT A WRONG SHAPE IS HAS ONE SPELLING, AND IT SITS WITH `Rule` RATHER THAN WITH THE TABLE OF
 * RULES. A file stating a rule of its own needs these constructors and not the table, so keeping
 * them beside `RULES` leaves every such file either importing the table's whole file or carrying
 * a copy of its own.
 */
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
