import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "akasha/changes/runners/change-loading/change-loading.module.code.ts"
import {
  answering,
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import { CHANGE_DRAFT_SLUG } from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import {
  type Chosen,
  changing,
} from "akasha/commands/modules/change-running/change-running.module.code.ts"
import { inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

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
  argv: readonly string[],
  given: Given
) => Promise<Answer>

async function ranChange(
  done: string[],
  page: string,
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await changing(
    given.root,
    page,
    given.agentId,
    argv,
    inputIn,
    loadedAt,
    nothing,
    { ...CHOSEN, calledAs: given.calledAs },
    done
  )
}

export async function drafted(
  page: string,
  argv: readonly string[],
  given: Given,
  running: Running = ranChange
): Promise<Answer> {
  return await answering(async (done) => await running(done, page, argv, given))
}

export async function changeDraft(argv: readonly string[], given: Given): Promise<Answer> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  return await drafted(page, argv, given)
}
