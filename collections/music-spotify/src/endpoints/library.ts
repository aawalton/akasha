import { z } from "zod"
import {
  type OffsetPage,
  offsetPageSchema,
  paginateOffset,
  spotifyGet,
  spotifyRequest,
} from "../client"
import type { EndpointDescriptor } from "./types"

export const SAVED_TYPES = ["tracks", "albums", "episodes", "shows", "audiobooks"] as const

export type SavedType = (typeof SAVED_TYPES)[number]

const savedEntitySchema = z.object({ id: z.string().nullable(), name: z.string() }).passthrough()

const SAVED_ITEM_SCHEMAS = {
  tracks: z.object({ added_at: z.string(), track: savedEntitySchema }).passthrough(),
  albums: z.object({ added_at: z.string(), album: savedEntitySchema }).passthrough(),
  episodes: z.object({ added_at: z.string(), episode: savedEntitySchema }).passthrough(),
  shows: z.object({ added_at: z.string(), show: savedEntitySchema }).passthrough(),
  audiobooks: savedEntitySchema,
} as const satisfies Record<SavedType, z.ZodTypeAny>

export function savedItemSchema(type: SavedType): z.ZodTypeAny {
  return SAVED_ITEM_SCHEMAS[type]
}

const emptyBodySchema = z.null()

const containsSchema = z.array(z.boolean())

export interface ListOptions {
  readonly limit?: number
  readonly offset?: number
  readonly market?: string
}

export function buildListPath(type: SavedType, options: ListOptions = {}): string {
  const qs = new URLSearchParams()
  if (options.limit !== undefined) qs.set("limit", String(options.limit))
  if (options.offset !== undefined) qs.set("offset", String(options.offset))
  if (options.market !== undefined) qs.set("market", options.market)
  const query = qs.toString()
  return query.length > 0 ? `/me/${type}?${query}` : `/me/${type}`
}

export function buildContainsPath(type: SavedType, ids: readonly string[]): string {
  return `/me/${type}/contains?ids=${ids.join(",")}`
}

export function buildWritePath(type: SavedType, ids: readonly string[]): string {
  return `/me/${type}?ids=${ids.join(",")}`
}

export function listSavedPage(
  type: SavedType,
  options: ListOptions = {}
): Promise<OffsetPage<unknown>> {
  return spotifyGet(buildListPath(type, options), offsetPageSchema(savedItemSchema(type)))
}

export function paginateSaved(type: SavedType, options: ListOptions = {}): Promise<unknown[]> {
  return paginateOffset(buildListPath(type, options), savedItemSchema(type))
}

export function containsSaved(type: SavedType, ids: readonly string[]): Promise<boolean[]> {
  return spotifyGet(buildContainsPath(type, ids), containsSchema)
}

export async function saveSaved(type: SavedType, ids: readonly string[]): Promise<undefined> {
  await spotifyRequest(buildWritePath(type, ids), emptyBodySchema, { method: "PUT" })
  return undefined
}

export async function removeSaved(type: SavedType, ids: readonly string[]): Promise<undefined> {
  await spotifyRequest(buildWritePath(type, ids), emptyBodySchema, { method: "DELETE" })
  return undefined
}

export interface RoundTripResult {
  readonly type: SavedType
  readonly id: string
  readonly reachable: boolean
  readonly alreadySaved: boolean
  readonly mutated: boolean
  readonly note?: string
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export async function exerciseSavedRoundTrip(
  type: SavedType,
  id: string
): Promise<RoundTripResult> {
  const [initiallySaved] = await containsSaved(type, [id])
  if (initiallySaved === true) {
    return { type, id, reachable: true, alreadySaved: true, mutated: false }
  }

  try {
    await saveSaved(type, [id])
  } catch (err) {
    return {
      type,
      id,
      reachable: false,
      alreadySaved: false,
      mutated: false,
      note: errorMessage(err),
    }
  }

  try {
    const [afterSave] = await containsSaved(type, [id])
    if (afterSave !== true) {
      throw new Error(`save did not register as saved for ${type}:${id}`)
    }
  } finally {
    await removeSaved(type, [id])
  }

  const [afterRemove] = await containsSaved(type, [id])
  if (afterRemove !== false) {
    throw new Error(`remove did not restore unsaved state for ${type}:${id}`)
  }
  return { type, id, reachable: true, alreadySaved: false, mutated: true }
}

const EXERCISE_IDS = {
  tracks: "4PTG3Z6ehGkBFwjybzWkR8",
  albums: "4m2880jivSbbe0qfcP9cBR",
  episodes: "512ojhOuo1ktJprKbVcKyQ",
  shows: "38bS44xjbVVZ3No3ByF1dJ",
  audiobooks: "7iHfbu1YPACw6oZPAFJtqe",
} as const satisfies Record<SavedType, string>

async function runRoundTripProbe(type: SavedType): Promise<RoundTripResult> {
  const result = await exerciseSavedRoundTrip(type, EXERCISE_IDS[type])
  const status = result.reachable
    ? result.alreadySaved
      ? "reachable (already saved — left untouched)"
      : "reachable (saved → verified → removed → restored)"
    : `unreachable — ${result.note ?? "save rejected"}`
  console.log(`   library/${type}: ${status}`)
  return result
}

const descriptor: EndpointDescriptor = {
  name: "library",
  scopes: ["user-library-read", "user-library-modify"],
  probes: [
    ...SAVED_TYPES.map((type) => ({
      name: `GET /me/${type} (saved list, first page)`,
      run: () => listSavedPage(type, { limit: 5 }),
    })),
    ...SAVED_TYPES.map((type) => ({
      name: `save/contains/remove round-trip — ${type} (self-cleaning)`,
      run: () => runRoundTripProbe(type),
    })),
  ],
}

export default descriptor
