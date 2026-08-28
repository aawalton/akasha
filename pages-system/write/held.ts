import type { DeclaredType, Value } from "../formula/formula.ts"

export type Raw = string | number | boolean

export type Kept =
  | { readonly kind: "value"; readonly raw: Raw | readonly Raw[] }
  | { readonly kind: "cleared" }
  | { readonly kind: "refused"; readonly why: string }

const CLEARED: Kept = { kind: "cleared" }

const MARK = String.fromCharCode(96)

const refusedAs = (key: string, why: string): Kept => ({
  kind: "refused",
  why: MARK + key + MARK + " " + why,
})

const scalarOf = (value: Value, kind: DeclaredType["kind"]): Raw | null => {
  if (kind === "text") return value.kind === "text" ? value.text : null
  if (kind === "number") return value.kind === "number" ? value.number : null
  if (kind === "boolean") return value.kind === "boolean" ? value.boolean : null
  if (kind === "instant")
    return value.kind === "instant" ? new Date(value.instant).toISOString() : null
  if (kind === "date") return value.kind === "date" ? value.date : null
  return null
}

export const rawAs = (key: string, value: Value, type: DeclaredType): Kept => {
  if (value.kind === "absent") return CLEARED
  if (type.kind !== "list") {
    const raw = scalarOf(value, type.kind)
    if (raw === null)
      return refusedAs(key, "is declared " + type.kind + " and was given " + value.kind)
    return { kind: "value", raw }
  }
  if (value.kind !== "list")
    return refusedAs(key, "is declared a list and was given " + value.kind)
  const items: Raw[] = []
  for (const item of value.items) {
    if (item.kind === "absent")
      return refusedAs(key, "holds a list with nothing at one place, which a list cannot carry")
    const raw = scalarOf(item, type.of)
    if (raw === null)
      return refusedAs(key, "is declared a list of " + type.of + " and holds " + item.kind)
    items.push(raw)
  }
  return { kind: "value", raw: items }
}
