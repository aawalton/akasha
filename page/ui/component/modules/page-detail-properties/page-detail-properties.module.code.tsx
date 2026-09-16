"use client"

import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { RESERVED_PROPERTY_IDS } from "akasha/page/ui/component/modules/card-property-columns/card-property-columns.module.code.ts"
import { PropertyRow } from "akasha/page/ui/component/modules/property-row/property-row.module.code.tsx"
import { useMemo } from "react"

interface PageDetailPropertiesProps {
  definitions?: readonly PropertyDefinition[]
  data?: PageDataJSON
  pageId?: string
  pageTypeSlug?: string
  onPropertyChange?: (propertyId: string, value: unknown) => void
  onPageNavigate?: (pageId: string) => void
}

export function PageDetailProperties({
  definitions,
  data,
  pageId,
  pageTypeSlug,
  onPropertyChange,
  onPageNavigate,
}: PageDetailPropertiesProps) {
  const bodyDefs = useMemo(() => {
    const reservedExclusions: readonly string[] = RESERVED_PROPERTY_IDS
    const shown = definitions?.filter((d) => !reservedExclusions.includes(d.id)) ?? []
    return [...shown].sort((one, other) => one.title.localeCompare(other.title))
  }, [definitions])
  const wrappedOnPropertyChange = onPropertyChange
    ? (propertyId: string, value: PropertyValue) => onPropertyChange(propertyId, value)
    : undefined

  return (
    <div className="@container flex flex-col gap-2">
      {data &&
        bodyDefs.map((def) => (
          <PropertyRow
            key={def.id}
            property={def}
            value={data[def.id] ?? null}
            editable
            pageData={data}
            propertyDefinitions={definitions}
            pageId={pageId}
            pageTypeSlug={pageTypeSlug}
            onPropertyChange={wrappedOnPropertyChange}
            onPageNavigate={onPageNavigate}
          />
        ))}
    </div>
  )
}
