"use client"

import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import { BlockEditor } from "akasha/pages/ui/block-editor/block-editor/block-editor.module.code.tsx"
import { MarkdownPropertyBadge } from "akasha/pages/ui/components/markdown-property-badge/markdown-property-badge.module.code.tsx"
import { usePage } from "akasha/pages/ui/supabase/use-page/use-page.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"

interface PageCardNotesProps {
  pageId: string
  pageTypeSlug: PageTypeSlug
  property: PropertyDefinition
  lightValue: unknown
  onNotesChange: (propertyId: string, value: unknown) => void
}

export function PageCardNotes({
  pageId,
  pageTypeSlug,
  property,
  lightValue,
  onNotesChange,
}: PageCardNotesProps) {
  const surface = useSurface()
  const isContent = property.storage === "content"
  const { page } = usePage({ pageTypeSlug, id: pageId, includeContentOnDemand: isContent })
  const fetched = page?.properties[property.id]
  const value = fetched !== undefined ? fetched : lightValue
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
          editable
          fill
          onPropertyChange={onNotesChange}
        />
      )}
    </div>
  )
}
