"use client"

import { Badge } from "@akasha/design-badges/badge"
import { InlineEditableText } from "@akasha/design-forms/inline-editable-text"
import { PAGE_TITLE_CLASSES } from "@akasha/design-layout/page-layout-data"
import { LayoutLink as Link } from "@akasha/design-layout/router-context"
import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type { CharacterVisibility } from "@akasha/temper-character-build/build-types"
import { ChevronLeft, Copy, Eye, Search, Target } from "lucide-react"
import { BuildActionButtons } from "../build-action-buttons/build-action-buttons.module.code.tsx"

interface CharacterEditorHeaderProps {
  name: string
  nameReadOnly: boolean
  visibility: CharacterVisibility
  partnerBuildUrl: string | undefined
  isOwner: boolean
  readOnly: boolean
  browseHref: string | undefined
  isAuthenticated: boolean
  isSettingTarget: boolean
  onUpdateMeta: (updates: { name: string }) => void
  onSetTarget: () => void
  onRemix: () => void
  remixDisabled?: boolean
}

export function CharacterEditorHeader({
  name,
  nameReadOnly,
  visibility,
  partnerBuildUrl,
  isOwner,
  readOnly,
  browseHref,
  isAuthenticated,
  isSettingTarget,
  onUpdateMeta,
  onSetTarget,
  onRemix,
  remixDisabled,
}: CharacterEditorHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
          <Link href="/character-builds">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex min-w-0 items-center gap-3">
          {nameReadOnly ? (
            <h1 className={cn(PAGE_TITLE_CLASSES, "truncate")}>
              {name !== "" ? name : "Untitled Build"}
            </h1>
          ) : (
            <InlineEditableText
              value={name}
              onChange={(v) => onUpdateMeta({ name: v })}
              placeholder="Untitled Build"
              validate={(v) => (v.trim().length === 0 ? "Build name is required" : null)}
              className={PAGE_TITLE_CLASSES}
            />
          )}
          {visibility === "live" || visibility === "target" ? (
            partnerBuildUrl != null ? (
              <Badge variant="elevation" className="shrink-0 cursor-pointer" asChild>
                <Link
                  href={partnerBuildUrl}
                  title={visibility === "live" ? "Go to Target build" : "Go to Live build"}
                >
                  {visibility === "live" ? "Live" : "Target"}
                </Link>
              </Badge>
            ) : (
              <Badge variant="elevation" className="shrink-0">
                {visibility === "live" ? "Live" : "Target"}
              </Badge>
            )
          ) : !isOwner ? (
            <Badge variant="elevation-muted" className="shrink-0 gap-1">
              <Eye className="h-3 w-3" />
              View Only
            </Badge>
          ) : null}
        </div>
      </div>
      {readOnly ? (
        <div className="flex shrink-0 items-center gap-2">
          {browseHref != null && (
            <Button variant="secondary" size="sm" className={cn("gap-2", surfaceClass(1))} asChild>
              <Link href={browseHref}>
                <Search className="h-4 w-4" />
                <span className="@[1016px]:inline hidden">Browse</span>
              </Link>
            </Button>
          )}
          {isAuthenticated && visibility !== "live" && visibility !== "target" && (
            <Button
              variant="secondary"
              size="sm"
              className={cn("gap-2", surfaceClass(1), isSettingTarget && "cursor-wait")}
              disabled={isSettingTarget}
              onClick={onSetTarget}
            >
              <Target className="h-4 w-4" />
              <span className="@[1016px]:inline hidden">Set Target</span>
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            className={cn("gap-2", surfaceClass(1))}
            disabled={remixDisabled}
            onClick={onRemix}
          >
            <Copy className="h-4 w-4" />
            <span className="@[1016px]:inline hidden">Remix</span>
          </Button>
        </div>
      ) : (
        <BuildActionButtons
          onRemix={onRemix}
          browseHref={browseHref}
          remixDisabled={remixDisabled}
          onSetTarget={isAuthenticated && visibility !== "target" ? onSetTarget : undefined}
        />
      )}
    </div>
  )
}
