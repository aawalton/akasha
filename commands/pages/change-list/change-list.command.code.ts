import { agentPathOf } from "@akasha/context/warranting"
import { editsAt } from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import {
  listingHanded,
  listingKept,
} from "../../../command-system/change-acting/change-acting.module.code.ts"
import { noPageSaid } from "../change/change.command.code.ts"

const DASH = "-"

const ONE_AGENT = "a list names one subagent or none, and this call named more"

const NO_FLAGS = "a list names a subagent as a bare word, and takes no flag"

export function refusalIn(argv: readonly string[]): string | null {
  if (argv.length > 1) return ONE_AGENT
  return argv[0]?.startsWith(DASH) === true ? NO_FLAGS : null
}

export function changeList(argv: readonly string[], given: Given): Answer {
  const why = refusalIn(argv)
  if (why !== null) return mistaking([why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const under = argv[0]
  return under === undefined
    ? listingKept(given.root, page)
    : listingHanded(given.root, page, under)
}
