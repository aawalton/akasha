"use client"

import { CollectionChildren } from "akasha/alan/collection/watching/modules/collection-children/collection-children.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  return <CollectionChildren pageTypeSlug={pageTypeSlug} id={id} />
}
