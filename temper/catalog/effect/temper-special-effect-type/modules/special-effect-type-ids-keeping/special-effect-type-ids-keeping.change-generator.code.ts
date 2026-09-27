import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperSpecialEffectType } from "akasha/temper/catalog/effect/temper-special-effect-type/temper-special-effect-type.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/effect/temper-special-effect-type/modules/special-effect-type-ids/special-effect-type-ids.data-table.code.ts",
  pageTypeSlug: temperSpecialEffectType.slug,
  from: "special effect type pages",
  unions: [{ name: "SpecialEffectType", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
