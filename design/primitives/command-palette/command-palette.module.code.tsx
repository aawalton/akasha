"use client"

import type * as React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "../cn/cn.module.code.ts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../dialog/dialog.module.code.tsx"
import { FilterTextField } from "../filterable-list/filterable-list.module.code.tsx"
import { PALETTE_ONLY } from "../keyboard-registry/keyboard-registry.module.code.ts"
import { filterDescriptorsByLabel } from "../shortcut-surfaces/shortcut-surfaces.module.code.ts"
import {
  triggerBinding,
  useKeyboardBinding,
  useKeyboardBindingDescriptors,
  useShortcutsEnabled,
} from "../use-keyboard-registry/use-keyboard-registry.module.code.ts"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const descriptors = useKeyboardBindingDescriptors()
  const [shortcutsEnabled, setShortcutsEnabled] = useShortcutsEnabled()
  const restoreRef = useRef<HTMLElement | null>(null)

  useKeyboardBinding({
    id: "house.command-palette",
    chord: "Mod+K",
    label: "Open command palette",
    layer: "conventional",
    onTrigger: () => {
      restoreRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      setQuery("")
      setActiveIndex(0)
      setOpen(true)
    },
  })

  useKeyboardBinding({
    id: "conventional.toggle-shortcuts",
    chord: PALETTE_ONLY,
    label: shortcutsEnabled ? "Disable keyboard shortcuts" : "Enable keyboard shortcuts",
    layer: "conventional",
    group: "Accessibility",
    onTrigger: () => setShortcutsEnabled(!shortcutsEnabled),
  })

  useEffect(() => {
    if (!open && restoreRef.current !== null) {
      restoreRef.current.focus()
      restoreRef.current = null
    }
  }, [open])

  const matches = filterDescriptorsByLabel(descriptors, query)
  const active = matches.length === 0 ? -1 : Math.min(activeIndex, matches.length - 1)

  function run(id: string): undefined {
    setOpen(false)
    triggerBinding(id)
  }

  function onSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>): undefined {
    if (matches.length === 0) return
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((active + 1) % matches.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((active - 1 + matches.length) % matches.length)
    } else if (event.key === "Enter") {
      event.preventDefault()
      const selected = matches[active]
      if (selected !== undefined) run(selected.id)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="gap-2 p-2"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search for an action to run, then press Enter.
        </DialogDescription>
        <FilterTextField
          value={query}
          onChange={(next) => {
            setQuery(next)
            setActiveIndex(0)
          }}
          onKeyDown={onSearchKeyDown}
          autoFocus
          placeholder="Search commands…"
          ariaLabel="Search commands"
        />
        <div
          role="listbox"
          aria-label="Commands"
          className="flex max-h-[360px] flex-col gap-0.5 overflow-y-auto"
        >
          {matches.length === 0 ? (
            <div className="py-6 text-center text-sm text-tertiary">No matching commands</div>
          ) : (
            matches.map((descriptor, index) => (
              <button
                key={descriptor.id}
                type="button"
                role="option"
                aria-selected={index === active}
                data-slot="command-palette-item"
                onClick={() => run(descriptor.id)}
                onMouseMove={() => setActiveIndex(index)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-secondary text-sm",
                  index === active && "bg-primary/12 text-primary"
                )}
              >
                <span className="flex-1">{descriptor.label}</span>
                <span className="ml-auto text-tertiary text-xs tracking-widest">
                  {descriptor.display}
                </span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
