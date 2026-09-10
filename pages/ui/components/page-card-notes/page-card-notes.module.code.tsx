"use client"

import type { PropertyDefinition } from "@akasha/pages/core/types"
import type { PageTypeSlug } from "@akasha/pages/url/page-type-slug"
import { BlockEditor } from "@akasha/pages-ui/block-editor/block-editor"
import { MarkdownPropertyBadge } from "@akasha/pages-ui/components/markdown-property-badge"
import { usePage } from "@akasha/pages-ui/supabase/use-page"
import { cn } from "akasha/design/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/primitives/surface-provider/surface-provider.module.code.tsx"

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
