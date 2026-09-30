"use client"

import { PageCollectionContent } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PageMenuExtraProvider } from "akasha/page/ui/component/modules/page-detail-header-menu/page-detail-header-menu.module.code.tsx"
import { useFrameFooterMark } from "akasha/page/ui/frame/modules/frame-sticky-footer/frame-sticky-footer.module.code.tsx"

import { PlayedShell } from "akasha/story/world/stories/played/modules/played-shell/played-shell.module.code.tsx"

export function Drawing({ pageTypeSlug, id, nextUnreadHref, page }: PageDrawingProps) {
  useFrameFooterMark()
  return (
    <PageMenuExtraProvider>
      <PageCollectionContent
        pageTypeSlug={pageTypeSlug}
        id={id}
        nextUnreadHref={nextUnreadHref}
        mobileHeader
      >
        <PlayedShell pageTypeSlug={pageTypeSlug} id={id} page={page ?? null} />
      </PageCollectionContent>
    </PageMenuExtraProvider>
  )
}
