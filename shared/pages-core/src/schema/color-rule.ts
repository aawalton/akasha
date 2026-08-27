import * as z from "zod"

const badgeVariants = [
  "accent",
  "elevation-muted",
  "green",
  "blue",
  "purple",
  "yellow",
  "orange",
  "red",
] as const

export type BadgeVariant = (typeof badgeVariants)[number]

export const badgeVariantSchema = z.enum(badgeVariants)

export const colorRuleVariants = [
  "default",
  "green",
  "blue",
  "purple",
  "yellow",
  "orange",
  "red",
] as const

export type ColorRuleVariant = (typeof colorRuleVariants)[number]

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
  z.enum(colorRuleVariants)
)

export const colorRuleSchema = z.object({
  when: z.string(),
  variant: colorRuleVariantSchema,
})

export type ColorRule = z.infer<typeof colorRuleSchema>
