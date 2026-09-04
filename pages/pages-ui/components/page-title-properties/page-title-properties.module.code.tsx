"use client"

import { propertyTypeRendersWhenEmpty } from "@akasha/pages-core/property-types/registry"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { selectVisibleCardProperties } from "@akasha/pages-ui-components/card-property-columns"
import { isEmptyValue, PropertyBadge } from "@akasha/pages-ui-components/property-badge"
import { useMemo } from "react"

interface PageTitlePropertiesProps {
  pageId?: string
  pageTypeSlug?: string
  data?: PageDataJSON
  definitions?: readonly PropertyDefinition[]
  titlePropertyIds?: readonly string[]
}

export function PageTitleProperties({
  pageId,
  pageTypeSlug,
  data,
  definitions,
  titlePropertyIds,
}: PageTitlePropertiesProps) {
  const bodyDefs = useMemo(
    () => selectVisibleCardProperties(definitions ?? [], titlePropertyIds ?? []),
    [definitions, titlePropertyIds]
  )
  const enrichedData = data ?? null

  const hasBadges = bodyDefs.length > 0 && enrichedData
  if (!hasBadges) return null

  const RenderBadge = (def: PropertyDefinition) => {
    if (enrichedData === null) return null
    const value = enrichedData[def.id] ?? null
    if (isEmptyValue(def.type, value) && !propertyTypeRendersWhenEmpty(def.type)) {
      return null
    }
    return (
      <PropertyBadge
        key={def.id}
        property={def}
        value={value}
        context="title"
        editable={false}
        pageData={enrichedData}
        propertyDefinitions={definitions}
        pageId={pageId}
        pageTypeSlug={pageTypeSlug}
      />
    )
  }

  return <div className="flex flex-wrap items-center gap-2">{bodyDefs.map(RenderBadge)}</div>
}
