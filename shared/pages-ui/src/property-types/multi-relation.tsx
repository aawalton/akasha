"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { useBadgeLayoutContext } from "@shared/design-badges/components/badge-layout-context"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { LinkBadge } from "@shared/design-badges/components/link-badge"
import {
  getRelationId,
  type RelationValue,
  resolveRelationName,
  resolveRelationVariant,
} from "../components/page-properties-shared"
import { RelationPopover } from "../components/relation-popover"
import { usePageResolverOptional } from "../contexts/page-resolver"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { parseConfig } from "@shared/pages-core/schema/pages"
import { multiRelationConfigSchema } from "@shared/pages-core/schema/property-config-schemas"
import type { PropertyBadgeProps } from "./property-badge"
import type { PropertyValue } from "./types"

function colClassFor(align: "start" | "end"): string {
  return align === "start" ? "flex flex-col items-start gap-1" : "flex flex-col items-end gap-1"
}

function toRelationValues(value: PropertyValue): readonly RelationValue[] {
  if (!Array.isArray(value)) return []
  return value.filter(
    (v): v is RelationValue =>
      typeof v === "string" || (typeof v === "object" && v != null && "id" in v)
  )
}

function MultiRelationDetailPopover({
  value,
  definition,
  onPropertyChange,
  onPageNavigate,
  children,
}: {
  value: PropertyValue
  definition: PropertyDefinition
  onPropertyChange: (propertyId: string, value: PropertyValue) => void
  onPageNavigate?: (pageId: string) => void
  children: React.ReactNode
}) {
  const layout = useBadgeLayoutContext()
  const align = layout.popoverAlign ?? "end"
  const colClass = colClassFor(align)
  const resolver = usePageResolverOptional()
  const relValues = toRelationValues(value)
  const ids = relValues.map(getRelationId)

  if (!resolver) {
    return <span className={colClass}>{children}</span>
  }

  const { targetPageTypeId } = parseConfig(multiRelationConfigSchema, definition.config, {})
  return (
    <RelationPopover
      currentIds={ids}
      targetPageTypeId={targetPageTypeId}
      resolver={resolver}
      onAdd={(id) => onPropertyChange(definition.id, [...ids, id])}
      onRemove={(id) =>
        onPropertyChange(
          definition.id,
          ids.filter((x) => x !== id)
        )
      }
      onPageNavigate={onPageNavigate}
      align={align}
    >
      <span className={colClass}>{children}</span>
    </RelationPopover>
  )
}

function MultiRelationDetailBadges({
  value,
  definition,
}: {
  value: PropertyValue
  definition: PropertyDefinition
}) {
  const resolver = usePageResolverOptional()
  const relValues = toRelationValues(value)

  if (relValues.length === 0) {
    return (
      <Badge key={definition.id} variant="elevation-muted">
        <span className="text-tertiary">Empty</span>
      </Badge>
    )
  }

  return (
    <>
      {relValues.map((rv) => {
        const id = getRelationId(rv)
        const name = resolveRelationName(resolver, rv)
        return (
          <Badge
            key={`${definition.id}-${id}`}
            variant={resolveRelationVariant(resolver, rv, definition.accent)}
          >
            {name}
          </Badge>
        )
      })}
    </>
  )
}

export function MultiRelationPropertyBadge(props: PropertyBadgeProps) {
  const { property, value, context } = props
  const layout = useBadgeLayoutContext()

  if (context === "card") {
    const relValues = toRelationValues(value)
    if (relValues.length === 0) return null
    const variant = property.accent ? ("accent" as const) : ("elevation-muted" as const)
    if (props.relationHref) {
      return (
        <LinkBadge
          variant={variant}
          href={props.relationHref(property.id)}
          onClick={(e) => e.stopPropagation()}
        >
          {`${relValues.length} ${property.title}`}
        </LinkBadge>
      )
    }
    return (
      <ButtonBadge
        variant={variant}
        onClick={(e) => {
          e.stopPropagation()
          props.onRelationNavigate?.(property.id)
        }}
      >
        {`${relValues.length} ${property.title !== "" ? property.title : "Untitled Property"}`}
      </ButtonBadge>
    )
  }

  if (props.editable && props.onPropertyChange) {
    const onPropertyChange = props.onPropertyChange
    return (
      <MultiRelationDetailPopover
        value={value}
        definition={property}
        onPropertyChange={onPropertyChange}
        onPageNavigate={props.onPageNavigate}
      >
        <MultiRelationDetailBadges value={value} definition={property} />
      </MultiRelationDetailPopover>
    )
  }
  return (
    <span className={colClassFor(layout.popoverAlign ?? "end")}>
      <MultiRelationDetailBadges value={value} definition={property} />
    </span>
  )
}
