"use client"

import { EmbeddedViewContent } from "akasha/page/ui/component/modules/embedded-view-content/embedded-view-content.module.code.tsx"
import { PageDefaultContent } from "akasha/page/ui/component/modules/page-default-content/page-default-content.module.code.tsx"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { useState } from "react"

const PART_OF = "partOfCollections"

export function CollectionChildren({ pageTypeSlug, id }: PageDrawingProps) {
  const [count, setCount] = useState<number | null>(null)
  return (
    <PageDefaultContent pageTypeSlug={pageTypeSlug} id={id} titleOnly={count !== 0}>
      <EmbeddedViewContent
        pageTypeSlug={pageTypeSlug}
        id={id}
        relation={PART_OF}
        onTotal={setCount}
      />
    </PageDefaultContent>
  )
}
