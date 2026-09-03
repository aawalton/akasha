import { z } from "zod"

export const placeCandidateSchema = z
  .object({
    sourcePlaceId: z.string().min(1),
    name: z.string().min(1),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    category: z.string().optional(),
  })
  .strict()

export type PlaceCandidate = z.infer<typeof placeCandidateSchema>

export const searchResponseSchema = z
  .object({
    candidates: z.array(placeCandidateSchema),
  })
  .strict()

export const addResponseSchema = z
  .object({
    id: z.string().min(1),
    href: z.string().min(1),
  })
  .strict()
