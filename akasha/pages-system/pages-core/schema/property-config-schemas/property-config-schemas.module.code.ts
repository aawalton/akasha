import * as z from "zod"
import {
  BADGE_ICON_FIELD,
  BADGE_VARIANT_FIELD,
} from "../badge-display/badge-display.module.code.ts"

export const selectOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
})

export type SelectOption = z.infer<typeof selectOptionSchema>

const OPTION_LIST_REF_FIELD = {
  optionListRef: z.string().optional(),
}

const numberFormatEnum = z.enum(["number", "number-with-separators", "percent", "compact", "short"])

const NUMBER_FORMAT_SURFACE_FIELDS = {
  decimals: z.number().int().nonnegative().optional(),
  percentBasis: z.union([z.literal(1), z.literal(100)]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  units: z.string().optional(),
  prefix: z.string().optional(),
  round: z.enum(["floor", "ceil"]).optional(),
}

export const numberConfigSchema = z.object({
  format: numberFormatEnum.default("number"),
  ...NUMBER_FORMAT_SURFACE_FIELDS,
  ...BADGE_ICON_FIELD,
  ...BADGE_VARIANT_FIELD,
})

export type NumberFormat = z.infer<typeof numberConfigSchema>["format"]

export type NumberConfig = z.infer<typeof numberConfigSchema>

export const textConfigSchema = z.object({
  ...BADGE_ICON_FIELD,
  ...BADGE_VARIANT_FIELD,
})

export const selectConfigSchema = z.object({
  options: z.array(selectOptionSchema).default([]),
  ...OPTION_LIST_REF_FIELD,
  ...BADGE_ICON_FIELD,
})

export const multiSelectConfigSchema = z.object({
  options: z.array(selectOptionSchema).default([]),
  ...OPTION_LIST_REF_FIELD,
  ...BADGE_ICON_FIELD,
})

export const pathSelectConfigSchema = z.object({
  providerId: z.string(),
  requiredDepth: z.number().int().nonnegative().optional(),
  maxDepth: z.number().int().positive().optional(),
  separator: z.string().optional(),
  ...BADGE_ICON_FIELD,
})

export const dateConfigSchema = z.object({
  relativeDisplay: z.boolean().optional(),
  ...BADGE_ICON_FIELD,
})

const instantFormatEnum = z.enum([
  "relative",
  "absolute-date-time",
  "absolute-date",
  "absolute-time",
])

export const instantConfigSchema = z.object({
  format: instantFormatEnum.default("relative"),
  ...BADGE_ICON_FIELD,
})

export type InstantFormat = z.infer<typeof instantConfigSchema>["format"]

export type InstantConfig = z.infer<typeof instantConfigSchema>

export const relationConfigSchema = z.object({
  targetPageTypeId: z.string().optional(),
  backRelationPropertyId: z.string().optional(),
  ...BADGE_ICON_FIELD,
})

export const multiRelationConfigSchema = z.object({
  targetPageTypeId: z.string().optional(),
  backRelationPropertyId: z.string().optional(),
  ...BADGE_ICON_FIELD,
})

export const rollupConfigSchema = z.object({
  relationPropertyId: z.string().optional(),
  targetPropertyId: z.string().optional(),
  ...BADGE_ICON_FIELD,
})

const aggregateFilterLeafSchema = z.union([
  z.object({ op: z.literal("in"), property: z.string(), values: z.array(z.string()) }),
  z.object({
    op: z.literal("eq"),
    property: z.string(),
    value: z.union([z.string(), z.number(), z.boolean()]),
  }),
  z.object({ op: z.literal("is_null"), property: z.string() }),
  z.object({ op: z.literal("is_not_null"), property: z.string() }),
])

export type AggregateFilter =
  | { readonly op: "and"; readonly filters: readonly AggregateFilter[] }
  | { readonly op: "or"; readonly filters: readonly AggregateFilter[] }
  | z.infer<typeof aggregateFilterLeafSchema>

export const aggregateFilterSchema: z.ZodType<AggregateFilter> = z.lazy(() =>
  z.union([
    z.object({ op: z.literal("and"), filters: z.array(aggregateFilterSchema) }),
    z.object({ op: z.literal("or"), filters: z.array(aggregateFilterSchema) }),
    aggregateFilterLeafSchema,
  ])
)

export const aggregateConfigSchema = z.object({
  relationPropertyId: z.string().optional(),
  targetPropertyId: z.string().optional(),
  function: z.enum(["sum", "count", "avg", "min", "max", "first", "count_distinct"]).optional(),
  filter: aggregateFilterSchema.optional(),
  format: numberFormatEnum.optional(),
  ...NUMBER_FORMAT_SURFACE_FIELDS,
  ...BADGE_ICON_FIELD,
  ...BADGE_VARIANT_FIELD,
})

export const formulaConfigSchema = z.object({
  expression: z.string(),
  returnType: z.enum(["text", "number", "calendar-date", "boolean"]),
  format: numberFormatEnum.optional(),
  ...NUMBER_FORMAT_SURFACE_FIELDS,
  ...BADGE_ICON_FIELD,
  ...BADGE_VARIANT_FIELD,
  live: z.boolean().optional(),
})

export const baseConfigSchema = z.object({ ...BADGE_ICON_FIELD })
