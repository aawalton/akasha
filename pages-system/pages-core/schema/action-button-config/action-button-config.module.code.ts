import { z } from "zod"
import {
  BADGE_ICON_FIELD,
  BADGE_VARIANT_FIELD,
} from "../badge-display/badge-display.module.code.ts"

export const actionButtonConfigSchema = z.object({
  verbId: z.string(),
  label: z.string().optional(),
  confirm: z.boolean().optional(),
  recordInvokedAt: z.boolean().optional(),
  ...BADGE_ICON_FIELD,
  ...BADGE_VARIANT_FIELD,
})

export type ActionButtonConfig = z.infer<typeof actionButtonConfigSchema>

export const DECLARED_EFFECTS_VERB_ID = "declared-effects"
