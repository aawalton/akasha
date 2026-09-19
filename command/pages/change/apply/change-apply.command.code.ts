import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { runAgentChange } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { change as changeArgument } from "akasha/command/argument/pages/change.argument.ts"
import { draft as draftArgument } from "akasha/command/argument/pages/draft.argument.ts"
import { answering } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  applyingKept,
  applyWith,
} from "akasha/command/modules/apply-running/apply-running.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import { CHANGE_APPLY_SLUG } from "akasha/command/modules/change-costing/change-costing.module.code.ts"
import type { Chosen } from "akasha/command/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { changeApply as applyPage } from "akasha/command/pages/change/apply/change-apply.command.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

const NAMED = [changeArgument, draftArgument]

const APPLIES = "apply"

const KEEPS = "drafting apply"

const MESSAGE = "message"

const MEASURE = "measure"

const TRUE = "true"

const BARRED = ["draft"]

const KEPT_BARRED = ["draft", "message", "measure"]

export function chosenFor(drafts: boolean): Omit<Chosen, "calledAs"> {
  return {
    said: drafts ? KEEPS : APPLIES,
    drafts,
    barred: drafts ? KEPT_BARRED : BARRED,
    slug: CHANGE_APPLY_SLUG,
  }
}

export type Running = (
  done: string[],
  page: string,
  slug: string | undefined,
  given: Given,
  drafts: boolean
) => Promise<Answer>

async function ranChange(
  done: string[],
  page: string,
  slug: string | undefined,
  given: Given,
  drafts: boolean
): Promise<Answer> {
  const landing = async (message: string | null, measure: boolean): Promise<Answer> => {
    const taken: Record<string, string> = {}
    if (message !== null) taken[MESSAGE] = message
    if (measure) taken[MEASURE] = TRUE
    return await applyWith(taken, given)
  }
  return await runAgentChange(
    given.root,
    page,
    given.agentId,
    slug,
    inputIn,
    landing,
    { ...chosenFor(drafts), calledAs: given.calledAs },
    done
  )
}

export async function answered(
  page: string,
  slug: string | undefined,
  given: Given,
  drafts: boolean,
  running: Running = ranChange
): Promise<Answer> {
  return await answering(async (done) => await running(done, page, slug, given, drafts))
}

export async function changeApply(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, applyPage, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.change
  const drafts = read.taken.draft
  if (slug === undefined && !drafts) return await applyingKept(given)
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await answered(page, slug, given, drafts)
}
