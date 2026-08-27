import type { Json } from "../../supabase-database/src/generated/database"
import type { Page } from "@shared/pages-core/page-types"

function pageString(p: Page, key: string): string {
  const v = p[key]
  if (typeof v !== "string") {
    throw new Error(`pageString: expected string at key '${key}', got ${describeJson(v)}`)
  }
  return v
}

export function pageId(p: Page): string {
  return pageString(p, "id")
}

function describeJson(v: Json | undefined): string {
  if (v === null) return "null"
  if (v === undefined) return "undefined"
  if (Array.isArray(v)) return "array"
  return typeof v
}
