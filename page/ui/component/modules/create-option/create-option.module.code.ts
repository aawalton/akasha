import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import type {
  PageDataJSON,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { CreateSelectOptionEffect } from "akasha/page/ui/modules/option-create-context/option-create-context.module.code.tsx"

type OptionRow = { id: string; label: string; variant?: string; [k: string]: Json | undefined }

function isPlainJsonObject(v: unknown): v is Record<string, Json | undefined> {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}

function isOptionRow(v: unknown): v is OptionRow {
  if (!isPlainJsonObject(v)) return false
  return typeof v.id === "string" && typeof v.label === "string"
}

export async function createOptionOnDefinition(args: {
  createOption: CreateSelectOptionEffect
  properties: readonly PropertyDefinition[]
  rowPageTypeSlug: string
  setProperty: (a: {
    pageTypeSlug: string
    pageId: string
    propertyId: string
    value: unknown
  }) => void
  pageId: string
  pageData: PageDataJSON
  propertyId: string
  label: string
}): Promise<void> {
  const { createOption, properties, rowPageTypeSlug, setProperty } = args
  const { pageId, pageData, propertyId, label } = args
  const targetDef = properties.find((d) => d.id === propertyId)
  if (targetDef?.pageId == null) return
  const config: Record<string, Json | undefined> = isPlainJsonObject(targetDef.config)
    ? targetDef.config
    : {}
  const optionsRaw = config.options
  const existingOpts: OptionRow[] = Array.isArray(optionsRaw) ? optionsRaw.filter(isOptionRow) : []

  const created = await createOption({ definitionId: targetDef.pageId, label })
  const optionIds = new Set([...existingOpts.map((o) => o.id), created.id])
  const raw = pageData[propertyId]
  const currentIds = Array.isArray(raw)
    ? raw.filter((oid): oid is string => typeof oid === "string" && optionIds.has(oid))
    : []
  setProperty({
    pageTypeSlug: rowPageTypeSlug,
    pageId,
    propertyId,
    value: [...currentIds, created.id],
  })
}
