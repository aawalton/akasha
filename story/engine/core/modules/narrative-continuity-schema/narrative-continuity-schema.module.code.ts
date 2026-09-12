import { z } from "zod"

const NARRATION_PERSONS = ["first", "second", "third"] as const
const NarrationPersonSchema = z.enum(NARRATION_PERSONS)
export type NarrationPerson = z.infer<typeof NarrationPersonSchema>

const NarrationSchema = z
  .object({
    person: NarrationPersonSchema,
    povCharacter: z.string().optional(),
    rule: z.string(),
  })
  .strict()
export type Narration = z.infer<typeof NarrationSchema>

const FrameSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  })
  .strict()
export type Frame = z.infer<typeof FrameSchema>

const TRANSITION_MARKINGS = ["boundaries-only", "throughout"] as const
const TransitionMarkingSchema = z.enum(TRANSITION_MARKINGS)
export type TransitionMarking = z.infer<typeof TransitionMarkingSchema>

const TransitionsSchema = z
  .object({
    marking: TransitionMarkingSchema,
    convention: z.string().optional(),
  })
  .strict()
export type Transitions = z.infer<typeof TransitionsSchema>

const FrameMapEntrySchema = z
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
