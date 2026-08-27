import * as z from "zod"
import { badgeVariantSchema } from "./color-rule"

export const badgeIconField = {
  icon: z.string().optional(),
}

export const badgeVariantField = {
  badgeVariant: badgeVariantSchema.optional(),
}
