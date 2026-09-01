import { captureError } from "@akasha/pages-access/capture-error"
import type { GameState } from "@akasha/idle-system/state"
import type { Catalog } from "~/idle/lib/catalog"
import { IDLE_PERSONA_CARD_PAGE_TYPE_SLUG } from "~/idle/lib/idle-card-page-type"
import type { PersonaInfo } from "~/idle/lib/idle-card-projection"
import { unwritten } from "~/lib/pages-unheld"
import type { IdleSupabase } from "./idle-save-context.server"

// A ROSTER THAT WENT UNWRITTEN IS NOT A PLAYER WITH NO CARDS. This read every card a player
// already holds off `idle-persona-card`, worked out what each card should now say, and patched
// the page for each one. `idle-persona-card` is no page type the pages system service holds, so
// neither half can happen: the prior titles cannot be read, and there is no page to patch.
//
// The list of names this returned is a list of cards that landed. Returning an empty one would
// say a player's roster had been projected and had nothing in it, and the caller would go on to
// treat the save and the roster as agreeing when they do not. So this refuses, which is what it
// already did wherever a patch failed.
export async function projectUserCards(
  sb: IdleSupabase,
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

// This still swallows the failure, captures it and carries on, which is what it is for: a save
// must land even where its roster projection does not. What it captures now is the refusal above,
// raised here rather than by calling `projectUserCards` — the catalog and the persona info that
// call takes would have to be invented to make it, and inventing them to throw them away is a
// worse way of saying nothing was projected.
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
      kind: failure.name,
      app: "alanwalton-web",
      url: `/api/save (${IDLE_PERSONA_CARD_PAGE_TYPE_SLUG})`,
      userAgent: "server",
    })
  } catch (capturing) {
    console.error("idle card re-projection failure went uncaptured:", capturing)
  }
}
