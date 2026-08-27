import { z } from "zod"
import { offsetPageSchema, paginateOffset, spotifyGet } from "../client"
import type { EndpointDescriptor } from "./types"
import { BATCH_STATUSES, MARKET_STATUSES, tolerateStatuses } from "../reachability"

const SHOW_ID = "4rOoJ6Egrf8K2IrywzwOMk"
const SHOW_IDS = "5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ"

export const simplifiedEpisodeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("episode"),
    duration_ms: z.number(),
  })
  .passthrough()

export const simplifiedShowSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("show"),
    publisher: z.string().optional(),
    total_episodes: z.number(),
  })
  .passthrough()

export const showSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.literal("show"),
    publisher: z.string().optional(),
    total_episodes: z.number(),
    episodes: offsetPageSchema(simplifiedEpisodeSchema.nullable()),
  })
  .passthrough()

export const severalShowsSchema = z
  .object({ shows: z.array(simplifiedShowSchema.nullable()) })
  .passthrough()

const descriptor: EndpointDescriptor = {
  name: "shows",
  scopes: [],
  probes: [
    {
      name: "GET /shows/{id}",
      run: () =>
        tolerateStatuses(MARKET_STATUSES, () => spotifyGet(`/shows/${SHOW_ID}`, showSchema)),
    },
    {
      name: "GET /shows?ids=...",
      run: () =>
        tolerateStatuses(BATCH_STATUSES, () =>
          spotifyGet(`/shows?ids=${SHOW_IDS}`, severalShowsSchema)
        ),
    },
    {
      name: "GET /shows/{id}/episodes",
      run: () =>
        tolerateStatuses(MARKET_STATUSES, () =>
          paginateOffset(`/shows/${SHOW_ID}/episodes?limit=50`, simplifiedEpisodeSchema.nullable())
        ),
    },
  ],
}

export default descriptor
