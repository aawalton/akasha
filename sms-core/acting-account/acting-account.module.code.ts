import { z } from "zod"

const SERVER_FOOTER_MARKER = "— inbound SMS channel"

const ACTING_ACCOUNT_LINE =
  /^acting for account ([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/m

const ACTING_ACCOUNT_CAPTURE = z.tuple([z.string(), z.string()])

export function extractActingAccountUserId(surface: string): string | null {
  const markerIndex = surface.lastIndexOf(SERVER_FOOTER_MARKER)
  if (markerIndex === -1) return null
  const trustedTail = surface.slice(markerIndex)
  const parsed = ACTING_ACCOUNT_CAPTURE.safeParse(ACTING_ACCOUNT_LINE.exec(trustedTail))
  if (!parsed.success) return null
  return parsed.data[1].toLowerCase()
}
