import { askTaking, type Fetcher } from "@shared/pages-query"
import type { Ask } from "../../../readouts/readout-resolver.ts"

export function askVia(fetcher?: Fetcher): Ask {
  return async (querySlug, given) => {
    const asked = await askTaking(querySlug, given, fetcher)
    if (!asked.ok) throw new Error(asked.why)
    return asked.answer
  }
}
