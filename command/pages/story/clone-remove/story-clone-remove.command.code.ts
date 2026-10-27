import { rmSync } from "node:fs"
import { join } from "node:path"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import { type Stopping, stopping } from "akasha/agent/seat/stopping/seat-stopping.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyValue } from "akasha/change/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { draft as draftArgument } from "akasha/command/argument/pages/draft.argument.ts"
import { force as forceArgument } from "akasha/command/argument/pages/force.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyCloneRemove as page } from "akasha/command/pages/story/clone-remove/story-clone-remove.command.ts"
import {
  addressOf,
  committedUnder,
  folderOf,
  inTestWorld,
  isCode,
  type Referrer,
  referrersOf,
  TEST_WORLD,
} from "akasha/command/pages/story/modules/cloning/story-cloning.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { removeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const NAMED = [storyArgument, forceArgument, draftArgument] as const

const REMOVE_FILE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

const REMOVE_VALUE = `${changeMechanicalFileContent.slug}/${removePropertyValue.slug}` as const

const PAGE_FILE = ".ts"

const TYPES_FILE = ".types.ts"

const PAGE_TYPE_FILE = ".page-type.ts"

const AGENTS = "agent/"

const PARTS = "parts"

const SLUG = "slug"

const ID = "id"

const CLONED_FROM = "clonedFrom"

const ASSIGNMENT = "assignmentSlug"

const STORY = "story"

const FACT = "fact"

const KNOWERS = "knowers"

const TAB = "\t"

export type SeatHeld = { readonly name: string; readonly id: string }

export type Halting = (
  given: Given,
  agentId: string,
  name: string,
  force: boolean,
  done: string[]
) => Promise<Stopping>

export type Reach = {
  readonly storyAt: (root: string, slug: string) => string | null
  readonly valueOf: (root: string, path: string) => Value | null
  readonly committedUnder: (root: string, folder: string) => readonly string[]
  readonly referrersOf: (root: string, path: string) => readonly Referrer[]
  readonly seatsOf: (root: string, story: string) => readonly SeatHeld[]
  readonly halting: Halting
  readonly sweep: (root: string, folder: string, pages: readonly string[]) => undefined
}

function seatsIndexed(root: string, story: string): readonly SeatHeld[] {
  const found: SeatHeld[] = []
  for (const one of valuesOfType(root, seat.slug)) {
    if (one.value[ASSIGNMENT] !== story) continue
    const name = textAt(one.value, SLUG)
    const id = textAt(one.value, ID)
    if (name !== null && id !== null) found.push({ name, id })
  }
  return found.toSorted((one, two) => (one.name < two.name ? -1 : one.name > two.name ? 1 : 0))
}

function swept(root: string, folder: string, pages: readonly string[]): undefined {
  for (const one of pages) removeUncommitted(root, one)
  rmSync(join(root, folder), { recursive: true, force: true })
  return undefined
}

const INDEXED: Reach = {
  storyAt: (root, slug) => listedAt(root, storyPlayed.slug, slug)[0]?.path ?? null,
  valueOf: (root, path) => valueAt(path, root),
  committedUnder,
  referrersOf,
  seatsOf: seatsIndexed,
  halting: stopping,
  sweep: swept,
}

export type Unlisting = { readonly at: string; readonly value: string }

export type Unknowing = {
  readonly at: string
  readonly key: string
  readonly fact: string
  readonly knower: string
}

function quotedIn(said: string, named: ReadonlySet<string>): boolean {
  return [...named].some((one) => said.includes(JSON.stringify(one)))
}

export function unknowingIn(
  at: string,
  value: Value,
  clone: ReadonlySet<string>
): readonly Unknowing[] | null {
  const found: Unknowing[] = []
  const left: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(value)) {
    if (!Array.isArray(held)) {
      left[key] = held
      continue
    }
    left[key] = held.map((record: unknown) => {
      if (!isRecord(record) || typeof record[FACT] !== "string") return record
      const knowers = record[KNOWERS]
      if (!Array.isArray(knowers)) return record
      const fact = record[FACT]
      for (const knower of knowers) {
        if (typeof knower === "string" && clone.has(knower)) found.push({ at, key, fact, knower })
      }
      return { ...record, [KNOWERS]: knowers.filter((one) => !clone.has(String(one))) }
    })
  }
  return quotedIn(JSON.stringify(left), clone) ? null : found
}

export type Plan = {
  readonly folder: string
  readonly seats: readonly SeatHeld[]
  readonly files: readonly string[]
  readonly pages: readonly string[]
  readonly unlisting: readonly Unlisting[]
  readonly unknowing: readonly Unknowing[]
  readonly asked: readonly Asking[]
}

type Refusing = { readonly refused: string; readonly code: number }

function isPage(path: string): boolean {
  return path.endsWith(PAGE_FILE) && !path.endsWith(TYPES_FILE) && !isCode(path)
}

function besideAny(path: string, pages: readonly string[]): boolean {
  return pages.some((one) => path !== one && path.startsWith(`${one.slice(0, -PAGE_FILE.length)}.`))
}

function last(path: string): number {
  return path.endsWith(PAGE_TYPE_FILE) ? 1 : 0
}

export function planned(root: string, slug: string, reach: Reach): Plan | Refusing {
  const storyPath = reach.storyAt(root, slug)
  if (storyPath === null) return { refused: `\`${slug}\` names no played story here`, code: DATA }
  if (!inTestWorld(storyPath)) {
    return {
      refused: `\`${slug}\` sits at \`${storyPath}\`, outside \`${TEST_WORLD}\`, and only a clone there is removed`,
      code: INPUT,
    }
  }
  const story = reach.valueOf(root, storyPath)
  if (story === null || textAt(story, CLONED_FROM) === null) {
    return {
      refused: `\`${slug}\` names no story it was cloned from, so it is no clone`,
      code: INPUT,
    }
  }
  const folder = folderOf(storyPath)
  const committed = reach.committedUnder(root, folder)
  const pages = committed.filter(isPage)
  const outside = new Set<string>()
  const foreign = new Set<string>()
  const shared = new Set<string>()
  const unlisting: Unlisting[] = []
  const clone = new Set<string>()
  for (const one of pages) {
    const value = reach.valueOf(root, one)
    const address = value === null ? null : addressOf(value)
    if (address !== null) clone.add(address)
    for (const referrer of reach.referrersOf(root, one)) {
      if (referrer.path.startsWith(folder) || referrer.path.startsWith(AGENTS)) continue
      if (referrer.propertySlug === PARTS) {
        if (address !== null) unlisting.push({ at: referrer.path, value: address })
        continue
      }
      if (referrer.path.startsWith(TEST_WORLD)) shared.add(referrer.path)
      else foreign.add(referrer.path)
    }
  }
  const unknowing: Unknowing[] = []
  const owner = `${storyPlayed.slug}/${slug}`
  for (const one of [...shared].sort()) {
    const value = reach.valueOf(root, one)
    if (value?.[STORY] === owner) {
      outside.add(one)
      continue
    }
    const said = value === null ? null : unknowingIn(one, value, clone)
    if (said === null) foreign.add(one)
    else unknowing.push(...said)
  }
  if (foreign.size > 0) {
    const named = [...foreign]
      .sort()
      .map((one) => `\`${one}\``)
      .join(", ")
    return {
      refused: `${named} name a page of \`${slug}\` from outside \`${TEST_WORLD}\`, or other than as a fact's knower on a page \`${slug}\` did not make, so nothing is removed`,
      code: DATA,
    }
  }
  const going = [...pages, ...[...outside].sort()]
  const alone = committed.filter((one) => !isPage(one) && !besideAny(one, pages))
  const files = [...going, ...alone].toSorted((one, two) => last(one) - last(two))
  const asked: Asking[] = [
    ...unlisting.map(
      (one): Asking => ({ at: REMOVE_VALUE, given: { at: one.at, key: PARTS, value: one.value } })
    ),
    ...unknowing.map(
      (one): Asking => ({
        at: REMOVE_VALUE,
        given: {
          at: one.at,
          key: one.key,
          value: one.knower,
          where: FACT,
          is: one.fact,
          field: KNOWERS,
        },
      })
    ),
    ...files.map((one): Asking => ({ at: REMOVE_FILE, given: { at: one } })),
  ]
  return {
    folder,
    seats: reach.seatsOf(root, `${storyPlayed.slug}/${slug}`),
    files,
    pages,
    unlisting,
    unknowing,
    asked,
  }
}

function rowsOf(plan: Plan): readonly string[] {
  return [
    ...plan.seats.map((one) => `seat${TAB}${one.name}`),
    ...plan.unlisting.map((one) => `unlist${TAB}${one.at}${TAB}${one.value}`),
    ...plan.unknowing.map((one) => `unknow${TAB}${one.at}${TAB}${one.knower}${TAB}${one.fact}`),
    ...plan.files.map((one) => `remove${TAB}${one}`),
  ]
}

type Taken = { readonly slug: string; readonly force: boolean; readonly drafts: boolean }

function taken(argv: readonly string[], calledAs: string): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  return { slug: read.taken.story.trim(), force: read.taken.force, drafts: read.taken.draft }
}

async function removed(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const plan = planned(given.root, held.slug, reach)
  if ("refused" in plan) return refused(plan.refused, plan.code)
  const rows = rowsOf(plan)
  if (held.drafts) return told([...rows, "drafted — nothing is stopped and nothing is removed"])
  for (const one of plan.seats) {
    const halted = await reach.halting(given, one.id, one.name, held.force, done)
    if ("refused" in halted) {
      return keeping(done, refusedBy([...rows, halted.refused], halted.code))
    }
    done.push(`stopped \`${one.name}\``)
  }
  const landed = await landing(
    given.root,
    plan.asked,
    `remove the clone ${held.slug} and its seats`,
    {
      agentId: given.agentId,
      writer: given.writer,
      done,
    }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...rows, ...landed.refusals], DATA))
  reach.sweep(given.root, plan.folder, plan.pages)
  return told([
    ...rows,
    ...done,
    ...(landed.commit === null ? [] : [`commit${TAB}${landed.commit}`]),
  ])
}

export async function storyCloneRemove(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = INDEXED
): Promise<Answer> {
  return await answering(async (done) => await removed(done, argv, given, landing, reach))
}
