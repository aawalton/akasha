"use client"

import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { useBadgeLayoutContext } from "akasha/design/interfaces/badges/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PropertyValue } from "akasha/page/core/property-types/modules/property-type-ops/property-type-ops.module.code.ts"
import { parseConfig } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { relationConfigSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import { PageBadge } from "akasha/page/ui/components/modules/page-badge/page-badge.module.code.tsx"
import type { PropertyBadgeProps } from "akasha/page/ui/components/modules/property-badge/property-badge.module.code.tsx"
import {
  getRelationId,
  type RelationValue,
  resolveRelationName,
  resolveRelationVariant,
} from "akasha/page/ui/components/modules/relation-display/relation-display.module.code.ts"
import { RelationPopover } from "akasha/page/ui/components/modules/relation-popover/relation-popover.module.code.tsx"
import {
  type PageResolverValue,
  usePageResolverOptional,
} from "akasha/page/ui/contexts/modules/page-resolver-context/page-resolver-context.module.code.tsx"

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
        <PageBadge
          pageId={getRelationId(relValue)}
          label={resolveRelationName(resolver, relValue)}
          variant={variant}
          pageTypeId={targetPageTypeId}
        />
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
  return (
    <PageBadge
      pageId={relId}
      label={resolveRelationName(resolver, relValue)}
      variant={variant}
      pageTypeId={targetPageTypeId}
      href={pageHref ? pageHref(relId, { targetPageTypeId }) : undefined}
      onClick={(e) => {
        e.stopPropagation()
        if (!pageHref) onPageNavigate?.(relId)
      }}
    />
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
  const { targetPageTypeId } = parseConfig(relationConfigSchema, property.config, {})

  const badge = hasValue ? (
    <PageBadge
      pageId={getRelationId(relValue)}
      label={resolveRelationName(resolver, relValue)}
      variant={resolveRelationVariant(resolver, relValue, property.accent)}
      pageTypeId={targetPageTypeId}
    />
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

export function Drawing(props: PropertyBadgeProps) {
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
