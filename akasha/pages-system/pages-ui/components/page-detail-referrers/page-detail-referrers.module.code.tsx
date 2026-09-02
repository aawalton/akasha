"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { type Referrer, useReferrers } from "@akasha/pages-ui/supabase/use-referrers"
import { ToggleSection } from "@akasha/pages-ui-components/page-detail-sections"
import { buildPageHref } from "@akasha/pages-url/page-href"
import { type PageTypeSlug, toPageTypeSlug } from "@akasha/pages-url/page-type-slug"

function referrerTitle(r: Referrer): string {
  const title = r.page.properties?.title
  return typeof title === "string" && title.length > 0 ? title : "Untitled"
}

export function PageDetailReferrers({
  pageId,
  pageTypeId,
  pageTypePropertiesMap,
  pageTypeSlugById,
}: {
  pageId: string
  pageTypeId: string | undefined
  pageTypePropertiesMap: PageTypePropertiesMap
  pageTypeSlugById: ReadonlyMap<string, PageTypeSlug>
}) {
  const router = usePagesUIRouter()
  const referrers = useReferrers({ pageId, pageTypeId, pageTypePropertiesMap, pageTypeSlugById })

  if (referrers.length === 0) return null

  const navigate = (r: Referrer) => {
    const props = r.page.properties
    const slug = typeof props?.slug === "string" ? props.slug : null
    const titleSource = typeof props?.title === "string" ? props.title : null
    router.push(
      buildPageHref({
        pageTypeSlug: toPageTypeSlug(r.sourcePageTypeSlug),
        slug,
        fallbackSlugSource: titleSource,
        id: r.page._id,
      })
    )
  }

  return (
    <ToggleSection label="Referenced by" hasContent>
      <div className="flex flex-col items-start gap-1">
        {referrers.map((r) => (
          <ButtonBadge
            key={`${r.viaPropertyId}-${r.page._id}`}
            variant="elevation-muted"
            onClick={() => navigate(r)}
          >
            {referrerTitle(r)}
          </ButtonBadge>
        ))}
      </div>
    </ToggleSection>
  )
}
