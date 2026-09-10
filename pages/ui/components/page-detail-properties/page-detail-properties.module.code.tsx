"use client"

import { RESERVED_PROPERTY_IDS } from "@akasha/pages-ui/components/card-property-columns"
import { PropertyBadge } from "@akasha/pages-ui/components/property-badge"
import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/pages/core/property-types/property-type-ops/property-type-ops.module.code.ts"
import { useMemo } from "react"

interface PageDetailPropertiesProps {
  definitions?: readonly PropertyDefinition[]
  data?: PageDataJSON
  pageId?: string
  pageTypeSlug?: string
  onPropertyChange?: (propertyId: string, value: unknown) => void
  onPageNavigate?: (pageId: string) => void
  onCreateOption?: (propertyId: string, label: string) => void
}

export function PageDetailProperties({
  definitions,
  data,
  pageId,
  pageTypeSlug,
  onPropertyChange,
  onPageNavigate,
  onCreateOption,
}: PageDetailPropertiesProps) {
  const bodyDefs = useMemo(() => {
    const reservedExclusions: readonly string[] = RESERVED_PROPERTY_IDS
    const shown = definitions?.filter((d) => !reservedExclusions.includes(d.id)) ?? []
    return [...shown].sort((one, other) => one.title.localeCompare(other.title))
  }, [definitions])
  const wrappedOnPropertyChange = onPropertyChange
    ? (propertyId: string, value: PropertyValue) => onPropertyChange(propertyId, value)
    : undefined

  const RenderBadge = (def: PropertyDefinition) => {
    if (data === undefined) return null
    const value = data[def.id] ?? null
    return (
      <PropertyBadge
        key={def.id}
        property={def}
        value={value}
        context="detail"
        editable
        pageData={data}
        propertyDefinitions={definitions}
        pageId={pageId}
        pageTypeSlug={pageTypeSlug}
        onPropertyChange={wrappedOnPropertyChange}
        onPageNavigate={onPageNavigate}
        onCreateOption={onCreateOption}
      />
    )
  }

  return (
    <div className="@container flex flex-col gap-2">
      {data &&
        bodyDefs.map((def) => (
          <div
            key={def.id}
            className={
              def.type === "multi-relation"
                ? "flex items-start justify-between"
                : "flex items-center justify-between"
            }
          >
            <span className="min-w-28 shrink-0 text-secondary text-sm">{def.title}</span>
            <div
              className={
                def.type === "multi-relation"
                  ? "flex flex-col items-end gap-1"
                  : "flex flex-wrap justify-end gap-1"
              }
            >
              {RenderBadge(def)}
            </div>
          </div>
        ))}
    </div>
  )
}
