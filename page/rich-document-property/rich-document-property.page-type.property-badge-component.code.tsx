"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { EmptyBadge } from "akasha/design/interface/badge/modules/empty-badge/empty-badge.module.code.tsx"
import { stripLeadingMarker } from "akasha/page/core/property-type/modules/block-markers/block-markers.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { normalizeRichDocument } from "akasha/page/core/property-type/modules/rich-document-ops/rich-document-ops.module.code.ts"
import { BlockEditor } from "akasha/page/ui/block-editor/modules/block-editor/block-editor.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"

function openingOf(value: PropertyValue): string | null {
  for (const block of normalizeRichDocument(value).blocks) {
    const held = block.text
    if (typeof held !== "string") continue
    const said = stripLeadingMarker(held).trim()
    if (said !== "") return said
  }
  return null
}

export function Drawing({ property, value, pageId, pageTypeSlug }: PropertyBadgeProps) {
  if (pageId !== undefined && pageTypeSlug !== undefined) {
    return (
      <BlockEditor pageTypeSlug={pageTypeSlug} id={pageId} propertyId={property.id} value={value} />
    )
  }
  const opening = openingOf(value)
  return opening === null ? <EmptyBadge /> : <Badge variant="elevation-muted">{opening}</Badge>
}
