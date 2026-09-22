import { resolve } from "node:path"
import { seatNameFor } from "akasha/agent/seat/name/modules/initiative-seat-name/initiative-seat-name.module.code.ts"
import { statedProcessPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import { akashaHolderProcessOf } from "akasha/agent/seat/page/modules/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { changePagePagePropertyRelation } from "akasha/change/mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
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
import { initiativeAssign as page } from "akasha/command/pages/initiative/assign/initiative-assign.command.ts"
import { initiativesDrawn } from "akasha/domain/modules/work-initiatives/work-initiatives.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const CARRIES =
  `${changeMechanicalFileContent.slug}/${changePagePagePropertyRelation.slug}` as const

const SEAT = "seat"

const ASSIGNMENT = "assignmentSlug"

const PRESENT = "present"

const INITIATIVE = "initiative"

export function assignmentFor(slug: string): string {
  return `${INITIATIVE}/${slug}`
}

export type Seated = {
  readonly name: string
  readonly at: string
  readonly running: boolean
}

export type Seating = (root: string, name: string) => Seated | null

export type Reached = { readonly name: string; readonly at: string } | { readonly refused: string }

function noInitiative(slug: string): string {
  return `\`${slug}\` names no initiative, so there is nothing to assign`
}

export function noSeat(name: string, slug: string): string {
  return `\`${name}\` is no seat, so ${slug} was assigned to nobody`
}

export function notRunning(name: string, slug: string): string {
  return `the seat ${name} is not running, so ${slug} was assigned to nobody`
}

export function seatFor(slug: string, found: Seated | null): Reached {
  const name = seatNameFor(slug)
  if (found === null) return { refused: noSeat(name, slug) }
  if (!found.running) return { refused: notRunning(name, slug) }
  return { name, at: found.at }
}

export function messageFor(name: string, slug: string): string {
  return `assign ${slug} to ${name}`
}

export function saidFor(name: string, slug: string, commit: string | null): readonly string[] {
  const now = `${name} answers to ${assignmentFor(slug)}`
  return commit === null ? [now] : [now, commit]
}

function seatedIn(root: string, name: string): Seated | null {
  const one = listedAt(root, SEAT, name)[0]
  if (one === undefined) return null
  const running = statedProcessPresence(akashaHolderProcessOf(one.id)) === PRESENT
  return { name, at: one.path, running }
}

async function stated(
  done: string[],
  root: string,
  reached: { readonly name: string; readonly at: string },
  slug: string,
  given: Given
): Promise<Answer> {
  const landed = await runMechanicalChange(
    root,
    [{ at: CARRIES, given: { at: reached.at, key: ASSIGNMENT, to: assignmentFor(slug) } }],
    messageFor(reached.name, slug),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([...saidFor(reached.name, slug, landed.commit)])
}

async function handed(
  done: string[],
  slug: string,
  given: Given,
  seating: Seating
): Promise<Answer> {
  const root = resolve(given.root)
  if (!initiativesDrawn(root).some((each) => each.slug === slug)) {
    return mistaking([noInitiative(slug)])
  }
  const reached = seatFor(slug, seating(root, seatNameFor(slug)))
  if ("refused" in reached) return mistaking([reached.refused])
  return await stated(done, root, reached, slug, given)
}

async function handedBy(slug: string, given: Given, seating: Seating = seatedIn): Promise<Answer> {
  return await answering(async (done) => await handed(done, slug, given, seating))
}

export async function initiativeAssign(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [initiative])
  if ("refused" in read) return mistaking([...read.refused])
  return await handedBy(read.taken.initiative, given)
}
