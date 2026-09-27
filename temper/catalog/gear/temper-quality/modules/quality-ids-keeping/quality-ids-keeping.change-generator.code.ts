import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const NO_QUALITY = "no-quality"

function graded(page: Readonly<Record<string, unknown>>): boolean {
  return page.available === true && page.slug !== NO_QUALITY
}

function ungraded(page: Readonly<Record<string, unknown>>): boolean {
  return !graded(page)
}

const KEEPING: Keeping = {
  at: "temper/catalog/gear/temper-quality/modules/quality-ids/quality-ids.data-table.code.ts",
  pageTypeSlug: temperQuality.slug,
  from: "quality pages",
  unions: [
    { name: "GradedQualityId", holds: graded },
    { name: "UngradedQualityId", holds: ungraded },
  ],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
