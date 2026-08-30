import type { Roots } from "../page/page.ts"
import { rootsHere } from "../repo/roots/roots.ts"
import { answered } from "../tools/lib/page-query-answer.ts"
import { answerIn, paramsIn } from "./ask-answer.ts"
import type { Ask } from "./readout-resolver.ts"

export function askHere(roots?: Roots): Ask {
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
