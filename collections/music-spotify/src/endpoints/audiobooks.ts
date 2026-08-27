import { z } from "zod"
import { offsetPageSchema, paginateOffset, spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"
import { BATCH_STATUSES, MARKET_STATUSES, tolerateStatuses } from "../reachability"

const AUDIOBOOK_ID = "7iHfbu1YPACw6oZPAFJ7qe"
const AUDIOBOOK_IDS = "18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJ7qe"

export const authorSchema = z.object({ name: z.string() }).passthrough()

export const simplifiedChapterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("chapter"),
    chapter_number: z.number(),
    duration_ms: z.number(),
  })
  .passthrough()

export const simplifiedAudiobookSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("audiobook"),
    authors: z.array(authorSchema),
    narrators: z.array(authorSchema),
    total_chapters: z.number(),
  })
  .passthrough()

export const audiobookSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("audiobook"),
    authors: z.array(authorSchema),
    narrators: z.array(authorSchema),
    total_chapters: z.number(),
    chapters: offsetPageSchema(simplifiedChapterSchema.nullable()),
  })
  .passthrough()

export const severalAudiobooksSchema = z
  .object({ audiobooks: z.array(simplifiedAudiobookSchema.nullable()) })
  .passthrough()

const descriptor: EndpointDescriptor = {
  name: "audiobooks",
  scopes: [],
  probes: [
    {
      name: "GET /audiobooks/{id}",
      run: () =>
        tolerateStatuses(MARKET_STATUSES, () =>
          spotifyGet(`/audiobooks/${AUDIOBOOK_ID}`, audiobookSchema)
        ),
    },
    {
      name: "GET /audiobooks?ids=...",
      run: () =>
        tolerateStatuses(BATCH_STATUSES, () =>
          spotifyGet(`/audiobooks?ids=${AUDIOBOOK_IDS}`, severalAudiobooksSchema)
        ),
    },
    {
      name: "GET /audiobooks/{id}/chapters",
      run: () =>
        tolerateStatuses(MARKET_STATUSES, () =>
          paginateOffset(
            `/audiobooks/${AUDIOBOOK_ID}/chapters?limit=50`,
            simplifiedChapterSchema.nullable()
          )
        ),
    },
  ],
}

export default descriptor
