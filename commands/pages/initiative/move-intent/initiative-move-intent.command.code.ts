import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { initiative } from "akasha/commands/arguments/pages/initiative.argument.ts"
import { onto } from "akasha/commands/arguments/pages/onto.argument.ts"
import { statement } from "akasha/commands/arguments/pages/statement.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativeMoveIntent as page } from "akasha/commands/pages/initiative/move-intent/initiative-move-intent.command.ts"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"

const CARRIES = "change-mechanical-file-content/move-property-value"

const INTENTS = "intents"

const STATEMENT = "statement"

const NO_STATEMENT =
  "the statement said is empty, and an intent is named by the statement it states"

const NO_ONTO =
  "the intent moved onto is said as nothing, and an intent is named by the statement it states"

const SAME = "an intent moved onto itself moves nowhere"

export type Asked = {
  readonly slug: string
  readonly statement: string
  readonly onto: string
}

export function wrongIn(asked: Asked): readonly string[] {
  const wrong = [
    ...(asked.statement.trim() === "" ? [NO_STATEMENT] : []),
    ...(asked.onto.trim() === "" ? [NO_ONTO] : []),
  ]
  if (wrong.length > 0) return wrong
  return asked.statement === asked.onto ? [SAME] : []
}

export function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative, so it holds no intents to order`
}

export function messageFor(asked: Asked): string {
  return `move the intent \`${asked.statement}\` of ${asked.slug} onto \`${asked.onto}\``
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const moved = `${asked.slug}: the intent \`${asked.statement}\` now sits where \`${asked.onto}\` did`
  return commit === null ? [moved] : [moved, commit]
}

async function placed(
  done: string[],
  root: string,
  at: string,
  asked: Asked,
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [
      {
        at: CARRIES,
        given: { at, key: INTENTS, where: STATEMENT, is: asked.statement, onto: asked.onto },
      },
    ],
    messageFor(asked),
    given.agentId,
    { writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(asked, landed.commit)])
}

export type Carrying = (done: string[], asked: Asked, given: Given) => Promise<Answer>

async function carried(done: string[], asked: Asked, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const one = initiativesDrawn(root).find((each) => each.slug === asked.slug)
  if (one === undefined) return mistaking([noInitiative(asked.slug)])
  return await placed(done, root, one.path, asked, given)
}

export async function carriedBy(
  asked: Asked,
  given: Given,
  carrying: Carrying = carried
): Promise<Answer> {
  return await answering(async (done) => await carrying(done, asked, given))
}

export async function initiativeMoveIntent(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [initiative, statement, onto])
  if ("refused" in read) return mistaking([...read.refused])
  const asked: Asked = {
    slug: read.taken.initiative,
    statement: read.taken.statement,
    onto: read.taken.onto,
  }
  const wrong = wrongIn(asked)
  if (wrong.length > 0) return mistaking(wrong)
  return await carriedBy(asked, given)
}
