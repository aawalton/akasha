import { z } from "zod"

export const mediaRendererSchema = z.literal("tts")

export const mediaVariantAxisSchema = z.literal("narrator")

export const audioMediaConfigSchema = z
  .object({
    sourcePropertyId: z.string().min(1),
    renderer: mediaRendererSchema,
    variantAxis: mediaVariantAxisSchema.optional(),
  })
  .strict()

const imageRendererSchema = z.literal("z-image-turbo")

export const imageMediaConfigSchema = z
  .object({
    renderer: imageRendererSchema,
  })
  .strict()

export const mediaConfigSchema = z
  .object({
    audio: audioMediaConfigSchema.optional(),
    image: imageMediaConfigSchema.optional(),
  })
  .strict()

export type MediaConfig = z.infer<typeof mediaConfigSchema>

export function parseMediaConfig(value: unknown): MediaConfig | null {
  const parsed = mediaConfigSchema.safeParse(value)
  return parsed.success ? parsed.data : null
}
