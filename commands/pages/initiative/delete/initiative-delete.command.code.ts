import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativesDrawn } from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"
import {
  listedByPath,
  type Named,
  namersOf,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CARRIES = "change-mechanical/remove-file-of-any-kind"

const TAKES = "this takes one word: the initiative to take away"

const REFRESH = "the index files those names until `akasha index refresh` runs"

export type Read = { readonly slug: string } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const slug = argv[0]
  if (slug === undefined || argv.length !== 1) {
    return { refused: [`${TAKES}, and ${argv.length} arrived`] }
  }
  return { slug }
}

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
    { writer: given.writer }
  )
  if ("refusals" in landed) return { report: [], refusals: [...landed.refusals], code: 2 }
  return { report: [...saidFor(slug, naming, landed.commit)], refusals: [], code: 0 }
}

export async function initiativeDelete(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: [...read.refused], code: 1 }
  try {
    const root = resolve(given.root)
    const one = initiativesDrawn(root).find((each) => each.slug === read.slug)
    if (one === undefined) return mistaking([noInitiative(read.slug)])
    return await away(root, one.path, read.slug, namingIn(root, one.path), given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
