"use client"

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { cn } from "@akasha/design-primitives/cn"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { BlockEditor } from "../block-editor/block-editor.tsx"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { MarkdownPropertyBadge } from "../property-types/markdown.tsx"
import { usePage } from "@akasha/pages-ui/supabase/use-page"

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
