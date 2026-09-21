import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type {
  RelatedIdGroup,
  RelatedWay,
} from "akasha/page/ui/supabase/modules/collect-related-ids/collect-related-ids.module.code.ts"
import { getContentPersistence } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"

export type RelatedPagesReader = (args: {
  pageTypeSlug: string
  where: readonly [{ key: RelatedWay; in: readonly string[] }]
}) => Promise<{ rows: readonly Page[] }>

const liveReader: RelatedPagesReader = (args) => getPages(args)

const inFlight = new Map<string, Promise<readonly Page[]>>()

export function groupsKeyOf(groups: readonly RelatedIdGroup[]): string {
  return groups.map((g) => `${g.pageTypeSlug}:${g.by}:${g.values.join(",")}`).join("|")
}

function idsOf(groups: readonly RelatedIdGroup[]): readonly string[] {
  return groups.filter((g) => g.by === "id").flatMap((g) => g.values)
}

export function getRelatedPagesByIdCoalesced(
  groups: readonly RelatedIdGroup[],
  read: RelatedPagesReader = liveReader
): Promise<readonly Page[]> {
  const key = groupsKeyOf(groups)
  const existing = inFlight.get(key)
  if (existing !== undefined) return existing
  const port = getContentPersistence()
  const flight = Promise.all(
    groups.map((group) =>
      read({
        pageTypeSlug: group.pageTypeSlug,
        where: [{ key: group.by, in: group.values }],
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
