"use client"

import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { cn } from "@shared/design-primitives/utils/cn"
import type { PageTypeSlug } from "@shared/pages-url"
import { BlockEditor } from "../block-editor/block-editor.tsx"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { MarkdownPropertyBadge } from "../property-types/markdown.tsx"
import { usePage } from "../supabase/use-page.ts"

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
