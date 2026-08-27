import { captureError } from "@shared/pages-access/capture-error"
import { patchPage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import type { Catalog } from "~/idle/lib/catalog"
import type { GameState } from "./core/types"
import { loadPersonaInfoBySlug, resolveDrawContext } from "~/idle/lib/gacha-draw-context.server"
import { IDLE_PERSONA_CARD_PAGE_TYPE_SLUG } from "~/idle/lib/idle-card-page-type"
import {
  buildLockInputs,
  cardFileValues,
  cardPageName,
  deriveCardProjections,
  type PersonaInfo,
} from "~/idle/lib/idle-card-projection"
import { deriveRosterView } from "~/idle/lib/roster-view"
import type { IdleSupabase } from "./idle-save-context.server"

const WRITER = "idle-card-projection"

async function readPriorTitles(
  _sb: IdleSupabase,
  playerId: string
): Promise<ReadonlyMap<string, string | null>> {
  const asked = await askComposed({
    "page-type": IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
    where: { "player-id": { is: playerId } },
    keys: ["card-slug", "title"],
  })
  if (!asked.ok) {
    throw new Error(
      `\`${IDLE_PERSONA_CARD_PAGE_TYPE_SLUG}\` for player ${playerId} went unread: ${asked.why}`
    )
  }
  const bySlug = new Map<string, string | null>()
  for (const row of asked.answer.rows) {
    const slug = row.values["card-slug"]
    const title = row.values.title
    if (typeof slug === "string") bySlug.set(slug, typeof title === "string" ? title : null)
  }
  return bySlug
}

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
  const cards = deriveRosterView(args.state, args.catalog, args.now)
  const priorTitleBySlug = await readPriorTitles(sb, args.userId)
  const projections = deriveCardProjections(
    cards,
    args.personaInfo,
    args.userId,
    priorTitleBySlug,
    args.state.activeTeam ?? [],
    buildLockInputs(args.state)
  )
  const written: string[] = []
  for (const projection of projections) {
    const name = cardPageName(args.userId, projection.cardSlug)
    const landed = await patchPage(
      IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
      name,
      cardFileValues(projection),
      WRITER
    )
    if (!landed.ok) {
      throw new Error(
        `projectUserCards: the card at \`${name}\` went unwritten, so the player's roster and their save disagree — ${landed.why}`
      )
    }
    written.push(name)
  }
  return written
}

export async function reprojectUserCardsSafely(
  sb: IdleSupabase,
  args: {
    readonly userId: string
    readonly state: GameState
    readonly now: number
    readonly catalog?: Catalog
  }
): Promise<void> {
  try {
    const catalog =
      args.catalog ??
      (await (async (): Promise<Catalog> => {
        const ctx = await resolveDrawContext(sb, args.now)
        return { roster: ctx.roster, pools: ctx.pools }
      })())
    const personaInfo = await loadPersonaInfoBySlug(sb)
    await projectUserCards(sb, {
      userId: args.userId,
      state: args.state,
      catalog,
      personaInfo,
      now: args.now,
    })
  } catch (err) {
    const failure = err instanceof Error ? err : new Error(String(err))
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
}
