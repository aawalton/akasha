import { dataError } from "@akasha/errors-core/exit-code"
import { slugOf } from "@akasha/pages/page-value"
import { asking } from "@akasha/pages-service/asking"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"

const ENTRY_PROPERTY = "page-property-entry"

export function entryKeysDeclared(
  root: string,
  entrySlug: string,
  said: string
): ReadonlySet<string> {
  const asked = asking(root, {
    pageTypeSlug: ENTRY_PROPERTY,
    where: { slug: { is: entrySlug } },
    limit: 1,
  } as never)
  if ("refused" in asked) {
    throw dataError(`reading what ${said} may carry: ${asked.refused}`)
  }
  const row = asked.rows[0]
  const stated = row === undefined ? undefined : row["properties"]
  if (!Array.isArray(stated)) {
    throw dataError(
      `the \`${entrySlug}\` entry property states no properties, so what ${said} may carry is ` +
        "unknown rather than nothing"
    )
  }
  const keys = new Set<string>(["id"])
  for (const one of stated) {
    const slug = (one as { readonly pagePropertySlug?: unknown }).pagePropertySlug
    if (typeof slug === "string") keys.add(camelizeKey(slugOf(slug)))
  }
  return keys
}
