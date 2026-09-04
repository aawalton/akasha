import * as z from "zod"

const inlineTokenSchema = z
  .object({
    sigil: z.enum(["@", "#"]),
    propertyId: z.string(),
    autocompleteFrom: z
      .discriminatedUnion("kind", [
        z.object({ kind: z.literal("self-property") }),
        z.object({ kind: z.literal("literal"), values: z.array(z.string()).readonly() }),
      ])
      .optional(),
    defaults: z.array(z.string()).readonly().optional(),
  })
  .strict()

const pickerSchema = z
  .object({
    propertyId: z.string(),
    defaultValue: z.string().optional(),
  })
  .strict()

export const quickAddConfigSchema = z
  .object({
    titlePropertyId: z.string(),
    notesPropertyId: z.string().optional(),
    inlineTokens: z.array(inlineTokenSchema).readonly().optional(),
    pickers: z.array(pickerSchema).readonly().optional(),
    fixedDefaults: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()

export type QuickAddConfig = z.infer<typeof quickAddConfigSchema>

export function parseQuickAddConfig(raw: unknown): QuickAddConfig | null {
  if (raw === undefined || raw === null) return null
  if (typeof raw !== "object" || Array.isArray(raw)) return null
  const result = quickAddConfigSchema.safeParse(raw)
  return result.success ? result.data : null
}
