import { z } from "zod"
import { badgeIconField, badgeVariantField } from "./badge-display"

export const actionButtonConfigSchema = z.object({
  verbId: z.string(),
  label: z.string().optional(),
  confirm: z.boolean().optional(),
  recordInvokedAt: z.boolean().optional(),
  ...badgeIconField,
  ...badgeVariantField,
})

export type ActionButtonConfig = z.infer<typeof actionButtonConfigSchema>

export const DECLARED_EFFECTS_VERB_ID = "declared-effects"
