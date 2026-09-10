import type { Query } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
import type { DerivedMechanics } from "akasha/alan/harness/idle-system/idle-deriving/idle-deriving.module.code.ts"
import type { DrawContext } from "akasha/alan/harness/idle-system/idle-draw/idle-draw.module.code.ts"
import { unheld } from "../../pages-unheld/pages-unheld.module.code.ts"
import type { IdleSupabase } from "../idle-save-context/idle-save-context.module.code.ts"

const PERSONA = "persona"

const PERSONA_COVER_IMAGE = "persona-cover-image"

export type ResolvedDrawContext = DrawContext & { readonly mechanics: DerivedMechanics }
export async function resolveDrawContext(
  _sb: IdleSupabase,
  _now: number
): Promise<ResolvedDrawContext> {
  throw new Error(unheld(PERSONA_COVER_IMAGE, "the images a draw lands on"))
}

const EVERY_PERSONA: Query = {
  pageTypeSlug: PERSONA,
  keys: ["id", "slug", "cover"],
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : ""
}

export async function loadPersonaInfoBySlug(
  _sb: IdleSupabase
): Promise<ReadonlyMap<string, { readonly id: string; readonly cover: string }>> {
  const asked = await askingFor(EVERY_PERSONA)
  if ("refused" in asked) throw new Error(`\`${PERSONA}\` went unread: ${asked.refused}`)
  const bySlug = new Map<string, { readonly id: string; readonly cover: string }>()
  for (const row of asked.rows) {
    const id = asString(row.id)
    const slug = asString(row.slug)
    if (id.length === 0 || slug.length === 0) continue
    bySlug.set(slug, { id, cover: asString(row.cover) })
  }
  return bySlug
}
