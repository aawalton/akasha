import * as z from "zod"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "../../schema/pages/pages.module.code.ts"
import { stripLeadingMarker } from "../block-markers/block-markers.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export type Block = {
  readonly id?: string
  readonly type: string
  readonly text?: string
  readonly children?: readonly Block[]
} & { readonly [key: string]: ReadonlyJSONValue | undefined }

const jsonValueSchema: z.ZodType<ReadonlyJSONValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ])
)

export const blockSchema: z.ZodType<Block> = z.lazy(() =>
  z
    .object({
      id: z.string().optional(),
      type: z.string().min(1),
      text: z.string().optional(),
      children: z.array(blockSchema).optional(),
    })
    .catchall(jsonValueSchema.optional())
)

export type RichDocument = {
  readonly blocks: readonly Block[]
}

export const richDocumentSchema = z
  .object({
    blocks: z.array(blockSchema),
  })
  .strict()

export function validateRichDocumentValue(value: ReadonlyJSONValue | undefined): string | null {
  if (value === null || value === undefined || value === "") return null
  const parsed = richDocumentSchema.safeParse(value)
  if (parsed.success) return null
  const first = parsed.error.issues[0]
  const path = first?.path.join("/")
  return `Rich-document ${path !== undefined && path !== "" ? `at "${path}": ` : ""}${first?.message ?? "is invalid"}`
}

export function isBlankBlock(block: Block): boolean {
  return blockIsBlank(block.text, block.children)
}

function blockIsBlank(text: unknown, children: unknown): boolean {
  if (Array.isArray(children) && children.length > 0) return false
  if (typeof text !== "string") return false
  return stripLeadingMarker(text).trim() === ""
}

function isReadonlyJsonArray(v: ReadonlyJSONValue | undefined): v is readonly ReadonlyJSONValue[] {
  return Array.isArray(v)
}

function isJsonObject(
  v: ReadonlyJSONValue | undefined
): v is { readonly [key: string]: ReadonlyJSONValue | undefined } {
  return v !== null && v !== undefined && typeof v === "object" && !Array.isArray(v)
}

export function isBlocksValueEmpty(value: PropertyValue): boolean {
  if (value === null || value === undefined || value === "") return true
  if (!isJsonObject(value)) return false
  const blocks = value.blocks
  if (!isReadonlyJsonArray(blocks)) return false
  for (const block of blocks) {
    if (!isJsonObject(block)) return false
    if (!blockIsBlank(block.text, block.children)) return false
  }
  return true
}

export const RICH_DOCUMENT_OPS: PropertyTypeOps = {
  validate(value: PropertyValue, _definition: PropertyDefinition) {
    return validateRichDocumentValue(value)
  },

  getSortValue() {
    return null
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return (value) => {
      switch (config.operator) {
        case "is_empty":
          return isBlocksValueEmpty(value)
        case "is_not_empty":
          return !isBlocksValueEmpty(value)
        default:
          return true
      }
    }
  },
}
