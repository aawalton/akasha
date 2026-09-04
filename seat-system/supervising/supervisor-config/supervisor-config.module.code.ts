import { lstatSync, mkdirSync, readlinkSync, statSync, symlinkSync, unlinkSync } from "node:fs"
import { resolve } from "node:path"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { shape } from "@akasha/utils-narrow/shape"
import { configPathForAccount } from "../../claude-launch-args/claude-launch-args.module.code.ts"

export const HOME_DIR = shape.string().default("/home/walton").parse(process.env.HOME)
export const ACCOUNTS_DIR = `${HOME_DIR}/.claude/accounts`

export const REPO_ROOT = akashaRoot()
export const SEAT_START_DIR = resolve(REPO_ROOT, "..")
export const LOG = "[local]"

function getAgentCacheDir(): string {
  const cacheDir = shape.string().optional().parse(process.env.AGENT_CACHE_DIR)
  if (cacheDir != null) return cacheDir
  const home = shape.string().default("/var/tmp").parse(process.env.HOME)
  return home === "/var/tmp" ? "/data/agent-cache" : home
}

function getAgentCachePaths(baseDir: string) {
  return {
    bareRepoPath: `${baseDir}/bare-repo`,
    worktreesPath: `${baseDir}/worktrees`,
  } as const
}

export const CACHE_PATHS = getAgentCachePaths(getAgentCacheDir())

export interface BootFile {
  readonly path: string
  readonly noun: string
  readonly consequence: string
}

export const REQUIRED_BOOT_FILES: readonly BootFile[] = []

export function assertBootFiles(files: readonly BootFile[]): undefined {
  for (const { path, noun, consequence } of files) {
    let isFile: boolean
    try {
      isFile = statSync(path).isFile()
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err)
      throw new Error(
        `${noun} not found at ${path} (${reason}). ${consequence} Run \`bash ${REPO_ROOT}/machines/provisioning/scripts/setup-symlinks/setup-symlinks.shell-script.shell.sh\` to create the symlink, then retry.`
      )
    }
    if (!isFile) {
      throw new Error(
        `${noun} at ${path} is not a regular file. ${consequence} Inspect it manually and re-run \`bash ${REPO_ROOT}/machines/provisioning/scripts/setup-symlinks/setup-symlinks.shell-script.shell.sh\` if needed.`
      )
    }
  }
}

const SHARED_DIR_SYMLINKS = [
  "projects",
  "file-history",
  "session-env",
  "shell-snapshots",
  "todos",
] as const

const SHARED_CONFIG_SYMLINKS = ["skills", "agents", "commands", "plugins", ".mcp.json"] as const

function reconcileSymlink(linkPath: string, target: string): undefined {
  try {
    const stat = lstatSync(linkPath)
    if (stat.isSymbolicLink()) {
      if (readlinkSync(linkPath) !== target) {
        unlinkSync(linkPath)
        symlinkSync(target, linkPath)
      }
      return
    }
  } catch {
    symlinkSync(target, linkPath)
  }
}

export function configDirForAccount(account: string): string {
  const dir = configPathForAccount(ACCOUNTS_DIR, account)
  mkdirSync(dir, { recursive: true })

  for (const name of SHARED_DIR_SYMLINKS) {
    const target = `${HOME_DIR}/.claude/${name}`
    mkdirSync(target, { recursive: true })
    reconcileSymlink(`${dir}/${name}`, target)
  }

  for (const name of SHARED_CONFIG_SYMLINKS) {
    const target = `${HOME_DIR}/.claude/${name}`
    reconcileSymlink(`${dir}/${name}`, target)
  }

  return dir
}
