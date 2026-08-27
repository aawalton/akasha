import type { z } from "zod"

export function parseSpotifyResponse<T extends z.ZodTypeAny>(schema: T, body: unknown): z.infer<T> {
  return schema.parse(body)
}
