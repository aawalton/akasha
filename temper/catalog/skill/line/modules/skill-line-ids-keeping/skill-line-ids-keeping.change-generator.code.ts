import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/skill/line/modules/skill-line-ids/skill-line-ids.data-table.code.ts",
  pageTypeSlug: temperSkillLine.slug,
  from: "skill line pages",
  unions: [{ name: "SkillLineId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
