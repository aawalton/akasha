import { copyFileSync, type Dirent, existsSync, readdirSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { said, shown } from "@akasha/utils-run/running"
import {
  type MobileApp,
  shellRepoPath,
  shellRepoRoot,
  splitRepoPath,
  stagedWwwRepoPath,
} from "../mobile-app/mobile-app.module.code.ts"

export const SPA_SOURCE_VAR = "NATIVE_SHELL_SPA_SOURCE_DIR"

function stagePaths(
  app: MobileApp,
  spaRoot: string
): {
  readonly wwwDir: string
  readonly sourceRoot: string
  readonly stageScript: string
  readonly stageScriptSaid: string
  readonly packageDir: string
} {
  const stagedWww = stagedWwwRepoPath(app)
  if (app.wwwStageScript === null || app.spaSourceRepoPath === null || stagedWww === null) {
    throw new InputError(
      `${app.slug} has no SPA stage script — its shell carries a committed www/, so there is nothing to stage`
    )
  }
  const shellRoot = shellRepoRoot(app)
  return {
    wwwDir: join(shellRoot, stagedWww),
    sourceRoot: join(spaRoot, splitRepoPath(app.spaSourceRepoPath).path),
    stageScript: join(shellRoot, splitRepoPath(app.wwwStageScript).path),
    stageScriptSaid: app.wwwStageScript,
    packageDir: join(shellRoot, shellRepoPath(app).path),
  }
}

const EXCLUDED_DIR_NAMES: ReadonlySet<string> = new Set([
  "node_modules",
  "build",
  "dist",
  ".react-router",
  ".cache",
  ".vite",
])

export function newestMtimeMs(root: string): number | null {
  if (!existsSync(root)) return null
  let newest: number | null = null
  const walk = (dir: string): undefined => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (EXCLUDED_DIR_NAMES.has(entry.name)) continue
        walk(full)
      } else if (entry.isFile()) {
        try {
          const m = statSync(full).mtimeMs
          if (newest === null || m > newest) newest = m
        } catch {}
      }
    }
  }
  walk(root)
  return newest
}

export interface StalenessDecision {
  readonly stale: boolean
  readonly message: string
}

const iso = (ms: number): string => new Date(ms).toISOString()

export function decideStaleness(input: {
  readonly stagedWwwMtimeMs: number | null
  readonly newestSourceMtimeMs: number | null
  readonly wwwDir: string
  readonly sourceRoot: string
}): StalenessDecision {
  const { stagedWwwMtimeMs, newestSourceMtimeMs, wwwDir, sourceRoot } = input
  if (stagedWwwMtimeMs === null) {
    return {
      stale: true,
      message:
        `--skip-stage but no staged www bundle exists at ${wwwDir}. ` +
        "The bundle must be staged from the working tree before an install can reuse it.",
    }
  }
  if (newestSourceMtimeMs === null) {
    return {
      stale: true,
      message:
        `--skip-stage but the SPA source tree at ${sourceRoot} could not be read to certify ` +
        "the staged bundle is fresh. Re-stage www/ from the working tree rather than reusing it.",
    }
  }
  if (stagedWwwMtimeMs < newestSourceMtimeMs) {
    return {
      stale: true,
      message:
        `--skip-stage but the staged www bundle is STALE — refusing to install stale code (#15638).\n` +
        `  staged www newest mtime: ${iso(stagedWwwMtimeMs)}  (${wwwDir})\n` +
        `  SPA source newest mtime: ${iso(newestSourceMtimeMs)}  (${sourceRoot})\n` +
        "Drop --skip-stage to rebuild www/ from the working tree, then re-run.",
    }
  }
  return {
    stale: false,
    message: `staged www is fresh (bundle ${iso(stagedWwwMtimeMs)} ≥ source ${iso(newestSourceMtimeMs)})`,
  }
}

export function assertStagedWwwFresh(app: MobileApp, spaRoot: string): undefined {
  const { wwwDir, sourceRoot } = stagePaths(app, spaRoot)
  const decision = decideStaleness({
    stagedWwwMtimeMs: newestMtimeMs(wwwDir),
    newestSourceMtimeMs: newestMtimeMs(sourceRoot),
    wwwDir,
    sourceRoot,
  })
  if (decision.stale) throw new OperationalError(decision.message)
  return undefined
}

export function ensureWebEnvLocal(app: MobileApp, repoRoot: string): undefined {
  const segments = app.webEnvSegments
  if (segments === null) return undefined
  const target = join(repoRoot, ...segments)
  if (existsSync(target)) return undefined
  const commonGitDir = said([
    "git",
    "-C",
    repoRoot,
    "rev-parse",
    "--path-format=absolute",
    "--git-common-dir",
  ]).trim()
  const mainRoot = dirname(commonGitDir)
  const source = join(mainRoot, ...segments)
  if (mainRoot !== repoRoot && existsSync(source)) {
    copyFileSync(source, target)
  }
  return undefined
}

export function stageWwwFromWorkingTree(app: MobileApp, spaRoot: string): undefined {
  const paths = stagePaths(app, spaRoot)
  ensureWebEnvLocal(app, spaRoot)
  shown(["bash", paths.stageScript], {
    cwd: paths.packageDir,
    env: { ...process.env, [SPA_SOURCE_VAR]: paths.sourceRoot },
  })
  const wwwIndex = join(paths.wwwDir, "index.html")
  if (!existsSync(wwwIndex)) {
    throw new OperationalError(
      `${paths.stageScriptSaid} did not produce ${wwwIndex} — the SPA build failed (see output above)`
    )
  }
  return undefined
}
