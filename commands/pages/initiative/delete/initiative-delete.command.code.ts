import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { initiative } from "akasha/commands/arguments/pages/initiative.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativeDelete as page } from "akasha/commands/pages/initiative/delete/initiative-delete.command.ts"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"
import {
  listedByPath,
  type Named,
  namersOf,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CARRIES = "change-mechanical/remove-file-of-any-kind"

const REFRESH = "the index files those names until `akasha index refresh` runs"

export function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative, so there is no page to take away`
}

export function messageFor(slug: string): string {
  return `delete the initiative ${slug}`
}

export function namedSaid(one: Named): string {
  return `\`${one.path}\` still names it as its \`${one.propertySlug}\``
}

export function saidFor(
  slug: string,
  naming: readonly Named[],
  commit: string | null
): readonly string[] {
  return [
    `${slug} is gone`,
    ...naming.map(namedSaid),
    ...(naming.length === 0 ? [] : [REFRESH]),
    ...(commit === null ? [] : [commit]),
  ]
}

export function namingOver(found: readonly Named[], path: string): readonly Named[] {
  const held = new Map<string, Named>()
  for (const one of found) {
    if (one.path === path) continue
    held.set(`${one.path} ${one.propertySlug}`, one)
  }
  return [...held.keys()].sort().flatMap((key) => {
    const one = held.get(key)
    return one === undefined ? [] : [one]
  })
}

function namingIn(root: string, path: string): readonly Named[] {
  const listed = listedByPath(root, path)[0]
  return listed === undefined ? [] : namingOver(namersOf(root, listed.id), path)
}

async function away(
  done: string[],
  root: string,
  at: string,
  slug: string,
  naming: readonly Named[],
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at } }],
    messageFor(slug),
    given.agentId,
    { writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(slug, naming, landed.commit)])
}

export type Taking = (done: string[], named: string, given: Given) => Promise<Answer>

async function takenAway(done: string[], named: string, given: Given): Promise<Answer> {
  const root = resolve(given.root)
  const one = initiativesDrawn(root).find((each) => each.slug === named)
  if (one === undefined) return mistaking([noInitiative(named)])
  return await away(done, root, one.path, named, namingIn(root, one.path), given)
}

export async function takenAwayBy(
  named: string,
  given: Given,
  taking: Taking = takenAway
): Promise<Answer> {
  return await answering(async (done) => await taking(done, named, given))
}

export async function initiativeDelete(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [initiative])
  if ("refused" in read) return mistaking([...read.refused])
  return await takenAwayBy(read.taken.initiative, given)
}
