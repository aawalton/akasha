import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperStatusEffectType } from "akasha/temper/catalog/effect/temper-status-effect-type/temper-status-effect-type.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/effect/temper-status-effect-type/modules/status-effect-type-ids/status-effect-type-ids.data-table.code.ts",
  pageTypeSlug: temperStatusEffectType.slug,
  from: "status effect type pages",
  unions: [{ name: "StatusEffectType", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
