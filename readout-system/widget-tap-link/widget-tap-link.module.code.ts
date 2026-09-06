/** The key a widget's link names that widget under. */
const WIDGET = "widget"

/**
 * The widget a link names, or nothing where the link names none.
 *
 * THE NAME SITS IN THE FRAGMENT RATHER THAN THE QUERY. `decideOpenUrlRoute` builds the path a deep
 * link navigates to out of the pathname and the search alone, so a name in the fragment cannot
 * change where a tap lands. Two of Alan's widgets carry the same path and the same query, and the
 * fragment is what tells the two apart.
 */
export function widgetTapped(rawUrl: unknown): string | null {
  if (typeof rawUrl !== "string") return null
  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return null
  }
  const named = new URLSearchParams(parsed.hash.slice(1)).get(WIDGET)
  return named === null || named === "" ? null : named
}
