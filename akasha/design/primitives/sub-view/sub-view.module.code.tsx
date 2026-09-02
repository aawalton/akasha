"use client"

import { ChevronLeft } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "../cn/cn.module.code.ts"
import { Heading } from "../heading/heading.module.code.tsx"

export function SubView({
  title,
  onBack,
  className,
  children,
}: {
  title: ReactNode
  onBack: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)} data-slot="sub-view">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer rounded p-1 text-tertiary transition-colors hover:text-primary"
          aria-label="Back"
        >
          <ChevronLeft className="size-4" />
        </button>
        <Heading variant="label">{title}</Heading>
      </div>
      {children}
    </div>
  )
}
