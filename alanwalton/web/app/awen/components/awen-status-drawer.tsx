"use client"

import { Button } from "@akasha/design-primitives/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@akasha/design-primitives/sheet"
import { Menu } from "lucide-react"
import { type ReactNode, useState } from "react"

export function AwenStatusDrawer({ statusPanels }: { statusPanels: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-[584px]:hidden">
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-y-auto">
          <div className="flex flex-col gap-4">
            <SheetTitle className="px-1 font-mono text-tertiary text-xs uppercase tracking-[0.2em]">
              Menu
            </SheetTitle>
            <SheetDescription className="sr-only">Game status panels.</SheetDescription>
            <div className="flex flex-col gap-4">{statusPanels}</div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
