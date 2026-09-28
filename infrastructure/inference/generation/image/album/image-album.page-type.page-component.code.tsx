"use client"

import { EmbeddedViewContent } from "akasha/page/ui/component/modules/embedded-view-content/embedded-view-content.module.code.tsx"
import { PageDefaultContent } from "akasha/page/ui/component/modules/page-default-content/page-default-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"

const ALBUMS = "albums"

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  return (
    <PageDefaultContent pageTypeSlug={pageTypeSlug} id={id} titleOnly>
      <EmbeddedViewContent pageTypeSlug={pageTypeSlug} id={id} relation={ALBUMS} />
    </PageDefaultContent>
  )
}
