"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { ArrowUp } from "lucide-react"
import type { ReactNode } from "react"

export const COMPOSER_TEXT =
  "max-h-48 min-h-10 resize-none rounded-none bg-transparent px-2 py-1.5 shadow-none focus-visible:[outline:none]"

const CARD =
  "flex flex-col gap-1 rounded-[1.75rem] border border-primary/10 p-2 transition-colors focus-within:border-primary/20"

export function ComposerBox({
  above,
  start,
  end,
  children,
}: {
  above?: ReactNode
  start?: ReactNode
  end: ReactNode
  children: ReactNode
}) {
  const plane = useSurface()
  return (
    <div className={cn(CARD, surfaceClass(plane + 1))}>
      {above}
      {children}
      <div className="flex items-center gap-2">
        {start}
        <div className="ml-auto flex items-center gap-2">{end}</div>
      </div>
    </div>
  )
}

export function ComposerSend({
  disabled,
  onClick,
  submits = false,
}: {
  disabled: boolean
  onClick?: () => void
  submits?: boolean
}) {
  return (
    <Button
      type={submits ? "submit" : "button"}
      variant="accent"
      size="icon-lg"
      className="rounded-full bg-accent text-surface-0"
      aria-label="Send"
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowUp className="size-5" />
    </Button>
  )
}
