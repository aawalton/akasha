import * as z from "zod"

const BADGE_VARIANTS = [
  "accent",
  "elevation-muted",
  "green",
  "blue",
  "purple",
  "yellow",
  "orange",
  "red",
] as const

export type BadgeVariant = (typeof BADGE_VARIANTS)[number]

export const badgeVariantSchema = z.enum(BADGE_VARIANTS)

export const COLOR_RULE_VARIANTS = [
  "default",
  "green",
  "blue",
  "purple",
  "yellow",
  "orange",
  "red",
] as const

export type ColorRuleVariant = (typeof COLOR_RULE_VARIANTS)[number]

const LEGACY_VARIANT_COERCIONS: Record<string, ColorRuleVariant> = {
  "elevation-muted": "default",
  accent: "yellow",
  emerald: "green",
  sapphire: "blue",
  amethyst: "purple",
  topaz: "yellow",
  carnelian: "orange",
  ruby: "red",
}

export const colorRuleVariantSchema = z.preprocess(
  (v) => (typeof v === "string" && v in LEGACY_VARIANT_COERCIONS ? LEGACY_VARIANT_COERCIONS[v] : v),
  z.enum(COLOR_RULE_VARIANTS)
)

export const colorRuleSchema = z.object({
  when: z.string(),
  variant: colorRuleVariantSchema,
})

export type ColorRule = z.infer<typeof colorRuleSchema>
