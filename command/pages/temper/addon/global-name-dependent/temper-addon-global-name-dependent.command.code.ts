import { readFileSync } from "node:fs"
import { relative, resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { global as globalArgument } from "akasha/command/argument/pages/global.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperAddonGlobalNameDependent as page } from "akasha/command/pages/temper/addon/global-name-dependent/temper-addon-global-name-dependent.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { collectGlobalWritesFromSource } from "akasha/temper/addon/build/deploy-check/modules/addon-global-ownership/addon-global-ownership.module.code.ts"
import {
  addonMarkupFiles,
  addonSourceFiles,
} from "akasha/temper/addon/build/deploy-check/modules/addon-source-files/addon-source-files.module.code.ts"
import {
  type DependentSourceFile,
  enumerateGlobalDependents,
  type GlobalDependentReport,
} from "akasha/temper/addon/build/modules/global-name-dependents/global-name-dependents.module.code.ts"
import { addonManifestSchema } from "akasha/temper/addon/build/resolve/modules/addon-json/addon-json.module.code.ts"
import { addonManifestPathIn } from "akasha/temper/addon/build/resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import { listAllAddons } from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"

const NAMED = [codeRootArgument, globalArgument, json]

const BOUND = "lam-topology-binding"

const SAVED_VARIABLES_SCHEMA = addonManifestSchema.pick({ savedVariables: true }).passthrough()

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
    for (const path of addonSourceFiles(addon.dir).code) {
      found.push({ path: relative(root, path), source: readFileSync(path, "utf8"), lang: "ts" })
    }
    for (const path of addonMarkupFiles(addon.dir).own) {
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
    for (const path of addonSourceFiles(addon.dir).code) {
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
