import { captureError } from "@akasha/pages-access/capture-error"
import type { GameState } from "akasha/alan/harness/idle-system/idle-state/idle-state.module.code.ts"
import { IDLE_PERSONA_CARD_PAGE_TYPE_SLUG } from "../../idle-card-page-type/idle-card-page-type.module.code.ts"
import type { PersonaInfo } from "../../idle-card-projection/idle-card-projection.module.code.ts"
import type { Catalog } from "../../idle-catalog/idle-catalog.module.code.ts"
import { unwritten } from "../../pages-unheld/pages-unheld.module.code.ts"
import type { IdleSupabase } from "../idle-save-context/idle-save-context.module.code.ts"

export async function projectUserCards(
  _sb: IdleSupabase,
  args: {
    readonly userId: string
    readonly state: GameState
    readonly catalog: Catalog
    readonly personaInfo: ReadonlyMap<string, PersonaInfo>
    readonly now: number
  }
): Promise<readonly string[]> {
  throw new Error(unwritten(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG, `the roster of \`${args.userId}\``))
}

export async function reprojectUserCardsSafely(
  _sb: IdleSupabase,
  args: {
    readonly userId: string
    readonly state: GameState
    readonly now: number
    readonly catalog?: Catalog
  }
): Promise<void> {
  const failure = new Error(
    unwritten(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG, `the roster of \`${args.userId}\``)
  )
  console.error(`idle card re-projection failed for ${args.userId}:`, failure)
  try {
    await captureError({
      fingerprint: "idle-card-reprojection-failed",
      message: failure.message,
      stack: failure.stack ?? "",
      kind: "error",
      app: "alanwalton",
      url: `/api/save (${IDLE_PERSONA_CARD_PAGE_TYPE_SLUG})`,
      userAgent: "server",
    })
  } catch (capturing) {
    console.error("idle card re-projection failure went uncaptured:", capturing)
  }
}
