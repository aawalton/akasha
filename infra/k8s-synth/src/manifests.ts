#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { z } from "zod"

const PREFIX = "[k8s-synth]"

const CHECKOUT_MARKER = "bun.lock"

const SynthOutput = z.array(
  z
    .object({
      name: z
        .string()
        .min(1)
        .regex(/^[a-z0-9][a-z0-9-]*$/),
      yaml: z.string().min(1),
    })
    .strict()
)

export type SynthEntry = z.infer<typeof SynthOutput>[number]

export const DISCOVERY_GLOBS: readonly string[] = [
  "**/*.cluster-service.code.attachment.ts",
  "infra/k8s/src/*/synth.ts",
  "infra/k8s/*/*/k8s/synth.ts",
  "infra/*/k8s/synth.ts",
  "infra/*/*/k8s/synth.ts",
  "*/*/deploy/k8s/synth.ts",
  "*/*/*/deploy/k8s/synth.ts",
]

const NON_IDENTIFIER_COMPONENTS: ReadonlySet<string> = new Set(["k8s", "deploy", "src", "synth.ts"])

const K8S_SOURCE_ROOT = "infra/k8s/src/"

export function checkoutRoot(from: string = import.meta.dir): string {
  let dir = realpathSync(from)
  for (;;) {
    if (existsSync(join(dir, CHECKOUT_MARKER))) return dir
    const parent = dirname(dir)
    if (parent === dir) {
      throw new Error(
        `no \`${CHECKOUT_MARKER}\` stands above ${from}, so the code checkout holding it cannot be named`
      )
    }
    dir = parent
  }
}

export function reachedThroughSrc(relPath: string): boolean {
  const tail = relPath.startsWith(K8S_SOURCE_ROOT) ? relPath.slice(K8S_SOURCE_ROOT.length) : relPath
  return tail.split("/").includes("src")
}

const SYNTH_GLOBS: readonly Bun.Glob[] = DISCOVERY_GLOBS.map((pattern) => new Bun.Glob(pattern))

export function isSynthPath(relPath: string): boolean {
  if (reachedThroughSrc(relPath)) return false
  return SYNTH_GLOBS.some((glob) => glob.match(relPath))
}

export function pathHasComponent(relPath: string, target: string): boolean {
  for (const component of relPath.split("/")) {
    if (NON_IDENTIFIER_COMPONENTS.has(component)) continue
    if (component === target) return true
  }
  return false
}

export function discoverSynthFiles(
  repoRoot: string,
  pkgFilter?: string | undefined
): readonly string[] {
  const matches = new Set<string>()
  for (const pattern of DISCOVERY_GLOBS) {
    const glob = new Bun.Glob(pattern)
    for (const rel of glob.scanSync({ cwd: repoRoot, onlyFiles: true })) {
      if (reachedThroughSrc(rel)) continue
      if (pkgFilter !== undefined && !pathHasComponent(rel, pkgFilter)) continue
      matches.add(join(repoRoot, rel))
    }
  }
  return [...matches].sort()
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isThunk(value: unknown): value is () => unknown {
  return typeof value === "function"
}

export async function loadSynthOutputs(synthPath: string): Promise<readonly SynthEntry[]> {
  const mod: unknown = await import(synthPath)
  const entry = isRecord(mod) ? mod.default : undefined
  if (!isThunk(entry)) {
    throw new Error(`${synthPath}: default export is not a function`)
  }
  return SynthOutput.parse(await entry())
}

export function firstDiffLine(actual: string, expected: string): string {
  const actualLines = actual.split("\n")
  const expectedLines = expected.split("\n")
  const limit = Math.max(actualLines.length, expectedLines.length)
  for (let i = 0; i < limit; i++) {
    if (actualLines[i] !== expectedLines[i]) {
      return `first diff at line ${i + 1} (on-disk: ${JSON.stringify(actualLines[i] ?? "<eof>")}, synth: ${JSON.stringify(expectedLines[i] ?? "<eof>")})`
    }
  }
  return "files differ but no per-line diff found (likely trailing-newline difference)"
}

function tryRead(absPath: string): string | null {
  try {
    return readFileSync(absPath, "utf8")
  } catch {
    return null
  }
}

export function describeDrift(absPath: string, expected: string, repoRoot: string): string | null {
  const existing = tryRead(absPath)
  const relPath = relative(repoRoot, absPath)
  if (existing === null)
    return `${relPath}: missing — synth.ts produces this file but it is not on disk`
  if (existing === expected) return null
  return `${relPath}: ${firstDiffLine(existing, expected)}`
}

function writeIfChanged(absPath: string, content: string): undefined {
  if (tryRead(absPath) === content) return
  mkdirSync(dirname(absPath), { recursive: true })
  writeFileSync(absPath, content, "utf8")
}

export function generatedPathFor(synthPath: string, name: string): string {
  return join(dirname(synthPath), "generated", `${name}.generated.yaml`)
}

export interface SynthManifestsInput {
  readonly repoRoot?: string | undefined
  readonly pkgFilter?: string | undefined
  readonly check?: boolean
}

export interface SynthManifestsResult {
  readonly synthPaths: readonly string[]
  readonly drifts: readonly string[]
  readonly written: readonly string[]
}

export async function synthManifests(
  input: SynthManifestsInput = {}
): Promise<SynthManifestsResult> {
  const repoRoot = input.repoRoot ?? checkoutRoot()
  const check = input.check ?? false
  const synthPaths = discoverSynthFiles(repoRoot, input.pkgFilter)

  const drifts: string[] = []
  const written: string[] = []
  for (const synthPath of synthPaths) {
    for (const out of await loadSynthOutputs(synthPath)) {
      const onDiskPath = generatedPathFor(synthPath, out.name)
      if (check) {
        const drift = describeDrift(onDiskPath, out.yaml, repoRoot)
        if (drift !== null) drifts.push(drift)
        continue
      }
      writeIfChanged(onDiskPath, out.yaml)
      written.push(onDiskPath)
    }
  }
  return { synthPaths, drifts, written }
}

export function driftReport(drifts: readonly string[]): string {
  return [
    `${PREFIX} ${drifts.length} generated file(s) drift from their synth.ts source:`,
    "",
    ...drifts.map((drift) => `  ${drift}`),
    "",
    "fix: re-run this with --write and re-commit.",
    "",
  ].join("\n")
}

export function flagValue(argv: readonly string[], name: string): string | undefined {
  const at = argv.indexOf(name)
  if (at === -1) return undefined
  const value = argv[at + 1]
  return value === undefined || value.startsWith("--") ? undefined : value
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  if (argv.includes("--check") && argv.includes("--write")) {
    process.stderr.write(`${PREFIX} --check and --write are mutually exclusive\n`)
    process.exit(1)
  }
  const roots = argv.filter((one) => one === "--root").length
  if (roots > 1) {
    process.stderr.write(
      `${PREFIX} --root was given ${roots} times, and every generated file is written beside its own synth.ts, so there is one root to write under\n`
    )
    process.exit(1)
  }
  const repoRoot = flagValue(argv, "--root")
  const pkgFilter = flagValue(argv, "--pkg")
  const check = argv.includes("--check")

  const result = await synthManifests({ repoRoot, pkgFilter, check })

  if (result.synthPaths.length === 0 && pkgFilter !== undefined) {
    process.stderr.write(`${PREFIX} no synth.ts whose path contains component "${pkgFilter}"\n`)
    process.exit(1)
  }
  if (check && result.drifts.length > 0) {
    process.stderr.write(driftReport(result.drifts))
    process.exit(1)
  }
}

if (import.meta.main) await main()
