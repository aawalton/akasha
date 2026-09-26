import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { inLowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import { z } from "zod"

const IMAGE_ADDRESS = "image/"

const SLUG_OPENS = "image-"

const HEX_KEPT = 16

const QUANTIZE = "quantize"

export const MakingSchema = z.object({
  service: z.string(),
  operation: z.string(),
  model: z.string(),
  prompt: z.string().optional(),
  seed: z.number().optional(),
  steps: z.number().optional(),
  guidance: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  quantize: z.number().optional(),
  softness: z.number().optional(),
  resolution: z.string().optional(),
  inputImageSha256: z.string().optional(),
  referenceImageSha256s: z.array(z.string()).optional(),
  serviceVersions: z.record(z.string(), z.union([z.string(), z.number()]).optional()).optional(),
})

export type Making = z.infer<typeof MakingSchema>

export function imageSlugOfSha256(sha256: string): string {
  return `${SLUG_OPENS}${sha256.slice(0, HEX_KEPT)}`
}

export function imagesNamedIn(made: Making): readonly string[] {
  const input = made.inputImageSha256 === undefined ? [] : [made.inputImageSha256]
  return [...input, ...(made.referenceImageSha256s ?? [])].map(imageSlugOfSha256)
}

function versionsOf(made: Making): readonly string[] {
  const found: string[] = []
  for (const [name, version] of Object.entries(made.serviceVersions ?? {})) {
    if (name === QUANTIZE || version === undefined) continue
    found.push(`${inLowerKebabCase(name)} ${version}`)
  }
  return found
}

function quantizeOf(made: Making): number | undefined {
  if (made.quantize !== undefined) return made.quantize
  const held = made.serviceVersions?.[QUANTIZE]
  return typeof held === "number" ? held : undefined
}

function stated(key: string, value: string | number | undefined): Value {
  return value === undefined || value === "" ? {} : { [key]: value }
}

export function makingValues(made: Making, hasImage: (slug: string) => boolean): Value {
  const input =
    made.inputImageSha256 === undefined ? null : imageSlugOfSha256(made.inputImageSha256)
  const references = (made.referenceImageSha256s ?? []).map(imageSlugOfSha256).filter(hasImage)
  const versions = versionsOf(made)
  return {
    service: made.service,
    operation: made.operation,
    model: made.model,
    ...stated("prompt", made.prompt),
    ...stated("seed", made.seed),
    ...stated("steps", made.steps),
    ...stated("guidance", made.guidance),
    ...stated("width", made.width),
    ...stated("height", made.height),
    ...stated("quantize", quantizeOf(made)),
    ...stated("softness", made.softness),
    ...stated("resolution", made.resolution),
    ...(input !== null && hasImage(input) ? { inputImage: `${IMAGE_ADDRESS}${input}` } : {}),
    ...(references.length > 0
      ? { referenceImages: references.map((slug) => `${IMAGE_ADDRESS}${slug}`) }
      : {}),
    ...(versions.length > 0 ? { serviceVersions: versions } : {}),
  }
}
