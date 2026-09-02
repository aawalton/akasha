"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { NumberBadge } from "@akasha/design-badges/number-badge"
import { InlineEditableText } from "@akasha/design-forms/inline-editable-text"
import { ItemCard } from "@akasha/design-patterns/item-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@akasha/design-primitives/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import { EllipsisVertical, Info, ShoppingCart } from "lucide-react"
import { memo, useEffect, useState } from "react"
import { RuleNotesDialog } from "../rule-notes-dialog/rule-notes-dialog.module.code.tsx"

interface BuyRuleCardProps {
  rule: BuyRule
  onUpdate: (
    ruleId: string,
    patch: Partial<
      Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
    >
  ) => void
  onRemove: (ruleId: string) => void
  onDuplicate: (ruleId: string) => void
  onLock: (ruleId: string, locked: boolean) => void
}

const SOURCE_LABEL = "Merchant"

export const BuyRuleCard = memo(function BuyRuleCard({
  rule,
  onUpdate,
  onRemove,
  onDuplicate,
  onLock,
}: BuyRuleCardProps) {
  const surface = useSurface()
  const isActive = rule.active === true
  const [optimisticLocked, setOptimisticLocked] = useState(rule.locked === true)
  useEffect(() => {
    setOptimisticLocked(rule.locked === true)
  }, [rule.locked])
  const isLocked = optimisticLocked
  const [notesDialogOpen, setNotesDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <>
      <ItemCard
        className={isActive ? undefined : "opacity-60"}
        renderContent={() => (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              {isLocked ? (
                rule.title != null && rule.title !== "" ? (
                  <span className="min-w-0 flex-1 truncate font-medium text-primary text-sm">
                    {rule.title}
                  </span>
                ) : (
                  <span className="min-w-0 flex-1" />
                )
              ) : (
                <InlineEditableText
                  value={rule.title ?? ""}
                  onChange={(v) =>
                    onUpdate(rule.id, { title: v.trim().length === 0 ? null : v.trim() })
                  }
                  placeholder="Add a title..."
                  className="min-w-0 flex-1 font-medium text-primary text-sm"
                />
              )}
              <button
                type="button"
                className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-primary/8"
                onClick={() => setNotesDialogOpen(true)}
                title={rule.notes != null ? "Edit notes" : "Add notes"}
                aria-label={rule.notes != null ? "Edit notes" : "Add notes"}
              >
                <Info
                  className={`h-3.5 w-3.5 ${rule.notes != null ? "text-secondary" : "text-tertiary"}`}
                />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-tertiary transition-colors hover:bg-primary/8"
                    aria-label="Rule actions"
                  >
                    <EllipsisVertical className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDuplicate(rule.id)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isLocked}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-1.5">
              <Text variant="description" className="font-medium text-primary">
                {rule.itemName}
              </Text>
            </div>
            <div
              className={isLocked ? "pointer-events-none" : undefined}
              inert={isLocked || undefined}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {isLocked ? (
                  <Badge variant={isActive ? "accent" : "elevation-muted"} className="shrink-0">
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                ) : (
                  <ButtonBadge
                    variant={isActive ? "accent" : "elevation-muted"}
                    className="shrink-0"
                    onClick={() => onUpdate(rule.id, { active: !isActive })}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </ButtonBadge>
                )}
                <ButtonBadge
                  variant="elevation-muted"
                  className="shrink-0"
                  onClick={() => {
                    setOptimisticLocked(!isLocked)
                    onLock(rule.id, !isLocked)
                  }}
                >
                  {isLocked ? "Locked" : "Unlocked"}
                </ButtonBadge>
                {}
                <Badge variant="elevation-muted" className="shrink-0">
                  <ShoppingCart className="size-3" />
                  {SOURCE_LABEL}
                </Badge>
                {}
                <NumberBadge
                  editable
                  value={rule.targetQuantity}
                  min={1}
                  max={99999}
                  onChange={(val) => onUpdate(rule.id, { targetQuantity: val })}
                  variant="accent"
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        )}
      />
      <RuleNotesDialog
        open={notesDialogOpen}
        onOpenChange={setNotesDialogOpen}
        notes={rule.notes}
        onSave={(notes) => onUpdate(rule.id, { notes })}
        readOnly={isLocked}
      />
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Buy Rule?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-secondary text-sm">
                <div>This will permanently delete this rule. This action cannot be undone.</div>
                <div className={`rounded-md ${surfaceClass(surface + 1)} px-3 py-2`}>
                  <span className="text-primary text-sm">
                    {rule.title != null && rule.title !== "" ? rule.title : rule.itemName} — Buy{" "}
                    {rule.targetQuantity} at {SOURCE_LABEL}
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction variant="destructive" onClick={() => onRemove(rule.id)}>
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})
