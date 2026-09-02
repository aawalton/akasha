import { readFileSync } from "node:fs"
import { join } from "node:path"
import { InputError } from "@akasha/errors-core/exit-code"
import { codeRoot } from "@akasha/pages-system/code-root"
import { resolveRepoRoot } from "../git-tree-hash/git-tree-hash.module.code.ts"
import { MACBOOK } from "../macbook-target/macbook-target.module.code.ts"
import {
  type MobileApp,
  macWwwStagingDir,
  shellRepoRoot,
  splitRepoPath,
  stagedWwwRepoPath,
} from "../mobile-app/mobile-app.module.code.ts"
import { rsyncToHost, runSshCapture } from "../mobile-ssh/mobile-ssh.module.code.ts"
import { buildInstallScript, parseInstalledUdid } from "../sim-macbook/sim-macbook.module.code.ts"
import {
  deliverSimRunTree,
  simRunNativeShellDir,
  simRunSourceRepoPaths,
  stampCommitOf,
} from "../sim-run-tree/sim-run-tree.module.code.ts"
import {
  assertStagedWwwFresh,
  stageWwwFromWorkingTree,
} from "../sim-www-stage/sim-www-stage.module.code.ts"

export interface InstallSimShellOptions {
  readonly app: MobileApp
  readonly udid?: string | undefined
  readonly configuration?: string
  readonly skipStage?: boolean
  readonly report?: (line: string) => void
}

export function buildSimScriptPath(app: MobileApp, repoRoot: string): string {
  if (app.simBuildScript === null) {
    throw new InputError(
      `${app.slug} states no \`sim-build-script\`, so there is no script in this repo to build a sim from`
    )
  }
  return join(repoRoot, splitRepoPath(app.simBuildScript).path)
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
