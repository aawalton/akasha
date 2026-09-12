import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"

const CARRIES = "change-mechanical-file-content/move-property-value"

const INTENTS = "intents"

const STATEMENT = "statement"

const TAKES =
  "this takes three words: an initiative, the statement the intent states and the statement the intent it is moved onto states"

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

export type Read = Asked | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const slug = argv[0]
  const statement = argv[1]
  const onto = argv[2]
  if (slug === undefined || statement === undefined || onto === undefined || argv.length !== 3) {
    return { refused: [`${TAKES}, and ${argv.length} arrived`] }
  }
  const refusals = [
    ...(statement.trim() === "" ? [NO_STATEMENT] : []),
    ...(onto.trim() === "" ? [NO_ONTO] : []),
  ]
  if (refusals.length > 0) return { refused: refusals }
  if (statement === onto) return { refused: [SAME] }
  return { slug, statement, onto }
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

async function carried(root: string, at: string, asked: Asked, given: Given): Promise<Answer> {
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
    { writer: given.writer }
  )
  if ("refusals" in landed) return refusedBy([...landed.refusals], DATA)
  return told([...saidFor(asked, landed.commit)])
}

export async function initiativeMoveIntent(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return mistaking([...read.refused])
  try {
    const root = resolve(given.root)
    const one = initiativesDrawn(root).find((each) => each.slug === read.slug)
    if (one === undefined) return mistaking([noInitiative(read.slug)])
    return await carried(root, one.path, read, given)
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
