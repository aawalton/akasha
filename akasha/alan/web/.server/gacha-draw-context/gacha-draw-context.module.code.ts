import type { DerivedMechanics } from "@akasha/idle-system/deriving"
import type { DrawContext } from "@akasha/idle-system/draw"
import type { Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { unheld } from "../../pages-unheld/pages-unheld.module.code.ts"
import type { IdleSupabase } from "../idle-save-context/idle-save-context.module.code.ts"

const PERSONA = "persona"

const PERSONA_COVER_IMAGE = "persona-cover-image"

export type ResolvedDrawContext = DrawContext & { readonly mechanics: DerivedMechanics }

// A DRAW POOL THAT WENT UNREAD IS NOT A PERSONA WITH NO PICTURES. The roster this builds is drawn
// from `persona`, which the pages system service does hold — but every image a draw can land on
// comes off `persona-cover-image`, which it does not. Building the roster anyway would answer a
// context whose `pools` are empty for every persona in it, and the draw reads an empty pool as a
// persona there is nothing to show, which is a claim about the collection rather than the absence
// it is.
export async function resolveDrawContext(
  _sb: IdleSupabase,
  _now: number
): Promise<ResolvedDrawContext> {
  throw new Error(unheld(PERSONA_COVER_IMAGE, "the images a draw lands on"))
}

// The personas themselves are still readable, so this one keeps its answer. `id`, `slug` and
// `cover` are keys the persona page type declares. The old code derived a slug off `title` for a
// persona carrying none; the persona page type declares no `title` and every persona page carries
// its slug, so the derivation went with the key it rested on.
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
