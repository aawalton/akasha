import { copyFileSync, existsSync, realpathSync, rmSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import {
  InputError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  fetchedSaid,
  fetchOrigin,
  resolveRef,
  resolveRepoRoot,
} from "akasha/alan/harness/mobile-cli/git-tree-hash/git-tree-hash.module.code.ts"
import {
  type MobileApp,
  shellRepoRoot,
  splitRepoPath,
  stagedWwwRepoPath,
} from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import { SPA_SOURCE_VAR } from "akasha/alan/harness/mobile-cli/sim-www-stage/sim-www-stage.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"
import { shown } from "akasha/utils/run/running/running.module.code.ts"

function worktreeOfRepo(dir: string, repoRoot: string): boolean {
  const here = gitDirIn(dir)
  const there = gitDirIn(repoRoot)
  if (here === null || there === null) return false
  try {
    return realpathSync(here) === realpathSync(there)
  } catch {
    return false
  }
}

export interface WwwBuildResult {
  readonly mainSha: string
  readonly wwwDir: string
}

export function buildDirTakenSaid(dir: string): string {
  return `${dir} was deleted, and whatever was in it is gone`
}

export function worktreeAddedSaid(dir: string, sha: string): string {
  return `a detached worktree was added at ${dir} on ${sha}, and it is registered in this repo`
}

export function buildDirResetSaid(dir: string): string {
  return `${dir} was fetched, force checked out and cleaned — anything uncommitted in it is gone`
}

export function webEnvCopiedSaid(path: string): string {
  return `the workstation's web env file, secrets and all, was copied to ${path}`
}

export function installedSaid(dir: string): string {
  return `\`bun install\` ran in ${dir} and wrote that worktree's node_modules`
}

export function wwwStagedSaid(dir: string): string {
  return `the stage script wrote www/ into ${dir}, which is the shell's own checkout`
}

export async function buildWwwAt(
  done: string[],
  opts: {
    readonly app: MobileApp
    readonly ref?: string
    readonly repoRoot?: string
    readonly buildWorktreeDir?: string
  }
): Promise<WwwBuildResult> {
  const { app } = opts
  if (app.wwwStageScript === null || app.nativeShellRepoPath === null) {
    throw new InputError(
      `${app.slug} has no www stage script — its shell carries a committed www/, so there is nothing to build on the workstation`
    )
  }
  const repoRoot = opts?.repoRoot ?? resolveRepoRoot(codeRoot())

  fetchOrigin(repoRoot)
  done.push(fetchedSaid(repoRoot))
  const mainSha = resolveRef(repoRoot, opts?.ref ?? "origin/main")

  const buildDir = opts?.buildWorktreeDir ?? join(homedir(), ".mobile-cut-build")

  if (!worktreeOfRepo(buildDir, repoRoot)) {
    rmSync(buildDir, { recursive: true, force: true })
    done.push(buildDirTakenSaid(buildDir))
    shown(["git", "-C", repoRoot, "worktree", "prune"])
    shown(["git", "-C", repoRoot, "worktree", "add", "--detach", buildDir, mainSha])
    done.push(worktreeAddedSaid(buildDir, mainSha))
  } else {
    shown(["git", "-C", buildDir, "fetch", "origin"])
    shown(["git", "-C", buildDir, "checkout", "--detach", "--force", mainSha])
    shown(["git", "-C", buildDir, "clean", "-fd"])
    done.push(buildDirResetSaid(buildDir))
  }

  const webEnvSegments = app.webEnvSegments
  if (webEnvSegments !== null) {
    const workstationEnv = join(repoRoot, ...webEnvSegments)
    if (existsSync(workstationEnv)) {
      const landedAt = join(buildDir, ...webEnvSegments)
      copyFileSync(workstationEnv, landedAt)
      done.push(webEnvCopiedSaid(landedAt))
    }
  }

  shown(["bun", "install"], { cwd: buildDir })
  done.push(installedSaid(buildDir))
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
  done.push(wwwStagedSaid(shellRoot))

  const wwwDir = join(shellRoot, stagedWwwRepoPath(app) ?? "")
  if (!existsSync(join(wwwDir, "index.html"))) {
    throw new OperationalError(
      `${app.wwwStageScript} did not produce www/index.html at ${wwwDir} (mainSha ${mainSha})`
    )
  }

  return { mainSha, wwwDir }
}
