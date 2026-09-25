import { resolve } from "node:path"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { featureRequest } from "akasha/command/argument/pages/feature-request.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { requestComplete as page } from "akasha/command/pages/request/complete/request-complete.command.ts"
import {
  type Asked,
  reachedIn,
  STANDING,
  wrongIn,
} from "akasha/command/pages/request/modules/reaching/request-reaching.module.code.ts"

const CARRIES = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const PUBLISHED = "published"

const COMPLETED = "completed"

export function noRequest(slug: string): string {
  return `\`${slug}\` names no feature request, so there is nothing to complete`
}

export function noStanding(slug: string): string {
  return `\`${slug}\` is a feature request saying no standing, so nothing was completed`
}

export function otherThan(slug: string, standing: string): string {
  return `\`${slug}\` is at the standing \`${standing}\`, and only a published request is completed`
}

export function messageFor(asked: Asked): string {
  return `complete the feature request ${asked.slug}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const now = `${asked.slug} is completed`
  return commit === null ? [now] : [now, commit]
}

async function stated(
  done: string[],
  root: string,
  at: string,
  asked: Asked,
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at, key: STANDING, to: COMPLETED } }],
    messageFor(asked),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, landed.commit)])
}

type Completing = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function completed(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const reached = reachedIn(root, asked.slug)
  if (reached === null) return mistaking([noRequest(asked.slug)])
  if (reached.standing === null) return mistaking([noStanding(asked.slug)])
  if (reached.standing !== PUBLISHED) return mistaking([otherThan(asked.slug, reached.standing)])
  return await stated(done, root, reached.at, asked, given)
}

export async function completedBy(
  asked: Asked,
  given: Given,
  completing: Completing = completed
): Promise<Answer> {
  return await answering(async (done) => await completing(done, asked, given))
}

export async function requestComplete(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [featureRequest])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = { slug: read.taken.featureRequest }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await completedBy(asked, given)
}
