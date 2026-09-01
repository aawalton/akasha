import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { InputError } from "@akasha/errors-core/exit-code"
import { type MobileApp, shellRepoPath as shellRepoPathOf, splitRepoPath } from "./apps"
import { MACBOOK } from "./host"
import { rsyncToHost, runSshCapture } from "./ssh"

// The shared seam scripts and the iOS components stand at fixed places in akasha,
// so they are named from the repo root rather than reached out of the shell package.
// Written as "../../…" they answered to wherever the shell happened to sit, and both
// resolved to nothing the moment the shells moved into akasha.
const SEAM_SHARED_REPO_PATHS: readonly string[] = [
  "akasha/code-system/ios-app/shell-scripts",
  "akasha/code-system/ios-component/ios-components",
  "akasha/code-system/ios-program/ios-programs",
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

// The icon is the one thing the seam reads that akasha does not hold — akasha
// holds text and a 1024px PNG is not text — so it is named on the app's page and
// the directory holding it is delivered beside the rest.
function iconDirRepoPath(app: MobileApp): readonly string[] {
  if (app.iconRepoPath === null) return []
  return [dirname(splitRepoPath(app.iconRepoPath).path)]
}

export function simRunSourceRepoPaths(app: MobileApp): readonly string[] {
  return [shellRepoPath(app), ...SEAM_SHARED_REPO_PATHS, ...iconDirRepoPath(app)]
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
  // EVERY path named here or none. Delivering the ones that happen to exist was a
  // silent narrowing: a missing components directory or seam script came back as a
  // swiftc failure on the macbook, hundreds of lines into an Xcode log, for a reason
  // that reads as nothing to do with what was not sent.
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
