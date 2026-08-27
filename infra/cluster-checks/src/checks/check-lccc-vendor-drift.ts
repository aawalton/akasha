#!/usr/bin/env bun

import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import {
  findLcccVendorDrift,
  type LcccVendorDrift,
  lcccDriftReason,
} from "../lib/lccc-vendor-drift.ts"
import { discoverLcccVendorSites, type LcccVendorSites } from "../../../../tools/lib/check-workflow/lccc-vendor-sites"
import { examinePopulation, populationCertifies } from "../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../tools/lib/check-workflow/remediation-doc"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[lccc-vendor-drift]"
const REMEDIATION_DOC = remediationHint(
  "resync: bun infra/cluster-checks/src/checks/check-lccc-vendor-drift.ts --write"
)

interface MirrorModule {
  readonly basename: string
  readonly mirrorDir: string
}

function readIfPresent(path: string): string | null {
  return existsSync(path) ? readFileSync(path, "utf8") : null
}

function loadReferenceTexts(
  repoRoot: string,
  sites: LcccVendorSites
): ReadonlyMap<string, string | null> {
  const texts = new Map<string, string | null>()
  for (const basename of sites.basenames) {
    texts.set(basename, readIfPresent(join(repoRoot, sites.referenceDir, `${basename}.ts`)))
  }
  return texts
}

function resync(repoRoot: string, drift: LcccVendorDrift): undefined {
  const path = join(repoRoot, drift.mirrorDir, `${drift.basename}.ts`)
  if (drift.referenceText === null) rmSync(path)
  else writeFileSync(path, drift.referenceText)
}

function main(): undefined {
  let flags: { json: boolean; write: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), {
      ...STANDARD_FLAGS,
      write: { kind: "boolean" },
    })
    flags = { json: parsed.flags.json, write: parsed.flags.write, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()

  let sites: LcccVendorSites
  let referenceTexts: ReadonlyMap<string, string | null>
  try {
    sites = discoverLcccVendorSites(repoRoot)
    referenceTexts = loadReferenceTexts(repoRoot, sites)
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const members: readonly MirrorModule[] = sites.mirrorDirs.flatMap((mirrorDir) =>
    sites.basenames.map((basename) => ({ basename, mirrorDir }))
  )

  const { population, violations: drift } = examinePopulation<MirrorModule, LcccVendorDrift>({
    members,
    unit: "vendored mirror modules",
    membership: {
      kind: "enumerated",
      because:
        "the members are the full cross product of the mirror directories and basenames `discoverLcccVendorSites` globbed off this tree, and that glob runs through `Bun.Glob.scanSync` — which raises on a root that is not there — and then refuses outright unless it found the reference copy and at least one mirror, so acquisition cannot come back short without stopping the run",
    },
    labelOf: (member) => `${member.mirrorDir}/${member.basename}.ts`,
    siteOf: (member) => join(repoRoot, member.mirrorDir, `${member.basename}.ts`),
    examine: (member) =>
      findLcccVendorDrift([
        {
          basename: member.basename,
          referenceText: referenceTexts.get(member.basename) ?? null,
          mirrors: [
            {
              dir: member.mirrorDir,
              text: readIfPresent(join(repoRoot, member.mirrorDir, `${member.basename}.ts`)),
            },
          ],
        },
      ]),
  })

  if (flags.write) {
    if (!populationCertifies(population)) {
      exitOnResult({ violations: [], options: { population, prefix: PREFIX } })
    }
    for (const d of drift) resync(repoRoot, d)
    const summary =
      drift.length === 0
        ? "every vendored lccc copy already matches the reference — nothing to resync"
        : `resynced ${drift.length} mirror module(s) to the reference: ${drift
            .map((d) => `${d.mirrorDir}/${d.basename}.ts`)
            .join(", ")}`
    process.stdout.write(`${PREFIX} ${summary}\n`)
    process.exit(0)
  }

  exitOnResult({
    violations: drift.map((d) => ({
      file: `${d.mirrorDir}/${d.basename}.ts`,
      message: lcccDriftReason(d, sites.referenceDir),
    })),
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `${drift.length} vendored lccc module(s) do not match the reference copy`,
      successMessage: `Every vendored lccc module is byte-identical across all ${sites.mirrorDirs.length + 1} addon copies.`,
      remediationDoc: REMEDIATION_DOC,
    },
  })
}

if (import.meta.main) {
  main()
}
