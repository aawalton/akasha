"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Skeleton } from "@akasha/design-primitives/skeleton"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import * as React from "react"
import { useAppShellOptional } from "../app-shell-context/app-shell-context.module.code.tsx"
import {
  type ColumnLayout,
  createGenericLayout,
} from "../column-layout/column-layout.module.code.ts"
import {
  getPageWidth,
  PAGE_TITLE_CLASSES,
} from "../page-layout-data/page-layout-data.module.code.ts"
import { ResponsiveColumnsSkeleton } from "../responsive-columns-skeleton/responsive-columns-skeleton.module.code.tsx"
import { useColumnCount } from "../use-column-count/use-column-count.module.code.tsx"

interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export function PageTitle({ children, className }: PageTitleProps) {
  return <h1 className={cn(PAGE_TITLE_CLASSES, className)}>{children}</h1>
}

function PageTitleBadges({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-title-badges"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

const RESPONSIVE_PAGE_WIDTH = "max-w-[520px] @[1016px]:max-w-[1016px] @[1512px]:max-w-[1512px]"

const PageLayoutContext = React.createContext<number>(Number.POSITIVE_INFINITY)

function useMaxColumns(): number {
  return React.useContext(PageLayoutContext)
}

export interface PageLayoutSkeletonConfig {
  content: ColumnLayout | Record<string, ColumnLayout>

  header?: {
    titleWidth?: number
    showMobileBackButton?: boolean
    actionButtons?: number
  }

  filterBar?: {
    buttonCount?: number
  }

  hasTabs?: boolean

  initialTab?: string

  defaultTab?: string
}

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  skeleton?: PageLayoutSkeletonConfig
  loading?: boolean
  maxColumns?: number
}

function PageLayoutRoot({
  children,
  className,
  skeleton,
  loading,
  maxColumns = Number.POSITIVE_INFINITY,
}: PageLayoutProps) {
  const columnCount = useColumnCount()

  if ((columnCount === null || loading) && skeleton) {
    return (
      <div className={cn("min-h-screen", surfaceClass(0), className)}>
        <PageLayoutSkeleton config={skeleton} />
      </div>
    )
  }

  return (
    <PageLayoutContext.Provider value={maxColumns}>
      <div className={cn("min-h-screen", surfaceClass(0), className)}>{children}</div>
    </PageLayoutContext.Provider>
  )
}

function isColumnLayout(value: ColumnLayout | Record<string, ColumnLayout>): value is ColumnLayout {
  return 1 in value && 2 in value && 3 in value
}

export function PageLayoutSkeleton({ config }: { config: PageLayoutSkeletonConfig }) {
  const titleWidth = config.header?.titleWidth ?? 192
  const showMobileBackButton = config.header?.showMobileBackButton ?? false
  const actionButtons = config.header?.actionButtons ?? 0
  const filterBarButtonCount = config.filterBar?.buttonCount ?? 3

  const firstTabKey = isColumnLayout(config.content) ? undefined : Object.keys(config.content)[0]
  const layout = isColumnLayout(config.content)
    ? config.content
    : (config.content[config.initialTab ?? ""] ??
      config.content[config.defaultTab ?? ""] ??
      (firstTabKey !== undefined ? config.content[firstTabKey] : undefined) ??
      createGenericLayout())

  return (
    <>
      {}
      <div className={cn("mx-auto w-full px-6 pt-6", RESPONSIVE_PAGE_WIDTH)}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            {showMobileBackButton && <Skeleton className="h-8 w-8 min-[584px]:hidden" />}
            <Skeleton className="h-8" style={{ width: titleWidth }} />
          </div>
          {actionButtons > 0 && (
            <div className="flex shrink-0 items-center gap-2">
              {}
              <div className="@[640px]:flex hidden items-center gap-2">
                {Array.from({ length: actionButtons }).map((_, i) => (
                  <Skeleton key={i} className="h-8 @[1016px]:w-20 w-8 before:hidden" />
                ))}
              </div>
              {}
              <Skeleton className="@[640px]:hidden h-8 w-8 before:hidden" />
            </div>
          )}
        </div>
      </div>

      {}
      {config.hasTabs && (
        <div
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 pb-(--safe-area-bottom)",
            surfaceClass(2),
            "min-[584px]:relative min-[584px]:mx-auto min-[584px]:bg-transparent min-[584px]:px-6 min-[584px]:pt-6 min-[584px]:pb-0",
            "w-full",
            RESPONSIVE_PAGE_WIDTH
          )}
        >
          <Skeleton className="h-[var(--tab-bar-height)] w-full before:hidden" radius="lg" />
        </div>
      )}

      {}
      <div
        className={cn(
          "mx-auto w-full px-6 pt-6 pb-[var(--content-clearance-tabs)] min-[584px]:pb-8",
          RESPONSIVE_PAGE_WIDTH
        )}
      >
        <div className="flex flex-col gap-6">
          {}
          {config.hasTabs && (
            <div className="flex items-center gap-4">
              <Skeleton className="h-7 w-24" />
              {config.filterBar && (
                <div className="ml-auto flex shrink-0 items-center gap-2">
                  {Array.from({ length: filterBarButtonCount }).map((_, i) => (
                    <Skeleton key={i} className="size-9" />
                  ))}
                </div>
              )}
            </div>
          )}

          <ResponsiveColumnsSkeleton layout={layout} />
        </div>
      </div>
    </>
  )
}

interface PageHeaderProps {
  children: React.ReactNode
  className?: string
}

function PageHeader({ children, className }: PageHeaderProps) {
  const columnCount = useColumnCount()
  const maxColumns = useMaxColumns()
  const effectiveCols = columnCount != null ? Math.min(columnCount, maxColumns) : undefined

  return (
    <div
      data-slot="page-header"
      className={cn(
        "mx-auto w-full px-6 pt-6",
        effectiveCols == null && RESPONSIVE_PAGE_WIDTH,
        className
      )}
      style={effectiveCols != null ? { maxWidth: getPageWidth(effectiveCols) } : undefined}
    >
      {children}
    </div>
  )
}

interface PageTabsProps {
  children: React.ReactNode
  className?: string
}

function PageTabs({ children, className }: PageTabsProps) {
  const columnCount = useColumnCount()
  const maxColumns = useMaxColumns()
  const effectiveCols = columnCount != null ? Math.min(columnCount, maxColumns) : undefined
  const shell = useAppShellOptional()

  return (
    <div
      className={cn(
        shell?.hasBottomNav
          ? "relative mx-auto bg-transparent px-6 pt-6"
          : cn(
              "fixed inset-x-0 bottom-0 z-50 pb-(--safe-area-bottom)",
              surfaceClass(2),
              "min-[584px]:relative min-[584px]:mx-auto min-[584px]:bg-transparent min-[584px]:px-6 min-[584px]:pt-6 min-[584px]:pb-0"
            ),
        "w-full",
        effectiveCols == null && RESPONSIVE_PAGE_WIDTH,
        className
      )}
      style={effectiveCols != null ? { maxWidth: getPageWidth(effectiveCols) } : undefined}
    >
      {children}
    </div>
  )
}

interface PageContentProps {
  children: React.ReactNode
  className?: string
}

function PageContent({ children, className }: PageContentProps) {
  const columnCount = useColumnCount()
  const maxColumns = useMaxColumns()
  const effectiveCols = columnCount != null ? Math.min(columnCount, maxColumns) : undefined
  const shell = useAppShellOptional()

  return (
    <div
      className={cn(
        "mx-auto w-full px-6 pt-6",
        shell?.hasBottomNav
          ? "pb-[var(--content-clearance-bottom-nav)]"
          : "pb-[var(--content-clearance-tabs)] min-[584px]:pb-8",
        effectiveCols == null && RESPONSIVE_PAGE_WIDTH,
        className
      )}
      style={effectiveCols != null ? { maxWidth: getPageWidth(effectiveCols) } : undefined}
    >
      {children}
    </div>
  )
}

export { PageContent, PageHeader, PageTabs, PageTitleBadges }

export const PageLayout = Object.assign(PageLayoutRoot, {
  Header: PageHeader,
  Tabs: PageTabs,
  Content: PageContent,
})
