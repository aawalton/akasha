import { safeInternalPath } from "@shared/pages-url"
import { assertNever } from "../../../../../shared/utils-narrow/src/assert-never"
import { z } from "zod"

const PushRoutePayloadSchema = z.object({ path: z.string() }).passthrough()

export function decidePushRoute(data: unknown): string | null {
  const parsed = PushRoutePayloadSchema.safeParse(data)
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

export type RegisterAction = "register" | "request" | "degrade"

export function decidePermissionAction(
  receive: "prompt" | "prompt-with-rationale" | "granted" | "denied"
): RegisterAction {
  switch (receive) {
    case "granted":
      return "register"
    case "prompt":
    case "prompt-with-rationale":
      return "request"
    case "denied":
      return "degrade"
    default:
      return assertNever(receive)
  }
}
