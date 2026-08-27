import { posix } from "node:path"
import { z } from "zod"
import { exists, listFiles, readJson, writeJson } from "./fs"
import type { Logger } from "./logger"
import type { WorkspaceMove } from "./types"

const TS_CONFIG_REFERENCE_SCHEMA = z.object({ path: z.string() }).passthrough()

const TS_CONFIG_SCHEMA = z
  .object({
    extends: z.string().optional(),
    compilerOptions: z
      .object({
        paths: z.record(z.string(), z.array(z.string())).optional(),
      })
      .passthrough()
      .optional(),
    references: z.array(TS_CONFIG_REFERENCE_SCHEMA).optional(),
  })
  .passthrough()

type TsConfigReference = z.infer<typeof TS_CONFIG_REFERENCE_SCHEMA>

type TsConfig = z.infer<typeof TS_CONFIG_SCHEMA>

function findAllTsconfigs(root: string): readonly string[] {
  const out: string[] = []
  for (const entry of ["tsconfig.json", "tsconfig.base.json"]) {
    if (exists(root, entry)) out.push(entry)
  }
  for (const file of listFiles(root, "packages")) {
    const base = posix.basename(file)
    if (base.startsWith("tsconfig") && base.endsWith(".json")) out.push(file)
  }
  return out
}

export function deriveOldDir(newDir: string, move: WorkspaceMove): string {
  if (move.old === move.new) return newDir
  if (newDir === move.new) return move.old
  if (newDir.startsWith(`${move.new}/`)) {
    return `${move.old}${newDir.slice(move.new.length)}`
  }
  return newDir
}

export function deriveNewTarget(oldTarget: string, move: WorkspaceMove): string {
  if (move.old === move.new) return oldTarget
  if (oldTarget === move.old) return move.new
  if (oldTarget.startsWith(`${move.old}/`)) {
    return `${move.new}${oldTarget.slice(move.old.length)}`
  }
  return oldTarget
}

function resolveRepoRelative(dir: string, relPath: string): string | null {
  const joined = posix.normalize(posix.join(dir, relPath))
  if (joined.startsWith("../") || joined === "..") return null
  return joined
}

export function toRefPath(newDir: string, newTarget: string): string {
  const rel = posix.relative(newDir, newTarget)
  if (rel === "") return "."
  if (rel.startsWith("../") || rel === "..") return rel
  return `./${rel}`
}

function rewriteReferences(
  tsconfigPath: string,
  refs: readonly TsConfigReference[],
  newDir: string,
  oldDir: string,
  move: WorkspaceMove,
  log: Logger
): boolean {
  let changed = false
  for (const ref of refs) {
    if (typeof ref.path !== "string") continue
    const oldResolved = resolveRepoRelative(oldDir, ref.path)
    if (oldResolved === null) {
      log.warn(
        `[tsconfig] ${tsconfigPath}: cannot resolve ref "${ref.path}" against "${oldDir}" — skipping`
      )
      continue
    }
    const newTarget = deriveNewTarget(oldResolved, move)
    const newRef = toRefPath(newDir, newTarget)
    if (newRef !== ref.path) {
      log.info(
        `[tsconfig] ${tsconfigPath}: ref "${ref.path}" → "${newRef}" (target ${oldResolved} → ${newTarget})`
      )
      ref.path = newRef
      changed = true
    }
  }
  return changed
}

function rewriteCompilerPaths(
  tsconfigPath: string,
  paths: Record<string, string[]>,
  newDir: string,
  oldDir: string,
  move: WorkspaceMove,
  log: Logger
): boolean {
  let changed = false
  for (const [alias, values] of Object.entries(paths)) {
    if (!Array.isArray(values)) continue
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      if (typeof value !== "string") continue
      const hasGlob = value.endsWith("/*")
      const baseValue = hasGlob ? value.slice(0, -2) : value
      const oldResolved = resolveRepoRelative(oldDir, baseValue)
      if (oldResolved === null) continue
      const newTarget = deriveNewTarget(oldResolved, move)
      if (newTarget === oldResolved) continue
      const rawRel = posix.relative(newDir, newTarget)
      let newRel: string
      if (rawRel === "") newRel = "."
      else if (rawRel.startsWith("../") || rawRel === "..") newRel = rawRel
      else newRel = `./${rawRel}`
      const newValue = hasGlob ? `${newRel}/*` : newRel
      if (newValue !== value) {
        log.info(`[tsconfig] ${tsconfigPath}: paths["${alias}"][${i}] "${value}" → "${newValue}"`)
        values[i] = newValue
        changed = true
      }
    }
  }
  return changed
}

function rewriteExtends(
  tsconfigPath: string,
  cfg: TsConfig,
  newDir: string,
  oldDir: string,
  move: WorkspaceMove,
  log: Logger
): boolean {
  if (typeof cfg.extends !== "string") return false
  const oldResolved = resolveRepoRelative(oldDir, cfg.extends)
  if (oldResolved === null) return false
  const newTarget = deriveNewTarget(oldResolved, move)
  const newExtends = toRefPath(newDir, newTarget)
  if (newExtends === cfg.extends) return false
  log.info(`[tsconfig] ${tsconfigPath}: extends "${cfg.extends}" → "${newExtends}"`)
  cfg.extends = newExtends
  return true
}

function rewriteOne(
  root: string,
  tsconfigPath: string,
  move: WorkspaceMove,
  log: Logger
): undefined {
  const cfg = readJson(root, tsconfigPath, TS_CONFIG_SCHEMA)
  const newDir = posix.dirname(tsconfigPath)
  const oldDir = deriveOldDir(newDir, move)

  let changed = false

  if (rewriteExtends(tsconfigPath, cfg, newDir, oldDir, move, log)) changed = true

  if (Array.isArray(cfg.references) && cfg.references.length > 0) {
    if (rewriteReferences(tsconfigPath, cfg.references, newDir, oldDir, move, log)) {
      changed = true
    }
  }

  if (cfg.compilerOptions?.paths) {
    if (rewriteCompilerPaths(tsconfigPath, cfg.compilerOptions.paths, newDir, oldDir, move, log)) {
      changed = true
    }
  }

  if (changed) writeJson(root, tsconfigPath, cfg)
}

export function rewriteTsconfigs(root: string, move: WorkspaceMove, log: Logger): undefined {
  const files = findAllTsconfigs(root)
  log.info(`\n[tsconfig] rewriting ${files.length} tsconfig files`)
  for (const file of files) {
    rewriteOne(root, file, move, log)
  }
}
