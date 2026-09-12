import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  DROP_WORDS,
  dropping,
  noPageSaid,
  pipedPathsIn,
} from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  helpIn,
  wordlessIn,
} from "akasha/commands/pages/change/change-arguing/change-arguing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const DROPS = "drop"

const HELP: readonly string[] = [
  "takes kept edits away without landing any of them.",
  "",
  "It takes no word on the command line, and its arguments piped in:",
  "",
  "  at: <path>    one edit to take away, on a line of its own, repeated for each",
  "  all: true     every edit kept, said instead of any `at`",
  "",
  "A path is read against the repository root.",
  "A call piping nothing in is refused rather than taking every edit away.",
]

export function changeDrop(argv: readonly string[], given: Given): Answer {
  const help = helpIn(argv, given.calledAs, HELP)
  if (help !== null) return told(help)
  const why = wordlessIn(argv, DROPS)
  if (why !== null) return mistaking([why])
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const piped = pipedPathsIn(inputIn, DROP_WORDS)
  if (typeof piped === "string") return mistaking([piped])
  return dropping(given.root, page, piped)
}
