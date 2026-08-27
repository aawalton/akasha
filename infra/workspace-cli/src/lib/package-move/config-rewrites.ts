import { readdirSync } from "node:fs"
import { join } from "node:path"
import { exists, listFiles, readText, writeText } from "./fs"
import type { Logger } from "./logger"
import { applyPathRename } from "./rename-primitives"
import type { WorkspaceMove } from "./types"

function rewriteFileInPlace(
  root: string,
  path: string,
  transform: (before: string) => { next: string; count: number },
  log: Logger
): boolean {
  if (!exists(root, path)) return false
  const before = readText(root, path)
  const { next, count } = transform(before)
  if (count === 0 || next === before) return false
  writeText(root, path, next)
  log.info(`  (wrote) ${path} (${count} replacement(s))`)
  return true
}

function rewriteRootPackageJsonScripts(root: string, move: WorkspaceMove, log: Logger): boolean {
  return rewriteFileInPlace(
    root,
    "package.json",
    (before) => {
      let next = before
      let count = 0

      const pathRes = applyPathRename(next, move.old, move.new)
      next = pathRes.text
      count += pathRes.count

      if (move.oldName !== move.newName) {
        const escaped = move.oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const pattern = new RegExp(`(--filter\\s+(?:['"])?)${escaped}((?:['"])?)`, "g")
        next = next.replace(pattern, (_m, pre: string, post: string) => {
          count += 1
          return `${pre}${move.newName}${post}`
        })
      }

      return { next, count }
    },
    log
  )
}

function listYamlTargets(root: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(join(root, "."), { withFileTypes: true })) {
    if (!entry.isFile()) continue
    const name = entry.name
    if (name === "biome.json" || name === ".sops.yaml" || name.endsWith(".config.json")) {
      out.push(name)
    }
  }
  for (const file of listFiles(root, "packages")) {
    if (file.endsWith(".yaml") || file.endsWith(".yml")) out.push(file)
  }
  return out
}

function rewriteYamlOrJson(root: string, path: string, move: WorkspaceMove, log: Logger): boolean {
  return rewriteFileInPlace(
    root,
    path,
    (before) => {
      const r = applyPathRename(before, move.old, move.new)
      return { next: r.text, count: r.count }
    },
    log
  )
}

export const PATH_LITERAL_TS_TARGETS = [
  "infra/cluster-checks/src/lib/check-tsconfig-allowlists.ts",
  "infra/cluster-checks/src/checks/check-exhaustive-dispatch.ts",
  "infra/cluster-checks/src/checks/check-readonly-collections.ts",
  "infra/cluster-checks/src/lib/ts-exhaustive-dispatch.ts",
]

function rewriteTsPathLiterals(
  root: string,
  path: string,
  move: WorkspaceMove,
  log: Logger
): boolean {
  return rewriteFileInPlace(
    root,
    path,
    (before) => {
      const r = applyPathRename(before, move.old, move.new)
      return { next: r.text, count: r.count }
    },
    log
  )
}

export function rewriteConfigs(root: string, move: WorkspaceMove, log: Logger): undefined {
  log.info("\n[config-rewrites]")
  let wrote = 0

  if (rewriteRootPackageJsonScripts(root, move, log)) wrote += 1

  if (move.old !== move.new) {
    for (const target of listYamlTargets(root)) {
      if (rewriteYamlOrJson(root, target, move, log)) wrote += 1
    }
    for (const target of PATH_LITERAL_TS_TARGETS) {
      if (rewriteTsPathLiterals(root, target, move, log)) wrote += 1
    }
  }

  log.info(`[config-rewrites] wrote ${wrote} file(s)`)
}
