import { existsSync } from "node:fs"
import { join } from "node:path"
import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { dropReadings } from "@akasha/command-system/reading"
import { listedAt, listedById } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { namedIn } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"

export const SUBAGENTS_AT = "akasha/seat-system/subagent/subagents"

export const WRITING = "write"

export const TAKING = "take"

const CALLED_AS = "subagent-standing"

const SEAT = "seat"

const ASSIGNMENT = "assignmentSlug"

const SUFFIX = ".subagent.ts"

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
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
  dispatchedAs: string
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
  const named = namedIn(listed.path)
  return named === null || named.tail !== SEAT ? null : named.stem
}

function programmatically(root: string): Given {
  return {
    root,
    calledAs: CALLED_AS,
    from: root,
    writer: null,
    agentId: null,
    programmatic: true,
  }
}

function handed(root: string, changes: readonly FileEdit[], message: string): boolean {
  return (
    landingAsked(programmatically(root), {
      changes,
      message,
      dryRun: false,
      glass: null,
      unmoved: [],
      saying: wroteAndTook,
    }).code === 0
  )
}

export function wrote(root: string, seatName: string, own: string, dispatchedAs: string): boolean {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (existsSync(join(root, at))) return true
  const assignmentSlug = assignedTo(root, seatName)
  if (assignmentSlug === null) return false
  const body = new TextEncoder().encode(bodyOf(slug, seatName, assignmentSlug, dispatchedAs))
  return handed(
    root,
    [{ path: at, body }],
    `${slug}: a subagent states the kind it was dispatched as`
  )
}

export function took(root: string, seatName: string, own: string): boolean {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (!existsSync(join(root, at))) return true
  const gone = handed(
    root,
    [{ path: at, body: null }],
    `${slug} is done, so its page goes; what it was stands in this repository's history`
  )
  if (gone) dropReadings(root, [at])
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
  own: string,
  dispatchedAs: string
): undefined {
  asking(root, [WRITING, seatName, own, dispatchedAs])
}

export function takingDown(root: string, seatName: string, own: string): undefined {
  asking(root, [TAKING, seatName, own])
}

export function ranAsStanding(argv: readonly string[]): number {
  const root = argv[2]
  const act = argv[3]
  const seatName = argv[4]
  const own = argv[5]
  const dispatchedAs = argv[6]
  if (root === undefined || root === "") return 1
  if (seatName === undefined || seatName === "" || own === undefined || own === "") return 1
  if (act === WRITING && dispatchedAs !== undefined && dispatchedAs !== "") {
    return wrote(root, seatName, own, dispatchedAs) ? 0 : 1
  }
  if (act === TAKING) return took(root, seatName, own) ? 0 : 1
  return 1
}

if (import.meta.main) {
  process.exit(ranAsStanding(Bun.argv))
}
