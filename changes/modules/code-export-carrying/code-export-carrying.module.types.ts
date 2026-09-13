import type { Carried } from "akasha/changes/modules/import-lines/import-lines.module.code.ts"
import type { Naming } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import type ts from "typescript"

export type Asked = {
  readonly from: string
  readonly to: string
  readonly of: readonly string[]
}

export type Passage = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export type Plan = {
  readonly taken: readonly Passage[]
  readonly body: string
  readonly adding: boolean
  readonly onto: Passage | null
  readonly after: readonly Passage[]
}

export type Refused = { readonly refused: string }

export type Carrying = Carried & { readonly naming: string; readonly every: boolean }

export type Held =
  | ts.TypeAliasDeclaration
  | ts.InterfaceDeclaration
  | ts.FunctionDeclaration
  | ts.VariableStatement

export type Going = {
  readonly name: string
  readonly declared: Held
  readonly passage: string
  readonly carried: ReadonlyMap<string, Carrying>
}

export type Landing = {
  readonly adding: boolean
  readonly onto: string | null
  readonly naming: Naming
}
