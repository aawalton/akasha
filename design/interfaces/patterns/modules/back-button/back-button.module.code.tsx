"use client"

import { Button } from "akasha/design/interfaces/primitives/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
  href: string
  className?: string
}

export function BackButton({ href, className }: BackButtonProps) {
  return (
    <Button
      variant="tertiary"
      size="icon-sm"
      asChild
      className={cn("min-[584px]:hidden", className)}
    >
      <a href={href}>
        <ChevronLeft className="h-4 w-4" />
      </a>
    </Button>
  )
}
