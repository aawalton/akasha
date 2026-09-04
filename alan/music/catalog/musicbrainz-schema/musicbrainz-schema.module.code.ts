import { z } from "zod"

export const mbArtistSearchHitSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().nullish(),
  country: z.string().nullish(),
  disambiguation: z.string().nullish(),
  score: z.number().nullish(),
})

export const mbArtistSearchSchema = z.object({
  count: z.number(),
  artists: z.array(mbArtistSearchHitSchema).default([]),
})

export const mbGenreSchema = z.object({
  name: z.string(),
  count: z.number().nullish(),
})

export const mbArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().nullish(),
  country: z.string().nullish(),
  genres: z.array(mbGenreSchema).default([]),
})

const mbRelationArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const mbRelationWorkSchema = z.object({
  id: z.string(),
  title: z.string(),
  disambiguation: z.string().nullish(),
})

export const mbRelationSchema = z.object({
  type: z.string(),
  direction: z.string().nullish(),
  "target-type": z.string().nullish(),
  artist: mbRelationArtistSchema.nullish(),
  work: mbRelationWorkSchema.nullish(),
})

export const mbWorkSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string().nullish(),
  disambiguation: z.string().nullish(),
  relations: z.array(mbRelationSchema).default([]),
})

export const mbWorkBrowseSchema = z.object({
  "work-count": z.number(),
  "work-offset": z.number().default(0),
  works: z.array(mbWorkSchema).default([]),
})

export const mbRecordingSchema = z.object({
  id: z.string(),
  title: z.string().nullish(),
  relations: z.array(mbRelationSchema).default([]),
})

export const mbRecordingBrowseSchema = z.object({
  "recording-count": z.number(),
  "recording-offset": z.number().default(0),
  recordings: z.array(mbRecordingSchema).default([]),
})

export type MbArtistSearchHit = z.infer<typeof mbArtistSearchHitSchema>
export type MbArtist = z.infer<typeof mbArtistSchema>
export type MbRelation = z.infer<typeof mbRelationSchema>
export type MbWork = z.infer<typeof mbWorkSchema>
export type MbRecording = z.infer<typeof mbRecordingSchema>
