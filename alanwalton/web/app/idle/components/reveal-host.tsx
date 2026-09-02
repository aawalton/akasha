"use client"

import { Icon } from "@akasha/design-patterns/lucide-icon"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { cn } from "@akasha/design-primitives/cn"
import { DegradingImage } from "@akasha/pages-ui-components/degrading-image"
import { useSyncExternalStore } from "react"
import { StarRow } from "~/idle/components/star-row"
import type { DrawReveal } from "@akasha/idle-system/draw"
import { clearReveal, getRevealSnapshot, subscribeReveal } from "~/idle/lib/reveal-store"
import "./reveal-host.css"

function imageSrc(id: string): string {
  return `/api/image/${id}`
}

export function RevealCallout({
  reveal,
  onDismiss,
}: {
  reveal: DrawReveal
  onDismiss: () => void
}) {
  const surface = useSurface()
  const headline = reveal.isNewImage ? "New variant!" : "Duplicate → +fuel"
  return (
    <div className={cn("reveal-callout", surfaceClass(surface + 1))}>
      <div className="reveal-cover">
        <DegradingImage
          src={imageSrc(reveal.image)}
          alt={reveal.name}
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Icon name="image" className="size-6 text-tertiary" />
            </div>
          }
        />
      </div>
      <div className="reveal-body">
        <div className="reveal-name">{reveal.name}</div>
        <div className="reveal-headline">
          {headline}
          {reveal.starUp && <span className="reveal-starup"> ★ up!</span>}
        </div>
        <StarRow stars={reveal.stars} />
      </div>
      <button type="button" className="reveal-dismiss" onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  )
}

export function RevealHost() {
  const reveal = useSyncExternalStore(subscribeReveal, getRevealSnapshot, () => null)
  if (reveal === null) return null
  return (
    <div className="reveal-host">
      <RevealCallout reveal={reveal} onDismiss={clearReveal} />
    </div>
  )
}
