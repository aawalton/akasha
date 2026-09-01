"use client"

import { Button } from "@akasha/design-primitives/button"
import { surfaceClass } from "@akasha/design-primitives/surface-class"

export function AlertControls({
  needsPermissionPrompt,
  onEnable,
}: {
  needsPermissionPrompt: boolean
  onEnable: () => void
}) {
  if (!needsPermissionPrompt) return null
  return (
    <div
      className={`fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-lg px-3 py-2 shadow-lg ${surfaceClass(2)}`}
    >
      <span className="font-mono text-tertiary text-xs">Get notified of new turns?</span>
      <Button size="sm" variant="accent" onClick={onEnable}>
        Enable alerts
      </Button>
    </div>
  )
}
