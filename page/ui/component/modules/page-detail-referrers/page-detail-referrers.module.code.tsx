"use client"

import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import type { PageTypePropertiesMap } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { ToggleSection } from "akasha/page/ui/component/modules/page-detail-sections/page-detail-sections.module.code.tsx"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import {
  type Referrer,
  useReferrers,
} from "akasha/page/ui/supabase/modules/use-referrers/use-referrers.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

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
