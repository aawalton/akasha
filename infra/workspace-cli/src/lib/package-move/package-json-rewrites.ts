import { z } from "zod"
import { exists, listFiles, readJson, writeJson } from "./fs"
import type { Logger } from "./logger"
import type { WorkspaceMove } from "./types"
import { computeWorkspacesAfterMove } from "./workspaces-array"

const PACKAGE_JSON_SCHEMA = z
  .object({
    name: z.string().optional(),
    dependencies: z.record(z.string(), z.string()).optional(),
    devDependencies: z.record(z.string(), z.string()).optional(),
    peerDependencies: z.record(z.string(), z.string()).optional(),
    optionalDependencies: z.record(z.string(), z.string()).optional(),
    workspaces: z.array(z.string()).optional(),
  })
  .passthrough()

const DEPENDENCY_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const

function findAllPackageJsons(root: string): readonly string[] {
  const out: string[] = []
  if (exists(root, "package.json")) out.push("package.json")
  for (const file of listFiles(root, "packages")) {
    if (file.endsWith("/package.json")) out.push(file)
  }
  return out
}

function rewriteOwnName(root: string, move: WorkspaceMove, log: Logger): undefined {
  if (move.oldName === move.newName) return
  const pkgPath = `${move.new}/package.json`
  if (!exists(root, pkgPath)) {
    log.warn(`[pkg] skip (missing): ${pkgPath}`)
    return
  }
  const pkg = readJson(root, pkgPath, PACKAGE_JSON_SCHEMA)
  if (pkg.name !== move.oldName) {
    log.warn(`[pkg] name mismatch at ${pkgPath}: expected "${move.oldName}", found "${pkg.name}"`)
  }
  pkg.name = move.newName
  writeJson(root, pkgPath, pkg)
  log.info(`[pkg] renamed: ${move.oldName} → ${move.newName}  (${pkgPath})`)
}

function rewriteDependencyKeys(root: string, move: WorkspaceMove, log: Logger): undefined {
  if (move.oldName === move.newName) return
  for (const pkgPath of findAllPackageJsons(root)) {
    const pkg = readJson(root, pkgPath, PACKAGE_JSON_SCHEMA)
    let changed = false
    for (const field of DEPENDENCY_FIELDS) {
      const deps = pkg[field]
      if (!deps) continue
      const updated: Record<string, string> = {}
      let fieldChanged = false
      for (const [key, value] of Object.entries(deps)) {
        if (key === move.oldName) {
          updated[move.newName] = value
          fieldChanged = true
          log.info(`[pkg] dep renamed in ${pkgPath} (${field}): ${key} → ${move.newName}`)
        } else {
          updated[key] = value
        }
      }
      if (fieldChanged) {
        pkg[field] = updated
        changed = true
      }
    }
    if (changed) writeJson(root, pkgPath, pkg)
  }
}

function rewriteRootWorkspaces(root: string, move: WorkspaceMove, log: Logger): undefined {
  if (move.old === move.new) return
  const rootPath = "package.json"
  const rootPkg = readJson(root, rootPath, PACKAGE_JSON_SCHEMA)
  if (!Array.isArray(rootPkg.workspaces)) {
    log.warn("[pkg] root package.json has no workspaces array — skipping")
    return
  }

  const { workspaces: after, changed } = computeWorkspacesAfterMove(
    rootPkg.workspaces,
    move.old,
    move.new
  )

  if (changed) {
    rootPkg.workspaces = [...after]
    writeJson(root, rootPath, rootPkg)
    log.info(`[pkg] workspace: ${move.old} → ${move.new}`)
  } else {
    log.info(
      `[pkg] workspaces: no literal change for "${move.old}" → "${move.new}" (glob-covered or absent)`
    )
  }
}

export function rewritePackageJsons(root: string, move: WorkspaceMove, log: Logger): undefined {
  log.info("\n[pkg] rewriting workspace name field")
  rewriteOwnName(root, move, log)

  log.info("\n[pkg] rewriting dependency keys across all package.json files")
  rewriteDependencyKeys(root, move, log)

  log.info("\n[pkg] rewriting root workspaces array")
  rewriteRootWorkspaces(root, move, log)
}
