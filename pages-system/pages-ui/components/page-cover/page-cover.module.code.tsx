"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { Input } from "@akasha/design-primitives/input"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { DegradingImage } from "@akasha/pages-ui-components/degrading-image"
import { ImagePlus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

interface PageCoverProps {
  coverUrl: string | null
  onChange: (url: string | null) => void
}

function CoverUrlForm({ initial, onSubmit }: { initial: string; onSubmit: (url: string) => void }) {
  const [draft, setDraft] = useState(initial)
  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed.length === 0) return
    onSubmit(trimmed)
  }
  return (
    <div className="flex flex-col gap-2">
      <Input
        autoFocus
        value={draft}
        placeholder="Paste image URL…"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            commit()
          }
        }}
      />
      <Button variant="secondary" size="sm" onClick={commit} disabled={draft.trim().length === 0}>
        Save cover
      </Button>
    </div>
  )
}

export function PageCover({ coverUrl, onChange }: PageCoverProps) {
  const [replaceOpen, setReplaceOpen] = useState(false)
  const surface = useSurface()

  if (coverUrl == null) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="tertiary" size="sm" className="self-start text-tertiary">
            <ImagePlus />
            Add cover
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80">
          <CoverUrlForm initial="" onSubmit={(url) => onChange(url)} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-md">
      <DegradingImage
        src={coverUrl}
        alt="Page cover"
        className="block h-auto w-full rounded-md"
        fallback={
          <div
            className={cn(
              "flex aspect-video w-full items-center justify-center rounded-md",
              surfaceClass(surface + 1)
            )}
          >
            <ImagePlus className="size-8 text-tertiary" />
          </div>
        }
      />
      <div
        className={cn(
          "absolute top-2 right-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100",
          replaceOpen && "opacity-100"
        )}
      >
        <Popover open={replaceOpen} onOpenChange={setReplaceOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">
              <Pencil />
              Replace
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <CoverUrlForm
              initial={coverUrl}
              onSubmit={(url) => {
                onChange(url)
                setReplaceOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
        <Button variant="destructive" size="sm" onClick={() => onChange(null)}>
          <Trash2 />
          Remove
        </Button>
      </div>
    </div>
  )
}
