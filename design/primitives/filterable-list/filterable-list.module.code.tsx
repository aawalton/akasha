"use client"

import { Check, SearchIcon } from "lucide-react"
import {
  createContext,
  type KeyboardEventHandler,
  type ReactNode,
  type RefCallback,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

interface ListFilterContextValue {
  filterText: string
  setFilterText: (next: string) => undefined
  registerItem: (id: string, getText: () => string) => undefined
  unregisterItem: (id: string) => undefined
  itemCount: number
  isFiltered: (id: string) => boolean
  showFilter: boolean
}

const ListFilterContext = createContext<ListFilterContextValue | null>(null)

export function ListFilterProvider({
  filterThreshold = 6,
  children,
}: {
  filterThreshold?: number
  children: ReactNode
}) {
  const [filterText, setFilterText] = useState("")
  const itemsRef = useRef<Map<string, () => string>>(new Map())
  const [itemCount, setItemCount] = useState(0)

  const registerItem = useCallback((id: string, getText: () => string): undefined => {
    itemsRef.current.set(id, getText)
    setItemCount(itemsRef.current.size)
  }, [])

  const unregisterItem = useCallback((id: string): undefined => {
    itemsRef.current.delete(id)
    setItemCount(itemsRef.current.size)
  }, [])

  const isFiltered = useCallback(
    (id: string): boolean => {
      if (filterText === "") return false
      const getText = itemsRef.current.get(id)
      if (!getText) return false
      return !getText().toLowerCase().includes(filterText.toLowerCase())
    },
    [filterText]
  )

  const showFilter = filterThreshold > 0 && itemCount > filterThreshold

  const setFilterTextValue = useCallback((next: string): undefined => {
    setFilterText(next)
  }, [])

  const value = useMemo<ListFilterContextValue>(
    () => ({
      filterText,
      setFilterText: setFilterTextValue,
      registerItem,
      unregisterItem,
      itemCount,
      isFiltered,
      showFilter,
    }),
    [
      filterText,
      setFilterTextValue,
      registerItem,
      unregisterItem,
      itemCount,
      isFiltered,
      showFilter,
    ]
  )

  return <ListFilterContext.Provider value={value}>{children}</ListFilterContext.Provider>
}

export function useListFilterItem<T extends HTMLElement = HTMLElement>(): {
  ref: RefCallback<T>
  hidden: boolean
} {
  const ctx = useContext(ListFilterContext)
  const id = useId()
  const nodeRef = useRef<T | null>(null)

  const getText = useCallback(() => nodeRef.current?.textContent ?? "", [])

  useEffect(() => {
    if (!ctx) return
    ctx.registerItem(id, getText)
    return () => ctx.unregisterItem(id)
  }, [ctx, id, getText])

  const ref = useCallback((node: T | null) => {
    nodeRef.current = node
  }, [])

  if (!ctx) return { ref, hidden: false }
  return { ref, hidden: ctx.isFiltered(id) }
}

export function FilterTextField({
  value,
  onChange,
  onKeyDown,
  autoFocus = false,
  placeholder = "Filter...",
  ariaLabel,
  className,
}: {
  value: string
  onChange: (next: string) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  autoFocus?: boolean
  placeholder?: string
  ariaLabel?: string
  className?: string
}) {
  const surface = useSurface()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-accent px-2 py-1",
        surfaceClass(surface + 1),
        className
      )}
      data-slot="filter-field"
    >
      <SearchIcon className="size-3.5 shrink-0 text-tertiary" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full min-w-0 bg-transparent text-primary text-sm outline-none placeholder:text-tertiary"
        autoComplete="off"
        data-slot="filter-field-input"
      />
    </div>
  )
}

export function ListFilterInput({
  onKeyDown,
  className,
}: {
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  className?: string
}) {
  const ctx = useContext(ListFilterContext)
  const surface = useSurface()
  const showFilter = ctx?.showFilter ?? false

  if (!ctx || !showFilter) return null

  return (
    <div
      className={cn("sticky top-0 z-10 pb-1.5", surfaceClass(surface), className)}
      data-slot="list-filter"
    >
      <FilterTextField
        value={ctx.filterText}
        onChange={ctx.setFilterText}
        onKeyDown={onKeyDown}
        autoFocus
      />
    </div>
  )
}

export function FilterableList({
  filterThreshold = 6,
  className,
  inputKeyDown,
  children,
}: {
  filterThreshold?: number
  className?: string
  inputKeyDown?: KeyboardEventHandler<HTMLInputElement>
  children: ReactNode
}) {
  return (
    <ListFilterProvider filterThreshold={filterThreshold}>
      <div className={cn("flex flex-col gap-1", className)} data-slot="filterable-list">
        <ListFilterInput onKeyDown={inputKeyDown} />
        {children}
      </div>
    </ListFilterProvider>
  )
}

export function FilterableListItem({
  selected = false,
  onSelect,
  className,
  children,
}: {
  selected?: boolean
  onSelect?: () => void
  className?: string
  children: ReactNode
}) {
  const { ref, hidden } = useListFilterItem<HTMLButtonElement>()
  return (
    <button
      ref={ref}
      type="button"
      data-slot="filterable-list-item"
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-secondary text-sm transition-colors hover:bg-hover hover:text-primary",
        className
      )}
      {...(hidden ? { style: { display: "none" }, "aria-hidden": true } : {})}
    >
      <span className="flex-1">{children}</span>
      {selected && <Check className="size-4 shrink-0 text-tertiary" />}
    </button>
  )
}
