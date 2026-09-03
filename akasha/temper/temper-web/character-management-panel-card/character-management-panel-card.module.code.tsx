"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
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
import { Button } from "@akasha/design-primitives/button"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useCharacter } from "@akasha/temper-characters-character-ui/use-characters"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { useState } from "react"
import { toast } from "sonner"
import { VersionHistoryDialog } from "../version-history-dialog/version-history-dialog.module.code.tsx"

interface CharacterManagementPanelCardProps {
  buildId: BuildId
  buildName: string
  className?: string
}

export function CharacterManagementPanelCard({
  buildId,
  buildName,
  className,
}: CharacterManagementPanelCardProps) {
  const surface = useSurface()
  const router = usePagesUIRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteBuild } = useCharacter(buildId)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteBuild()
      router.push("/character-builds")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete character")
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleVersionRestored = () => {
    window.location.reload()
  }

  return (
    <>
      <PanelCard
        id="character-management"
        collapsible
        title="Build Management"
        className={className}
      >
        <div className="flex flex-wrap justify-between gap-2">
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            Delete Build
          </Button>
          <Button variant="secondary" onClick={() => setShowVersionHistory(true)}>
            Version History
          </Button>
        </div>
      </PanelCard>

      <VersionHistoryDialog
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
        buildId={buildId}
        onVersionRestored={handleVersionRestored}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Build?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{buildName !== "" ? buildName : "Untitled Build"}
              &quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-between">
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className={isDeleting ? "disabled:cursor-wait" : undefined}
            >
              {isDeleting ? "Deleting..." : "Delete Build"}
            </AlertDialogAction>
            <AlertDialogCancel disabled={isDeleting} className={surfaceClass(surface + 1)}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
