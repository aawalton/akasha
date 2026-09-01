export type Operator = "??" | "&&" | "==" | "!=" | "<" | "<=" | ">" | ">=" | "+" | "-" | "*" | "/"

export type TextPart =
  | { readonly part: "characters"; readonly characters: string }
  | { readonly part: "reference"; readonly key: string; readonly at: number }

export type CaseRow = {
  readonly test: Expression
  readonly value: Expression
}

export type Expression =
  | { readonly node: "text"; readonly parts: readonly TextPart[]; readonly at: number }
  | { readonly node: "number"; readonly number: number; readonly at: number }
  | { readonly node: "boolean"; readonly boolean: boolean; readonly at: number }
  | { readonly node: "absent"; readonly at: number }
  | { readonly node: "reference"; readonly key: string; readonly at: number }
  | { readonly node: "negation"; readonly of: Expression; readonly at: number }
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
