"use client"

import { PANEL_CARD_WIDTH_CLASSES } from "akasha/design/interface/layout/modules/panel-card-data/panel-card-data.module.code.ts"
import { IconPicker } from "akasha/design/interface/pattern/modules/icon-picker/icon-picker.module.code.tsx"
import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { readsAsDone } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import { expandDateMentions } from "akasha/page/core/view/modules/expand-date-mentions/expand-date-mentions.module.code.ts"
import { PageActionsMenu } from "akasha/page/ui/component/modules/page-actions-menu/page-actions-menu.module.code.tsx"
import type { PageCardProps } from "akasha/page/ui/component/modules/page-card/page-card.module.code.tsx"
import { PageCardCover } from "akasha/page/ui/component/modules/page-card-cover/page-card-cover.module.code.tsx"
import { PageCardProperties } from "akasha/page/ui/component/modules/page-card-properties/page-card-properties.module.code.tsx"
import { useOverflowFade } from "akasha/page/ui/component/modules/use-overflow-fade/use-overflow-fade.module.code.ts"
import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { CheckCircle2, Circle } from "lucide-react"
import { useMemo } from "react"

export function Drawing({
  id,
  definitions,
  data,
  pageTypeSlug,
  visiblePropertyIds,
  alwaysShowPropertyIds,
  onIconChange,
  defaultIconName,
  onPropertyChange,
  onPageNavigate,
  onRelationNavigate,
  pageHref,
  relationHref,
  onCardNavigate,
  completion,
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

  const isCompleted = useMemo(
    () => (completion == null || data == null ? false : readsAsDone(completion, data)),
    [completion, data]
  )
  const showCompletionToggle = Boolean(onComplete) && completion != null
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
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  e.nativeEvent.stopImmediatePropagation()
                  onComplete?.(isCompleted ? null : Date.now())
                }}
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
