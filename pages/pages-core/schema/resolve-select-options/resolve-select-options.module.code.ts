import * as z from "zod"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "../pages/pages.module.code.ts"
import {
  type SelectOption,
  selectConfigSchema,
  selectOptionSchema,
} from "../property-config-schemas/property-config-schemas.module.code.ts"

const optionEntriesSchema = z.array(z.unknown())

function jsonTextToEntries(text: string): readonly unknown[] {
  try {
    const opened = optionEntriesSchema.safeParse(JSON.parse(text))
    return opened.success ? opened.data : []
  } catch {
    return []
  }
}

export function parseSelectOptionArray(raw: unknown): readonly SelectOption[] {
  const source = typeof raw === "string" ? jsonTextToEntries(raw) : raw
  if (!Array.isArray(source)) return []
  const options: SelectOption[] = []
  for (const entry of source) {
    const parsed = selectOptionSchema.safeParse(entry)
    if (parsed.success) options.push(parsed.data)
  }
  return options
}

export type OptionListLookup = (optionListPageId: string) => readonly SelectOption[] | undefined

interface SelectOptionSource {
  readonly options?: readonly SelectOption[]
  readonly optionListRef?: string
}

export function resolveSelectOptions(
  config: SelectOptionSource,
  lookupOptionList: OptionListLookup
): readonly SelectOption[] {
  const ref = config.optionListRef
  if (ref !== undefined && ref !== "") {
    const listed = lookupOptionList(ref)
    if (listed !== undefined) return listed
  }
  return config.options ?? []
}

export function resolveDefinitionOptions(
  definition: PropertyDefinition,
  lookupOptionList: OptionListLookup
): PropertyDefinition {
  if (definition.type !== "select" && definition.type !== "multi-select") return definition
  const parsed = selectConfigSchema.safeParse(definition.config ?? {})
  const config = parsed.success ? parsed.data : { options: [] }
  if (config.optionListRef === undefined || config.optionListRef === "") return definition
  const options = resolveSelectOptions(config, lookupOptionList)
  const base: Readonly<Record<string, ReadonlyJSONValue>> = definition.config ?? {}
  const nextConfig: Record<string, ReadonlyJSONValue> = { ...base, options }
  return Object.assign({}, definition, { config: nextConfig })
}
