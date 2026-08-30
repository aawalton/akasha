export const tool = {
  summary: "Delete the page of every seat no agent is present in",
  repos: ["akasha"],
} as const

import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs"
import { basename, join } from "node:path"
import { exclusively } from "../exclusive/exclusive.ts"
import { fileStemOf } from "../page/name/name"
import { sidecarsOf } from "../page/sidecar/sidecar.ts"
import { dirOfPlaceHeld, SEAT_WRITE } from "../tools/lib/agent-page-place.ts"
import { AKASHA, resolveRoots, rootFor } from "../repo/roots/roots"
import { whyRefused } from "../tools/lib/gated-write.ts"
import { seatPagePaths, seatPresence, seatsDir } from "../tools/lib/seat-presence-read.ts"
import { toolArgv } from "../tools/lib/tool-argv.ts"

const HELP = `bun services/sweep-seat-pages.ts — delete the page of every seat no agent is present in

pages/page-type/seat.page-type.md says a stopped seat has no page and that its attributes are read back
from the repository's history, so a page standing for a seat nobody occupies is residue.
This is what takes it away, and the removal commit is where the attributes go on standing.

PRESENCE IS READ, NEVER TIMED. A seat is present while its sidecar names a supervisor
process that is still there — the pid paired with its own /proc start time, so a recycled
pid reads as absent rather than as the seat that used to hold it. There is no grace period
and none is wanted: a live seat's sidecar always names a standing process, and one between
beats still names the same one.

A READING THAT DID NOT HAPPEN IS NOT AN ABSENCE. A page is taken only where the seat is
proven gone, which is /proc answering that no such pid stands or that the pid standing there
started at another time. A page with no sidecar, one whose supervisor-process cannot be
parsed, and one whose /proc entry could not be read are each a seat whose presence could not
be established. Those are named as uncertain, left standing with their sidecars, and a run
that met one exits non-zero. Deleting the page of a seat an agent may still be sitting in
costs more than leaving residue that is named on every run.

THIS IS THE CRASH BACKSTOP, NOT THE MECHANISM. A seat's page goes at the moment its agent
leaves it: the supervisor takes it in its own shutdown, and \`ops seat stop\` takes it for a
supervisor already gone or one that had to be killed. What reaches this sweep is what no
process was left alive to remove — a hard kill, an out-of-memory, a lost machine.

ONE PAGE THAT CANNOT GO DOES NOT HOLD THE REST. The pages go in one call so they land in
one commit; where that call refuses, each is retried alone, and every one still standing
is named with the reason. A page something else pins — a document naming its path, which
the removal gate refuses over — would otherwise keep every other absent seat standing too.

NOTHING IS REMOVED WITHOUT --remove. The sweep reports by default, because what it takes
away is a commit in another repository and seeing the list first costs one run.

Usage:
  bun ~/repos/akasha/services/sweep-seat-pages.ts [--remove]

  --remove  Take the pages away, through the gated removal, in one commit naming them all.
  --help    This.
`

const SCRATCH = "/var/tmp"

const WRITER = "seat-page-writer"

const PAGE_SUFFIX = ".md"

const SEAT_ROOT = (): string => dirOfPlaceHeld(SEAT_WRITE).slice(0, -SEAT_WRITE.dir.length - 1)

const UNCOMMITTED_SUFFIX = ".uncommitted.yaml"

function seatNameOf(pagePath: string): string {
  return fileStemOf(pagePath)
}

interface SidecarSweep {
  readonly gone: readonly string[]
  readonly uncertain: readonly string[]
}

function orphanSidecarPages(): SidecarSweep {
  const dir = seatsDir()
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return { gone: [], uncertain: [] }
  }
  const gone: string[] = []
  const uncertain: string[] = []
  for (const one of entries) {
    if (!one.endsWith(UNCOMMITTED_SUFFIX)) continue
    const pagePath = `${dir}/${basename(one, UNCOMMITTED_SUFFIX)}${PAGE_SUFFIX}`
    if (existsSync(pagePath)) continue
    const presence = seatPresence(pagePath)
    if (presence === "absent") gone.push(pagePath)
    else if (presence === "unknown") uncertain.push(pagePath)
  }
  return { gone, uncertain }
}

function removeSidecars(pagePath: string): void {
  const memory = SEAT_ROOT()
  for (const relPath of sidecarsOf(memory, relPathOf(pagePath))) {
    const at = `${memory}/${relPath}`
    exclusively(at, () => rmSync(at, { force: true }))
  }
}

function relPathOf(pagePath: string): string {
  const memory = `${SEAT_ROOT()}/`
  return pagePath.startsWith(memory) ? pagePath.slice(memory.length) : pagePath
}

function sidecarRelPathOf(pagePath: string): string {
  return `${relPathOf(pagePath).slice(0, -PAGE_SUFFIX.length)}${UNCOMMITTED_SUFFIX}`
}

function removePages(pagePaths: readonly string[], akashaRoot: string): { code: number; output: string } {
  const dir = mkdtempSync(join(SCRATCH, "sweep-seat-pages-"))
  const outPath = join(dir, "out.txt")
  try {
    const proc = Bun.spawnSync(
      [
        process.execPath,
        ...toolArgv(
          "rm.ts",
          [
            ...pagePaths.map((pagePath) => join(SEAT_ROOT(), relPathOf(pagePath))),
            "--repo",
            SEAT_WRITE.repo,
            "--message",
            `no agent is present in ${pagePaths.length === 1 ? "this seat" : "these seats"}, so ${pagePaths.length === 1 ? "its page goes" : "their pages go"}: ${pagePaths.map(seatNameOf).join(", ")}`,
          ],
          akashaRoot
        ),
      ],
      { stdout: Bun.file(outPath), stderr: "pipe", env: { ...process.env, AGENT_ID: WRITER, ACTING_AGENT_ID: "" } }
    )
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    const stderr = proc.stderr === null ? "" : new TextDecoder().decode(proc.stderr)
    return { code: proc.exitCode ?? 1, output: `${output}${stderr}` }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function takeEachAlone(pagePaths: readonly string[], akashaRoot: string): readonly string[] {
  const held: string[] = []
  for (const one of pagePaths) {
    const alone = removePages([one], akashaRoot)
    if (alone.code === 0) {
      removeSidecars(one)
      continue
    }
    held.push(
      `${seatNameOf(one)}'s page stands and its sidecar with it, so this seat goes on reading as one an agent is present in: ${whyRefused(alone.output)}`
    )
  }
  return held
}

function main(argv: readonly string[]): number {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const roots = resolveRoots()
  const pages = seatPagePaths()
  const presenceOf = new Map(pages.map((one) => [one, seatPresence(one)] as const))
  const absent = pages.filter((one) => presenceOf.get(one) === "absent")
  const unread = pages.filter((one) => presenceOf.get(one) === "unknown")
  const orphans = orphanSidecarPages()
  for (const one of absent) process.stdout.write(`${seatNameOf(one)}\t${relPathOf(one)}\n`)
  for (const one of orphans.gone) process.stdout.write(`${seatNameOf(one)}\t${sidecarRelPathOf(one)}\n`)
  for (const one of [...unread, ...orphans.uncertain]) {
    process.stderr.write(
      `uncertain: ${seatNameOf(one)} states no presence that could be read, so its page and its sidecar stand\n`
    )
  }
  const unresolved = unread.length + orphans.uncertain.length
  if (argv.includes("--remove")) for (const one of orphans.gone) removeSidecars(one)
  if (absent.length === 0 || !argv.includes("--remove")) {
    process.stderr.write(
      `swept ${pages.length} seat page(s): ${pages.length - absent.length - unread.length} present, ${absent.length} absent, ${unread.length} uncertain` +
        `, ${orphans.gone.length} sidecar(s) with no page and ${orphans.uncertain.length} uncertain sidecar(s)` +
        `${absent.length === 0 || argv.includes("--remove") ? "" : " — nothing removed without --remove"}\n`
    )
    return unresolved === 0 ? 0 : 1
  }
  const taken = removePages(absent, rootFor(roots, AKASHA))
  if (taken.code === 0) {
    for (const one of absent) removeSidecars(one)
    process.stderr.write(`removed ${absent.length} seat page(s) and their sidecars\n`)
    return unresolved === 0 ? 0 : 1
  }
  const held = takeEachAlone(absent, rootFor(roots, AKASHA))
  const removed = absent.length - held.length
  if (removed > 0) process.stderr.write(`removed ${removed} seat page(s) and their sidecars\n`)
  for (const one of held) process.stderr.write(`refused: ${one}\n`)
  return held.length === 0 && unresolved === 0 ? 0 : 1
}

if (import.meta.main) process.exit(main(process.argv.slice(2)))
