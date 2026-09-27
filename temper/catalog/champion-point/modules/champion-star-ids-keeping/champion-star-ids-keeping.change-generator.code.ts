import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

function everyStar(): boolean {
  return true
}

const KEEPING: Keeping = {
  at: "temper/catalog/champion-point/modules/champion-star-ids/champion-star-ids.data-table.code.ts",
  pageTypeSlug: temperChampionStar.slug,
  from: "champion star pages",
  unions: [{ name: "ChampionStarId", holds: everyStar, pageTypeSlug: temperChampionStar.slug }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
