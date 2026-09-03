export const summary =
  "Rule that every territory map entry names an addon the roster finds at the package it records, and every generated file sits under a generated directory"

import { readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { canonicalize, normalizeAbsolute } from "@akasha/pages-system/repo-path"
import {
  type AddonStructureFacts,
  scanAddonStructure,
} from "../../../../../tools/lib/check-workflow/held-addon-structure.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population.ts"
import {
  readTerritoryMap,
  TERRITORY_MAP_PATH,
} from "../../../../../tools/lib/check-workflow/territory-map.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter.ts"
import { parseArgs } from "../../../../../tools/lib/parse-args.ts"
import { addonsResolve } from "../../../../../tools/lib/temper-addon-code.ts"
import type { CommandHelp, HelpFlag } from "../../../../../tools/ops/surface.ts"

const PREFIX = "[held-addon-structure]"

const CODE_ROOT_FLAG: HelpFlag = {
  name: "--code-root",
  argLabel: "<dir>",
  valueShape: "token",
  path: true,
  description:
    "The checkout the addon roster is read from and whose packages are walked (defaults to $CODE_ROOT, else this repository).",
}

export const help: CommandHelp = {
  flags: [
    CODE_ROOT_FLAG,
    { name: "--json", description: "Emit one JSON object per violation instead of prose." },
  ],
  exits: [
    { code: 0, meaning: "every map entry and every generated file sits where it should" },
    { code: 1, meaning: "a map entry is stale or misplaced, or a generated file sits loose" },
    { code: 2, meaning: "the roster came back empty, so the run certifies nothing" },
  ],
  examples: [
    "ops check-held-addon-structure",
    "ops check-held-addon-structure --code-root ~/repos/akasha",
  ],
}

interface Finding {
  readonly file: string
  readonly message: string
}

function generatedFilesUnder(root: string, packageDir: string): readonly string[] {
  const out: string[] = []
  const walk = (dir: string): undefined => {
    for (const entry of readdirSync(dir)) {
      if (entry === "node_modules" || entry === "dist") continue
      const at = join(dir, entry)
      if (statSync(at).isDirectory()) {
        walk(at)
        continue
      }
      if (at.endsWith(".generated.ts") || at.endsWith(".generated.tsx"))
        out.push(relative(root, at))
    }
  }
  walk(join(root, packageDir))
  return out
}

export default async function checkHeldAddonStructure(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = canonicalize(normalizeAbsolute(parsed.string("--code-root") ?? codeRoot()))

  let names: readonly string[]
  let rosterDirs: Map<string, string>
  let mapDirs: Map<string, string>
  try {
    const { listAllAddons } = await addonsResolve()
    const roster = listAllAddons({ repoRoot: root })
    if (roster.length === 0) {
      throw new Error(
        `the addon roster at ${root} discovered no addon, so this run has nothing to hold the map against and certifies nothing`
      )
    }
    rosterDirs = new Map(roster.map((one) => [one.canonicalName, one.repoRelDir]))
    mapDirs = new Map(readTerritoryMap().addons.map((one) => [one.addon, one.package]))
    names = [...new Set([...rosterDirs.keys(), ...mapDirs.keys()])].sort()
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const { population, violations } = examinePopulation<string, Finding>({
    members: names,
    unit: "addons",
    membership: {
      kind: "atLeast",
      members: names.length,
      from: `the addon roster at ${root} unioned with the nodes ${TERRITORY_MAP_PATH} names`,
    },
    labelOf: (addon) => addon,
    siteOf: (addon) => {
      const dir = rosterDirs.get(addon) ?? mapDirs.get(addon)
      return dir === undefined ? null : join(root, dir)
    },
    examine: (addon) => {
      const rosterDir = rosterDirs.get(addon) ?? null
      const facts: AddonStructureFacts = {
        addon,
        rosterDir,
        mapPackageDir: mapDirs.get(addon) ?? null,
        generatedFiles: rosterDir === null ? [] : generatedFilesUnder(root, rosterDir),
      }
      return scanAddonStructure([facts]).map((one) => ({ file: one.file, message: one.message }))
    },
  })

  exitOnResult<Finding>({
    violations,
    options: {
      population,
      format: parsed.boolean("--json") ? "json" : "human",
      prefix: PREFIX,
      header: "the territory map and the addon tree disagree",
      successMessage:
        `Every map entry names an addon the roster finds at the package it records, and every generated file sits under a generated directory. ` +
        `Measured over ${names.length} addon(s) in the tree at ${root}.`,
      formatViolation: (one) => one.message,
    },
  })
}
