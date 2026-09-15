"use client"

import { PageDefaultContent } from "akasha/page/ui/components/modules/page-default-content/page-default-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/components/modules/page-detail-content/page-detail-content.module.code.tsx"

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  return <PageDefaultContent pageTypeSlug={pageTypeSlug} id={id} />
}
