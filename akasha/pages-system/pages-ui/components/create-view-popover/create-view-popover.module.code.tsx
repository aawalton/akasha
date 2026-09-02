"use client"

import { Button } from "@akasha/design-primitives/button"
import { Input } from "@akasha/design-primitives/input"
import { Label } from "@akasha/design-primitives/label"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import { defaultViewData, stripLockedFacet } from "@akasha/pages-core/schema/view-data"
import { Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface CreateViewPopoverProps {
  currentViewData?: ViewDataJSON
  onCreate: (name: string, data: ViewDataJSON) => void
}

export function CreateViewPopover({ currentViewData, onCreate }: CreateViewPopoverProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [open])

  const reset = () => {
    setName("")
  }

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      reset()
    }
    setOpen(v)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() === "") return

    onCreate(name.trim(), stripLockedFacet({ ...defaultViewData(), ...currentViewData }))
    setOpen(false)
    reset()
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-[calc(100%-1px)] shrink-0 cursor-pointer items-center justify-center rounded-md px-2 text-tertiary transition-colors hover:bg-primary/8 hover:text-primary focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          aria-label="Create view"
        >
          <Plus className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-64 data-[state=closed]:[&_input]:caret-transparent"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="cv-name" className="font-medium text-sm">
              Save as view
            </Label>
            <Input
              ref={inputRef}
              id="cv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") e.stopPropagation()
              }}
              placeholder="View name"
              required
              name="view-name-new"
            />
            <Button
              variant="accent"
              type="submit"
              size="sm"
              disabled={name.trim() === ""}
              className="self-end"
            >
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
