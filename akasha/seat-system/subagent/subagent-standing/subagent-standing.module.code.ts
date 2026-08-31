import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { standingById } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"

export const WRITER = "subagent-page-writer"

export const SUBAGENTS_AT = "akasha/seat-system/subagent/subagents"

export const WRITING = "write"

export const TAKING = "take"

const CLI = "akasha/command-system/cli/cli.module.code.ts"

const SEAT = "seat"

const SUFFIX = ".subagent.ts"

const SCRATCH = "/var/tmp"

const WANTED = /--file-path\s+(\S+)/g

const ROUNDS = 4

export function slugOf(seatName: string, own: string): string {
  return `${seatName}-${own}`.replace(/-{2,}/g, "-")
}

export function pathOf(slug: string): string {
  return `${SUBAGENTS_AT}/${slug}${SUFFIX}`
}

function said(value: string): string {
  return JSON.stringify(value)
}

export function bodyOf(slug: string, seatName: string, dispatchedAs: string): string {
  return [
    'import type { Subagent } from "../subagent.page-type.ts"',
    "",
    `export const ${exportedAs(slug)} = {`,
    '  pageTypeSlug: "subagent",',
    `  slug: ${said(slug)},`,
    `  principalSeatName: ${said(seatName)},`,
    `  dispatchedAs: ${said(dispatchedAs)},`,
    "} as const satisfies Subagent",
    "",
  ].join("\n")
}

export function seatNamedIn(root: string, seatId: string): string | null {
  const standing = standingById(root, seatId)
  if (standing === null) return null
  const named = namedIn(standing.path)
  return named === null || named.tail !== SEAT ? null : named.stem
}

function ran(root: string, args: readonly string[]): { code: number; output: string } {
  const dir = mkdtempSync(join(SCRATCH, "subagent-standing-"))
  const at = join(dir, "out.txt")
  try {
    const sink = Bun.file(at)
    const proc = Bun.spawnSync([process.execPath, join(root, CLI), ...args], {
      stdout: sink,
      stderr: sink,
      env: { ...process.env, AGENT_ID: WRITER, ACTING_AGENT_ID: "" },
    })
    let output = ""
    try {
      output = readFileSync(at, "utf8")
    } catch {
      output = ""
    }
    return { code: proc.exitCode ?? 1, output }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function wantedIn(output: string): readonly string[] {
  const found = new Set<string>()
  for (const [, path] of output.matchAll(WANTED)) if (path !== undefined) found.add(path)
  return [...found]
}

export function landed(root: string, args: readonly string[]): boolean {
  let asked = ran(root, args)
  for (let round = 0; round < ROUNDS && asked.code !== 0; round += 1) {
    const wanted = wantedIn(asked.output)
    if (wanted.length === 0) break
    for (const path of wanted) {
      if (ran(root, ["read", "--file-path", path]).code !== 0) return false
    }
    asked = ran(root, args)
  }
  return asked.code === 0
}

export function wrote(root: string, seatName: string, own: string, dispatchedAs: string): boolean {
  const slug = slugOf(seatName, own)
  const at = join(root, pathOf(slug))
  if (existsSync(at)) return true
  const dir = mkdtempSync(join(SCRATCH, "subagent-body-"))
  try {
    const bodyPath = join(dir, "body.ts")
    writeFileSync(bodyPath, bodyOf(slug, seatName, dispatchedAs), "utf8")
    return landed(root, [
      "write",
      "--file-path",
      at,
      "--content-file",
      bodyPath,
      "--message",
      `${slug}: a subagent states the kind it was dispatched as`,
    ])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function took(root: string, seatName: string, own: string): boolean {
  const slug = slugOf(seatName, own)
  const at = join(root, pathOf(slug))
  if (!existsSync(at)) return true
  return landed(root, [
    "write",
    "--remove",
    at,
    "--message",
    `${slug} is done, so its page goes; what it was stands in this repository's history`,
  ])
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
