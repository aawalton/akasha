import {
  landingTracked,
  outsideTracked,
  trackedIn,
} from "akasha/alan/track/modules/landing/track-landing.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { MECHANICAL_KIND } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { commitMessage } from "akasha/command/argument/pages/commit-message.argument.ts"
import { contentFile } from "akasha/command/argument/pages/content-file.argument.ts"
import { filePath } from "akasha/command/argument/pages/file-path.argument.ts"
import { messageFile } from "akasha/command/argument/pages/message-file.argument.ts"
import { removePath } from "akasha/command/argument/pages/remove-path.argument.ts"
import { answering } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Asking,
  builtOf,
} from "akasha/command/modules/file-arguing/file-arguing.module.code.ts"
import { messageFrom } from "akasha/command/modules/flags/command-flags.module.code.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { pathAt } from "akasha/command/modules/said-pathing/said-pathing.module.code.ts"
import { alanTracking as page } from "akasha/command/pages/alan/tracking/alan-tracking.command.ts"

const NAMED = [commitMessage, messageFile, contentFile, filePath, removePath]

export type Taken = {
  readonly commitMessage?: string
  readonly messageFile?: string
  readonly contentFile?: string
  readonly filePath?: string
  readonly removePath: readonly string[]
}

export function strayIn(root: string, taken: Taken): readonly string[] {
  const every =
    taken.filePath === undefined ? taken.removePath : [taken.filePath, ...taken.removePath]
  const said: string[] = []
  for (const one of every) {
    if (!trackedIn(pathAt(root, one))) said.push(outsideTracked(one))
  }
  return said
}

function askingIn(taken: Taken): Asking | { readonly refusals: readonly string[] } {
  if (taken.filePath === undefined && taken.contentFile !== undefined) {
    return { refusals: [`${contentFile.said} ${taken.contentFile} follows no ${filePath.said}`] }
  }
  const said = messageFrom(taken.commitMessage, taken.messageFile)
  if ("refusals" in said) return said
  const pairs =
    taken.filePath === undefined ? [] : [{ path: taken.filePath, from: taken.contentFile ?? null }]
  return { pairs, removals: taken.removePath, message: said.message }
}

export type Landing = (
  done: string[],
  root: string,
  changes: readonly FileChange[],
  message: string
) => Promise<Answer>

export async function trackedBy(
  taken: Taken,
  given: Given,
  landing: Landing = landingTracked
): Promise<Answer> {
  const asking = askingIn(taken)
  if ("refusals" in asking) return mistaking(asking.refusals)
  return await answering(async (done) => {
    const built = builtOf(asking, given, inputIn, MECHANICAL_KIND)
    if ("code" in built) return built
    return await landing(done, given.root, built.changes, built.message)
  })
}

export async function alanTracking(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const stray = strayIn(given.root, taken)
  if (stray.length > 0) return mistaking(stray)
  return await trackedBy(taken, given)
}
