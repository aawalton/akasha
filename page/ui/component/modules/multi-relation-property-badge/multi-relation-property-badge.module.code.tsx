"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  stackedBadgesClass,
  useBadgeLayoutContext,
} from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { LinkBadge } from "akasha/design/interface/badge/modules/link-badge/link-badge.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-type/modules/property-type-ops/property-type-ops.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { multiRelationConfigSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import { PageBadge } from "akasha/page/ui/component/modules/page-badge/page-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import {
  getRelationId,
  type RelationValue,
  resolveRelationName,
  resolveRelationPageId,
  resolveRelationVariant,
} from "akasha/page/ui/component/modules/relation-display/relation-display.module.code.ts"
import { RelationPopover } from "akasha/page/ui/component/modules/relation-popover/relation-popover.module.code.tsx"
import { usePageResolverOptional } from "akasha/page/ui/context/modules/page-resolver-context/page-resolver-context.module.code.tsx"

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
  const colClass = stackedBadgesClass(align)
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

  const { targetPageTypeId } = parseConfig(multiRelationConfigSchema, definition.config, {})
  return (
    <>
      {relValues.map((rv) => {
        const id = getRelationId(rv)
        return (
          <PageBadge
            key={`${definition.id}-${id}`}
            pageId={resolveRelationPageId(resolver, rv)}
            label={resolveRelationName(resolver, rv)}
            variant={resolveRelationVariant(resolver, rv, definition.accent)}
            pageTypeId={targetPageTypeId}
          />
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
    <span className={stackedBadgesClass(layout.popoverAlign ?? "end")}>
      <MultiRelationDetailBadges value={value} definition={property} />
    </span>
  )
}
