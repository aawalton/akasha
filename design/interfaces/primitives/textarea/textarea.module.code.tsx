"use client"

import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

function Textarea({ className, autoComplete = "off", ...props }: React.ComponentProps<"textarea">) {
  const surface = useSurface()

  return (
    <textarea
      data-slot="textarea"
      autoComplete={autoComplete}
      {...(autoComplete === "off" && {
        "data-1p-ignore": true,
        "data-lpignore": "true",
        "data-form-type": "other",
      })}
      className={cn(
        `field-sizing-content flex min-h-16 w-full rounded-md ${surfaceClass(surface + 1)} px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-tertiary disabled:cursor-not-allowed disabled:opacity-[0.38] aria-invalid:ring-secondary/30 md:text-sm focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]`,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
