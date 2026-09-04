"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@akasha/design-primitives/card"
import { cn } from "@akasha/design-primitives/cn"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@akasha/design-primitives/collapsible"
import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { PANEL_CARD_WIDTH_CLASSES } from "../panel-card-data/panel-card-data.module.code.ts"
import {
  usePanelDefaultOpen,
  usePanelIsSummary,
} from "../panel-default-open-context/panel-default-open-context.module.code.tsx"
import {
  usePanelToggle,
  usePanelToggleIsLocal,
} from "../panel-toggle-context/panel-toggle-context.module.code.tsx"

export interface PanelCardProps extends Omit<React.ComponentProps<"div">, "title" | "id" | "ref"> {
  id: string
  collapsible?: boolean
  collapseProtected?: boolean
  title?: React.ReactNode
  headerSubtitle?: React.ReactNode
  headerActions?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  forceMount?: boolean
}

export function PanelCard({
  collapsible = false,
  collapseProtected,
  id,
  title,
  headerSubtitle,
  headerActions,
  defaultOpen,
  open,
  onOpenChange,
  forceMount,
  className,
  children,
  ...props
}: PanelCardProps) {
  const contextDefaultOpen = usePanelDefaultOpen()
  const resolvedDefault = defaultOpen ?? contextDefaultOpen ?? false
  const isLocalToggleScope = usePanelToggleIsLocal()
  const isSummary = usePanelIsSummary()
  const effectiveCollapseProtected = collapseProtected || isSummary

  const [internalOpen, setInternalOpen] = useState(resolvedDefault)
  const panelToggle = usePanelToggle()
  const lastToggleGenRef = useRef(0)

  useLayoutEffect(() => {
    if (lastToggleGenRef.current === panelToggle.generation && panelToggle.generation > 0) return
    if (open === undefined) {
      setInternalOpen(defaultOpen ?? contextDefaultOpen ?? false)
    }
  }, [defaultOpen, contextDefaultOpen, open])

  useEffect(() => {
    if (!collapsible || panelToggle.generation === 0) return
    if (effectiveCollapseProtected && panelToggle.action === "collapse-all") return
    lastToggleGenRef.current = panelToggle.generation
    const newOpen = panelToggle.action === "expand-all"
    if (open === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [panelToggle.generation, panelToggle.action])

  const isOpen = open !== undefined ? open : internalOpen
  const handleOpenChange = (newOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  if (!collapsible) {
    return (
      <Card id={id} className={cn(PANEL_CARD_WIDTH_CLASSES, className)} {...props}>
        {title != null ? (
          <>
            <CardHeader className="items-start">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="min-w-0 flex-1 text-lg">{title}</CardTitle>
                  {headerActions != null && <div className="shrink-0">{headerActions}</div>}
                </div>
                {headerSubtitle != null && <div className="pb-2">{headerSubtitle}</div>}
              </div>
            </CardHeader>
            {children != null && (
              <CardContent className="flex flex-1 flex-col space-y-4">{children}</CardContent>
            )}
          </>
        ) : (
          children
        )}
      </Card>
    )
  }

  return (
    <Collapsible
      id={id}
      open={isOpen}
      onOpenChange={handleOpenChange}
      data-global-toggle={
        collapsible && !effectiveCollapseProtected && !isLocalToggleScope ? "" : undefined
      }
    >
      <Card className={cn(PANEL_CARD_WIDTH_CLASSES, className)} {...props}>
        <CardHeader className="items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 bg-transparent text-left"
                >
                  <CardTitle className="min-w-0 flex-1 text-lg">{title}</CardTitle>
                </button>
              </CollapsibleTrigger>
              {headerActions != null && <div className="shrink-0">{headerActions}</div>}
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  aria-label={isOpen ? "Collapse panel" : "Expand panel"}
                  className="shrink-0 cursor-pointer bg-transparent"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-tertiary transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              </CollapsibleTrigger>
            </div>
            {headerSubtitle != null && (
              <div className={cn("pb-2", !isOpen && "hidden")}>{headerSubtitle}</div>
            )}
          </div>
        </CardHeader>
        <CollapsibleContent
          className={cn("flex flex-1 flex-col", forceMount && "data-[state=closed]:hidden")}
          forceMount={forceMount || undefined}
        >
          <CardContent className="flex flex-1 flex-col space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
