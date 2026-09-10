import { namedUnder } from "@akasha/pages/page-file-name"
import { pageIn } from "../page-named-as-stated/page-named-as-stated.code-check.decision.code.ts"

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
  if (stated === null || !under.has(stated.pageTypeSlug)) return []
  if (stated.slug.endsWith(CLOSING)) return []
  return [reasonFor(stated.pageTypeSlug, stated.slug)]
}
