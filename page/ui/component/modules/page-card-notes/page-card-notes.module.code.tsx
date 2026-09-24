"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { BlockEditor } from "akasha/page/ui/block-editor/modules/block-editor/block-editor.module.code.tsx"
import { MarkdownPropertyBadge } from "akasha/page/ui/component/modules/markdown-property-badge/markdown-property-badge.module.code.tsx"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

interface PageCardNotesProps {
  pageId: string
  pageTypeSlug: PageTypeSlug
  property: PropertyDefinition
  lightValue: unknown
  onNotesChange?: (propertyId: string, value: unknown) => void
}

export function PageCardNotes({
  pageId,
  pageTypeSlug,
  property,
  lightValue,
  onNotesChange,
}: PageCardNotesProps) {
  const surface = useSurface()
  const value = lightValue
  return (
    <div
      className={cn(
        "-mx-6 aspect-square w-[calc(100%+3rem)] overflow-y-auto px-6 py-3",
        surfaceClass(surface + 1)
      )}
    >
      {property.type === "rich-document" ? (
        <BlockEditor
          pageTypeSlug={pageTypeSlug}
          id={pageId}
          propertyId={property.id}
          value={value}
        />
      ) : (
        <MarkdownPropertyBadge
          property={property}
          value={String(value ?? "")}
          context="detail"
          editable={onNotesChange !== undefined}
          fill
          onPropertyChange={onNotesChange}
        />
      )}
    </div>
  )
}
