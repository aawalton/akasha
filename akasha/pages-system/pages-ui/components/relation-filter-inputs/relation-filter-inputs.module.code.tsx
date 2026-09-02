"use client"

import { InputBadge } from "@akasha/design-badges/input-badge"
import {
  SearchMultiSelect,
  type SearchMultiSelectItem,
} from "@akasha/design-forms/search-multi-select"
import { useDebouncedValue } from "@akasha/design-primitives/use-debounced-value"
import type { FilterOperator } from "@akasha/pages-core/property-types/types"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import type { PageFilterDimension } from "@akasha/pages-core/view/generate-filter-dimensions"
import { usePageResolverOptional } from "@akasha/pages-ui/contexts/page-resolver-context"
import { useRelationPicker } from "@akasha/pages-ui/contexts/relation-picker-context"
import { toStringArray } from "@akasha/pages-ui-components/value-filter-inputs"
import { useMemo, useState } from "react"

const RELATION_SEARCH_DEBOUNCE_MS = 200

function LoadMoreFooter(picker: {
  canLoadMore: boolean
  isLoading: boolean
  loadMore: () => void
}) {
  if (!picker.canLoadMore && !picker.isLoading) return null
  return (
    <div className="border-surface-3 border-t px-2 py-1.5">
      {picker.isLoading ? (
        <span className="text-tertiary text-xs">Loading…</span>
      ) : (
        <button
          type="button"
          className="w-full rounded px-2 py-1 text-left text-accent text-xs hover:bg-surface-4"
          onClick={() => picker.loadMore()}
        >
          Load more
        </button>
      )}
    </div>
  )
}

export function RelationValueInput({
  dimension,
  operator,
  value,
  onChange,
}: {
  dimension: PageFilterDimension
  operator: FilterOperator
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const resolver = usePageResolverOptional()
  const [searchValue, setSearchValue] = useState("")
  const [open, setOpen] = useState(false)
  const debouncedSearch = useDebouncedValue(searchValue, RELATION_SEARCH_DEBOUNCE_MS)

  const picker = useRelationPicker(dimension.targetPageTypeId, {
    searchTerm: debouncedSearch,
    enabled: open,
  })

  const items: SearchMultiSelectItem[] = useMemo(
    () => picker.pages.map((p) => ({ value: p.id, label: p.title })),
    [picker.pages]
  )

  const isSingle = operator === "equals" || operator === "not_equals"

  const selected: SearchMultiSelectItem[] = useMemo(() => {
    const byId = new Map(items.map((i) => [i.value, i]))
    const resolveOne = (id: string): SearchMultiSelectItem => {
      const hit = byId.get(id)
      if (hit) return hit
      const title = resolver?.resolve(id)?.title ?? id
      return { value: id, label: title }
    }
    if (isSingle) {
      return typeof value === "string" ? [resolveOne(value)] : []
    }
    return toStringArray(value).map(resolveOne)
  }, [items, value, isSingle, resolver])

  if (!resolver) {
    return (
      <RelationFallbackInput
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
        placeholder="Page ID..."
      />
    )
  }

  return (
    <SearchMultiSelect
      items={items}
      value={selected}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onOpenChange={setOpen}
      size="badge"
      collapseOnSelect={isSingle}
      onSelect={(sel) => {
        if (isSingle) {
          const last = sel[sel.length - 1]
          onChange(last?.value ?? undefined)
        } else {
          onChange(sel.length > 0 ? sel.map((s) => s.value) : undefined)
        }
      }}
      footer={LoadMoreFooter(picker)}
    />
  )
}

export function MultiRelationValueInput({
  dimension,
  value,
  onChange,
}: {
  dimension: PageFilterDimension
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const resolver = usePageResolverOptional()
  const [searchValue, setSearchValue] = useState("")
  const [open, setOpen] = useState(false)
  const debouncedSearch = useDebouncedValue(searchValue, RELATION_SEARCH_DEBOUNCE_MS)

  const picker = useRelationPicker(dimension.targetPageTypeId, {
    searchTerm: debouncedSearch,
    enabled: open,
  })

  const items: SearchMultiSelectItem[] = useMemo(
    () => picker.pages.map((p) => ({ value: p.id, label: p.title })),
    [picker.pages]
  )

  const ids: readonly string[] = toStringArray(value)

  const selected: SearchMultiSelectItem[] = useMemo(() => {
    const byId = new Map(items.map((i) => [i.value, i]))
    return ids.map((id) => {
      const hit = byId.get(id)
      if (hit) return hit
      const title = resolver?.resolve(id)?.title ?? id
      return { value: id, label: title }
    })
  }, [items, ids, resolver])

  if (!resolver) {
    return (
      <MultiRelationFallbackInput value={Array.isArray(value) ? value : []} onChange={onChange} />
    )
  }

  return (
    <SearchMultiSelect
      items={items}
      value={selected}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onOpenChange={setOpen}
      size="badge"
      onSelect={(sel) => {
        onChange(sel.length > 0 ? sel.map((s) => s.value) : undefined)
      }}
      footer={LoadMoreFooter(picker)}
    />
  )
}

function RelationFallbackInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: ReadonlyJSONValue | undefined) => void
  placeholder: string
}) {
  const [local, setLocal] = useState(value)

  return (
    <InputBadge
      value={local}
      onChange={setLocal}
      onCommit={(v) => onChange(v !== "" ? v : undefined)}
      placeholder={placeholder}
    />
  )
}

function MultiRelationFallbackInput({
  value,
  onChange,
}: {
  value: readonly ReadonlyJSONValue[]
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const [local, setLocal] = useState(toStringArray(value).join(", "))

  return (
    <InputBadge
      value={local}
      onChange={setLocal}
      onCommit={(v) => {
        if (v === "") {
          onChange(undefined)
        } else {
          onChange(
            v
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          )
        }
      }}
      placeholder="Page IDs..."
    />
  )
}
