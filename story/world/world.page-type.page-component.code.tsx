"use client"

import type { ListingConfig } from "akasha/page/core/schema/modules/listing-config/listing-config.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { PageDefaultContent } from "akasha/page/ui/component/modules/page-default-content/page-default-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PagesFilteredContent } from "akasha/page/ui/component/modules/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"

const STORY = toPageTypeSlug("story")

const WORLD = "world"

const AS_CARDS: ListingConfig = { layout: "cards", includeDescendants: false }

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  const { page } = usePage({ pageTypeSlug, id })
  const slug = toPageDataJSON(page?.properties).slug
  const named = typeof slug === "string" && slug !== "" ? namedAs(pageTypeSlug, slug, null) : null
  const searchParams = useMemo(() => (named === null ? null : { [WORLD]: named }), [named])
  return (
    <PageDefaultContent pageTypeSlug={pageTypeSlug} id={id}>
      {searchParams !== null && (
        <PagesFilteredContent
          embedded
          pageTypeSlug={STORY}
          searchParams={searchParams}
          locked={AS_CARDS}
        />
      )}
    </PageDefaultContent>
  )
}
