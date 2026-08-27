import { execFileSync } from "node:child_process"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { InputError, OperationalError } from "@shared/errors-core/exit"
import { mobileApps, type MobileApp, shellRepoPath, shellRepoRoot } from "../lib/apps"
import { MAC_PATH_PREFIX, shellSingleQuote } from "../lib/foundation"
import { MACBOOK } from "../lib/host"
import { runSshCapture } from "../lib/ssh"
import { ownRepoRoot } from "../../../../repo/roots/roots"
import { toolArgv } from "../../../../tools/lib/tool-argv.ts"

export const LOCKFILE_NAME = "package-lock.json"

export const BODY_MARKER = "MOBILE_LOCKFILE_BEGIN"

export const MAC_SCRATCH = "/var/tmp/mobile-lockfile"

export const LANDING_SCRATCH = "/var/tmp/mobile-lockfile-landing"

export const LANDING_MESSAGE = "each native shell carries the lockfile its build resolves against"

export function lockfileRepoPath(app: MobileApp): string {
  if (app.nativeShellRepoPath === null) {
    throw new InputError(
      `${app.slug} states no \`native-shell-repo-path\`, so it has no native shell to resolve dependencies for`
    )
  }
  return `${shellRepoPath(app).path}/${LOCKFILE_NAME}`
}

export function appsWithNativeShell(): readonly MobileApp[] {
  return Object.values(mobileApps())
    .filter((app) => app.nativeShellRepoPath !== null)
    .sort((one, other) => one.slug.localeCompare(other.slug))
}

export function buildResolveScript(opts: {
  readonly slug: string
  readonly packageJson: string
}): string {
  const dir = `${MAC_SCRATCH}/${opts.slug}`
  return [
    "set -euo pipefail",
    MAC_PATH_PREFIX,
    `rm -rf ${dir}`,
    `mkdir -p ${dir}`,
    `printf '%s' ${shellSingleQuote(opts.packageJson)} > ${dir}/package.json`,
    `cd ${dir}`,
    "npm install --package-lock-only --silent >/dev/null 2>&1",
    `echo ${BODY_MARKER}`,
    `cat ${LOCKFILE_NAME}`,
  ].join("\n")
}

export function lockfileBodyIn(stdout: string): string {
  const at = stdout.indexOf(`${BODY_MARKER}\n`)
  if (at === -1) {
    throw new OperationalError(
      `npm resolved no lockfile on ${MACBOOK.host} — its output carried no ${BODY_MARKER}`
    )
  }
  const body = stdout.slice(at + BODY_MARKER.length + 1)
  if (body.trim() === "") {
    throw new OperationalError(`npm wrote an empty lockfile on ${MACBOOK.host}`)
  }
  return body
}

export function resolvedEntriesIn(body: string): number {
  return (body.match(/"resolved":/g) ?? []).length
}

export interface LockfileRefresh {
  readonly slug: string
  readonly root: string
  readonly repoPath: string
  readonly bodyAt: string
  readonly entries: number
}

export function landingArgs(
  refreshed: readonly LockfileRefresh[],
  dryRun: boolean
): readonly (readonly string[])[] {
  const byRoot = new Map<string, LockfileRefresh[]>()
  for (const one of refreshed) {
    byRoot.set(one.root, [...(byRoot.get(one.root) ?? []), one])
  }
  return [...byRoot.entries()].map(([root, group]) =>
    toolArgv(
      "write.ts",
      [
        "--mechanical",
        "--message",
        LANDING_MESSAGE,
        ...(dryRun ? ["--dry-run"] : []),
        ...group.flatMap((one) => [
          "--file-path",
          `${root}/${one.repoPath}`,
          "--content-file",
          one.bodyAt,
        ]),
      ],
      ownRepoRoot()
    )
  )
}

export async function refreshLockfiles(opts: {
  readonly commit: boolean
  readonly report?: (line: string) => void
}): Promise<readonly LockfileRefresh[]> {
  const { commit, report = (line) => process.stdout.write(line) } = opts

  const refreshed: LockfileRefresh[] = []
  mkdirSync(LANDING_SCRATCH, { recursive: true })
  report(`Resolving on ${MACBOOK.user}@${MACBOOK.host}, which is where npm install runs\n`)
  for (const app of appsWithNativeShell()) {
    const root = shellRepoRoot(app)
    const repoPath = lockfileRepoPath(app)
    const packageJson = readFileSync(join(root, shellRepoPath(app).path, "package.json"), "utf8")
    const out = await runSshCapture(MACBOOK, buildResolveScript({ slug: app.slug, packageJson }))
    const body = lockfileBodyIn(out)
    const bodyAt = `${LANDING_SCRATCH}/${app.slug}.${LOCKFILE_NAME}`
    writeFileSync(bodyAt, body)
    const entries = resolvedEntriesIn(body)
    refreshed.push({ slug: app.slug, root, repoPath, bodyAt, entries })
    report(`  ${repoPath} — ${entries} resolved entries\n`)
  }

  for (const args of landingArgs(refreshed, !commit)) {
    execFileSync("bun", args, { stdio: "inherit" })
  }
  return refreshed
}
