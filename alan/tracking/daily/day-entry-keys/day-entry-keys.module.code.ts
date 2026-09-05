import { dataError } from "@akasha/errors-core/exit-code"
import { asking } from "@akasha/pages-system-service/asking"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"

const ENTRY_PROPERTY = "page-property-entry"

/**
 * The keys an entry beside a day is declared as able to carry, read off the entry property itself.
 *
 * `asking` guards a key against the page type it is asked of, and these are keys of an entry rather
 * than of a page, so that guard does not reach them. Without this a caller asking for a key no row
 * carries would be handed rows with the key absent from every one, and a sum over them would state
 * an instrument's silence as a measurement. That is the same defect as the silent zero, one level
 * down, so it refuses in the same way.
 */
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
    if (typeof slug === "string") keys.add(camelizeKey(slug))
  }
  return keys
}
