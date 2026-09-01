import { NO_READING } from "@akasha/readout-system/readout-serving"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.persona-stoplights"

// Stubbed. The engine behind this endpoint resolved its readouts by parsing markdown
// frontmatter across the whole page tree, uncached, once per request. It is out of the
// serving path now. This refuses rather than answering an empty list, because a day
// that truly drew nothing and an engine that is gone read alike, and only one is a fault.

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  return Response.json(NO_READING, {
    status: 503,
    headers: { "Cache-Control": "private, no-store" },
  })
}
