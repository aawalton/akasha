import { closeSync, existsSync, mkdirSync, openSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { tookIn } from "@akasha/command-system/drafting"
import type { FileEdit } from "@akasha/command-system/landing"
import { dropReadings, SUBAGENT_MARK } from "@akasha/command-system/reading"
import { listedAt, listedById } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { supervisorsRootDir } from "@akasha/seat-system/supervisor-log-path"

export const SUBAGENTS_AT = "seat-system/subagents/pages"

export const SEATS_AT = "seat-system/seats/pages"

export const WRITING = "write"

export const TAKING = "take"

export const LOG_AT = "subagent-presence.log"

const CALLED_AS = "subagent-presence"

const SEAT = "seat"

const ASSIGNMENT = "assignmentSlug"

const SUFFIX = ".subagent.ts"

export type Went = { readonly went: true } | { readonly why: string }

const WENT: Went = { went: true }

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}${SUBAGENT_MARK}${own}`
}

export function pathOf(slug: string): string {
  return `${SUBAGENTS_AT}/${slug}${SUFFIX}`
}

export function logPathOf(seatId: string, baseDir?: string): string {
  return join(baseDir ?? supervisorsRootDir(), seatId, LOG_AT)
}

function loggingTo(seatId: string, baseDir: string | undefined): number | null {
  const at = logPathOf(seatId, baseDir)
  try {
    mkdirSync(dirname(at), { recursive: true })
    return openSync(at, "a")
  } catch {
    return null
  }
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

async function handed(root: string, changes: readonly FileEdit[], message: string): Promise<Went> {
  const answer = await landedMechanically(root, CALLED_AS, changes, message)
  if (answer.code === 0) return WENT
  const why = answer.refusals.join(" ").trim()
  if (why !== "") return { why }
  return { why: `the landing answered ${String(answer.code)} and said nothing` }
}

export async function wrote(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string
): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (existsSync(join(root, at))) return WENT
  const assignmentSlug = assignedTo(root, seatName)
  if (assignmentSlug === null) {
    return {
      why:
        `no assignment is stated for the ${seatName} seat, and a subagent's page states the` +
        ` assignment its seat states, so ${at} was not written`,
    }
  }
  const body = new TextEncoder().encode(
    bodyOf(slug, seatName, assignmentSlug, dispatchedAs, agentIdOf(seatId, own))
  )
  return await handed(
    root,
    [{ path: at, body }],
    `${slug}: a subagent states the agent id it acts under`
  )
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
      const held = tookIn(root, page, at)
      if (!("why" in held)) took.push(at)
    } catch {}
  }
  return took
}

export async function took(root: string, seatName: string, own: string): Promise<Went> {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  if (!existsSync(join(root, at))) return WENT
  const went = tookInUnder(root, seatName, [at])
  const why =
    went.length === 0
      ? `${slug} is done, so its page goes; what it was is in this repository's history`
      : `${slug} is done, so its page goes; the patch it drafted went to the ${seatName} seat,` +
        ` which holds that draft now`
  const gone = await handed(root, [{ path: at, body: null }], why)
  if (!("why" in gone)) dropReadings(root, [at])
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

const PATCH_SUFFIX = ".subagent.patch.diff"

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

export async function tookUnder(root: string, seatName: string, why: string): Promise<Went> {
  tookInUnder(root, seatName, patchesUnder(root, seatName))
  const paths = pathsUnder(root, seatName)
  if (paths.length === 0) return WENT
  const gone = await handed(
    root,
    paths.map((path) => ({ path, body: null })),
    `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) under it go`
  )
  if (!("why" in gone)) dropReadings(root, paths)
  return gone
}

export function asking(
  root: string,
  seatId: string,
  args: readonly string[],
  baseDir?: string
): undefined {
  const fd = loggingTo(seatId, baseDir)
  try {
    Bun.spawn([process.execPath, import.meta.path, root, ...args], {
      cwd: root,
      stdin: "ignore",
      stdout: fd ?? "ignore",
      stderr: fd ?? "ignore",
    }).unref()
  } finally {
    if (fd !== null) closeSync(fd)
  }
}

export function puttingUp(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  dispatchedAs: string,
  baseDir?: string
): undefined {
  asking(root, seatId, [WRITING, seatName, own, dispatchedAs, seatId], baseDir)
}

export function takingDown(
  root: string,
  seatName: string,
  seatId: string,
  own: string,
  baseDir?: string
): undefined {
  asking(root, seatId, [TAKING, seatName, own], baseDir)
}

function saying(why: string): number {
  process.stderr.write(`${CALLED_AS}: ${why}\n`)
  return 1
}

function answering(went: Went, at: string): number {
  return "why" in went ? saying(`${at} — ${went.why}`) : 0
}

export async function ran(argv: readonly string[]): Promise<number> {
  const root = argv[2]
  const act = argv[3]
  const seatName = argv[4]
  const own = argv[5]
  const dispatchedAs = argv[6]
  const seatId = argv[7]
  if (root === undefined || root === "") return saying("no root was named")
  if (act === undefined || act === "") return saying("no act was named")
  if (seatName === undefined || seatName === "") return saying(`${act}: no seat was named`)
  if (own === undefined || own === "") return saying(`${act} ${seatName}: no subagent id was named`)
  const at = `${act} ${seatName} ${own}`
  if (act === WRITING) {
    if (dispatchedAs === undefined || dispatchedAs === "")
      return saying(`${at} — no kind was named`)
    if (seatId === undefined || seatId === "") return saying(`${at} — no seat id was named`)
    return answering(await wrote(root, seatName, seatId, own, dispatchedAs), at)
  }
  if (act === TAKING) return answering(await took(root, seatName, own), at)
  return saying(`\`${act}\` is no act this takes`)
}

if (import.meta.main) {
  process.exit(await ran(Bun.argv))
}
