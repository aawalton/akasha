import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { CHANGE_DRAFT_SLUG } from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import {
  type Chosen,
  changing,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { helpIn } from "akasha/commands/pages/change/change-arguing/change-arguing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

const DRAFTS = "draft"

const LANDS = "a draft lands nothing, so no message is composed and none is taken"

const HELP: readonly string[] = [
  "answers one change and keeps its edits rather than landing them.",
  "",
  "It takes the change to answer as its one word, and that change's arguments piped in:",
  "",
  "  key: value",
  "  key <fence>",
  "  <the body>",
  "  <fence>",
  "",
  "The fence is yours to pick, and a body carrying its own fence as a line takes another.",
  "A body opened `key <fence> no-newline` keeps no newline on its last line.",
  "`at` names a path, and a path is read against the repository root.",
  "`message`, `draft` and `measure` are refused here, since nothing lands.",
  "A call naming no change is refused with every change there is to name.",
  "The edits are kept beside this agent's page, and `akasha change apply` lands them.",
]

export const CHOSEN: Omit<Chosen, "calledAs"> = {
  said: DRAFTS,
  drafts: true,
  barred: ["draft", "message", "measure"],
  slug: CHANGE_DRAFT_SLUG,
}

async function nothing(): Promise<Answer> {
  return { report: [], refusals: [LANDS], code: 3 }
}

export async function changeDraft(argv: readonly string[], given: Given): Promise<Answer> {
  const help = helpIn(argv, given.calledAs, HELP)
  if (help !== null) return told(help)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await changing(given.root, page, given.agentId, argv, inputIn, loadedAt, nothing, {
    ...CHOSEN,
    calledAs: given.calledAs,
  })
}
