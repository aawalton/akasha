import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { tookIn } from "@akasha/command-system/drafting"
import type { FileEdit } from "@akasha/command-system/landing"
import { dropReadings, SUBAGENT_MARK } from "@akasha/command-system/reading"
import { listedAt, listedById } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"

export const SUBAGENTS_AT = "seat-system/subagents/pages"

export const SEATS_AT = "seat-system/seats/pages"

export const WRITING = "write"

export const TAKING = "take"

const CALLED_AS = "subagent-presence"

const SEAT = "seat"

const ASSIGNMENT = "assignmentSlug"

const SUFFIX = ".subagent.ts"

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}${SUBAGENT_MARK}${own}`
}

export function pathOf(slug: string): string {
  return `${SUBAGENTS_AT}/${slug}${SUFFIX}`
}

function said(value: string): string {
  return JSON.stringify(value)
}

export function bodyOf(
  slug: string,
  seatName: string,
  assignmentSlug: string,
  dispatchedAs: string,
  agentId: string
): string {
  return [
    'import type { Subagent } from "../subagent.page-type.ts"',
    "",
    `export const ${exportedAs(slug)} = {`,
    '  pageTypeSlug: "subagent",',
    `  slug: ${said(slug)},`,
    `  principalSeatName: ${said(seatName)},`,
    `  assignmentSlug: ${said(assignmentSlug)},`,
    `  dispatchedAs: ${said(dispatchedAs)},`,
    `  agentId: ${said(agentId)},`,
    "} as const satisfies Subagent",
    "",
  ].join("\n")
}

export function assignedTo(root: string, seatName: string): string | null {
  const listed = listedAt(root, SEAT, seatName)[0]
  if (listed === undefined) return null
  const value = valueAt(listed.path, root)
  const stated = value === null ? null : textAt(value, ASSIGNMENT)
  return stated === null || stated === "" ? null : stated
}

export function seatNamedIn(root: string, seatId: string): string | null {
  const listed = listedById(root, seatId)
  if (listed === null) return null
  const named = partedIn(listed.path)
  if (named === null || named.sections.length > 0 || named.pageType !== SEAT) return null
  return named.slug
}

function handed(root: string, changes: readonly FileEdit[], message: string): boolean {
  return landedMechanically(root, CALLED_AS, changes, message).code === 0
}

export function wrote(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string
): boolean {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (existsSync(join(root, at))) return true
  const assignmentSlug = assignedTo(root, seatName)
  if (assignmentSlug === null) return false
  const body = new TextEncoder().encode(
    bodyOf(slug, seatName, assignmentSlug, dispatchedAs, agentIdOf(seatId, own))
  )
  return handed(root, [{ path: at, body }], `${slug}: a subagent states the agent id it acts under`)
}

export function seatPathOf(seatName: string): string {
  return `${SEATS_AT}/${seatName}.seat.ts`
}

export function tookInUnder(
  root: string,
  seatName: string,
  paths: readonly string[]
): readonly string[] {
  const page = seatPathOf(seatName)
  if (!existsSync(join(root, page))) return []
  const took: string[] = []
  for (const at of paths) {
    try {
      const said = tookIn(root, page, at)
      if (!("why" in said)) took.push(at)
    } catch {}
  }
  return took
}

export function took(root: string, seatName: string, own: string): boolean {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (!existsSync(join(root, at))) return true
  tookInUnder(root, seatName, [at])
  const gone = handed(
    root,
    [{ path: at, body: null }],
    `${slug} is done, so its page goes; what it was is in this repository's history`
  )
  if (gone) dropReadings(root, [at])
  return gone
}

export function pathsUnder(root: string, seatName: string): readonly string[] {
  const mark = `${seatName}-`
  let names: readonly string[]
  try {
    names = readdirSync(join(root, SUBAGENTS_AT))
  } catch {
    return []
  }
  return names
    .filter((one) => one.startsWith(mark) && one.endsWith(SUFFIX))
    .map((one) => `${SUBAGENTS_AT}/${one}`)
    .sort()
}

const PATCH_SUFFIX = ".subagent.patch.uncommitted.diff"

export function patchesUnder(root: string, seatName: string): readonly string[] {
  const mark = `${seatName}-`
  let names: readonly string[]
  try {
    names = readdirSync(join(root, SUBAGENTS_AT))
  } catch {
    return []
  }
  return names
    .filter((one) => one.startsWith(mark) && one.endsWith(PATCH_SUFFIX))
    .map((one) => `${SUBAGENTS_AT}/${one.slice(0, -PATCH_SUFFIX.length)}${SUFFIX}`)
    .sort()
}

export function tookUnder(root: string, seatName: string, why: string): boolean {
  tookInUnder(root, seatName, patchesUnder(root, seatName))
  const paths = pathsUnder(root, seatName)
  if (paths.length === 0) return true
  const gone = handed(
    root,
    paths.map((path) => ({ path, body: null })),
    `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) under it go`
  )
  if (gone) dropReadings(root, paths)
  return gone
}

export function asking(root: string, args: readonly string[]): undefined {
  Bun.spawn([process.execPath, import.meta.path, root, ...args], {
    cwd: root,
    stdin: "ignore",
    stdout: "ignore",
    stderr: "ignore",
  }).unref()
}

export function puttingUp(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string
): undefined {
  asking(root, [WRITING, seatName, own, dispatchedAs, seatId])
}

export function takingDown(root: string, seatName: string, own: string): undefined {
  asking(root, [TAKING, seatName, own])
}

export function ran(argv: readonly string[]): number {
  const root = argv[2]
  const act = argv[3]
  const seatName = argv[4]
  const own = argv[5]
  const dispatchedAs = argv[6]
  const seatId = argv[7]
  if (root === undefined || root === "") return 1
  if (seatName === undefined || seatName === "" || own === undefined || own === "") return 1
  if (act === WRITING) {
    if (dispatchedAs === undefined || dispatchedAs === "") return 1
    if (seatId === undefined || seatId === "") return 1
    return wrote(root, seatName, seatId, own, dispatchedAs) ? 0 : 1
  }
  if (act === TAKING) return took(root, seatName, own) ? 0 : 1
  return 1
}

if (import.meta.main) {
  process.exit(ran(Bun.argv))
}
