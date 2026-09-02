"use client"

import { PANEL_CARD_WIDTH_CLASSES } from "@akasha/design-layout/panel-card-data"
import { IconPicker } from "@akasha/design-patterns/icon-picker"
import { Icon } from "@akasha/design-patterns/lucide-icon"
import { Card, CardContent, CardHeader, CardTitle } from "@akasha/design-primitives/card"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { IconName } from "@akasha/pages-core/generated/icon-search-index"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { expandDateMentions } from "@akasha/pages-core/view/expand-date-mentions"
import type { GalleryCardSize } from "@akasha/pages-core/view/gallery"
import { PagesUILink } from "@akasha/pages-ui/navigation-context"
import { PageActionsMenu } from "@akasha/pages-ui-components/page-actions-menu"
import { CheckCircle2, Circle } from "lucide-react"
import type * as React from "react"
import { type ReactNode, useMemo } from "react"
import { PageCardCover } from "../page-card-cover/page-card-cover.module.code.tsx"
import { PageCardProperties } from "../page-card-properties/page-card-properties.module.code.tsx"
import { useOverflowFade } from "../use-overflow-fade/use-overflow-fade.module.code.ts"

interface PageCardProps extends Omit<React.ComponentProps<"div">, "title" | "id"> {
  id: string
  definitions?: readonly PropertyDefinition[]
  data?: PageDataJSON
  pageTypeSlug?: string
  visiblePropertyIds?: readonly string[]
  alwaysShowPropertyIds?: readonly string[]
  onIconChange?: (icon: IconName) => void
  defaultIconName?: string | null
  onPropertyChange?: (propertyId: string, value: unknown, eventTimeStamp?: number) => void
  onCreateOption?: (propertyId: string, label: string) => void
  onPageNavigate?: (pageId: string) => void
  onRelationNavigate?: (propertyId: string) => void
  pageHref?: (pageId: string, opts?: { targetPageTypeId?: string }) => string
  relationHref?: (propertyId: string) => string
  onCardNavigate?: (pageId: string) => void
  onComplete?: (value: number | null) => void
  href?: string
  onDelete?: () => void
  onToggleFavorite?: (value: number | null) => void
  coverSize?: GalleryCardSize
  coverUrl?: string | null
  coverMaskGlyph?: string | null
  onCoverClick?: () => void
  notesSlot?: ReactNode
}

export function PageCard({
  id,
  definitions,
  data,
  pageTypeSlug,
  visiblePropertyIds,
  alwaysShowPropertyIds,
  onIconChange,
  defaultIconName,
  onPropertyChange,
  onCreateOption,
  onPageNavigate,
  onRelationNavigate,
  pageHref,
  relationHref,
  onCardNavigate,
  onComplete,
  href,
  onDelete,
  onToggleFavorite,
  coverSize,
  coverUrl,
  coverMaskGlyph,
  onCoverClick,
  notesSlot,
  className,
  ...props
}: PageCardProps) {
  const surface = useSurface()
  const isWide = coverSize != null || notesSlot != null
  const resolvedTitle = data?.title != null ? String(data.title) : "Untitled"
  const displayTitle = expandDateMentions(resolvedTitle)
  const ownIconName = data?.icon != null ? String(data.icon) : null
  const displayIconName = ownIconName ?? defaultIconName ?? null

  const hasCompletedAtDef = useMemo(
    () => definitions?.some((d) => d.id === "completedAt") ?? false,
    [definitions]
  )
  const isCompleted = data?.completedAt != null
  const showCompletionToggle = Boolean(onComplete) && hasCompletedAtDef
  const isFavorite = data?.favoritedAt != null

  const titleLinkFade = useOverflowFade<HTMLSpanElement>(displayTitle)
  const staticTitleFade = useOverflowFade<HTMLSpanElement>(displayTitle)

  return (
    <Card
      id={id}
      data-page-id={id}
      className={cn(isWide ? "w-full gap-3" : PANEL_CARD_WIDTH_CLASSES, className)}
      {...props}
    >
      {}
      <CardHeader className={cn("items-start", isWide && "-mx-3 -mt-3")}>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-3">
            {showCompletionToggle && (
              <button
                type="button"
                aria-label={isCompleted ? "Uncomplete" : "Complete"}
                className="shrink-0 cursor-pointer text-tertiary transition-colors hover:text-primary"
                onClick={() => onComplete?.(isCompleted ? null : Date.now())}
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-4.5 text-success" />
                ) : (
                  <Circle className="size-4.5" />
                )}
              </button>
            )}
            <CardTitle
              className={cn(
                "min-w-0 flex-1 flex-nowrap overflow-hidden font-medium text-md",
                isCompleted && showCompletionToggle && "line-through opacity-60"
              )}
            >
              {!showCompletionToggle &&
                (onIconChange ? (
                  <IconPicker value={displayIconName} onChange={onIconChange} />
                ) : (
                  displayIconName != null && (
                    <Icon name={displayIconName} className="size-5 shrink-0" />
                  )
                ))}
              {href != null ? (
                <span
                  ref={titleLinkFade.ref}
                  className="min-w-0 flex-1 overflow-hidden whitespace-nowrap"
                  style={titleLinkFade.style}
                >
                  <PagesUILink href={href} onClick={(e) => e.stopPropagation()}>
                    {displayTitle}
                  </PagesUILink>
                </span>
              ) : (
                <span
                  ref={staticTitleFade.ref}
                  className="min-w-0 flex-1 overflow-hidden whitespace-nowrap"
                  style={staticTitleFade.style}
                >
                  {displayTitle}
                </span>
              )}
            </CardTitle>
            <PageActionsMenu
              href={href}
              isFavorite={isFavorite}
              onToggleFavorite={
                onToggleFavorite != null
                  ? () => onToggleFavorite(isFavorite ? null : Date.now())
                  : undefined
              }
              onDelete={onDelete}
            />
          </div>
        </div>
      </CardHeader>
      {}
      {coverSize != null && (
        <PageCardCover
          coverUrl={coverUrl}
          maskGlyph={coverMaskGlyph}
          iconName={displayIconName}
          placeholderSurfaceClass={surfaceClass(surface + 1)}
          onCoverClick={onCoverClick}
        />
      )}
      {}
      {notesSlot != null && notesSlot}
      {}
      <CardContent className={cn("flex flex-1 flex-col space-y-4", isWide && "-mx-3 -mb-3")}>
        <PageCardProperties
          definitions={definitions}
          data={data}
          pageId={id}
          pageTypeSlug={pageTypeSlug}
          visiblePropertyIds={visiblePropertyIds}
          alwaysShowPropertyIds={alwaysShowPropertyIds}
          onPropertyChange={onPropertyChange}
          onPageNavigate={onPageNavigate}
          onRelationNavigate={onRelationNavigate}
          pageHref={pageHref}
          relationHref={relationHref}
          onCardNavigate={onCardNavigate ? () => onCardNavigate(id) : undefined}
        />
      </CardContent>
    </Card>
  )
}
