import {
  BADGE_ICON_FIELD,
  BADGE_VARIANT_FIELD,
} from "akasha/page/core/schema/modules/badge-display/badge-display.module.code.ts"
import * as z from "zod"

export const selectOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string().optional(),
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

const RELATION_TARGET_FIELDS = {
  targetPageTypeId: z.string().optional(),
  targetPageTypeSlug: z.string().optional(),
  backRelationPropertyId: z.string().optional(),
}

export const relationConfigSchema = z.object({
  ...RELATION_TARGET_FIELDS,
  ...BADGE_ICON_FIELD,
})

export const multiRelationConfigSchema = z.object({
  ...RELATION_TARGET_FIELDS,
  ...BADGE_ICON_FIELD,
})
