import { addressIn } from "../address/page-address.module.code.ts"

export type Value = Record<string, unknown>

export function slugOf(named: string): string {
  const address = addressIn(named)
  return address.kind === "id" ? named : address.slug
}

export function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

export function textIn(value: Value, key: string): string | null {
  const held = textAt(value, key)
  return held === "" ? null : held
}

export function textsAt(value: Value, key: string): readonly string[] | null {
  const held = value[key]
  if (!Array.isArray(held)) return null
  return held.every((one) => typeof one === "string") ? (held as readonly string[]) : null
}

export function numberAt(value: Value, key: string): number | null {
  const held = value[key]
  return typeof held === "number" ? held : null
}

export function slugAt(value: Value, key: string): string | null {
  const named = textAt(value, key)
  return named === null ? null : slugOf(named)
}

export function slugsIn(said: unknown): readonly string[] {
  if (!Array.isArray(said)) return []
  const named: string[] = []
  for (const one of said) {
    if (typeof one === "string" && one !== "") named.push(slugOf(one))
  }
  return named
}
