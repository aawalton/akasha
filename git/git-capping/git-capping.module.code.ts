import { bytes, NO_CODE } from "@akasha/utils/run/running"

export type GitResult = {
  readonly code: number
  readonly stdout: string
  readonly stderr: string
}

export type GitBytes = {
  readonly code: number
  readonly stdout: Uint8Array
  readonly stderr: string
}

export type Ran = {
  readonly code: number
  readonly stdout: Uint8Array
  readonly stderr: Uint8Array
}

const NETWORK_SUBCOMMANDS: ReadonlySet<string> = new Set(["push", "fetch", "ls-remote"])

export const NETWORK_CEILING_MS = 10_000

export const PUSH_CEILING_MS = 1_800_000

export const CAPPED_CEILING_MS = 10_000

const EMPTY = new Uint8Array()

export function ranGit(
  root: string,
  args: readonly string[],
  taking: { readonly input?: Uint8Array; readonly ceilingMs?: number } = {}
): Ran {
  const encoder = new TextEncoder()
  try {
    const done = bytes(["git", ...args], {
      cwd: root,
      ...(taking.input === undefined ? {} : { stdin: taking.input }),
      ...(taking.ceilingMs === undefined ? {} : { timeout: taking.ceilingMs }),
    })
    return { code: done.code, stdout: done.out, stderr: encoder.encode(done.err) }
  } catch (thrown) {
    return {
      code: NO_CODE,
      stdout: EMPTY,
      stderr: encoder.encode(thrown instanceof Error ? thrown.message : String(thrown)),
    }
  }
}

export function gitTextOf(raw: Uint8Array): string {
  return new TextDecoder().decode(raw).trim()
}

export function gitBytes(
  root: string,
  args: readonly string[],
  ceilingMs: number = NETWORK_CEILING_MS
): GitBytes {
  const network = NETWORK_SUBCOMMANDS.has(args[0] ?? "")
  const proc = ranGit(root, args, network ? { ceilingMs } : {})
  return { code: proc.code, stdout: proc.stdout, stderr: gitTextOf(proc.stderr) }
}

export function git(
  root: string,
  args: readonly string[],
  ceilingMs: number = NETWORK_CEILING_MS
): GitResult {
  const raw = gitBytes(root, args, ceilingMs)
  return { code: raw.code, stdout: new TextDecoder().decode(raw.stdout).trim(), stderr: raw.stderr }
}

export function gitCapped(
  root: string,
  args: readonly string[],
  ceilingMs: number = CAPPED_CEILING_MS
): GitResult {
  const proc = ranGit(root, args, { ceilingMs })
  return { code: proc.code, stdout: gitTextOf(proc.stdout), stderr: gitTextOf(proc.stderr) }
}
