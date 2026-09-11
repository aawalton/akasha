"use client"

import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { PageTypePropertiesMap } from "akasha/pages/core/property-types/rollup/rollup.module.code.ts"
import { buildTableColumns } from "akasha/pages/ui/components/card-property-columns/card-property-columns.module.code.ts"
import {
  pageRowToPageDataJSON,
  toPageDataRecord,
} from "akasha/pages/ui/components/page-data-json/page-data-json.module.code.ts"
import { ToggleSection } from "akasha/pages/ui/components/page-detail-sections/page-detail-sections.module.code.tsx"
import {
  PageTable,
  PageTableRowCells,
} from "akasha/pages/ui/components/page-table/page-table.module.code.tsx"
import { TITLE_COLUMN_ID } from "akasha/pages/ui/components/page-table-shared/page-table-shared.module.code.ts"
import { withColumnWidths } from "akasha/pages/ui/components/page-table-widths/page-table-widths.module.code.ts"
import type { PageRow } from "akasha/pages/ui/components/view-engine/view-row/view-row.module.code.ts"
import { SupabasePageResolverProvider } from "akasha/pages/ui/supabase/page-resolver-provider/page-resolver-provider.module.code.tsx"
import type { PageWithProperties } from "akasha/pages/ui/supabase/page-with-properties/page-with-properties.module.code.ts"
import {
  type Subpage,
  useSubpages,
} from "akasha/pages/ui/supabase/use-subpages/use-subpages.module.code.ts"
import { buildPageHref } from "akasha/pages/url/page-href/page-href.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"

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
