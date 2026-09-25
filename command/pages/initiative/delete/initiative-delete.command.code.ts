import { resolve } from "node:path"
import { seatPersona } from "akasha/agent/seat/properties/seat-persona.relation-property.ts"
import { seat as seatPageType } from "akasha/agent/seat/seat.page-type.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import { changePagePagePropertyRelation } from "akasha/change/mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { initiative } from "akasha/command/argument/pages/initiative.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { initiativeDelete as page } from "akasha/command/pages/initiative/delete/initiative-delete.command.ts"
import { initiativesDrawn } from "akasha/domain/modules/work-initiatives/work-initiatives.module.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  type Named,
  namersOf,
} from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import {
  slugAt,
  textAt,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { persona as personaPageType } from "akasha/persona/persona.page-type.ts"

const ID = "id"

const CARRIES = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

const REASSIGNS =
  `${changeMechanicalFileContent.slug}/${changePagePagePropertyRelation.slug}` as const

const ASSIGNMENT = "assignment-slug"

const ASSIGNMENT_KEY = "assignmentSlug"

const TYPE = "type"

const CHAMPIONS = "championedDomain"

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

export type Reassigned = { readonly path: string; readonly to: string }

export type Reassigning = {
  readonly reassigned: readonly Reassigned[]
  readonly left: readonly Named[]
}

export function reassignedSaid(one: Reassigned): string {
  return `\`${one.path}\` answers to ${one.to}, the domain its persona champions`
}

export function defaultAssignmentOf(
  seat: Value | null,
  personaOf: (slug: string) => Value | null
): string | null {
  if (seat === null || slugAt(seat, TYPE) !== seatPageType.slug) return null
  const persona = slugAt(seat, seatPersona.propertySlug)
  const held = persona === null ? null : personaOf(persona)
  return held === null ? null : textIn(held, CHAMPIONS)
}

export function reassigning(
  naming: readonly Named[],
  defaultAt: (path: string) => string | null
): Reassigning {
  const reassigned: Reassigned[] = []
  const left: Named[] = []
  for (const one of naming) {
    const to = one.propertySlug === ASSIGNMENT ? defaultAt(one.path) : null
    if (to === null) left.push(one)
    else reassigned.push({ path: one.path, to })
  }
  return { reassigned, left }
}

export function askingFor(at: string, reassigned: readonly Reassigned[]): readonly Asking[] {
  return [
    ...reassigned.map(
      (one): Asking => ({
        at: REASSIGNS,
        given: { at: one.path, key: ASSIGNMENT_KEY, to: one.to },
      })
    ),
    { at: CARRIES, given: { at } },
  ]
}

export function saidFor(
  slug: string,
  { reassigned, left: naming }: Reassigning,
  commit: string | null
): readonly string[] {
  return [
    `${slug} is gone`,
    ...reassigned.map(reassignedSaid),
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
  const value = valueByPath(root, path)
  const id = value === null ? null : textAt(value, ID)
  return id === null ? [] : namingOver(namersOf(root, id), path)
}

function personaIn(root: string, slug: string): Value | null {
  const one = listedAt(root, personaPageType.slug, slug)[0]
  return one === undefined ? null : valueByPath(root, one.path)
}

function defaultIn(root: string, path: string): string | null {
  return defaultAssignmentOf(valueByPath(root, path), (slug) => personaIn(root, slug))
}

async function away(
  done: string[],
  root: string,
  at: string,
  slug: string,
  naming: readonly Named[],
  given: Given
): Promise<Answer> {
  const split = reassigning(naming, (path) => defaultIn(root, path))
  const landed = await runMechanicalChange(
    root,
    askingFor(at, split.reassigned),
    messageFor(slug),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(slug, split, landed.commit)])
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
