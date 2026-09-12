import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type {
  Commanding,
  TakenFor,
} from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

export type Taking<Page extends Commanding, Pages extends readonly Argument[]> = TakenFor<
  Page,
  Pages[number]
>

export type Generating<Taken> = (
  done: string[],
  taken: Taken,
  given: Given
) => Answer | Promise<Answer>

export async function answeredByPage<Page extends Commanding, Pages extends readonly Argument[]>(
  argv: readonly string[],
  calledAs: string,
  page: Page,
  pages: Pages,
  act: (taken: TakenFor<Page, Pages[number]>, done: string[]) => Answer | Promise<Answer>
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, pages)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  return await answering((done) => act(taken, done))
}
