"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@akasha/design-forms/input-group"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface SearchButtonProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchButton({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchButtonProps) {
  const surface = useSurface()
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasValue = value.length > 0

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [expanded])

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" || e.key === "Enter") {
      setExpanded(false)
    }
  }

  function handleContainerKeyDown(e: React.KeyboardEvent) {
    if (!expanded && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      setExpanded(true)
    }
  }

  function handleBlur() {
    setExpanded(false)
  }

  function handleClear(e: React.MouseEvent) {
    e.preventDefault()
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <InputGroup
      role={expanded ? "group" : "button"}
      tabIndex={expanded ? -1 : 0}
      onClick={!expanded ? () => setExpanded(true) : undefined}
      onKeyDown={handleContainerKeyDown}
      aria-label="Search"
      className={cn(
        `overflow-hidden ${surfaceClass(surface + 1)} transition-[width] duration-200 ease-out`,
        "has-[[data-slot=input-group-control]:focus-visible]:[outline:none]",
        expanded ? "w-panel-half cursor-text" : "w-9 cursor-pointer",
        hasValue && !expanded && "bg-accent/15",
        className
      )}
    >
      <InputGroupAddon className={cn("shrink-0 pl-2.5", hasValue && !expanded && "text-accent")}>
        <Search />
      </InputGroupAddon>

      <InputGroupInput
        ref={inputRef}
        tabIndex={expanded ? 0 : -1}
        aria-hidden={!expanded}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleInputKeyDown}
        onBlur={handleBlur}
        className={cn(
          "transition-opacity duration-150",
          expanded ? "opacity-100 delay-100" : "opacity-0"
        )}
      />

      {value !== "" && expanded && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onMouseDown={handleClear} aria-label="Clear search">
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
