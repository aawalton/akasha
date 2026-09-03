import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  type DependentSourceFile,
  enumerateGlobalDependents,
  type GlobalDependentReport,
} from "@akasha/temper-addon-build/global-name-dependents"
import { addonManifestSchema } from "@akasha/temper-addons-resolve/addon-json"
import { addonManifestPathIn } from "@akasha/temper-addons-resolve/addon-manifest-file"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import { collectGlobalWritesFromSource } from "@akasha/temper-build-deploy-checks/addon-global-ownership"

const DATA = 2

const GLOBAL_FLAG = "--global"

const REPO_ROOT_FLAG = "--repo-root"

const JSON_FLAG = "--json"

const TAKING_A_VALUE = [GLOBAL_FLAG, REPO_ROOT_FLAG]

const PASSED_OVER = ["node_modules", "dist", "generated"]

const BOUND = "lam-topology-binding"

const SAVED_VARIABLES_SCHEMA = addonManifestSchema.pick({ savedVariables: true }).passthrough()

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function namesIn(argv: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (TAKING_A_VALUE.includes(one)) {
      at += 1
      continue
    }
    if (one.startsWith("-")) continue
    found.push(one)
  }
  return found
}

function filesUnder(dir: string, keep: (path: string) => boolean): readonly string[] {
  const found: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return found
  }
  for (const entry of entries) {
    if (PASSED_OVER.includes(entry)) continue
    const path = join(dir, entry)
    let isDir = false
    try {
      isDir = statSync(path).isDirectory()
    } catch {
      continue
    }
    if (isDir) {
      found.push(...filesUnder(path, keep))
      continue
    }
    if (keep(path)) found.push(path)
  }
  return found
}

function isSource(path: string): boolean {
  if (!path.endsWith(".ts") && !path.endsWith(".tsx")) return false
  if (path.endsWith(".d.ts")) return false
  if (path.endsWith(".generated.ts") || path.endsWith(".generated.tsx")) return false
  return !/\.test\.tsx?$/.test(path)
}

function savedVariablesOf(addonDir: string): readonly string[] {
  const path = addonManifestPathIn(addonDir)
  if (path === null) return []
  try {
    return SAVED_VARIABLES_SCHEMA.parse(JSON.parse(readFileSync(path, "utf8"))).savedVariables ?? []
  } catch {
    return []
  }
}

function sourcesFor(
  addons: readonly { readonly dir: string }[],
  root: string
): readonly DependentSourceFile[] {
  const found: DependentSourceFile[] = []
  for (const addon of addons) {
    for (const path of filesUnder(join(addon.dir, "src"), isSource)) {
      found.push({ path: relative(root, path), source: readFileSync(path, "utf8"), lang: "ts" })
    }
    for (const path of filesUnder(join(addon.dir, "metadata"), (one) => one.endsWith(".xml"))) {
      found.push({ path: relative(root, path), source: readFileSync(path, "utf8"), lang: "xml" })
    }
  }
  return found
}

function ownedGlobals(
  addons: readonly { readonly dir: string }[],
  root: string
): readonly string[] {
  const owned = new Set<string>()
  for (const addon of addons) {
    for (const path of filesUnder(join(addon.dir, "src"), isSource)) {
      for (const name of collectGlobalWritesFromSource(
        readFileSync(path, "utf8"),
        relative(root, path)
      )) {
        owned.add(name)
      }
    }
    for (const name of savedVariablesOf(addon.dir)) owned.add(name)
  }
  return [...owned].sort()
}

function linesFor(report: GlobalDependentReport): readonly string[] {
  const said =
    report.verdict === "rename-safe" ? "rename-safe (no dependents)" : "keep-name-required"
  const lines = [
    `${report.global} → ${said} — ${String(report.dependents.length)} dependent(s)`,
    ...report.dependents.map(
      (one) => `  ${one.file}:${String(one.line)}:${String(one.column)} [${one.kind}] ${one.detail}`
    ),
  ]
  if (report.verdict === "keep-name-required") {
    lines.push(`  a rename of ${report.global} would break these, so the name is kept`)
  }
  return lines
}

export function temperAddonGlobalNameDependents(argv: readonly string[] = []): Answer {
  const root = resolve(valuesOf(argv, REPO_ROOT_FLAG)[0] ?? codeRoot())
  const named = valuesOf(argv, GLOBAL_FLAG)[0] ?? namesIn(argv)[0]

  const addons = listAllAddons({ repoRoot: root })
  if (addons.length === 0) {
    return refused(
      `${root} holds no addon carrying a manifest, so a clean run here would name no dependent`,
      DATA
    )
  }

  const sources = sourcesFor(addons, root)

  const reports =
    named === undefined
      ? ownedGlobals(addons, root)
          .map((one) => enumerateGlobalDependents({ global: one, files: sources }))
          .filter((one) => one.dependents.some((dep) => dep.kind === BOUND))
      : [enumerateGlobalDependents({ global: named, files: sources })]

  if (argv.includes(JSON_FLAG)) {
    return { report: reports.map((one) => JSON.stringify(one)), refusals: [], code: 0 }
  }

  if (reports.length === 0) {
    return {
      report: ["no global an addon writes carries a settings-panel binding here"],
      refusals: [],
      code: 0,
    }
  }

  return { report: reports.flatMap(linesFor), refusals: [], code: 0 }
}
