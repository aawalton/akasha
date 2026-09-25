import { existsSync, readdirSync, realpathSync, statSync } from "node:fs"
import { join } from "node:path"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { SECRETS_FILE } from "akasha/infrastructure/service/akasha-service/secret/modules/workstation-secrets/workstation-secrets.module.code.ts"

export const CONFINER = "bwrap"

const SEARCHED = "PATH"

const EVERY = "*"

const PARTED = "/"

const EMPTY_FILE = "/dev/null"

const WHOLE_TREE = ["--dev-bind", "/", "/"]

const OWN_PROCESSES = ["--unshare-pid", "--proc", "/proc"]

const ENDED = "--"

export const HELD_IN_HOME: readonly string[] = [
  SECRETS_FILE,
  ".config/sops",
  ".config/anthropic",
  ".ssh",
  ".kube",
  ".talos",
  ".gnupg",
  ".git-credentials",
  ".docker",
  ".cloudflare",
  ".appstoreconnect",
  ".supabase",
  ".pki",
  ".modelscope",
  ".monarch-mcp",
  ".mobile-sim-session.json",
  ".claude.json",
  ".claude/.credentials.json",
  ".claude/accounts/*/.credentials.json",
  ".claude/accounts/*/.claude.json",
  ".local/share/keyrings",
  ".local/share/kwalletd",
]

export const HELD_BY_MACHINE: readonly string[] = ["/run/secrets", "/var/run/secrets"]

export type Hidden = {
  readonly path: string
  readonly folder: boolean
}

function childrenOf(folder: string): readonly string[] {
  try {
    return readdirSync(folder)
  } catch {
    return []
  }
}

function hiddenAt(path: string): Hidden | null {
  try {
    return { path: realpathSync(path), folder: statSync(path).isDirectory() }
  } catch {
    return null
  }
}

function foldersUnder(folder: string, pieces: readonly string[]): readonly string[] {
  const [piece, ...rest] = pieces
  if (piece === undefined) return [folder]
  const named = piece === EVERY ? childrenOf(folder) : [piece]
  return named.flatMap((one) => {
    const at = join(folder, one)
    return existsSync(at) ? foldersUnder(at, rest) : []
  })
}

function heldAt(root: string, place: string): readonly string[] {
  const pieces = place.split(PARTED)
  const last = pieces.pop() ?? ""
  return foldersUnder(root, pieces).flatMap((folder) =>
    childrenOf(folder)
      .filter((one) => one.startsWith(last))
      .map((one) => join(folder, one))
  )
}

export function hiddenUnder(
  home: string,
  inHome: readonly string[] = HELD_IN_HOME,
  byMachine: readonly string[] = HELD_BY_MACHINE
): readonly Hidden[] {
  const found = new Map<string, Hidden>()
  const places = [...inHome.flatMap((one) => heldAt(home, one)), ...byMachine]
  for (const place of places) {
    const one = hiddenAt(place)
    if (one !== null) found.set(one.path, one)
  }
  return [...found.values()].sort((one, two) => (one.path < two.path ? -1 : 1))
}

function coveredBy(one: Hidden): readonly string[] {
  return one.folder ? ["--tmpfs", one.path] : ["--ro-bind", EMPTY_FILE, one.path]
}

export function confinedArgv(
  confiner: string,
  hidden: readonly Hidden[],
  argv: readonly string[],
  apart = true
): readonly string[] {
  const processes = apart ? OWN_PROCESSES : []
  return [confiner, ...WHOLE_TREE, ...processes, ...hidden.flatMap(coveredBy), ENDED, ...argv]
}

export function confinerHere(): string | null {
  return Bun.which(CONFINER, { PATH: optionalEnv(SEARCHED) ?? "" })
}

export function unconfinable(): string {
  return (
    `no \`${CONFINER}\` is on this machine, so no test runs: a test run where a test could ` +
    "read the secret files on this machine is refused rather than made"
  )
}
