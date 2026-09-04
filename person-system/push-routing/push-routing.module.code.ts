import { safeInternalPath } from "@akasha/pages-url/safe-target"
import { z } from "zod"

const pushRoutePayloadSchema = z.object({ path: z.string() }).passthrough()

export function decidePushRoute(data: unknown): string | null {
  const parsed = pushRoutePayloadSchema.safeParse(data)
  if (!parsed.success) return null
  return safeInternalPath(parsed.data.path)
}

export function decideOpenUrlRoute(rawUrl: unknown): string | null {
  if (typeof rawUrl !== "string") return null

  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return null
  }
  return safeInternalPath(`${parsed.pathname}${parsed.search}`)
}
