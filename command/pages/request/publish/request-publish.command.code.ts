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
import { requestPublish as page } from "akasha/command/pages/request/publish/request-publish.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textUnder } from "akasha/page/modules/value/page-value.module.code.ts"

const CARRIES = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const REQUEST = "feature-request"

const STANDING = "standing"

const PROPOSED = "proposed"

const PUBLISHED = "published"

const NO_SLUG =
  "the request said is empty, and a feature request is named by the slug that request declares"

export type Asked = {
  readonly slug: string
}

export function wrongIn(asked: Asked): readonly string[] {
  return asked.slug.trim() === "" ? [NO_SLUG] : []
}

export function noRequest(slug: string): string {
  return `\`${slug}\` names no feature request, so there is nothing to publish`
}

export function noStanding(slug: string): string {
  return `\`${slug}\` is a feature request saying no standing, so nothing was published`
}

export function otherThan(slug: string, standing: string): string {
  return `\`${slug}\` is at the standing \`${standing}\`, and only a proposed request is published`
}

export function messageFor(asked: Asked): string {
  return `publish the feature request ${asked.slug}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const now = `${asked.slug} is published`
  return commit === null ? [now] : [now, commit]
}

type Reached = {
  readonly at: string
  readonly standing: string | null
}

function reachedIn(root: string, slug: string): Reached | null {
  const one = listedAt(root, REQUEST, slug)[0]
  if (one === undefined) return null
  return { at: one.path, standing: textUnder(root, one.path, STANDING) }
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
    [{ at: CARRIES, given: { at, key: STANDING, to: PUBLISHED } }],
    messageFor(asked),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, landed.commit)])
}

export type Publishing = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function published(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const reached = reachedIn(root, asked.slug)
  if (reached === null) return mistaking([noRequest(asked.slug)])
  if (reached.standing === null) return mistaking([noStanding(asked.slug)])
  if (reached.standing !== PROPOSED) return mistaking([otherThan(asked.slug, reached.standing)])
  return await stated(done, root, reached.at, asked, given)
}

export async function publishedBy(
  asked: Asked,
  given: Given,
  publishing: Publishing = published
): Promise<Answer> {
  return await answering(async (done) => await publishing(done, asked, given))
}

export async function requestPublish(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [featureRequest])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = { slug: read.taken.featureRequest }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await publishedBy(asked, given)
}
