import { z } from "zod"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"

const ensureResponseSchema = z.object({
  status: z.enum(["ready", "generating", "unavailable"]),
})

export async function resolveShellEnsureRendition(track: {
  pageId: string
  medium: string
}): Promise<"ready" | "generating" | "unavailable"> {
  const res = await apiFetch(`/api/media/${track.pageId}/${track.medium}/ensure`, {
    method: "POST",
  })
  const body = await res.json().catch(() => null)
  const parsed = ensureResponseSchema.safeParse(body)
  return parsed.success ? parsed.data.status : "unavailable"
}
