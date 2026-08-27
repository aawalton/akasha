"use client"

import { Button } from "@shared/design-primitives/components/button"
import { cn } from "@shared/design-primitives/utils/cn"
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
