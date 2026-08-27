"use client"

import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { usePagesUIRouter } from "../router-context"
import { type Referrer, useReferrers } from "../supabase/use-referrers"
import { ToggleSection } from "./page-detail-sections"

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
        pageTypeSlug: PageTypeSlug(r.sourcePageTypeSlug),
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
