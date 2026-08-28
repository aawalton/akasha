"use client"

import { useMemo } from "react"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"
import { PropertyBadge } from "../property-types/property-badge.tsx"
import type { PropertyValue } from "../property-types/types.ts"
import { SortablePropertyList } from "./page-detail-sortable-list.tsx"
import { RESERVED_PROPERTY_IDS } from "./page-properties-shared.ts"

interface PageDetailPropertiesProps {
  definitions?: readonly PropertyDefinition[]
  data?: PageDataJSON
  pageId?: string
  pageTypeSlug?: string
  onPropertyChange?: (propertyId: string, value: unknown) => void
  onPageNavigate?: (pageId: string) => void
  onCreateOption?: (propertyId: string, label: string) => void
  onReorderDefinitions?: (orderedIds: readonly string[]) => void
}

export function PageDetailProperties({
  definitions,
  data,
  pageId,
  pageTypeSlug,
  onPropertyChange,
  onPageNavigate,
  onCreateOption,
  onReorderDefinitions,
}: PageDetailPropertiesProps) {
  const bodyDefs = useMemo(() => {
    const reservedExclusions: readonly string[] = RESERVED_PROPERTY_IDS
    return definitions?.filter((d) => !reservedExclusions.includes(d.id)) ?? []
  }, [definitions])
  const wrappedOnPropertyChange = onPropertyChange
    ? (propertyId: string, value: PropertyValue) => onPropertyChange(propertyId, value)
    : undefined

  const renderBadge = (def: PropertyDefinition) => {
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

  const propertyRow = (def: PropertyDefinition) => (
    <div
      className={
        def.type === "multi-relation"
          ? "flex min-w-0 flex-1 items-start justify-between"
          : "flex min-w-0 flex-1 items-center justify-between"
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
        {renderBadge(def)}
      </div>
    </div>
  )

  if (onReorderDefinitions && data) {
    return (
      <SortablePropertyList
        bodyDefs={bodyDefs}
        onReorderDefinitions={onReorderDefinitions}
        propertyRow={propertyRow}
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
              {renderBadge(def)}
            </div>
          </div>
        ))}
    </div>
  )
}
