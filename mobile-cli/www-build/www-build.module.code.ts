import { copyFileSync, existsSync, realpathSync, rmSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { codeRoot } from "@akasha/pages-system/code-root"
import { said, shown } from "@akasha/utils-run/running"
import {
  fetchOrigin,
  resolveRef,
  resolveRepoRoot,
} from "../git-tree-hash/git-tree-hash.module.code.ts"
import {
  type MobileApp,
  shellRepoRoot,
  splitRepoPath,
  stagedWwwRepoPath,
} from "../mobile-app/mobile-app.module.code.ts"
import { SPA_SOURCE_VAR } from "../sim-www-stage/sim-www-stage.module.code.ts"

function worktreeOfRepo(dir: string, repoRoot: string): boolean {
  if (!existsSync(join(dir, ".git"))) return false
  try {
    const common = said([
      "git",
      "-C",
      dir,
      "rev-parse",
      "--path-format=absolute",
      "--git-common-dir",
    ]).trim()
    return realpathSync(common) === realpathSync(join(repoRoot, ".git"))
  } catch {
    return false
  }
}

export interface WwwBuildResult {
  readonly mainSha: string
  readonly wwwDir: string
}

export async function buildWwwAt(opts: {
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

  if (!worktreeOfRepo(buildDir, repoRoot)) {
    rmSync(buildDir, { recursive: true, force: true })
    shown(["git", "-C", repoRoot, "worktree", "prune"])
    shown(["git", "-C", repoRoot, "worktree", "add", "--detach", buildDir, mainSha])
  } else {
    shown(["git", "-C", buildDir, "fetch", "origin"])
    shown(["git", "-C", buildDir, "checkout", "--detach", "--force", mainSha])
    shown(["git", "-C", buildDir, "clean", "-fd"])
  }

  const webEnvSegments = app.webEnvSegments
  if (webEnvSegments !== null) {
    const workstationEnv = join(repoRoot, ...webEnvSegments)
    if (existsSync(workstationEnv)) {
      copyFileSync(workstationEnv, join(buildDir, ...webEnvSegments))
    }
  }

  shown(["bun", "install"], { cwd: buildDir })
  const shellRoot = shellRepoRoot(app)
  const stageScript = join(shellRoot, splitRepoPath(app.wwwStageScript).path)
  const spaSource =
    app.spaSourceRepoPath === null
      ? buildDir
      : join(buildDir, splitRepoPath(app.spaSourceRepoPath).path)
  shown(["bash", stageScript], {
    cwd: shellRoot,
    env: { ...process.env, [SPA_SOURCE_VAR]: spaSource },
  })

  const wwwDir = join(shellRoot, stagedWwwRepoPath(app) ?? "")
  if (!existsSync(join(wwwDir, "index.html"))) {
    throw new OperationalError(
      `${app.wwwStageScript} did not produce www/index.html at ${wwwDir} (mainSha ${mainSha})`
    )
  }

  return { mainSha, wwwDir }
}
