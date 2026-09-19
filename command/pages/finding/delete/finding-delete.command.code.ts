import { resolve } from "node:path"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { finding } from "akasha/command/argument/pages/finding.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { findingDelete as page } from "akasha/command/pages/finding/delete/finding-delete.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const CARRIES = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const FINDING = "finding"

const NO_NAME = "the finding said is empty, and a finding is named by the slug it is filed under"

export function wrongIn(slug: string): readonly string[] {
  return slug.trim() === "" ? [NO_NAME] : []
}

export function noFinding(slug: string): string {
  return `\`${slug}\` names no finding, so there is no page to take away`
}

export function messageFor(slug: string): string {
  return `take the finding ${slug} away`
}

export function saidFor(slug: string, commit: string | null): readonly string[] {
  const gone = `${slug} is gone`
  return commit === null ? [gone] : [gone, commit]
}

async function taken(
  done: string[],
  root: string,
  at: string,
  slug: string,
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at } }],
    messageFor(slug),
    {
      agentId: given.agentId,
      writer: given.writer,
      done,
    }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(slug, landed.commit)])
}

export type Dropping = (done: string[], slug: string, given: Given) => Promise<Answer>

async function dropped(done: string[], slug: string, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const one = listedAt(root, FINDING, slug)[0]
  if (one === undefined) return mistaking([noFinding(slug)])
  return await taken(done, root, one.path, slug, given)
}

export async function droppedBy(
  slug: string,
  given: Given,
  dropping: Dropping = dropped
): Promise<Answer> {
  return await answering(async (done) => await dropping(done, slug, given))
}

export async function findingDelete(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [finding])
  if ("refused" in read) return mistaking([...read.refused])
  const slug = read.taken.finding
  const wrong = wrongIn(slug)
  if (wrong.length > 0) return mistaking(wrong)
  return await droppedBy(slug, given)
}
