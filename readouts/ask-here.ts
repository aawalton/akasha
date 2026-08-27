import type { Roots } from "../page/page.ts"
import { rootsHere } from "../repo/roots/roots.ts"
import { answered } from "../tools/lib/page-query-answer.ts"
import { answerIn, paramsIn } from "./ask-over-http.ts"
import type { Ask } from "./readout-resolver.ts"

/**
 * Answer a readout's query in this process, off the checkouts on this machine.
 *
 * THE SERVICE IS NOT THE QUERY. A named query costs a few hundred milliseconds to answer; reaching
 * the page query service for it costs whatever its one thread is already busy with, which on a
 * loaded workstation has measured tens of seconds for the same answer. A caller sitting on the
 * same machine as the pages has no reason to pay that, so it reads them itself.
 *
 * IT IS THE SERVICE'S OWN MAPPING. `answered` is what the `/q/<name>` route calls, so a query
 * refused here is refused for the reason and with the words it would carry over the wire, and the
 * two paths cannot drift into disagreeing about what an answer is.
 */
export function askHere(roots?: Roots): Ask {
  // THE ROOTS ARE READ PER ASK, not when this is built. The editor extension sets `AKASHA_ROOT`
  // inside its activate, after its modules have loaded, so an ask that settled its roots at
  // construction would hold whatever was true before that line ran.
  return (querySlug, given) => {
    const { body, status } = answered(roots ?? rootsHere(), querySlug, paramsIn(given))
    if (status !== 200) {
      const why = (body as { readonly error?: unknown })?.error
      throw new Error(
        `\`${querySlug}\` went unanswered here: ${typeof why === "string" ? why : `status ${status}`}`
      )
    }
    return Promise.resolve(answerIn(body))
  }
}
