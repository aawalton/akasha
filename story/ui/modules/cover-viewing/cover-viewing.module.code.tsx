"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { PageCover } from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import { type ReactNode, useState } from "react"

type CoverDialogProps = {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly name: string
  readonly whole: string
  readonly children?: ReactNode
}

export function CoverDialog({ open, onOpenChange, name, whole, children }: CoverDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        variant="bare"
        showCloseButton
        className="max-h-[95vh] w-auto items-center sm:max-w-[95vw] [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-black/60 [&>[data-slot=dialog-close]]:p-2 [&>[data-slot=dialog-close]]:text-white"
      >
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <div className="relative">
          <img
            src={whole}
            alt={name}
            className="block max-h-[95vh] max-w-[95vw] rounded-md object-contain"
          />
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

type ZoomableCoverProps = {
  readonly name: string
  readonly source: string
  readonly whole: string
}

export function ZoomableCover({ name, source, whole }: ZoomableCoverProps) {
  const [viewing, setViewing] = useState(false)
  return (
    <>
      <CoverDialog open={viewing} onOpenChange={setViewing} name={name} whole={whole} />
      <button
        type="button"
        aria-label={`View ${name} full size`}
        className="block w-full cursor-zoom-in rounded-md"
        onClick={() => setViewing(true)}
      >
        <PageCover coverUrl={source} />
      </button>
    </>
  )
}
