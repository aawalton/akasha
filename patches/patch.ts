import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { checksOnPatch } from "../checks-system/checks.ts"
import { runGate } from "../checks-system/run/gate.ts"
import { akashaRoot } from "../repo/roots/roots.ts"

export const HERE = realpathSync(akashaRoot())

export const GATED = "AKASHA_CHECKS_RAN"

const SCRATCH = "/var/tmp"

const BUFFER_CEILING = 64 * 1024 * 1024

const DEFAULT_MODE = "100644"

export interface Landing {
  readonly relPath: string
  readonly from: string
}

export function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
}

function git(root: string, index: string | null, args: readonly string[]): Buffer {
  return execFileSync("git", ["-C", root, ...args], {
    maxBuffer: BUFFER_CEILING,
    env: index === null ? process.env : { ...process.env, GIT_INDEX_FILE: index },
  })
}

export function valueOf(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail(`${name} needs a value`)
  return value
}

export function payloadText(argv: readonly string[], wanted: boolean): string | null {
  const named = valueOf(argv, "--input-file")
  if (named !== null && named !== "-") {
    try {
      return readFileSync(resolve(process.cwd(), named), "utf8")
    } catch (thrown) {
      fail(`${named} could not be read: ${thrown instanceof Error ? thrown.message : String(thrown)}`)
    }
  }
  if (named === null && !wanted) return null
  if (process.stdin.isTTY === true) return null
  try {
    const read = readFileSync(0, "utf8")
    return read === "" ? null : read
  } catch {
    return null
  }
}

function modeOf(root: string, index: string, relPath: string): string {
  const staged = git(root, index, ["ls-files", "--stage", "--", relPath]).toString("utf8").trim()
  const mode = staged.split(/\s+/)[0]
  return mode === undefined || mode === "" ? DEFAULT_MODE : mode
}

export function patchText(
  landings: readonly Landing[],
  removals: readonly string[] = [],
  root: string = HERE
): string {
  const held = mkdtempSync(`${SCRATCH}/mp-write-`)
  const index = `${held}/index`
  try {
    const base = git(root, null, ["rev-parse", "HEAD"]).toString("utf8").trim()
    git(root, index, ["read-tree", base])
    for (const one of landings) {
      const sha = git(root, index, ["hash-object", "-w", "--path", one.relPath, one.from])
        .toString("utf8")
        .trim()
      const mode = modeOf(root, index, one.relPath)
      git(root, index, ["update-index", "--add", "--cacheinfo", `${mode},${sha},${one.relPath}`])
    }
    for (const relPath of removals) {
      git(root, index, ["update-index", "--force-remove", relPath])
    }
    return git(root, index, ["diff", "--cached", "--binary", base]).toString("utf8")
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

function refusalsOver(
  patch: string,
  root: string,
  goneElsewhere: readonly string[],
  repointedElsewhere: ReadonlyMap<string, string>
): readonly string[] {
  const held = mkdtempSync(`${SCRATCH}/mp-gate-`)
  const file = `${held}/change.patch`
  try {
    writeFileSync(file, patch)
    const said: string[] = []
    const asked = { root, file, goneElsewhere, repointedElsewhere }
    for (const ran of runGate(checksOnPatch(), asked)) {
      if ("threw" in ran) {
        said.push(`${ran.slug} threw: ${ran.threw}`)
        continue
      }
      for (const failure of ran.failures) said.push(`${ran.slug}: ${failure.path} — ${failure.reason}`)
    }
    return said
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export function gateOrRefuse(
  patch: string,
  changed: number,
  root: string = HERE,
  goneElsewhere: readonly string[] = [],
  repointedElsewhere: ReadonlyMap<string, string> = new Map()
): void {
  if (patch.trim() === "") {
    process.stderr.write("gate: no line differs from what stands, so no check had anything to judge\n")
    return
  }
  const refused = refusalsOver(patch, root, goneElsewhere, repointedElsewhere)
  if (refused.length > 0) {
    process.stderr.write(`${refused.join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  process.stderr.write(
    `gate: ${checksOnPatch().length} akasha check(s) over ${changed} changed file(s), none refused\n`
  )
}
