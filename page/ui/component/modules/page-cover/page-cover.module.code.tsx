"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { DegradingImage } from "akasha/page/ui/component/modules/degrading-image/degrading-image.module.code.tsx"
import { ImagePlus } from "lucide-react"

export function PageCover({ coverUrl }: { coverUrl: string | null }) {
  const surface = useSurface()

  if (coverUrl == null) return null

  return (
    <div className="overflow-hidden rounded-md">
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
    </div>
  )
}
