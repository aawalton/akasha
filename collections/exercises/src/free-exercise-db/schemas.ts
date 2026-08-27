import { z } from "zod"

export const freeExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  force: z.string().nullable(),
  level: z.string(),
  mechanic: z.string().nullable(),
  equipment: z.string().nullable(),
  primaryMuscles: z.array(z.string()).default([]),
  secondaryMuscles: z.array(z.string()).default([]),
  instructions: z.array(z.string()).default([]),
  category: z.string(),
  images: z.array(z.string()).default([]),
})

export const freeExerciseArraySchema = z.array(freeExerciseSchema)

export type FreeExercise = z.infer<typeof freeExerciseSchema>
