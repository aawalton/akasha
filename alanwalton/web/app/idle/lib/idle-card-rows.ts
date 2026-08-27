import { toPageDataRecord } from "@shared/pages-ui/components/page-data-json"
import { type PageRow } from "@shared/pages-ui/view-engine/page-row"
import type { Catalog } from "~/idle/lib/catalog"
import type { GameState } from "./core/types"
import { boostedRateMap } from "./core/rate"
import { buildLockInputs, deriveCardProjections } from "~/idle/lib/idle-card-projection"
import { deriveRosterView, formatCollectedBadge, formatStarsDetail } from "~/idle/lib/roster-view"

export function deriveCardRows(state: GameState, catalog: Catalog): readonly PageRow[] {
  const cards = deriveRosterView(state, catalog, state.lastTickAt)
  const projections = deriveCardProjections(
    cards,
    new Map(),
    "",
    new Map(),
    state.activeTeam ?? [],
    buildLockInputs(state)
  )
  const boosted = boostedRateMap(state)
  const bySlug = new Map(cards.map((card) => [card.slug, card]))
  return projections.map((projection) => {
    const card = bySlug.get(projection.cardSlug)
    return {
      _id: projection.cardSlug,
      title: projection.titleWrite ?? "",
      ...toPageDataRecord(projection.attributes),
      boostedRatePerSec: boosted[projection.cardSlug] ?? 0,
      collected: card === undefined ? "" : formatCollectedBadge(card),
      starsDetail: card === undefined ? "" : formatStarsDetail(card),
      train10Cost: card === undefined ? 0 : card.train10Cost,
    }
  })
}
