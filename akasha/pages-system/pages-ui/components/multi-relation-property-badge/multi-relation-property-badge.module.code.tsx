"use client"

import { Badge } from "@akasha/design-badges/badge"
import { useBadgeLayoutContext } from "@akasha/design-badges/badge-layout-context"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { LinkBadge } from "@akasha/design-badges/link-badge"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import { multiRelationConfigSchema } from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { usePageResolverOptional } from "@akasha/pages-ui/contexts/page-resolver-context"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import {
  getRelationId,
  type RelationValue,
  resolveRelationName,
  resolveRelationVariant,
} from "@akasha/pages-ui-components/relation-display"
import { RelationPopover } from "@akasha/pages-ui-components/relation-popover"

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
