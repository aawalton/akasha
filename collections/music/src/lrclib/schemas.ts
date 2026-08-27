import { z } from "zod"

export const lrclibRecordSchema = z.object({
  id: z.number(),
  trackName: z.string(),
  artistName: z.string(),
  albumName: z.string().nullish(),
  duration: z.number().nullish(),
  instrumental: z.boolean().default(false),
  plainLyrics: z.string().nullish(),
  syncedLyrics: z.string().nullish(),
})

export const lrclibSearchSchema = z.array(lrclibRecordSchema)

export type LrclibRecord = z.infer<typeof lrclibRecordSchema>
