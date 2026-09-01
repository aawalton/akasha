import type { Ask } from "readouts/readout-resolver"

const NOTHING_ANSWERS = [
  "a readout asks by the slug of a query kept as a file in the checkout,",
  "and the engine that read those files is gone.",
  "the pages system service answers a query stated whole rather than one asked for by name.",
].join(" ")

export function askVia(): Ask {
  return async (querySlug) => {
    throw new Error(`askVia: \`${querySlug}\`: ${NOTHING_ANSWERS}`)
  }
}
