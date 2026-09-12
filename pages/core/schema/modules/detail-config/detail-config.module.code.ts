import * as z from "zod"

const displayKindSchema = z.string().regex(/^[a-z][a-z0-9-]*$/)

const frameConfigSchema = z.object({
  edgeToEdge: z.boolean().optional(),
  focusMode: z.boolean().optional(),
  autoScroll: z
    .object({
      loadScroll: z.enum(["start", "end", "new-top", "progress"]).optional(),
    })
    .optional(),
})

const collectionHeaderSchema = z.object({
  showCover: z.boolean().optional(),
  fields: z.array(z.string()).readonly(),
})

const childCollectionSchema = z.object({
  childType: z.string(),
  childRelation: z.string(),
})

const detailConfigSchema = z.object({
  display: displayKindSchema.optional(),
  frame: frameConfigSchema.optional(),
  bodyPropertyId: z.string().optional(),
  fullBleed: z.boolean().optional(),
  showReadingProgress: z.boolean().optional(),
  markReadOnEnd: z.boolean().optional(),
  progressPropertyId: z.string().optional(),
  lengthPropertyId: z.string().optional(),
  header: collectionHeaderSchema.optional(),
  childCollection: childCollectionSchema.optional(),
})

export { detailConfigSchema, frameConfigSchema }

export type DetailConfig = z.infer<typeof detailConfigSchema>

export type FrameConfig = z.infer<typeof frameConfigSchema>

export function parseDetailConfig(value: unknown): DetailConfig | undefined {
  if (value == null) return undefined
  const parsed = detailConfigSchema.safeParse(value)
  return parsed.success ? parsed.data : undefined
}

export function resolveDisplayKind(config: DetailConfig | undefined): string | undefined {
  return config?.display
}
