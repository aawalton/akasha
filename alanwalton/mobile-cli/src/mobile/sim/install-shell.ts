import { readFileSync } from "node:fs"
import { join } from "node:path"
import { InputError } from "@shared/errors-core/exit"
import { codeRoot } from "../../../../../../instructions/tools/lib/code-root.ts"
import { macWwwStagingDir, type MobileApp, shellRepoRoot, stagedWwwRepoPath } from "../../lib/apps"
import { resolveRepoRoot } from "../../lib/git-tree-hash"
import { MACBOOK } from "../../lib/host"
import { buildInstallScript, parseInstalledUdid } from "../../lib/sim-macbook"
import {
  deliverSimRunTree,
  shellRepoPath,
  simRunNativeShellDir,
  simRunSourceRepoPaths,
  stampCommitOf,
} from "../../lib/sim-tree"
import { assertStagedWwwFresh, stageWwwFromWorkingTree } from "../../lib/sim-www-stage"
import { rsyncToHost, runSshCapture } from "../../lib/ssh"

export interface InstallSimShellOptions {
  readonly app: MobileApp
  readonly udid?: string | undefined
  readonly configuration?: string
  readonly skipStage?: boolean
  readonly report?: (line: string) => void
}

export function buildSimScriptPath(app: MobileApp, repoRoot: string): string {
  if (app.nativeShellRepoPath === null) {
    throw new InputError(`${app.slug} has no native shell in this repo to build a sim from`)
  }
  return join(repoRoot, shellRepoPath(app), "scripts", "build-sim.sh")
}

export async function installSimShell(opts: InstallSimShellOptions): Promise<string> {
  const {
    app,
    udid,
    configuration = "Debug",
    skipStage = false,
    report = (line) => process.stdout.write(line),
  } = opts

  const repoRoot = resolveRepoRoot(shellRepoRoot(app))
  const spaRoot = resolveRepoRoot(codeRoot())
  const stampCommit = stampCommitOf(repoRoot, simRunSourceRepoPaths(app))
  report(`Building ${app.slug} from ${repoRoot} at ${stampCommit}\n`)

  if (skipStage) {
    report("Reusing the already-built workstation www/ (--skip-stage); checking freshness…\n")
    assertStagedWwwFresh(app, spaRoot)
  } else {
    report("Staging www/ fresh from the working tree…\n")
    stageWwwFromWorkingTree(app, spaRoot)
  }

  const stagedWww = stagedWwwRepoPath(app)
  if (stagedWww === null) {
    throw new InputError(`${app.slug} has no native shell in this repo to stage www into`)
  }

  const stagingRel = app.macWwwStagingRel
  const stagingDir = macWwwStagingDir(app)
  if (stagingRel === null || stagingDir === null) {
    throw new InputError(
      `${app.slug} names no \`mac-www-staging-rel\`, so its page says nothing about where on the MacBook its www is staged`
    )
  }

  report(`Delivering the native shell sources → ${MACBOOK.user}@${MACBOOK.host}…\n`)
  await deliverSimRunTree({ app, repoRoot, report })

  report(`Rsyncing staged www → ${MACBOOK.user}@${MACBOOK.host}:~/${stagingRel}…\n`)
  await rsyncToHost(MACBOOK, join(repoRoot, stagedWww), stagingRel)

  const script = buildInstallScript({
    app,
    buildSimSource: readFileSync(buildSimScriptPath(app, repoRoot), "utf8"),
    udid,
    configuration,
    stagedWwwDir: stagingDir,
    nativeShellDir: simRunNativeShellDir(app),
    stampCommit,
  })

  report(
    `Building + installing the sim shell (${configuration}) via ${MACBOOK.user}@${MACBOOK.host}…\n`
  )
  const installedUdid = parseInstalledUdid(await runSshCapture(MACBOOK, script, { stream: true }))
  report(`\n✓ installed to simulator ${installedUdid}\n`)
  return installedUdid
}
