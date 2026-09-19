import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { Source } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const WRITE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

export function composedEdit(
  root: string,
  pageTypeSlug: string,
  slug: string,
  values: Value,
  source: Source
): Asking {
  const composed = composedFor(root, { pageTypeSlug, slug, values }, source)
  if ("refused" in composed) {
    throw new Error(`\`${pageTypeSlug}/${slug}\` went uncomposed: ${composed.refused}`)
  }
  return { at: WRITE, given: { at: composed.put.path, body: composed.put.content } }
}
