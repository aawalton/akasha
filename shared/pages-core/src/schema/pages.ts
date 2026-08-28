import * as z from "zod"
import { STORAGE_TIERS, type PropertyDefinition } from "../types.ts"
import { actionButtonConfigSchema } from "./action-button-config.ts"
import { colorRuleSchema } from "./color-rule.ts"
import { detailConfigSchema } from "./detail-config.ts"
import { listingConfigSchema } from "./listing-config.ts"
import { mediaConfigSchema } from "./media-config.ts"
import {
  aggregateConfigSchema,
  baseConfigSchema,
  dateConfigSchema,
  formulaConfigSchema,
  instantConfigSchema,
  multiRelationConfigSchema,
  multiSelectConfigSchema,
  numberConfigSchema,
  pathSelectConfigSchema,
  relationConfigSchema,
  rollupConfigSchema,
  selectConfigSchema,
  textConfigSchema,
} from "./property-config-schemas.ts"
import { sequenceConfigSchema } from "./sequence-config.ts"


export type ReadonlyJSONValue =
  | string
  | number
  | boolean
  | null
  | readonly ReadonlyJSONValue[]
  | { readonly [key: string]: ReadonlyJSONValue | undefined }


export function parseConfig<T>(schema: z.ZodType<T>, raw: unknown, fallback: T): T {
  const result = schema.safeParse(raw ?? {})
  return result.success ? result.data : fallback
}

const baseFields = {
  id: z.string(),
  title: z.string(),
  accent: z.boolean().optional(),
  display: z.enum(["badge", "inline"]).optional(),
  sort: z.enum(["alpha", "manual"]).optional(),
  storage: z.enum(STORAGE_TIERS).optional(),
  groupable: z.boolean().optional(),
  colorRules: z.array(colorRuleSchema).optional(),
} as const

export const PropertyDefinitionSchema = z.discriminatedUnion("type", [
  z
    .object({ ...baseFields, type: z.literal("text"), config: textConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("markdown"), config: baseConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("number"), config: numberConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("select"), config: selectConfigSchema.nullish() })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("multi-select"),
      config: multiSelectConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("path-select"),
      config: pathSelectConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("calendar-date"),
      config: dateConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("calendar-time"),
      config: baseConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("instant"), config: instantConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("boolean"), config: baseConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("url"), config: baseConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("relation"), config: relationConfigSchema.nullish() })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("multi-relation"),
      config: multiRelationConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("rollup"),
      config: rollupConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("aggregate"),
      config: aggregateConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("formula"),
      config: formulaConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("json"), config: baseConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("rrule"), config: baseConfigSchema.nullish() })
    .passthrough(),
  z
    .object({ ...baseFields, type: z.literal("progress"), config: baseConfigSchema.nullish() })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("rich-document"),
      config: baseConfigSchema.nullish(),
    })
    .passthrough(),
  z
    .object({
      ...baseFields,
      type: z.literal("action-button"),
      config: actionButtonConfigSchema.nullish(),
    })
    .passthrough(),
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function humanizeIdentifier(id: string): string {
  const spaced = id
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
  const words = spaced.split(/\s+/).filter((w) => w.length > 0)
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

const propertyDefinitionLikeSchema = z
  .custom<PropertyDefinition>((val): val is PropertyDefinition => {
    if (!isRecord(val)) return false
    if (typeof val.id !== "string") return false
    if (typeof val.type !== "string") return false
    return typeof val.title === "string"
  })
  .transform(
    (def): PropertyDefinition =>
      def.title === "" ? Object.assign({}, def, { title: humanizeIdentifier(def.id) }) : def
  )

export const pageTypeDataSchema = z
  .object({
    propertyDefinitions: z.array(propertyDefinitionLikeSchema).readonly(),
    sequence: sequenceConfigSchema.optional().catch(undefined),
    listingConfig: listingConfigSchema.optional().catch(undefined),
    detailConfig: detailConfigSchema.optional().catch(undefined),
    mediaConfig: mediaConfigSchema.optional().catch(undefined),
  })
  .passthrough()

export type PageTypeDataJSON = z.infer<typeof pageTypeDataSchema>

export function parsePageTypeData(raw: unknown): PageTypeDataJSON {
  const result = pageTypeDataSchema.safeParse(raw ?? {})
  return result.success ? result.data : { propertyDefinitions: [] }
}
