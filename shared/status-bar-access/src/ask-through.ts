import { askTaking } from "@shared/pages-query"
import type { Ask } from "readouts/readout-resolver"

export function askVia(): Ask {
  return async (querySlug, given) => {
    const asked = await askTaking(querySlug, given)
    if (!asked.ok) throw new Error(asked.why)
    return asked.answer
  }
}
