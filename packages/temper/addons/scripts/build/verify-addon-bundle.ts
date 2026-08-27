#!/usr/bin/env bun

import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { join } from "node:path"
import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import { z } from "zod"

const SCRATCH_ROOT = "/var/tmp"

const ALLOWED_EXTERNAL = new Set(["TamrielTradeCentre"])

const DEPENDS_LINE_RE = /^##\s*(?:Optional)?DependsOn:\s*(.*)$/i
const DEPENDS_VALUE_SCHEMA = z.tuple([z.string()])

interface Manifest {
  readonly addon: string
  readonly dependsOn: readonly string[]
}

function usage(): never {
  process.stderr.write(
    [
      "Usage: verify-addon-bundle.ts --archive <path> [--drop <AddonName>]",
      "",
      "  --archive <path>   Archive to verify.",
      "  --drop <Name>      Remove <Name> after extraction, before checking.",
      "                     Negative control: the run MUST fail. A check that",
      "                     passes with a required member missing is not evidence.",
      "",
    ].join("\n")
  )
  process.exit(2)
}

function parseArgs(argv: readonly string[]): { archive: string; drop: readonly string[] } {
  let archive: string | undefined
  const drop: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i]
    const value = argv[i + 1]
    if (flag === "--archive" && value !== undefined) {
      archive = value
      i++
    } else if (flag === "--drop" && value !== undefined) {
      drop.push(value)
      i++
    } else {
      usage()
    }
  }
  if (archive === undefined) usage()
  return { archive, drop }
}

function dependencyName(token: string): string {
  const cut = token.search(/[<>=]/)
  return (cut === -1 ? token : token.slice(0, cut)).trim()
}

function readManifest(root: string, addon: string): Manifest | null {
  let raw: string
  try {
    raw = readFileSync(join(root, addon, `${addon}.txt`), "latin1")
  } catch {
    return null
  }
  const dependsOn: string[] = []
  for (const line of raw.split(/\r?\n/)) {
    if (!DEPENDS_LINE_RE.test(line)) continue
    const [value] = requireMatchPositional(DEPENDS_LINE_RE, DEPENDS_VALUE_SCHEMA, line, addon)
    for (const token of value.trim().split(/\s+/)) {
      if (token !== "") dependsOn.push(dependencyName(token))
    }
  }
  return { addon, dependsOn }
}

function extract(archive: string): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "temper-addon-bundle-verify-"))
  const proc = Bun.spawnSync(["unzip", "-q", archive, "-d", dir])
  if (proc.exitCode !== 0) {
    process.stderr.write(`unzip failed (exit ${proc.exitCode}): ${proc.stderr.toString()}\n`)
    rmSync(dir, { recursive: true, force: true })
    process.exit(3)
  }
  return dir
}

function main(): undefined {
  const { archive, drop } = parseArgs(process.argv.slice(2))
  if (!statSync(archive, { throwIfNoEntry: false })?.isFile()) {
    process.stderr.write(`archive not found: ${archive}\n`)
    process.exit(2)
  }

  const root = extract(archive)
  try {
    for (const name of drop) {
      rmSync(join(root, name), { recursive: true, force: true })
      process.stdout.write(`NEGATIVE CONTROL: removed ${name} from the extraction\n`)
    }

    const present = readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()

    if (present.length === 0) {
      process.stderr.write("FAIL: archive expanded to no addon directories\n")
      process.exit(1)
    }

    const installed = new Set(present)
    const problems: string[] = []
    for (const addon of present) {
      const manifest = readManifest(root, addon)
      if (manifest === null) {
        problems.push(`${addon}: no ${addon}.txt — ESO cannot load a folder without its manifest`)
        continue
      }
      for (const dep of manifest.dependsOn) {
        if (installed.has(dep) || ALLOWED_EXTERNAL.has(dep)) continue
        problems.push(`${addon}: requires ${dep}, which is neither bundled nor a documented external`)
      }
    }

    process.stdout.write(`archive:   ${archive}\n`)
    process.stdout.write(`extracted: ${root}\n`)
    process.stdout.write(`addons:    ${present.length}\n`)
    process.stdout.write(`${present.join("\n")}\n`)

    if (problems.length > 0) {
      process.stderr.write(`\nFAIL: ${problems.length} unsatisfied dependency edge(s)\n`)
      for (const problem of problems) process.stderr.write(`  ${problem}\n`)
      process.exit(1)
    }
    process.stdout.write(
      `\nPASS: every declared dependency resolves within the archive (externals allowed: ${[...ALLOWED_EXTERNAL].join(", ")})\n`
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

main()
