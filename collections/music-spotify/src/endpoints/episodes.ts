import { z } from "zod"
import { spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"
import { BATCH_STATUSES, MARKET_STATUSES, tolerateStatuses } from "../reachability"

const EPISODE_ID = "512ojhOuo1ktJprKbVcKyQ"
const EPISODE_IDS = "77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf"

export const resumePointSchema = z
  .object({
    fully_played: z.boolean(),
    resume_position_ms: z.number(),
  })
  .passthrough()

export const simplifiedEpisodeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("episode"),
    duration_ms: z.number(),
    release_date: z.string(),
    resume_point: resumePointSchema.optional(),
  })
  .passthrough()

export const episodeSchema = simplifiedEpisodeSchema
  .extend({
    show: z.object({ id: z.string(), name: z.string() }).passthrough(),
  })
  .passthrough()

export const severalEpisodesSchema = z
  .object({ episodes: z.array(simplifiedEpisodeSchema.nullable()) })
  .passthrough()

const descriptor: EndpointDescriptor = {
  name: "episodes",
  scopes: [],
  probes: [
    {
      name: "GET /episodes/{id}",
      run: () =>
        tolerateStatuses(MARKET_STATUSES, () =>
          spotifyGet(`/episodes/${EPISODE_ID}`, episodeSchema)
        ),
    },
    {
      name: "GET /episodes?ids=...",
      run: () =>
        tolerateStatuses(BATCH_STATUSES, () =>
          spotifyGet(`/episodes?ids=${EPISODE_IDS}`, severalEpisodesSchema)
        ),
    },
  ],
}

export default descriptor
