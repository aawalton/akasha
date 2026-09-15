import {
  type Landed,
  landedLinesAt,
} from "akasha/page/modules/entry-landing/page-entry-landing.module.code.ts"
import { linesOver } from "akasha/page/modules/entry-writing/page-entry-writing.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export function landedAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  values: Iterable<Value>,
  ceiling: number,
  uncommitted = false
): Landed {
  return landedLinesAt(root, page, propertySlug, held, linesOver(values), ceiling, uncommitted)
}
