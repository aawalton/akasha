import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { loadedAt } from "akasha/changes/runners/modules/change-loading/change-loading.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/taking/argument-taking.module.code.ts"
import { change as changeArgument } from "akasha/commands/arguments/pages/change.argument.ts"
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
import { changeDraft as draftPage } from "akasha/commands/pages/change/draft/change-draft.command.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"

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
  return await changing(
    given.root,
    page,
    given.agentId,
    slug,
    inputIn,
    loadedAt,
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
