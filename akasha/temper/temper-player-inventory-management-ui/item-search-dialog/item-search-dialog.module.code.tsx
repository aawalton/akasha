"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@akasha/design-primitives/command"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { useDebouncedValue } from "@akasha/design-primitives/use-debounced-value"
import type { MinedItemSearchResult } from "@akasha/temper-items-core/item-tooltip-types"
import { useEffect, useState } from "react"

interface ItemSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (item: MinedItemSearchResult) => void
  title?: string
}

export function ItemSearchDialog({
  open,
  onOpenChange,
  onSelect,
  title = "Search Items",
}: ItemSearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<MinedItemSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebouncedValue(query, 300)

  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults([])
      setError(null)
    }
  }, [open])

  useEffect(() => {
    const trimmed = debouncedQuery.trim()

    if (trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    setIsLoading(true)
    setError(null)

    async function loadResults(): Promise<MinedItemSearchResult[]> {
      const res = await fetch(`/api/items/search?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
      if (!res.ok) throw new Error("Request failed")
      return res.json()
    }

    loadResults()
      .then((data) => {
        setResults(data)
        setIsLoading(false)
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return
        setError("Failed to load results.")
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [debouncedQuery])

  const trimmedQuery = query.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-panel">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Command shouldFilter={false}>
            <CommandInput placeholder="Type to search..." value={query} onValueChange={setQuery} />
            <CommandList className="h-96">
              {isLoading && <CommandEmpty>Searching...</CommandEmpty>}
              {!isLoading && trimmedQuery.length < 2 && (
                <CommandEmpty>Type at least 2 characters to search.</CommandEmpty>
              )}
              {!isLoading && error != null && <CommandEmpty>Failed to load results.</CommandEmpty>}
              {!isLoading && error == null && trimmedQuery.length >= 2 && results.length === 0 && (
                <CommandEmpty>No items found.</CommandEmpty>
              )}
              {!isLoading && error == null && results.length > 0 && (
                <CommandGroup>
                  {results.map((item) => (
                    <CommandItem
                      key={item.itemId}
                      value={item.name}
                      onSelect={() => {
                        onSelect(item)
                        onOpenChange(false)
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{item.name}</span>
                        {item.setName != null && (
                          <span className="text-secondary text-xs">{item.setName}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
