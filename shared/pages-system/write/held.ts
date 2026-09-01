import type { DeclaredType, Value } from "../formula/formula.ts"

export type Raw = string | number | boolean

export type Kept =
  | { readonly kind: "value"; readonly raw: Raw | readonly Raw[] }
  | { readonly kind: "cleared" }
  | { readonly kind: "refused"; readonly why: string }

const CLEARED: Kept = { kind: "cleared" }

const MARK = String.fromCharCode(96)

const DATE = /^\d{4}-\d{2}-\d{2}$/

const INSTANT_CEILING = 8640000000000000

const refusedAs = (key: string, why: string): Kept => ({
  kind: "refused",
  why: MARK + key + MARK + " " + why,
})

const scalarOf = (value: Value, kind: DeclaredType["kind"]): Raw | null => {
  if (kind === "text") return value.kind === "text" ? value.text : null
  if (kind === "number")
    return value.kind === "number" && Number.isFinite(value.number) ? value.number : null
  if (kind === "boolean") return value.kind === "boolean" ? value.boolean : null
  if (kind === "instant") {
    if (value.kind !== "instant") return null
    if (!Number.isFinite(value.instant)) return null
    if (Math.abs(value.instant) > INSTANT_CEILING) return null
    return new Date(value.instant).toISOString()
  }
  if (kind === "date") return value.kind === "date" && DATE.test(value.date) ? value.date : null
  return null
}

const whyRefused = (value: Value, kind: DeclaredType["kind"]): string =>
  value.kind === kind
    ? "is declared " + kind + " and holds a value a file cannot carry back"
    : "is declared " + kind + " and was given " + value.kind

export const rawAs = (key: string, value: Value, type: DeclaredType): Kept => {
  if (value.kind === "absent") return CLEARED
  if (type.kind !== "list") {
    const raw = scalarOf(value, type.kind)
    if (raw === null) return refusedAs(key, whyRefused(value, type.kind))
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
      return refusedAs(key, "is declared a list of " + type.of + " and holds " + whyRefused(item, type.of))
    items.push(raw)
  }
  return { kind: "value", raw: items }
}
