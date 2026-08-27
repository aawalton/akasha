import { z } from "zod"
import { spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"
import { BATCH_STATUSES, MARKET_STATUSES, tolerateStatuses } from "../reachability"

const CHAPTER_ID = "0D5wENdkdwbqlrHoaJ9g29"
const CHAPTER_IDS = "0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29"

export const simplifiedChapterSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("chapter"),
    chapter_number: z.number(),
    duration_ms: z.number(),
  })
  .passthrough()

export const chapterSchema = simplifiedChapterSchema
  .extend({
    audiobook: z.object({ id: z.string(), name: z.string() }).passthrough(),
  })
  .passthrough()

export const severalChaptersSchema = z
  .object({ chapters: z.array(simplifiedChapterSchema.nullable()) })
  .passthrough()

const descriptor: EndpointDescriptor = {
  name: "chapters",
  scopes: [],
  probes: [
    {
      name: "GET /chapters/{id}",
      run: () =>
        tolerateStatuses(MARKET_STATUSES, () =>
          spotifyGet(`/chapters/${CHAPTER_ID}`, chapterSchema)
        ),
    },
    {
      name: "GET /chapters?ids=...",
      run: () =>
        tolerateStatuses(BATCH_STATUSES, () =>
          spotifyGet(`/chapters?ids=${CHAPTER_IDS}`, severalChaptersSchema)
        ),
    },
  ],
}

export default descriptor
