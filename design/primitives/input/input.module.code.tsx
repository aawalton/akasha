"use client"

import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

function stripLeadingZeros(value: string): string {
  if (value === "") return value

  if (value === "0") return value

  if (value.startsWith("0.")) return value

  return value.replace(/^0+(\d)/, "$1")
}

function Input({
  className,
  type,
  readOnly,
  onChange,
  autoComplete = "off",
  ...props
}: React.ComponentProps<"input">) {
  const surface = useSurface()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const strippedValue = stripLeadingZeros(e.target.value)
      e.target.value = strippedValue
    }

    onChange?.(e)
  }

  return (
    <input
      type={type}
      data-slot="input"
      autoComplete={autoComplete}
      {...(autoComplete === "off" && {
        "data-1p-ignore": true,
        "data-lpignore": "true",
        "data-form-type": "other",
      })}
      className={cn(
        `h-9 w-full min-w-0 rounded-md ${surfaceClass(surface + 1)} px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-accent/15 selection:text-accent file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-primary file:text-sm placeholder:text-tertiary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[0.38] md:text-sm`,
        "focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]",
        "aria-invalid:ring-secondary/30",
        type === "number" && "text-left",
        readOnly && "cursor-default select-none focus-visible:outline-none",
        className
      )}
      readOnly={readOnly}
      onChange={handleChange}
      {...props}
    />
  )
}

export { Input }
