import { checkTree, cycleAmong, otherKindThanDeclared, ringAmong } from "./check.ts"
import { readFormula } from "./read.ts"
import { runTree } from "./run.ts"
import type { Expression } from "./tree.ts"

export type Instant = number

export type CalendarDate = string

export type ScalarKind = "text" | "number" | "boolean" | "instant"

export type Value =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "number"; readonly number: number }
  | { readonly kind: "boolean"; readonly boolean: boolean }
  | { readonly kind: "instant"; readonly instant: Instant }
  | { readonly kind: "date"; readonly date: CalendarDate }
  | { readonly kind: "list"; readonly of: ScalarKind; readonly items: readonly Value[] }
  | { readonly kind: "absent" }

export type DeclaredType =
  | { readonly kind: "text" }
  | { readonly kind: "number" }
  | { readonly kind: "boolean" }
  | { readonly kind: "instant" }
  | { readonly kind: "date" }
  | { readonly kind: "list"; readonly of: ScalarKind }

export type ValueType = {
  readonly holds: DeclaredType | null
  readonly absent: boolean
}

export type Shape = Readonly<Record<string, DeclaredType>>

export type Property = {
  readonly type: DeclaredType
  readonly formula?: string
}

export type PageType = Readonly<Record<string, Property>>

export type Values = {
  readonly now: Instant
  readonly properties: Readonly<Record<string, Value>>
}

export type Place = {
  readonly offset: number
  readonly line: number
  readonly column: number
}

export type Refused = {
  readonly ok: false
  readonly moment: "reading" | "checking"
  readonly message: string
  readonly at: Place
}

export type PageTypeRefused = Refused & {
  readonly keys: readonly string[]
}

declare const checkedFormula: unique symbol

export type Checked = {
  readonly ok: true
  readonly tree: Expression
  readonly type: ValueType
  readonly reads: readonly string[]
  readonly [checkedFormula]: true
}

const checkedFormulaOf = (tree: Expression, type: ValueType, reads: readonly string[]): Checked =>
  ({ ok: true, tree, type, reads }) as Checked

export type CheckedPageType = {
  readonly ok: true
  readonly computed: ReadonlyMap<string, Checked>
}

export const checkFormula = (text: string, shape: Shape): Checked | Refused => {
  const tree = readFormula(text)
  if (!("node" in tree)) return tree
  const typed = checkTree(tree, shape, text)
  if (!typed.ok) return typed
  return checkedFormulaOf(tree, typed.type, typed.reads)
}

const refusePageType = (message: string, keys: readonly string[]): PageTypeRefused => ({
  ok: false,
  moment: "checking",
  message,
  at: { offset: 0, line: 1, column: 1 },
  keys,
})

export const checkPageType = (pageType: PageType): CheckedPageType | PageTypeRefused => {
  const shape: Record<string, DeclaredType> = {}
  for (const [key, property] of Object.entries(pageType)) shape[key] = property.type

  const computed = new Map<string, Checked>()
  const wrong: PageTypeRefused[] = []
  for (const [key, property] of Object.entries(pageType)) {
    if (property.formula === undefined) continue
    const checked = checkFormula(property.formula, shape)
    if (checked.ok) computed.set(key, checked)
    else wrong.push({ ...checked, keys: [key] })
  }
  const earliest = wrong.find((one) => one.moment === "reading") ?? wrong[0]
  if (earliest !== undefined) return earliest

  for (const [key, checked] of computed) {
    const declared = (pageType[key] as Property).type
    const differs = otherKindThanDeclared(key, checked.type, declared)
    if (differs !== null) return refusePageType(differs, [key])
  }

  const reads = new Map<string, readonly string[]>()
  for (const [key, checked] of computed) reads.set(key, checked.reads)
  const ring = ringAmong(reads)
  if (ring !== null) return refusePageType(cycleAmong(ring), ring)

  return { ok: true, computed }
}

export const runFormula = (checked: Checked, values: Values): Value => runTree(checked.tree, values)
