"use client"

import { cn } from "@akasha/design-primitives/cn"
import * as React from "react"

import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"

interface InputBadgeProps {
  value: string
  onChange: (value: string) => void
  onCommit?: (value: string) => void
  placeholder?: string
  variant?: BadgeVariant
  className?: string
}

function InputBadge({
  value,
  onChange,
  onCommit,
  placeholder,
  variant = "elevation-muted",
  className,
}: InputBadgeProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [focused, setFocused] = React.useState(false)

  const sizerRef = React.useRef<HTMLSpanElement>(null)
  const [inputWidth, setInputWidth] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    if (sizerRef.current) {
      setInputWidth(sizerRef.current.scrollWidth + 2)
    }
  }, [value, placeholder])

  const displayText = value.length > 0 ? value : (placeholder ?? "")

  return (
    <Badge
      variant={variant}
      className={cn(
        "cursor-text",
        focused && "[outline-offset:-1px] [outline:1.5px_solid_var(--color-accent)]",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {}
      <span
        ref={sizerRef}
        className="pointer-events-none invisible absolute whitespace-pre font-medium text-xs"
      >
        {displayText}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setFocused(true)
          requestAnimationFrame(() => inputRef.current?.select())
        }}
        onBlur={() => {
          setFocused(false)
          onCommit?.(value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            onCommit?.(value)
          }
        }}
        placeholder={placeholder}
        className="min-w-[3ch] bg-transparent font-medium text-current text-xs outline-none placeholder:text-current/40"
        style={inputWidth != null ? { width: `${inputWidth}px` } : undefined}
      />
    </Badge>
  )
}

export type { InputBadgeProps }
export { InputBadge }
