import { existsSync } from "node:fs"
import { join } from "node:path"
import { InputError } from "@akasha/errors-core/exit-code"
import { said } from "@akasha/utils-run/running"
import { MACBOOK } from "../macbook-target/macbook-target.module.code.ts"
import {
  type MobileApp,
  shellRepoPath as shellRepoPathOf,
} from "../mobile-app/mobile-app.module.code.ts"
import { rsyncToHost, runSshCapture } from "../mobile-ssh/mobile-ssh.module.code.ts"

const SEAM_SHARED_REPO_PATHS: readonly string[] = [
  "akasha/code-system/ios-apps/scripts",
  "akasha/code-system/ios-components/pages",
  "akasha/code-system/ios-programs/pages",
]

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

export function simRunSourceRepoPaths(app: MobileApp): readonly string[] {
  return [shellRepoPath(app), ...SEAM_SHARED_REPO_PATHS]
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
  const wanted = simRunSourceRepoPaths(app)
  const missing = wanted.filter((rel) => !existsSync(join(repoRoot, rel)))
  if (missing.length > 0) {
    throw new InputError(
      `${missing.join(", ")} — named among what ${app.slug} is built from, and not standing in ${repoRoot}. Nothing was delivered, because a partial tree fails on the macbook rather than here.`
    )
  }
  await runSshCapture(
    MACBOOK,
    ["set -euo pipefail", ...wanted.map((rel) => `mkdir -p "$HOME/${root}/${rel}"`)].join("\n")
  )
  for (const rel of wanted) {
    report(`  ${rel} → ${MACBOOK.host}:~/${root}/${rel}\n`)
    await rsyncToHost(MACBOOK, join(repoRoot, rel), `${root}/${rel}`, {
      excludes: DERIVED_DIR_NAMES,
    })
  }
  return wanted
}
