import { InputError } from "@shared/errors-core/exit"
import type { Page } from "../../pages/page"

export function fieldStr(page: Page, key: string): string | undefined {
  const value = page[key]
  return typeof value === "string" ? value : undefined
}

export function fieldNum(page: Page, key: string): number | undefined {
  const value = page[key]
  return typeof value === "number" ? value : undefined
}

export function fieldBool(page: Page, key: string): boolean | undefined {
  const value = page[key]
  return typeof value === "boolean" ? value : undefined
}

export function fieldStrList(page: Page, key: string): readonly string[] {
  const value = page[key]
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string")
}

export function displayTitle(page: Page): string {
  return page.title ?? page.id
}

export function parseDecimalFlag(name: string, raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined
  const n = Number(raw)
  if (!Number.isFinite(n)) throw new InputError(`${name} must be a finite number, got: ${raw}`)
  return n
}
