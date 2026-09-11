import { badgeVariantSchema } from "akasha/pages/core/schema/color-rule-variant/color-rule-variant.module.code.ts"
import * as z from "zod"

export const BADGE_ICON_FIELD = {
  icon: z.string().optional(),
}

export const BADGE_VARIANT_FIELD = {
  badgeVariant: badgeVariantSchema.optional(),
}
