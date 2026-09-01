import { askTaking } from "@shared/pages-query"
import type { Ask } from "./readout-resolver.ts"

export function askHere(): Ask {
  return async (querySlug, given) => {
    const asked = await askTaking(querySlug, given)
    if (!asked.ok) {
      throw new Error(`\`${querySlug}\` went unanswered here: ${asked.why}`)
    }
    return asked.answer
  }
}
