"use client"

import { EmptyBadge } from "@akasha/design-badges/empty-badge"
import { resolveComputedProperty } from "@akasha/pages-core/property-types/resolve-computed-type"
import {
  type PageTypePropertiesMap,
  parseRollupConfig,
} from "@akasha/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import type * as React from "react"

export function ComputedPropertyBadge(props: PropertyBadgeProps) {
  const { property, value, lookup } = props

  if (!lookup) return <EmptyBadge />

  const map: PageTypePropertiesMap = new Map()
  const resolved = resolveComputedProperty(property, "", map)

  const downstream: PropertyBadgeProps = { ...props, editable: false, onPropertyChange: undefined }

  let body: React.ReactNode
  if (
    resolved.type === property.type &&
    (resolved.type === "rollup" || resolved.type === "aggregate" || resolved.type === "formula")
  ) {
    if (value === null || value === undefined || value === "") {
      body = <EmptyBadge />
    } else {
      const TextBadge = lookup("text")
      const required = { id: property.id, title: property.title, type: "text", config: {} } as const
      const textProperty = required satisfies PropertyDefinition
      body = <TextBadge {...downstream} property={textProperty} value={String(value)} />
    }
  } else {
    const Component = lookup(resolved.type)
    body = <Component {...downstream} property={resolved} />
  }

  const navTarget = resolveRollupNavTarget(props)
  if (navTarget === null) return body

  const { relatedPageId, targetPageTypeId } = navTarget
  const cursorOverride = "cursor-pointer [&_[data-slot=badge]]:cursor-pointer"
  if (props.pageHref) {
    const href = props.pageHref(relatedPageId, { targetPageTypeId })
    return (
      <a href={href} className={cursorOverride} onClick={(e) => e.stopPropagation()}>
        {body}
      </a>
    )
  }
  if (props.onPageNavigate) {
    const onPageNavigate = props.onPageNavigate
    return (
      <button
        type="button"
        className={cursorOverride}
        onClick={(e) => {
          e.stopPropagation()
          onPageNavigate(relatedPageId)
        }}
      >
        {body}
      </button>
    )
  }
  return body
}

interface RollupNavTarget {
  readonly relatedPageId: string
  readonly targetPageTypeId: string | undefined
}

function resolveRollupNavTarget(props: PropertyBadgeProps): RollupNavTarget | null {
  if (props.property.type !== "rollup") return null
  const config = parseRollupConfig(props.property.config)
  if (config === null) return null
  const relValue = props.pageData?.[config.relationPropertyId]
  if (typeof relValue !== "string") return null
  const relationDef = props.propertyDefinitions?.find((d) => d.id === config.relationPropertyId)
  if (relationDef?.type !== "relation") return null
  const rawTargetPageTypeId = relationDef.config?.targetPageTypeId
  const targetPageTypeId = typeof rawTargetPageTypeId === "string" ? rawTargetPageTypeId : undefined
  return { relatedPageId: relValue, targetPageTypeId }
}
