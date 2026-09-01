import { READOUT_CACHE_CONTROL } from "@akasha/readout-system/readout-credential"
import { guardReadout } from "~/readout-credential/lib/readout-credential.server"
import type { Route } from "./+types/api.values-stoplights"

// Stubbed. The engine behind this endpoint resolved its readouts by parsing markdown
// frontmatter across the whole page tree, uncached, on every request. It is out of the
// serving path now. Nothing fills these tiles until their readouts are akasha pages.
const stoplights: readonly never[] = []

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const refusal = await guardReadout(request)
  if (refusal !== null) return refusal
  return Response.json({ stoplights }, { headers: { "Cache-Control": READOUT_CACHE_CONTROL } })
}
