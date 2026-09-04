import type { PatchPropertyDefinitionArgs } from "@akasha/pages-access/property-definition"
import type { Page } from "@akasha/pages-core/page-types"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import type { CreateSelectOptionEffect } from "@akasha/pages-ui/option-create-context"
import type { Json } from "@akasha/utils-narrow/json-value"

type OptionRow = { id: string; label: string; variant?: string; [k: string]: Json | undefined }

function isPlainJsonObject(v: unknown): v is Record<string, Json | undefined> {
  return v !== null && typeof v === "object" && !Array.isArray(v)
}

function isOptionRow(v: unknown): v is OptionRow {
  if (!isPlainJsonObject(v)) return false
  return typeof v.id === "string" && typeof v.label === "string"
}

export async function createOptionOnDefinition(args: {
  patch: (args: PatchPropertyDefinitionArgs) => Promise<Page | null>
  createOption?: CreateSelectOptionEffect
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
  const { patch, createOption, properties, rowPageTypeSlug, setProperty } = args
  const { pageId, pageData, propertyId, label } = args
  const targetDef = properties.find((d) => d.id === propertyId)
  if (targetDef?.pageId == null) return
  const existingConfig: Record<string, Json | undefined> = isPlainJsonObject(targetDef.config)
    ? { ...targetDef.config }
    : {}
  const optionsRaw = existingConfig.options
  const existingOpts: OptionRow[] = Array.isArray(optionsRaw) ? optionsRaw.filter(isOptionRow) : []

  if (createOption !== undefined) {
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
    return
  }

  const newOptionId = crypto.randomUUID()
  const newOption: OptionRow = { id: newOptionId, label }
  await patch({
    where: [{ key: "id", eq: targetDef.pageId }],
    set: { config: { ...existingConfig, options: [...existingOpts, newOption] } },
  })
  const optionIds = new Set([...existingOpts.map((o) => o.id), newOptionId])
  const raw = pageData[propertyId]
  const currentIds = Array.isArray(raw)
    ? raw.filter((oid): oid is string => typeof oid === "string" && optionIds.has(oid))
    : []
  setProperty({
    pageTypeSlug: rowPageTypeSlug,
    pageId,
    propertyId,
    value: [...currentIds, newOptionId],
  })
}
