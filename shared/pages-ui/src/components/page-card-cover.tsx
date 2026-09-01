"use client"

import { Icon } from "@akasha/design-patterns/lucide-icon"
import { cn } from "@akasha/design-primitives/cn"

interface PageCardCoverProps {
  coverUrl?: string | null
  maskGlyph?: string | null
  iconName: string | null
  placeholderSurfaceClass: string
  onCoverClick?: () => void
}

export function PageCardCover({
  coverUrl,
  maskGlyph,
  iconName,
  placeholderSurfaceClass,
  onCoverClick,
}: PageCardCoverProps) {
  const imageUrl = maskGlyph == null && coverUrl != null && coverUrl !== "" ? coverUrl : null
  const bgStyle =
    imageUrl != null
      ? {
          backgroundImage: `url("${imageUrl.replace(/[\\"\n\r]/g, "\\$&")}")`,
        }
      : undefined
  const className =
    imageUrl != null
      ? "-mx-6 aspect-square w-[calc(100%+3rem)] overflow-hidden bg-center bg-cover bg-no-repeat"
      : cn(
          "-mx-6 flex aspect-square w-[calc(100%+3rem)] items-center justify-center overflow-hidden",
          placeholderSurfaceClass
        )
  const inner =
    maskGlyph != null ? (
      <span className="text-3xl text-tertiary">{maskGlyph}</span>
    ) : imageUrl == null && iconName != null ? (
      <Icon name={iconName} className="size-8 text-tertiary" />
    ) : null

  if (onCoverClick != null) {
    return (
      <button
        type="button"
        aria-label="Cover image"
        onClick={() => onCoverClick()}
        className={cn(className, "cursor-pointer", imageUrl != null && "block")}
        style={bgStyle}
      >
        {inner}
      </button>
    )
  }
  if (imageUrl != null) {
    return <div role="img" aria-label="Cover image" className={className} style={bgStyle} />
  }
  return maskGlyph != null ? (
    <div role="img" aria-label="Cover image" className={className}>
      {inner}
    </div>
  ) : (
    <div className={className}>{inner}</div>
  )
}
