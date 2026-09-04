"use client"

import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { SupabasePageResolverProvider } from "@akasha/pages-ui/supabase/page-resolver-provider"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { type Subpage, useSubpages } from "@akasha/pages-ui/supabase/use-subpages"
import { buildTableColumns } from "@akasha/pages-ui-components/card-property-columns"
import { pageRowToPageDataJSON, toPageDataRecord } from "@akasha/pages-ui-components/page-data-json"
import { ToggleSection } from "@akasha/pages-ui-components/page-detail-sections"
import { TITLE_COLUMN_ID } from "@akasha/pages-ui-components/page-table-shared"
import { withColumnWidths } from "@akasha/pages-ui-components/page-table-widths"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { buildPageHref } from "@akasha/pages-url/page-href"
import { type PageTypeSlug, toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useMemo } from "react"
import { PageTable, PageTableRowCells } from "../page-table/page-table.module.code.tsx"

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
      pageTypeSlug: toPageTypeSlug(subpage?.sourcePageTypeSlug ?? "page"),
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
            const { _id: id, ...rest } = item
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
