import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"

const CARRIES = "change-mechanical-file-content/remove-property-record"

const INTENTS = "intents"

const STATEMENT = "statement"

const TAKES = "this takes two words: an initiative and the statement the intent states"

const NO_STATEMENT =
  "the statement said is empty, and an intent is named by the statement it states"

export type Asked = {
  readonly slug: string
  readonly statement: string
}

export type Read = Asked | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const slug = argv[0]
  const statement = argv[1]
  if (slug === undefined || statement === undefined || argv.length !== 2) {
    return { refused: [`${TAKES}, and ${argv.length} arrived`] }
  }
  if (statement.trim() === "") return { refused: [NO_STATEMENT] }
  return { slug, statement }
}

export function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative, so it holds no intents to take one out of`
}

export function messageFor(asked: Asked): string {
  return `take the intent \`${asked.statement}\` out of ${asked.slug}`
}

export function saidFor(asked: Asked, commit: string | null): readonly string[] {
  const gone = `${asked.slug}: the intent \`${asked.statement}\` is gone`
  return commit === null ? [gone] : [gone, commit]
}

async function taken(root: string, at: string, asked: Asked, given: Given): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at, key: INTENTS, where: STATEMENT, is: asked.statement } }],
    messageFor(asked),
    given.agentId,
    { writer: given.writer }
  )
  if ("refusals" in landed) return { report: [], refusals: [...landed.refusals], code: 2 }
  return { report: [...saidFor(asked, landed.commit)], refusals: [], code: 0 }
}

export async function initiativeDeleteIntent(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: [...read.refused], code: 1 }
  try {
    const root = resolve(given.root)
    const one = initiativesDrawn(root).find((each) => each.slug === read.slug)
    if (one === undefined) return mistaking([noInitiative(read.slug)])
    return await taken(root, one.path, read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
