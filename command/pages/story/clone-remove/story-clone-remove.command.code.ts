import { rmSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { seatLogDay } from "akasha/agent/seat/log-day/seat-log-day.page-type.ts"
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
  cloneWorldOf,
  committedUnder,
  folderOf,
  isCode,
  type Referrer,
  referrersOf,
  worldFolderOf,
  worldNameOf,
  worldPageOf,
} from "akasha/command/pages/story/modules/cloning/story-cloning.module.code.ts"
import {
  listedAt,
  type Valued,
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

const TESTING = "testing"

const FACT = "fact"

const KNOWERS = "knowers"

const SEAT_NAME = "seatName"

const TAB = "\t"

type SeatHeld = { readonly name: string; readonly id: string; readonly path: string }

type Halting = (
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
  readonly logDays: (root: string) => readonly Valued[]
  readonly halting: Halting
  readonly sweep: (root: string, folders: readonly string[], pages: readonly string[]) => undefined
}

function seatsIndexed(root: string, story: string): readonly SeatHeld[] {
  const found: SeatHeld[] = []
  for (const one of valuesOfType(root, seat.slug)) {
    if (one.value[ASSIGNMENT] !== story) continue
    const name = textAt(one.value, SLUG)
    const id = textAt(one.value, ID)
    if (name !== null && id !== null) found.push({ name, id, path: one.path })
  }
  return found.toSorted((one, two) => (one.name < two.name ? -1 : one.name > two.name ? 1 : 0))
}

function swept(root: string, folders: readonly string[], pages: readonly string[]): undefined {
  for (const one of pages) removeUncommitted(root, one)
  for (const one of folders) rmSync(join(root, one), { recursive: true, force: true })
  return undefined
}

const INDEXED: Reach = {
  storyAt: (root, slug) => listedAt(root, storyPlayed.slug, slug)[0]?.path ?? null,
  valueOf: (root, path) => valueAt(path, root),
  committedUnder,
  referrersOf,
  seatsOf: seatsIndexed,
  logDays: (root) => valuesOfType(root, seatLogDay.slug),
  halting: stopping,
  sweep: swept,
}

type Unlisting = { readonly at: string; readonly value: string }

type Unknowing = {
  readonly at: string
  readonly key: string
  readonly fact: string
  readonly knower: string
}

function quotedIn(said: string, named: ReadonlySet<string>): boolean {
  return [...named].some((one) => said.includes(JSON.stringify(one)))
}

function unknowingIn(
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

type Plan = {
  readonly folder: string
  readonly seats: readonly SeatHeld[]
  readonly days: readonly string[]
  readonly emptied: readonly string[]
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

function folderNamed(path: string, name: string | null): string | null {
  const folder = dirname(path)
  return name !== null && name !== "" && basename(folder) === name ? `${folder}/` : null
}

function seatsOwn(
  seats: readonly SeatHeld[],
  days: readonly Valued[]
): { readonly days: readonly string[]; readonly emptied: readonly string[] } {
  const named = new Set(seats.map((one) => one.name))
  const own = days
    .filter((one) => named.has(textAt(one.value, SEAT_NAME) ?? ""))
    .toSorted((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
  const emptied = [
    ...own.map((one) => folderNamed(one.path, textAt(one.value, SLUG))),
    ...seats.map((one) => folderNamed(one.path, one.name)),
  ].filter((one): one is string => one !== null)
  return { days: own.map((one) => one.path), emptied }
}

function planned(root: string, slug: string, reach: Reach): Plan | Refusing {
  const storyPath = reach.storyAt(root, slug)
  if (storyPath === null) return { refused: `\`${slug}\` names no played story here`, code: DATA }
  const worldFolder = worldFolderOf(storyPath)
  const worldAt = worldPageOf(worldFolder)
  if (reach.valueOf(root, worldAt)?.[TESTING] !== true) {
    return {
      refused: `\`${slug}\` sits in \`${worldAt}\`, which states no \`${TESTING}: true\`, and only a clone in a testing world is removed`,
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
  const ownWorld = worldNameOf(worldFolder) === cloneWorldOf(slug)
  const folder = ownWorld ? worldFolder : folderOf(storyPath)
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
      if (referrer.path.startsWith(worldFolder)) shared.add(referrer.path)
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
      refused: `${named} name a page of \`${slug}\` from outside \`${worldFolder}\`, or other than as a fact's knower on a page \`${slug}\` did not make, so nothing is removed`,
      code: DATA,
    }
  }
  const going = [...pages, ...[...outside].sort()]
  const alone = committed.filter((one) => !isPage(one) && !besideAny(one, pages))
  const files = [...going, ...alone].toSorted((one, two) => last(one) - last(two))
  const seats = reach.seatsOf(root, owner)
  const own = seatsOwn(seats, reach.logDays(root))
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
    ...[...files, ...own.days].map((one): Asking => ({ at: REMOVE_FILE, given: { at: one } })),
  ]
  return {
    folder,
    seats,
    days: own.days,
    emptied: own.emptied,
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
    ...[...plan.files, ...plan.days].map((one) => `remove${TAB}${one}`),
    ...plan.emptied.map((one) => `sweep${TAB}${one}`),
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
    { writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...rows, ...landed.refusals], DATA))
  reach.sweep(given.root, [plan.folder, ...plan.emptied], plan.pages)
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
