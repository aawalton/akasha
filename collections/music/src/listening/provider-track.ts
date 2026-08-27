import { z } from "zod"

const providerArtistSchema = z.object({ name: z.string().optional() }).passthrough()

const providerTrackSchema = z
  .object({
    id: z.string().nullable().optional(),
    name: z.string().optional(),
    duration_ms: z.number().optional(),
    artists: z.array(providerArtistSchema).optional(),
  })
  .passthrough()

export interface ProviderTrack {
  readonly id: string
  readonly name: string
  readonly durationMs: number | undefined
  readonly artistName: string
}

export function parseProviderTrack(raw: unknown): ProviderTrack | null {
  const parsed = providerTrackSchema.safeParse(raw)
  if (!parsed.success) return null
  const { id, name, duration_ms: durationMs, artists } = parsed.data
  if (typeof id !== "string" || id === "") return null
  return {
    id,
    name: name ?? "",
    durationMs,
    artistName: artists?.[0]?.name ?? "",
  }
}
