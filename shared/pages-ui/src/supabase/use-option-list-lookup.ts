"use client"

import { type OptionListLookup, parseSelectOptionArray, resolveDefinitionOptions } from "@shared/pages-core/schema/resolve-select-options"
import { type SelectOption } from "@shared/pages-core/schema/select-option-create"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { useMemo } from "react"
import { useAllPages } from "./hooks"

const OPTION_LIST_PAGE_TYPE_SLUG = "option-list"

export function useOptionListLookup(): OptionListLookup {
  const { pages } = useAllPages({ pageTypeSlug: OPTION_LIST_PAGE_TYPE_SLUG })
  return useMemo(() => {
    const byId = new Map<string, readonly SelectOption[]>()
    for (const page of pages) byId.set(page._id, parseSelectOptionArray(page.properties.options))
    return (optionListPageId: string) => byId.get(optionListPageId)
  }, [pages])
}

export function useResolvedDefinitions(
  definitions: readonly PropertyDefinition[]
): readonly PropertyDefinition[] {
  const lookup = useOptionListLookup()
  return useMemo(
    () => definitions.map((def) => resolveDefinitionOptions(def, lookup)),
    [definitions, lookup]
  )
}
