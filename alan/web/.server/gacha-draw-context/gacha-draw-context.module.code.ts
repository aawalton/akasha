import type { DerivedMechanics } from "akasha/alan/harness/idle-system/modules/idle-deriving/idle-deriving.module.code.ts"
import type { DrawContext } from "akasha/alan/harness/idle-system/modules/idle-draw/idle-draw.module.code.ts"
import type { IdleSupabase } from "akasha/alan/web/.server/idle-save-context/idle-save-context.module.code.ts"
import { unheld } from "akasha/alan/web/modules/pages-unheld/pages-unheld.module.code.ts"

const PERSONA_COVER_IMAGE = "persona-cover-image"

export type ResolvedDrawContext = DrawContext & { readonly mechanics: DerivedMechanics }
export async function resolveDrawContext(
  _sb: IdleSupabase,
  _now: number
): Promise<ResolvedDrawContext> {
  throw new Error(unheld(PERSONA_COVER_IMAGE, "the images a draw lands on"))
}
