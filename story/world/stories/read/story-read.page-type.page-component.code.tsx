"use client"

import { PageCollectionContent } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { ReaderShell } from "akasha/story/world/stories/read/modules/reader-shell/reader-shell.module.code.tsx"

export function Drawing({ pageTypeSlug, id, nextUnreadHref }: PageDrawingProps) {
  return (
    <PageCollectionContent pageTypeSlug={pageTypeSlug} id={id} nextUnreadHref={nextUnreadHref}>
      <ReaderShell pageTypeSlug={pageTypeSlug} id={id} />
    </PageCollectionContent>
  )
}
