import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { grade } from "akasha/command/argument/pages/grade.argument.ts"
import { gradeTarget } from "akasha/command/argument/pages/grade-target.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { plan } from "akasha/command/argument/pages/plan.argument.ts"
import { regrade } from "akasha/command/argument/pages/regrade.argument.ts"
import { slug as slugArgument } from "akasha/command/argument/pages/slug.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { TARGETS } from "akasha/command/pages/music/rate/music-rate.command.code.ts"
import { musicRateParts as page } from "akasha/command/pages/music/rate-parts/music-rate-parts.command.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import {
  listedAt,
  listedById,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const PART_OF = "part-of-collections"

const PART_OF_KEY = "partOfCollections"

const GRADE_KEY = "grade"

const SLUG_KEY = "slug"

const TARGET = gradeTarget.said

const GRADE = grade.said

const SHARED = "shared"

const SONG = "song"

const NAMED = [json, plan, regrade, slugArgument, gradeTarget, grade] as const

export type Part = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly value: Value
  readonly shared: boolean
}

export type Counted = {
  readonly parts: number
  readonly grading: number
  readonly already: number
  readonly shared: number
}

export type Chosen = {
  readonly counts: Counted
  readonly taking: readonly Part[]
  readonly naming: readonly string[]
}

export function sharedIn(value: Value): boolean {
  const said = value[PART_OF_KEY]
  return Array.isArray(said) && said.length > 1
}

function orderedBy(one: Part, two: Part): number {
  const named = `${one.pageTypeSlug}/${one.slug}`
  const other = `${two.pageTypeSlug}/${two.slug}`
  return named < other ? -1 : named > other ? 1 : 0
}

export function gradedPart(pageTypeSlug: string): boolean {
  return pageTypeSlug !== SONG
}

export function partsUnder(root: string, id: string): readonly Part[] {
  const found: Part[] = []
  const seen = new Set<string>([id])
  const walking: string[] = [id]
  while (walking.length > 0) {
    const here = walking.pop()
    if (here === undefined) continue
    for (const naming of idsNaming(root, here, PART_OF)) {
      if (seen.has(naming)) continue
      seen.add(naming)
      const listed = listedById(root, naming)
      if (listed === null) continue
      const parted = partedIn(listed.path)
      const value = valueByPath(root, listed.path)
      if (parted === null || value === null) continue
      const slug = textIn(value, SLUG_KEY)
      if (slug === null) continue
      if (gradedPart(parted.pageType)) {
        found.push({ pageTypeSlug: parted.pageType, slug, value, shared: sharedIn(value) })
      }
      walking.push(naming)
    }
  }
  return [...found].sort(orderedBy)
}

export function namingOf(one: Part): string {
  return `grade\t${one.pageTypeSlug}/${one.slug}${one.shared ? `\t${SHARED}` : ""}`
}

export function chosenAmong(parts: readonly Part[], regrading: boolean): Chosen {
  const taking: Part[] = []
  const naming: string[] = []
  let already = 0
  let shared = 0
  for (const one of parts) {
    if (!regrading && textIn(one.value, GRADE_KEY) !== null) {
      already += 1
      continue
    }
    if (one.shared) shared += 1
    naming.push(namingOf(one))
    taking.push(one)
  }
  const counts = { parts: parts.length, grading: taking.length, already, shared }
  return { counts, taking, naming }
}

export function changesFor(
  root: string,
  taking: readonly Part[],
  marked: string
): readonly Asking[] {
  const source = sourceFor(root)
  return taking.map((one) =>
    composedEdit(root, one.pageTypeSlug, one.slug, { ...one.value, [GRADE_KEY]: marked }, source)
  )
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `parts\t${counts.parts}`,
    `grading\t${counts.grading}`,
    `already\t${counts.already}`,
    `${SHARED}\t${counts.shared}`,
  ]
}

export function messageOf(counts: Counted, named: string, marked: string): string {
  return `grade ${counts.grading} part(s) of ${named} as ${marked}`
}

export function amissIn(target: string, marked: string): string | null {
  if (!TARGETS.includes(target)) {
    return `\`${TARGET}\` takes \`${TARGETS.join("`, `")}\`, and this call names \`${target}\``
  }
  if (!gradeProperty.values.some((one) => one === marked)) {
    return `\`${GRADE}\` takes a rung from \`${gradeProperty.values.join("`, `")}\`, and this call names \`${marked}\``
  }
  return null
}

async function answered(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const held = read.taken
  const amiss = amissIn(held.gradeTarget, held.grade)
  if (amiss !== null) return refusedBy([amiss], INPUT)
  const listed = listedAt(given.root, held.gradeTarget, held.slug)
  const one = listed.length === 1 ? listed[0] : undefined
  if (one === undefined) {
    return refused(`no ${held.gradeTarget} page is filed at \`${held.slug}\``, DATA)
  }
  const named = `${held.gradeTarget}/${held.slug}`
  const chosen = chosenAmong(partsUnder(given.root, one.id), held.regrade)
  const rows = held.json
    ? [JSON.stringify(held.plan ? { ...chosen.counts, naming: chosen.naming } : chosen.counts)]
    : rowsOf(chosen.counts)
  if (held.plan) return told(held.json ? rows : [...rows, ...chosen.naming])
  if (chosen.taking.length === 0) return told(rows)
  const changes = changesFor(given.root, chosen.taking, held.grade)
  const landed = await landing(given.root, changes, messageOf(chosen.counts, named, held.grade))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicRateParts(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, landing))
}
