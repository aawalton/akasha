import { existsSync } from "node:fs"
import { join } from "node:path"
import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { MACBOOK } from "akasha/alan/harness/mobile-cli/macbook-target/macbook-target.module.code.ts"
import {
  type MobileApp,
  shellRepoPath as shellRepoPathOf,
} from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  rsyncFilesToHost,
  rsyncToHost,
  runSshCapture,
} from "akasha/alan/harness/mobile-cli/mobile-ssh/mobile-ssh.module.code.ts"
import { sharedBuildFiles } from "akasha/code/ios-apps/shared-build-files/shared-build-files.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { said } from "akasha/utils/run/running/running.module.code.ts"

const DERIVED_DIR_NAMES: readonly string[] = ["node_modules", "ios", "www", "build", ".DS_Store"]

export function simRunRootRel(app: MobileApp): string {
  return `.mobile-sim-run/${app.slug}`
}

export function shellRepoPath(app: MobileApp): string {
  if (app.nativeShellRepoPath === null) {
    throw new InputError(
      `${app.slug} states no \`native-shell-repo-path\`, so there is no native shell to deliver to the macbook`
    )
  }
  return shellRepoPathOf(app).path
}

export function simRunSharedRepoPaths(): readonly string[] {
  const shared = sharedBuildFiles(rootFor(resolveRoots(), AKASHA))
  if ("why" in shared) throw new InputError(shared.why)
  return shared.files
}

export function simRunSourceRepoPaths(
  app: MobileApp,
  shared: readonly string[]
): readonly string[] {
  return [shellRepoPath(app), ...shared]
}

export function simRunNativeShellDir(app: MobileApp): string {
  return `$HOME/${simRunRootRel(app)}/${shellRepoPath(app)}`
}

export function stampCommitOf(repoRoot: string, paths: readonly string[]): string {
  const head = said(["git", "-C", repoRoot, "rev-parse", "HEAD"]).trim()
  const uncommitted = said(["git", "-C", repoRoot, "status", "--porcelain", "--", ...paths]).trim()
  return uncommitted === "" ? head : `${head}-dirty`
}

export async function deliverSimRunTree(opts: {
  readonly app: MobileApp
  readonly repoRoot: string
  readonly report: (line: string) => void
}): Promise<readonly string[]> {
  const { app, repoRoot, report } = opts
  const root = simRunRootRel(app)
  const shell = shellRepoPath(app)
  const shared = simRunSharedRepoPaths()
  const wanted = simRunSourceRepoPaths(app, shared)
  const missing = wanted.filter((rel) => !existsSync(join(repoRoot, rel)))
  if (missing.length > 0) {
    throw new InputError(
      `${missing.join(", ")} — named among what ${app.slug} is built from, and not in ${repoRoot}. Nothing was delivered, because a partial tree fails on the macbook rather than here.`
    )
  }
  await runSshCapture(
    MACBOOK,
    ["set -euo pipefail", `mkdir -p "$HOME/${root}/${shell}"`].join("\n")
  )
  report(`  ${shell} → ${MACBOOK.host}:~/${root}/${shell}\n`)
  await rsyncToHost(MACBOOK, join(repoRoot, shell), `${root}/${shell}`, {
    excludes: DERIVED_DIR_NAMES,
  })
  report(`  ${shared.length} files every shell compiles → ${MACBOOK.host}:~/${root}\n`)
  await rsyncFilesToHost(MACBOOK, repoRoot, shared, root)
  return wanted
}
