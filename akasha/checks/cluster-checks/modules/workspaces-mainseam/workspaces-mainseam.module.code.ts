import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import {
  examinePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population.ts"
import type { Violation } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"

const MANIFEST = "package.json"

export type SeamFn = (repoRoot: string) => readonly string[]

export interface WorkspacesSeamResult {
  readonly population: Population
  readonly violations: readonly Violation[]
}

const ROOT_MANIFEST_SCHEMA = z.object({ workspaces: z.array(z.string()).optional() }).passthrough()

function readWorkspaceEntries(manifestPath: string): readonly string[] {
  const parsed = ROOT_MANIFEST_SCHEMA.parse(JSON.parse(readFileSync(manifestPath, "utf-8")))
  return parsed.workspaces ?? []
}

const SCRATCH_ROOT = "/var/tmp"

function makeProbeRoot(repoRoot: string): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "workspaces-seam-probe-"))
  for (const child of readdirSync(repoRoot)) {
    if (child === MANIFEST) continue
    symlinkSync(join(repoRoot, child), join(dir, child))
  }
  return dir
}

function removeProbeRoot(dir: string): undefined {
  for (const child of readdirSync(dir)) rmSync(join(dir, child))
  rmdirSync(dir)
}

function seamRefusal(seam: SeamFn, probeRoot: string, entry: string): string | undefined {
  writeFileSync(join(probeRoot, MANIFEST), JSON.stringify({ workspaces: [entry] }))
  try {
    seam(probeRoot)
    return undefined
  } catch (error) {
    return error instanceof Error ? error.message : String(error)
  }
}

export function validateWorkspacesAgainstSeam(
  seam: SeamFn,
  repoRoot: string
): WorkspacesSeamResult {
  const manifestPath = join(repoRoot, MANIFEST)
  const entries = readWorkspaceEntries(manifestPath)
  const probeRoot = makeProbeRoot(repoRoot)
  try {
    return examinePopulation<string, Violation>({
      members: entries,
      unit: "workspace entries",
      membership: {
        kind: "enumerated",
        because:
          "`readWorkspaceEntries` does not catch: a root manifest that is absent, is not JSON, " +
          "or carries a `workspaces` that is not an array of strings throws out of this function " +
          "to the check's tool-error channel, so fewer entries means fewer entries declared",
      },
      labelOf: (entry) => entry,
      siteOf: () => manifestPath,
      examine: (entry) => {
        const detail = seamRefusal(seam, probeRoot, entry)
        if (detail === undefined) return []
        return [
          {
            message:
              `root package.json#workspaces entry "${entry}" is not parseable by the ` +
              "deployed-main @akasha/workspace-paths seam — this exact shape would crash " +
              "merge-queue advance-forming (the failure that wedged a fleet-wide batch). " +
              `Seam error: ${detail}. Fix via expand-contract: land the seam grammar ` +
              "extension on main FIRST, then use the new workspaces shape in a later change.",
          },
        ]
      },
    })
  } finally {
    removeProbeRoot(probeRoot)
  }
}
