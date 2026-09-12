import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { Skeleton } from "akasha/design/interfaces/primitives/skeleton/skeleton.module.code.tsx"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonTextVariants = cva("flex flex-col", {
  variants: {
    gap: {
      tight: "gap-1.5",
      normal: "gap-2",
      loose: "gap-3",
    },
  },
  defaultVariants: {
    gap: "normal",
  },
})

type SkeletonTextProps = {
  lines?: number
  shortenLast?: boolean
  className?: string
} & VariantProps<typeof skeletonTextVariants>

function SkeletonText({ lines = 3, shortenLast = true, gap, className }: SkeletonTextProps) {
  return (
    <div data-slot="skeleton-text" className={cn(skeletonTextVariants({ gap }), className)}>
      {Array.from({ length: lines }, (_, i) => {
        const isLast = i === lines - 1
        const shouldShorten = isLast && shortenLast && lines > 1
        return <Skeleton key={i} className={cn("h-4", shouldShorten ? "w-[60%]" : "w-full")} />
      })}
    </div>
  )
}

export { SkeletonText }
