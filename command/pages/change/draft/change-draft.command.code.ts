import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { runAgentChange } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { change as changeArgument } from "akasha/command/argument/pages/change.argument.ts"
import {
  answering,
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { CHANGE_DRAFT_SLUG } from "akasha/command/modules/change-costing/change-costing.module.code.ts"
import type { Chosen } from "akasha/command/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { changeDraft as draftPage } from "akasha/command/pages/change/draft/change-draft.command.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

const NAMED = [changeArgument]

const DRAFTS = "draft"

const LANDS = "a draft lands nothing, so no message is composed and none is taken"

export const CHOSEN: Omit<Chosen, "calledAs"> = {
  said: DRAFTS,
  drafts: true,
  barred: ["draft", "message", "measure"],
  slug: CHANGE_DRAFT_SLUG,
}

async function nothing(): Promise<Answer> {
  return refusedBy([LANDS], OPERATIONAL)
}

export type Running = (
  done: string[],
  page: string,
  slug: string | undefined,
  given: Given
) => Promise<Answer>

async function ranChange(
  done: string[],
  page: string,
  slug: string | undefined,
  given: Given
): Promise<Answer> {
  return await runAgentChange(
    given.root,
    page,
    given.agentId,
    slug,
    inputIn,
    nothing,
    { ...CHOSEN, calledAs: given.calledAs },
    done
  )
}

export async function drafted(
  page: string,
  slug: string | undefined,
  given: Given,
  running: Running = ranChange
): Promise<Answer> {
  return await answering(async (done) => await running(done, page, slug, given))
}

export async function changeDraft(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, draftPage, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await drafted(page, read.taken.change, given)
}
