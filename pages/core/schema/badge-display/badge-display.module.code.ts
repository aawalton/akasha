import * as z from "zod"
import { badgeVariantSchema } from "../color-rule-variant/color-rule-variant.module.code.ts"

export const BADGE_ICON_FIELD = {
  icon: z.string().optional(),
}

export const BADGE_VARIANT_FIELD = {
  badgeVariant: badgeVariantSchema.optional(),
}
