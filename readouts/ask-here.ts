import type { Ask } from "./readout-resolver.ts"

// A readout names a saved query and asks it with the day filled in. A saved query was a file in
// the checkout, read by the page engine that `4c1f05a264` severed, so nothing answers one now:
// `askTaking` refuses every slug it is handed. This asked it anyway and threw on the refusal, so
// the reach into `@shared/pages-query` bought a longer road to the same stop.
//
// The refusal is stated here instead, where the reader stands, and names the service to ask. What
// a readout wants is rows and a reduction over them, and the service answers rows and reduces
// nothing, so the reduction each saved query carried has to be written at the caller — as
// `alanwalton/web/app/routes/api.claude-usage.ts` does for the four it took over.
const NO_SAVED_QUERY =
  "a saved query is answered by the page engine that has been removed, so no readout is answered here. ask `@akasha/pages-system-service/calling` for the rows and reduce them where the readout is drawn"

export function askHere(): Ask {
  return async (querySlug) => {
    throw new Error(`\`${querySlug}\` went unanswered here: ${NO_SAVED_QUERY}`)
  }
}
