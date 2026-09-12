import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { global as globalArgument } from "akasha/commands/arguments/pages/global.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperAddonGlobalNameDependent as page } from "akasha/commands/pages/temper/addon/global-name-dependent/temper-addon-global-name-dependent.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  type DependentSourceFile,
  enumerateGlobalDependents,
  type GlobalDependentReport,
} from "akasha/temper/addon-build/global-name-dependents/global-name-dependents.module.code.ts"
import { listAllAddons } from "akasha/temper/addons-resolve/addon-roster/addon-roster.module.code.ts"
import { addonManifestSchema } from "akasha/temper/addons-resolve/modules/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import { collectGlobalWritesFromSource } from "akasha/temper/build-deploy-checks/modules/addon-global-ownership/addon-global-ownership.module.code.ts"

const NAMED = [codeRootArgument, globalArgument, json]

const PASSED_OVER = ["node_modules", "dist", "generated"]

const BOUND = "lam-topology-binding"

const SAVED_VARIABLES_SCHEMA = addonManifestSchema.pick({ savedVariables: true }).passthrough()

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

function savedVariablesOf(root: string, addonDir: string): readonly string[] {
  const path = addonManifestPathIn(root, addonDir)
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
    for (const name of savedVariablesOf(root, addon.dir)) owned.add(name)
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

export function temperAddonGlobalNameDependent(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const root = resolve(taken.codeRoot ?? codeRoot())
  const named = taken.global

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

  if (taken.json) {
    return told(reports.map((one) => JSON.stringify(one)))
  }

  if (reports.length === 0) {
    return told(["no global an addon writes carries a settings-panel binding here"])
  }

  return told(reports.flatMap(linesFor))
}
