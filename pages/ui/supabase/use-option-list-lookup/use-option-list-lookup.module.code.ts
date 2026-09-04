"use client"

import {
  type OptionListLookup,
  parseSelectOptionArray,
  resolveDefinitionOptions,
} from "@akasha/pages-core/schema/resolve-select-options"
import type { SelectOption } from "@akasha/pages-core/schema/select-option-create"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { useMemo } from "react"

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
