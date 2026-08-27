/**
 * The tree a formula's text reads into.
 *
 * Reading makes it, checking types it against a shape, and running works it out
 * over values. Every node carries the offset in the formula's text where it
 * starts, so a refusal can say where it is.
 */

/** An operator a formula can use. */
export type Operator = "??" | "&&" | "==" | "!=" | "<" | "<=" | ">" | ">=" | "+" | "-" | "*" | "/"

/** A piece of a text literal: characters as written, or a reference filled in where it stands. */
export type TextPart =
  | { readonly part: "characters"; readonly characters: string }
  | { readonly part: "reference"; readonly key: string; readonly at: number }

/** One row of a case: a test, and the value the case answers where that test answers true. */
export type CaseRow = {
  readonly test: Expression
  readonly value: Expression
}

/** Something a formula works out. */
export type Expression =
  | { readonly node: "text"; readonly parts: readonly TextPart[]; readonly at: number }
  | { readonly node: "number"; readonly number: number; readonly at: number }
  | { readonly node: "boolean"; readonly boolean: boolean; readonly at: number }
  | { readonly node: "absent"; readonly at: number }
  | { readonly node: "reference"; readonly key: string; readonly at: number }
  | {
      readonly node: "operation"
      readonly operator: Operator
      readonly left: Expression
      readonly right: Expression
      readonly at: number
    }
  | {
      readonly node: "call"
      readonly name: string
      readonly arguments: readonly Expression[]
      readonly at: number
    }
  | {
      readonly node: "case"
      readonly rows: readonly CaseRow[]
      readonly otherwise: Expression
      readonly at: number
    }
