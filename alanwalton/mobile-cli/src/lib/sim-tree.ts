import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { join, normalize } from "node:path"
import { InputError } from "@shared/errors-core/exit"
import { type MobileApp, shellRepoPath as shellRepoPathOf } from "./apps"
import { MACBOOK } from "./host"
import { rsyncToHost, runSshCapture } from "./ssh"

const SEAM_SHARED_DIRS_FROM_SHELL: readonly string[] = ["../../ios-seam", "../../akasha/code-system/ios-component/ios-components"]

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

export function seamSharedDirsUnder(nativeShellRepoPath: string): readonly string[] {
  return SEAM_SHARED_DIRS_FROM_SHELL.map((rel) => normalize(join(nativeShellRepoPath, rel)))
}

export function simRunSourceRepoPaths(app: MobileApp): readonly string[] {
  const shell = shellRepoPath(app)
  return [shell, ...seamSharedDirsUnder(shell)]
}

export function simRunNativeShellDir(app: MobileApp): string {
  return `$HOME/${simRunRootRel(app)}/${shellRepoPath(app)}`
}

export function stampCommitOf(repoRoot: string, paths: readonly string[]): string {
  const head = execFileSync("git", ["-C", repoRoot, "rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim()
  const uncommitted = execFileSync(
    "git",
    ["-C", repoRoot, "status", "--porcelain", "--", ...paths],
    { encoding: "utf8" }
  ).trim()
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
  const present = wanted.filter((rel) => existsSync(join(repoRoot, rel)))
  if (present.length === 0) {
    throw new InputError(
      `none of ${wanted.join(", ")} stands in ${repoRoot}, so there is nothing to build ${app.slug} from`
    )
  }
  await runSshCapture(
    MACBOOK,
    ["set -euo pipefail", ...present.map((rel) => `mkdir -p "$HOME/${root}/${rel}"`)].join("\n")
  )
  for (const rel of present) {
    report(`  ${rel} → ${MACBOOK.host}:~/${root}/${rel}\n`)
    await rsyncToHost(MACBOOK, join(repoRoot, rel), `${root}/${rel}`, {
      excludes: DERIVED_DIR_NAMES,
    })
  }
  return present
}
