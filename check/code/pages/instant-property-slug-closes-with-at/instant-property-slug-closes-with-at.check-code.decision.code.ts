import { pageIn } from "akasha/check/code/pages/page-named-as-stated/page-named-as-stated.check-code.decision.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const INSTANT_PROPERTY = "instant-property"

const CLOSING = "-at"

function reasonFor(pageTypeSlug: string, slug: string): string {
  return (
    `the page states its page type as \`${pageTypeSlug}\`, which sits under ` +
    `\`${INSTANT_PROPERTY}\`, and names itself \`${slug}\` — an instant property's slug closes ` +
    `with \`${CLOSING}\``
  )
}

export function reasonsAt(
  path: string,
  text: string,
  under: ReadonlySet<string>
): readonly string[] {
  if (namedUnder(path, under) === null) return []
  const stated = pageIn(path, text)
  if (stated === null) return []
  const pageTypeSlug = slugOf(stated.pageTypeSlug)
  if (!under.has(pageTypeSlug)) return []
  if (stated.slug.endsWith(CLOSING)) return []
  return [reasonFor(pageTypeSlug, stated.slug)]
}
