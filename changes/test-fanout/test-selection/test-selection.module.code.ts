#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"

const PREFIX = "[select-tests]"

const OUTSIDE_MAP_SCHEMA_VERSION = 2

const ARTIFACT_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    inputsHash: z.string(),
    byWorkspace: z.record(
      z.string(),
      z
        .object({
          testFiles: z.array(z.string()),
          reverseMap: z.record(z.string(), z.array(z.string())),
        })
        .strict()
    ),
    outsideMap: z.array(z.string()).optional(),
  })
  .strict()

type Artifact = z.infer<typeof ARTIFACT_SCHEMA>

interface CliArgs {
  mapPath: string
  pkgRoot: string
  changedFilesPath: string
}

function parseArgs(argv: readonly string[]): CliArgs {
  let mapPath: string | null = null
  let pkgRoot: string | null = null
  let changedFilesPath: string | null = null

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined) continue
    if (arg === "--map") {
      mapPath = argv[++i] ?? null
    } else if (arg.startsWith("--map=")) {
      mapPath = arg.slice("--map=".length)
    } else if (arg === "--pkg-root") {
      pkgRoot = argv[++i] ?? null
    } else if (arg.startsWith("--pkg-root=")) {
      pkgRoot = arg.slice("--pkg-root=".length)
    } else if (arg === "--changed-files") {
      changedFilesPath = argv[++i] ?? null
    } else if (arg.startsWith("--changed-files=")) {
      changedFilesPath = arg.slice("--changed-files=".length)
    } else {
      console.error(`${PREFIX} unknown argument: ${arg}`)
      process.exit(1)
    }
  }

  if (mapPath === null) {
    console.error(`${PREFIX} missing --map <path>`)
    process.exit(1)
  }
  if (pkgRoot === null) {
    console.error(`${PREFIX} missing --pkg-root <path>`)
    process.exit(1)
  }
  if (changedFilesPath === null) {
    console.error(`${PREFIX} missing --changed-files <path>`)
    process.exit(1)
  }

  return { mapPath: resolve(mapPath), pkgRoot, changedFilesPath: resolve(changedFilesPath) }
}

function readChangedFiles(path: string): readonly string[] {
  if (!existsSync(path)) return []
  const raw = readFileSync(path, "utf8")
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
}

function isTypeScript(path: string): boolean {
  return path.endsWith(".ts") || path.endsWith(".tsx")
}

type WorkspaceSummary = { readonly reverseMap: Readonly<Record<string, readonly string[]>> }

export type Selection =
  | { readonly kind: "run-all" }
  | { readonly kind: "subset"; readonly tests: readonly string[] }

export type WorkspacePlacement = "mapped" | "outside-map" | "undiscovered" | "unstated"

export function placeWorkspace(
  artifact: {
    readonly schemaVersion: number
    readonly byWorkspace: Readonly<Record<string, unknown>>
    readonly outsideMap?: readonly string[]
  },
  pkgRoot: string
): WorkspacePlacement {
  if (artifact.byWorkspace[pkgRoot] !== undefined) return "mapped"
  if (artifact.schemaVersion < OUTSIDE_MAP_SCHEMA_VERSION || artifact.outsideMap === undefined) {
    return "unstated"
  }
  return artifact.outsideMap.includes(pkgRoot) ? "outside-map" : "undiscovered"
}

export function decideTestSelection(
  summary: WorkspaceSummary | undefined,
  changedFiles: readonly string[]
): Selection {
  if (summary === undefined) return { kind: "run-all" }
  if (changedFiles.length === 0) return { kind: "run-all" }

  const selected = new Set<string>()
  for (const file of changedFiles) {
    if (!isTypeScript(file)) return { kind: "run-all" }
    const testsForFile = summary.reverseMap[file]
    if (testsForFile === undefined) {
      continue
    }
    for (const t of testsForFile) selected.add(t)
  }
  return { kind: "subset", tests: [...selected] }
}

export async function main(argv: readonly string[]): Promise<void> {
  const args = parseArgs(argv)

  if (!existsSync(args.mapPath)) {
    console.error(`${PREFIX} reverse-reachability artifact not found: ${args.mapPath}`)
    process.exit(2)
  }
  const artifact: Artifact = ARTIFACT_SCHEMA.parse(JSON.parse(readFileSync(args.mapPath, "utf8")))
  const summary = artifact.byWorkspace[args.pkgRoot]
  const changed = readChangedFiles(args.changedFilesPath)

  const placement = placeWorkspace(artifact, args.pkgRoot)
  if (placement === "outside-map") {
    console.error(
      `${PREFIX} ${args.pkgRoot}: the map names this workspace as outside it, so the full test set runs`
    )
  } else if (placement === "undiscovered") {
    console.error(
      `${PREFIX} ${args.pkgRoot}: the producer discovered no such workspace, so the full test set runs — a test step exists for a workspace the map never saw`
    )
  } else if (placement === "unstated") {
    console.error(
      `${PREFIX} ${args.pkgRoot}: this artifact (schemaVersion ${artifact.schemaVersion}) states no population, so whether the workspace was discovered is unknown; the full test set runs`
    )
  }

  const selection = decideTestSelection(summary, changed)
  if (selection.kind === "run-all") {
    process.stdout.write("__RUN_ALL__\n")
    return
  }

  if (selection.tests.length === 0) return
  const prefix = `${args.pkgRoot}/`
  for (const t of [...selection.tests].sort()) {
    const relToPkg = t.startsWith(prefix) ? t.slice(prefix.length) : t
    process.stdout.write(`${relToPkg}\n`)
  }
}

if (import.meta.main) {
  await main(Bun.argv.slice(2))
}
