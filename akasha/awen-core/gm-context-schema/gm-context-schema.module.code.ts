import { z } from "zod"
import { GateDimensionSchema } from "../gate-dimension/gate-dimension.module.code.ts"
import { SheetEntryTemplateSchema } from "../sheet-template/sheet-template.module.code.ts"
import { TallyCatalogSchema } from "../tally-catalog/tally-catalog.module.code.ts"

export const SYSTEM_VOICE_VALUES = ["mute", "declared"] as const
export const SystemVoiceSchema = z.enum(SYSTEM_VOICE_VALUES)
export type SystemVoice = z.infer<typeof SystemVoiceSchema>

export const GmPolicySchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    bands: z.array(z.string()).default([]),
  })
  .strict()
export type GmPolicy = z.infer<typeof GmPolicySchema>

export const TurnObligationSchema = z
  .object({
    id: z.string(),
    requirement: z.string(),
    detail: z.string().optional(),
  })
  .strict()
export type TurnObligation = z.infer<typeof TurnObligationSchema>

export const TurnContractSchema = z
  .object({
    obligations: z.array(TurnObligationSchema).default([]),
    notes: z.string().optional(),
  })
  .strict()
export type TurnContract = z.infer<typeof TurnContractSchema>

export const GmContextSchema = z
  .object({
    policies: z.array(GmPolicySchema).default([]),
    turnContract: TurnContractSchema.optional(),
    role: z.string().optional(),
    doctrineVersion: z.number().int().nonnegative().optional(),
    sheetTemplate: SheetEntryTemplateSchema.optional(),
    systemVoice: SystemVoiceSchema.optional(),
    gateDimensions: z.array(GateDimensionSchema).optional(),
    tallyCatalog: TallyCatalogSchema.optional(),
  })
  .strict()
export type GmContext = z.infer<typeof GmContextSchema>

export function parseGmContext(value: unknown): GmContext | null {
  if (typeof value !== "object" || value === null) return null
  return GmContextSchema.parse(value)
}

export const GmReferenceSectionSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
  })
  .strict()
export type GmReferenceSection = z.infer<typeof GmReferenceSectionSchema>

export const GmReferenceSchema = z
  .object({
    sections: z.array(GmReferenceSectionSchema),
  })
  .strict()
export type GmReference = z.infer<typeof GmReferenceSchema>

export function parseGmReference(value: unknown): GmReference | null {
  if (typeof value !== "object" || value === null) return null
  return GmReferenceSchema.parse(value)
}
