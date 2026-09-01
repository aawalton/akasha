import { z } from "zod"

export const NARRATION_PERSONS = ["first", "second", "third"] as const
export const NarrationPersonSchema = z.enum(NARRATION_PERSONS)
export type NarrationPerson = z.infer<typeof NarrationPersonSchema>

export const NarrationSchema = z
  .object({
    person: NarrationPersonSchema,
    povCharacter: z.string().optional(),
    rule: z.string(),
  })
  .strict()
export type Narration = z.infer<typeof NarrationSchema>

export const FrameSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  })
  .strict()
export type Frame = z.infer<typeof FrameSchema>

export const TRANSITION_MARKINGS = ["boundaries-only", "throughout"] as const
export const TransitionMarkingSchema = z.enum(TRANSITION_MARKINGS)
export type TransitionMarking = z.infer<typeof TransitionMarkingSchema>

export const TransitionsSchema = z
  .object({
    marking: TransitionMarkingSchema,
    convention: z.string().optional(),
  })
  .strict()
export type Transitions = z.infer<typeof TransitionsSchema>

export const FrameMapEntrySchema = z
  .object({
    character: z.string(),
    identities: z.record(z.string(), z.string()),
    rule: z.string().optional(),
  })
  .strict()
export type FrameMapEntry = z.infer<typeof FrameMapEntrySchema>

export const NarrativeContinuitySchema = z
  .object({
    narration: NarrationSchema,
    frames: z.array(FrameSchema).default([]),
    transitions: TransitionsSchema.optional(),
    frameMap: z.array(FrameMapEntrySchema).default([]),
    canon: z.array(z.string()).default([]),
  })
  .strict()
export type NarrativeContinuity = z.infer<typeof NarrativeContinuitySchema>

export function parseNarrativeContinuity(value: unknown): NarrativeContinuity | null {
  if (typeof value !== "object" || value === null) return null
  return NarrativeContinuitySchema.parse(value)
}
