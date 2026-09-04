"use client"

import { Badge } from "@akasha/design-badges/badge"
import { useBadgeLayoutContext } from "@akasha/design-badges/badge-layout-context"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { LinkBadge } from "@akasha/design-badges/link-badge"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import { parseConfig } from "@akasha/pages-core/schema/pages"
import { relationConfigSchema } from "@akasha/pages-core/schema/property-config-schemas"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import {
  type PageResolverValue,
  usePageResolverOptional,
} from "@akasha/pages-ui/contexts/page-resolver-context"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import {
  getRelationId,
  type RelationValue,
  resolveRelationName,
  resolveRelationVariant,
} from "@akasha/pages-ui-components/relation-display"
import { RelationPopover } from "@akasha/pages-ui-components/relation-popover"

function isRelationObject(value: unknown): value is { id: string; title: string } {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("id" in value) || typeof value.id !== "string") return false
  if (!("title" in value) || typeof value.title !== "string") return false
  return true
}

function toRelationValue(value: unknown): RelationValue | undefined {
  if (typeof value === "string") return value
  if (isRelationObject(value)) return { id: value.id, title: value.title }
  return undefined
}

function RelationEditableBadge({
  property,
  resolver,
  currentIds,
  onPropertyChange,
  onPageNavigate,
  align,
  children,
}: {
  property: PropertyDefinition
  resolver: PageResolverValue
  currentIds: readonly string[]
  onPropertyChange: (propertyId: string, value: PropertyValue) => void
  onPageNavigate?: (pageId: string) => void
  align: "start" | "end"
  children: React.ReactNode
}) {
  const { targetPageTypeId } = parseConfig(relationConfigSchema, property.config, {})
  return (
    <RelationPopover
      currentIds={currentIds}
      targetPageTypeId={targetPageTypeId}
      resolver={resolver}
      onAdd={(id) => onPropertyChange(property.id, id)}
      onRemove={() => onPropertyChange(property.id, null)}
      onPageNavigate={onPageNavigate}
      align={align}
    >
      {children}
    </RelationPopover>
  )
}

function RelationCardBadgeBody({
  relValue,
  property,
  targetPageTypeId,
  pageHref,
  onPageNavigate,
  editable,
  onPropertyChange,
}: {
  relValue: RelationValue | undefined
  property: PropertyDefinition
  targetPageTypeId?: string
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  onPageNavigate?: (pageId: string) => void
  editable?: boolean
  onPropertyChange?: (propertyId: string, value: PropertyValue) => void
}) {
  const layout = useBadgeLayoutContext()
  const resolver = usePageResolverOptional()
  const variant =
    relValue !== undefined
      ? resolveRelationVariant(resolver, relValue, property.accent)
      : ("elevation-muted" as const)

  if (editable && onPropertyChange && resolver) {
    const currentIds = relValue !== undefined ? [getRelationId(relValue)] : []
    const inner =
      relValue !== undefined ? (
        <Badge variant={variant}>{resolveRelationName(resolver, relValue)}</Badge>
      ) : (
        <Badge variant="elevation-muted">
          <span className="text-tertiary">Empty</span>
        </Badge>
      )
    return (
      <RelationEditableBadge
        property={property}
        resolver={resolver}
        currentIds={currentIds}
        onPropertyChange={onPropertyChange}
        onPageNavigate={onPageNavigate}
        align={layout.popoverAlign ?? "start"}
      >
        {inner}
      </RelationEditableBadge>
    )
  }

  if (relValue === undefined) return null
  const relId = getRelationId(relValue)
  const label = resolveRelationName(resolver, relValue)

  if (pageHref) {
    return (
      <LinkBadge
        variant={variant}
        href={pageHref(relId, { targetPageTypeId })}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </LinkBadge>
    )
  }
  return (
    <ButtonBadge
      variant={variant}
      onClick={(e) => {
        e.stopPropagation()
        onPageNavigate?.(relId)
      }}
    >
      {label}
    </ButtonBadge>
  )
}

function RelationDetailBody({
  value,
  property,
  editable,
  onPropertyChange,
  onPageNavigate,
}: {
  value: unknown
  property: PropertyDefinition
  editable?: boolean
  onPropertyChange?: (propertyId: string, value: PropertyValue) => void
  onPageNavigate?: (pageId: string) => void
}) {
  const layout = useBadgeLayoutContext()
  const resolver = usePageResolverOptional()
  const relValue = toRelationValue(value)
  const hasValue = relValue !== undefined
  const currentIds = hasValue ? [getRelationId(relValue)] : []

  const badge = hasValue ? (
    <Badge variant={resolveRelationVariant(resolver, relValue, property.accent)}>
      {resolveRelationName(resolver, relValue)}
    </Badge>
  ) : (
    <Badge variant="elevation-muted">
      <span className="text-tertiary">Empty</span>
    </Badge>
  )

  if (editable && onPropertyChange && resolver) {
    return (
      <RelationEditableBadge
        property={property}
        resolver={resolver}
        currentIds={currentIds}
        onPropertyChange={onPropertyChange}
        onPageNavigate={onPageNavigate}
        align={layout.popoverAlign ?? "end"}
      >
        {badge}
      </RelationEditableBadge>
    )
  }
  return badge
}

export function RelationPropertyBadge(props: PropertyBadgeProps) {
  const { property, value, context } = props

  if (context === "card") {
    const relValue = toRelationValue(value)
    const { targetPageTypeId } = parseConfig(relationConfigSchema, property.config, {})
    return (
      <RelationCardBadgeBody
        relValue={relValue}
        property={property}
        targetPageTypeId={targetPageTypeId}
        pageHref={props.pageHref}
        onPageNavigate={props.onPageNavigate}
        editable={props.editable}
        onPropertyChange={props.onPropertyChange}
      />
    )
  }

  return (
    <RelationDetailBody
      value={value}
      property={property}
      editable={props.editable}
      onPropertyChange={props.onPropertyChange}
      onPageNavigate={props.onPageNavigate}
    />
  )
}
