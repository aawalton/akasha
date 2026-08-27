"use client"

import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { useMemo } from "react"
import { SupabasePageResolverProvider } from "../supabase/page-resolver-provider"
import { type PageWithProperties } from "../supabase/types"
import { type Subpage, useSubpages } from "../supabase/use-subpages"
import type { PageRow } from "../view-engine/page-row"
import { pageRowToPageDataJSON, toPageDataRecord } from "./page-data-json"
import { ToggleSection } from "./page-detail-sections"
import { buildTableColumns } from "./page-properties-shared"
import { PageTable, PageTableRowCells } from "./page-table"
import { TITLE_COLUMN_ID } from "./page-table-shared"
import { withColumnWidths } from "./page-table-widths"

const SUBPAGE_VISIBLE_PROPERTIES: readonly string[] = [TITLE_COLUMN_ID]

function selectUniversalDefs(
  definitions: readonly PropertyDefinition[]
): readonly PropertyDefinition[] {
  return definitions.filter((d) => d.id === "title")
}

function subpageToRow(subpage: Subpage): PageRow {
  return { ...toPageDataRecord(subpage.page.properties), _id: subpage.page._id }
}

export function PageDetailSubpages({
  pageId,
  pageTypePropertiesMap,
  pageTypeSlugById,
  definitions,
}: {
  pageId: string
  pageTypePropertiesMap: PageTypePropertiesMap
  pageTypeSlugById: ReadonlyMap<string, PageTypeSlug>
  definitions: readonly PropertyDefinition[]
}) {
  const subpages = useSubpages({ pageId, pageTypePropertiesMap, pageTypeSlugById })

  const universalDefs = useMemo(() => selectUniversalDefs(definitions), [definitions])

  const rows = useMemo<readonly PageRow[]>(() => subpages.map(subpageToRow), [subpages])

  const columns = useMemo(
    () => withColumnWidths(buildTableColumns(universalDefs, SUBPAGE_VISIBLE_PROPERTIES), rows),
    [universalDefs, rows]
  )

  const subpageById = useMemo<ReadonlyMap<string, Subpage>>(
    () => new Map(subpages.map((s) => [s.page._id, s])),
    [subpages]
  )

  if (subpages.length === 0) return null

  const rowHrefFor = (item: PageRow): string => {
    const subpage = subpageById.get(item._id)
    const props = subpage?.page.properties
    const slug = typeof props?.slug === "string" ? props.slug : null
    const titleSource = typeof props?.title === "string" ? props.title : null
    return buildPageHref({
      pageTypeSlug: PageTypeSlug(subpage?.sourcePageTypeSlug ?? "page"),
      slug,
      fallbackSlugSource: titleSource,
      id: item._id,
    })
  }

  const emptyPages: readonly PageWithProperties[] = []

  return (
    <ToggleSection label="Sub-pages" hasContent>
      <SupabasePageResolverProvider
        pages={emptyPages}
        pageTypes={emptyPages}
        relatedPages={emptyPages}
      >
        <PageTable
          items={rows}
          columns={columns}
          renderRow={(item) => {
            const { _id, ...rest } = item
            return (
              <PageTableRowCells
                data={pageRowToPageDataJSON(rest)}
                definitions={universalDefs}
                visibleProperties={SUBPAGE_VISIBLE_PROPERTIES}
                rowHref={rowHrefFor(item)}
              />
            )
          }}
        />
      </SupabasePageResolverProvider>
    </ToggleSection>
  )
}
