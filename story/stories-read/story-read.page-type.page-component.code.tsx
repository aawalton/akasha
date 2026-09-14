"use client"

import { PageCollectionContent } from "akasha/pages/ui/components/modules/page-collection-content/page-collection-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/pages/ui/components/modules/page-detail-content/page-detail-content.module.code.tsx"

export function Drawing({ pageTypeSlug, id, nextUnreadHref }: PageDrawingProps) {
  return (
    <PageCollectionContent pageTypeSlug={pageTypeSlug} id={id} nextUnreadHref={nextUnreadHref} />
  )
}
