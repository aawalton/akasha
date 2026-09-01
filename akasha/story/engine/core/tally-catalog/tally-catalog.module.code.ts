import { z } from "zod"

export class TallyCatalogError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TallyCatalogError"
  }
}

export const TALLY_PATTERN_FAMILIES = ["template", "let-verb", "telling"] as const
export const TallyPatternFamilySchema = z.enum(TALLY_PATTERN_FAMILIES)
export type TallyPatternFamily = z.infer<typeof TallyPatternFamilySchema>

export const TallyPatternSchema = z
  .object({
    id: z.string().min(1),
    family: TallyPatternFamilySchema,
    regex: z.string().min(1),
    flags: z.string().optional(),
    provenance: z.string().min(1),
  })
  .strict()
export type TallyPattern = z.infer<typeof TallyPatternSchema>

export const BoundaryScreenSchema = z
  .object({
    category: z.string().min(1),
    regex: z.string().min(1),
    flags: z.string().optional(),
    provenance: z.string().min(1),
  })
  .strict()
export type BoundaryScreen = z.infer<typeof BoundaryScreenSchema>

export const BoundaryClassifierSchema = z
  .object({
    screens: z.array(BoundaryScreenSchema),
    fallback: z.string().min(1),
  })
  .strict()
export type BoundaryClassifier = z.infer<typeof BoundaryClassifierSchema>

export const BoundaryYouInitialSchema = z
  .object({
    regex: z.string().min(1),
    flags: z.string().optional(),
    provenance: z.string().min(1),
  })
  .strict()
export type BoundaryYouInitial = z.infer<typeof BoundaryYouInitialSchema>

export const BoundaryLensSchema = z
  .object({
    runThreshold: z.number().int().min(2),
    head: BoundaryClassifierSchema,
    close: BoundaryClassifierSchema,
    youInitial: BoundaryYouInitialSchema,
  })
  .strict()
export type BoundaryLens = z.infer<typeof BoundaryLensSchema>

export const TallyCatalogSchema = z
  .object({
    catalogVersion: z.number().int().nonnegative(),
    patterns: z.array(TallyPatternSchema),
    boundaryLens: BoundaryLensSchema.optional(),
  })
  .strict()
  .superRefine((catalog, ctx) => {
    const seen = new Set<string>()
    for (const [i, p] of catalog.patterns.entries()) {
      if (seen.has(p.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `duplicate pattern id "${p.id}"`,
          path: ["patterns", i, "id"],
        })
      }
      seen.add(p.id)
    }
  })
export type TallyCatalog = z.infer<typeof TallyCatalogSchema>

export function parseTallyCatalog(value: unknown): TallyCatalog | null {
  if (value === null || value === undefined) return null
  return TallyCatalogSchema.parse(value)
}
