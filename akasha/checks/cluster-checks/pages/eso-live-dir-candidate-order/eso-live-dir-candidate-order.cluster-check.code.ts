#!/usr/bin/env bun

import { readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { esoLiveDirCandidates } from "@akasha/temper-eso-paths/eso-paths"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type CandidateOrderViolation,
  candidateOrderHeader,
  findCrateProbeViolations,
  findTsCandidateOrderViolations,
  scanRustSource,
} from "../../modules/eso-live-dir-candidate-order/eso-live-dir-candidate-order.module.code.ts"
import {
  examineFilePopulation,
  type Population,
  populationCertifies,
} from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[eso-live-dir-candidate-order]"
const TS_SOURCE = "akasha/temper/temper-eso-paths/eso-paths/eso-paths.module.code.ts"
const RUST_CRATE = "temper-watcher/tray"
const RUST_CRATE_ROOT = `${RUST_CRATE}/src/main.rs`
const RUST_FN = "resolve_saved_vars_dir"
const SUCCESS_MESSAGE =
  "TS and Rust ESO `live/` probes agree — OneDrive-redirected Documents is tried first on both sides."

const RUST_BUILD_DIR = "target"

const RUST_FILE_MODULE =
  /^[^\S\n]*(?:pub(?:\([^)]*\))?[^\S\n]+)?mod[^\S\n]+([A-Za-z_][A-Za-z0-9_]*)[^\S\n]*;/gm

const SENTINEL_PROFILE = "C:/eso-live-dir-candidate-order-probe"

function walkCrateSources(repoRoot: string): readonly string[] {
  const entries = readdirSync(resolve(repoRoot, RUST_CRATE), { recursive: true })
  const out: string[] = []
  for (const entry of entries) {
    const rel = String(entry).replaceAll("\\", "/")
    if (!rel.endsWith(".rs")) continue
    if (rel === RUST_BUILD_DIR || rel.startsWith(`${RUST_BUILD_DIR}/`)) continue
    out.push(`${RUST_CRATE}/${rel}`)
  }
  return out
}

const ModuleNameCaptures = z.tuple([z.string()])

function parseModuleName(match: RegExpExecArray | null): string | null {
  if (match === null) return null
  const [name] = ModuleNameCaptures.parse(match.slice(1))
  return name
}

function declaredCrateSources(repoRoot: string): readonly string[] {
  const root = readFileSync(resolve(repoRoot, RUST_CRATE_ROOT), "utf8")
  const out = [RUST_CRATE_ROOT]
  RUST_FILE_MODULE.lastIndex = 0
  for (;;) {
    const name = parseModuleName(RUST_FILE_MODULE.exec(root))
    if (name === null) return out
    out.push(`${RUST_CRATE}/src/${name}.rs`)
  }
}

function crateSources(repoRoot: string): readonly string[] {
  return [...new Set([...declaredCrateSources(repoRoot), ...walkCrateSources(repoRoot)])].sort()
}

function main(): undefined {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), { ...STANDARD_FLAGS }, { passthrough: true })
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()

  let population: Population
  let violations: readonly CandidateOrderViolation[]
  try {
    const tsCandidates = esoLiveDirCandidates({
      platform: "win32",
      env: { USERPROFILE: SENTINEL_PROFILE },
    })
    let namedResolvers = 0
    const declared = declaredCrateSources(repoRoot)
    const examined = examineFilePopulation<CandidateOrderViolation>({
      files: crateSources(repoRoot),
      unit: "rust source files",
      membership: {
        kind: "atLeast",
        members: declared.length,
        from: `the \`mod <name>;\` declarations in ${RUST_CRATE_ROOT}, plus that root itself`,
      },
      pathOf: (rel) => `${repoRoot}/${rel}`,
      scan: (rel, rustSource) => {
        const scan = scanRustSource({ rustFile: rel, rustSource, rustFn: RUST_FN })
        namedResolvers += scan.namedResolvers
        return scan.violations
      },
    })
    population = examined.population
    violations = [
      ...shortfallViolations(examined.population),
      ...findTsCandidateOrderViolations({ tsCandidates, tsFile: TS_SOURCE, rustFn: RUST_FN }),
      ...findCrateProbeViolations({
        namedResolvers,
        rustFn: RUST_FN,
        crateDir: RUST_CRATE,
        tsFile: TS_SOURCE,
      }),
      ...examined.violations,
    ]
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  exitOnResult({
    violations,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: candidateOrderHeader({ violations, examinedWhole: populationCertifies(population) }),
      successMessage: SUCCESS_MESSAGE,
    },
  })
}

function shortfallViolations(population: Population): readonly CandidateOrderViolation[] {
  if (populationCertifies(population)) return []
  return [
    {
      file: RUST_CRATE,
      message:
        `INVARIANT UNVERIFIED — this run did not examine every Rust source in ${RUST_CRATE}, so it has ` +
        `NOT established that the Rust probes agree with \`esoLiveDirCandidates()\` in ${TS_SOURCE}. ` +
        `The shortfall is named below the findings. ACT: make the unread sources readable at ` +
        `\`--repo-root\` and run again; nothing here certifies the crate until it reads whole`,
      verdict: "unverified",
    },
  ]
}

if (import.meta.main) {
  main()
}
