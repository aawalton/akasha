import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperTargetScope } from "akasha/temper/catalog/effect/temper-target-scope/temper-target-scope.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/effect/temper-target-scope/modules/target-scope-ids/target-scope-ids.data-table.code.ts",
  pageTypeSlug: temperTargetScope.slug,
  from: "target scope pages",
  unions: [{ name: "TargetScope", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
