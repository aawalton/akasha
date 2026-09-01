import { NO_READING } from "@akasha/readout-system/readout-categorization"
import { refuseUncredentialedRingCaller } from "~/lib/ring-credential.server"
import type { Route } from "./+types/api.safety-level"

// Stubbed. The engine behind this endpoint resolved its readouts by parsing markdown
// frontmatter across the whole page tree, uncached, once per request. It is out of the
// serving path now. This refuses rather than answering an empty list, because a day
// that truly drew nothing and an engine that is gone read alike, and only one is a fault.

export function loader({ request }: Route.LoaderArgs): Response {
  const refusal = refuseUncredentialedRingCaller(request)
  if (refusal !== null) return refusal
  return Response.json(NO_READING, {
    status: 503,
    headers: { "Cache-Control": "private, no-store" },
  })
}
