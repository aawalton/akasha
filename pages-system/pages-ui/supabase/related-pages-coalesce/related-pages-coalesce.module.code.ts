import { getPages } from "@akasha/pages-access/get"
import type { Page } from "@akasha/pages-core/page-types"
import type { RelatedIdGroup } from "@akasha/pages-ui/supabase/collect-related-ids"
import { getContentPersistence } from "@akasha/pages-ui-store/singleton"

export type RelatedPagesReader = (args: {
  pageTypeSlug: string
  where: readonly [{ key: "id"; in: readonly string[] }]
}) => Promise<{ rows: readonly Page[] }>

const liveReader: RelatedPagesReader = (args) => getPages(args)

const inFlight = new Map<string, Promise<readonly Page[]>>()

function keyOf(groups: readonly RelatedIdGroup[]): string {
  return groups.map((g) => `${g.pageTypeSlug}:${g.ids.join(",")}`).join("|")
}

function idsOf(groups: readonly RelatedIdGroup[]): readonly string[] {
  return groups.flatMap((g) => g.ids)
}

export function getRelatedPagesByIdCoalesced(
  groups: readonly RelatedIdGroup[],
  read: RelatedPagesReader = liveReader
): Promise<readonly Page[]> {
  const key = keyOf(groups)
  const existing = inFlight.get(key)
  if (existing !== undefined) return existing
  const port = getContentPersistence()
  const flight = Promise.all(
    groups.map((group) =>
      read({
        pageTypeSlug: group.pageTypeSlug,
        where: [{ key: "id", in: group.ids }],
      })
    )
  )
    .then((results) => {
      const rows = results.flatMap((result) => result.rows)
      if (port !== null && rows.length > 0) port.savePages(rows)
      return rows
    })
    .catch((err: unknown) => {
      if (port === null) throw err
      return port.loadPages(idsOf(groups))
    })
    .finally(() => {
      if (inFlight.get(key) === flight) inFlight.delete(key)
    })
  inFlight.set(key, flight)
  return flight
}
