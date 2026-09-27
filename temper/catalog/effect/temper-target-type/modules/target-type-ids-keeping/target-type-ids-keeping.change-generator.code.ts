import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperTargetType } from "akasha/temper/catalog/effect/temper-target-type/temper-target-type.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/effect/temper-target-type/modules/target-type-ids/target-type-ids.data-table.code.ts",
  pageTypeSlug: temperTargetType.slug,
  from: "target type pages",
  unions: [{ name: "TargetType", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
