"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "akasha/design/interface/primitive/modules/sheet/sheet.module.code.tsx"
import { Menu } from "lucide-react"
import { type CSSProperties, type ReactNode, useState } from "react"

const READING_AREA: CSSProperties = {
  top: "calc(var(--safe-area-top) + 2.75rem + 1px)",
  bottom: "var(--safe-area-bottom)",
  height: "auto",
}

export function AwenStatusDrawer({ statusPanels }: { statusPanels: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-[584px]:hidden">
      <Button
        type="button"
        variant="tertiary"
        size="icon"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-y-auto" style={READING_AREA}>
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
