"use client"

import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { TableCell } from "akasha/design/interface/primitive/modules/table/table.module.code.tsx"
import { readsAsDone } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import { expandDateMentions } from "akasha/page/core/view/modules/expand-date-mentions/expand-date-mentions.module.code.ts"
import { orderTableColumns } from "akasha/page/ui/component/modules/card-property-columns/card-property-columns.module.code.ts"
import { PageActionsMenu } from "akasha/page/ui/component/modules/page-actions-menu/page-actions-menu.module.code.tsx"
import type { PageRowCellsProps } from "akasha/page/ui/component/modules/page-row-cells/page-row-cells.module.code.tsx"
import { PropertyBadge } from "akasha/page/ui/component/modules/property-badge/property-badge.module.code.tsx"
import { CheckCircle2, Circle } from "lucide-react"

export function Drawing({
  data,
  definitions,
  visibleProperties,
  rowHref,
  pageHref,
  relationHref,
  onPropertyChange,
  completion,
  onComplete,
  isFavorite,
  onToggleFavorite,
  onDelete,
}: PageRowCellsProps) {
  const columns = orderTableColumns(definitions, visibleProperties ?? [])
  const resolvedTitle = data.title != null ? String(data.title) : "Untitled"
  const displayTitle = expandDateMentions(resolvedTitle)
  const iconName = data.icon != null ? String(data.icon) : null
  const isCompleted = completion != null && readsAsDone(completion, data)
  const showCompletionToggle = Boolean(onComplete) && completion != null
  const showActions = onToggleFavorite != null || onDelete != null

  return (
    <>
      {columns.map((col) =>
        col.isTitle ? (
          <TableCell
            key={col.id}
            className="overflow-hidden text-left font-medium font-sans text-primary"
          >
            <span className="flex min-w-0 items-center gap-2">
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
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <Circle className="size-4" />
                  )}
                </button>
              )}
              <a
                href={rowHref}
                className={cn(
                  "flex min-w-0 items-center gap-2 hover:text-accent",
                  isCompleted && showCompletionToggle && "line-through opacity-60"
                )}
              >
                {!showCompletionToggle && iconName != null && (
                  <Icon name={iconName} className="size-4 shrink-0" />
                )}
                <span className="truncate">{displayTitle}</span>
              </a>
            </span>
          </TableCell>
        ) : (
          <TableCell key={col.id} className="overflow-hidden text-left font-sans">
            <PropertyBadge
              property={col.def}
              value={data[col.def.id] ?? null}
              context="card"
              editable={onPropertyChange != null}
              pageData={data}
              propertyDefinitions={definitions}
              onPropertyChange={onPropertyChange}
              pageHref={pageHref}
              relationHref={relationHref}
            />
          </TableCell>
        )
      )}
      {showActions && (
        <TableCell className="text-right align-middle">
          <PageActionsMenu
            href={rowHref !== "" ? rowHref : undefined}
            isFavorite={isFavorite}
            onToggleFavorite={
              onToggleFavorite != null
                ? () => onToggleFavorite(isFavorite === true ? null : Date.now())
                : undefined
            }
            onDelete={onDelete}
            align="end"
          />
        </TableCell>
      )}
    </>
  )
}
