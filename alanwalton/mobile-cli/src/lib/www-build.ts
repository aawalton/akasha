import { execFileSync } from "node:child_process"
import { copyFileSync, existsSync, realpathSync, rmSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { InputError, OperationalError } from "@shared/errors-core/exit"
import { type MobileApp, shellRepoRoot, splitRepoPath, stagedWwwRepoPath } from "./apps"
import { SPA_SOURCE_VAR } from "./sim-www-stage"
import { codeRoot } from "../../../../../instructions/tools/lib/code-root.ts"
import { fetchOrigin, resolveRef, resolveRepoRoot } from "./git-tree-hash"

function worktreeStands(dir: string, repoRoot: string): boolean {
  if (!existsSync(join(dir, ".git"))) return false
  try {
    const common = execFileSync(
      "git",
      ["-C", dir, "rev-parse", "--path-format=absolute", "--git-common-dir"],
      { encoding: "utf8" }
    ).trim()
    return realpathSync(common) === realpathSync(join(repoRoot, ".git"))
  } catch {
    return false
  }
}

export interface WwwBuildResult {
  readonly mainSha: string
  readonly wwwDir: string
}

export async function buildWwwFromMainTip(opts: {
  readonly app: MobileApp
  readonly ref?: string
  readonly repoRoot?: string
  readonly buildWorktreeDir?: string
}): Promise<WwwBuildResult> {
  const { app } = opts
  if (app.wwwStageScript === null || app.nativeShellRepoPath === null) {
    throw new InputError(
      `${app.slug} has no www stage script — its shell carries a committed www/, so there is nothing to build on the workstation`
    )
  }
  const repoRoot = opts?.repoRoot ?? resolveRepoRoot(codeRoot())

  fetchOrigin(repoRoot)
  const mainSha = resolveRef(repoRoot, opts?.ref ?? "origin/main")

  const buildDir = opts?.buildWorktreeDir ?? join(homedir(), ".mobile-cut-build")

  if (!worktreeStands(buildDir, repoRoot)) {
    rmSync(buildDir, { recursive: true, force: true })
    execFileSync("git", ["-C", repoRoot, "worktree", "prune"], { stdio: "inherit" })
    execFileSync("git", ["-C", repoRoot, "worktree", "add", "--detach", buildDir, mainSha], {
      stdio: "inherit",
    })
  } else {
    execFileSync("git", ["-C", buildDir, "fetch", "origin"], { stdio: "inherit" })
    execFileSync("git", ["-C", buildDir, "checkout", "--detach", "--force", mainSha], {
      stdio: "inherit",
    })
    execFileSync("git", ["-C", buildDir, "clean", "-fd"], { stdio: "inherit" })
  }

  const webEnvSegments = app.webEnvSegments
  if (webEnvSegments !== null) {
    const workstationEnv = join(repoRoot, ...webEnvSegments)
    if (existsSync(workstationEnv)) {
      copyFileSync(workstationEnv, join(buildDir, ...webEnvSegments))
    }
  }

  execFileSync("bun", ["install"], { cwd: buildDir, stdio: "inherit" })
  const shellRoot = shellRepoRoot(app)
  const stageScript = join(shellRoot, splitRepoPath(app.wwwStageScript).path)
  const spaSource =
    app.spaSourceRepoPath === null
      ? buildDir
      : join(buildDir, splitRepoPath(app.spaSourceRepoPath).path)
  execFileSync("bash", [stageScript], {
    cwd: shellRoot,
    env: { ...process.env, [SPA_SOURCE_VAR]: spaSource },
    stdio: "inherit",
  })

  const wwwDir = join(shellRoot, stagedWwwRepoPath(app) ?? "")
  if (!existsSync(join(wwwDir, "index.html"))) {
    throw new OperationalError(
      `${app.wwwStageScript} did not produce www/index.html at ${wwwDir} (mainSha ${mainSha})`
    )
  }

  return { mainSha, wwwDir }
}
