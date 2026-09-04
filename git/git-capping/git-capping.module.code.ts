import { spawnSync } from "node:child_process"

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

export const CAPPED_CEILING_MS = 10_000

const OUTPUT_CEILING = 256 * 1024 * 1024

const EMPTY = new Uint8Array()

export function ranGit(
  root: string,
  args: readonly string[],
  taking: { readonly input?: Uint8Array; readonly ceilingMs?: number } = {}
): Ran {
  const done = spawnSync("git", [...args], {
    cwd: root,
    maxBuffer: OUTPUT_CEILING,
    ...(taking.input === undefined ? {} : { input: Buffer.from(taking.input) }),
    ...(taking.ceilingMs === undefined ? {} : { timeout: taking.ceilingMs }),
  })
  const stderr = done.stderr ?? EMPTY
  if (done.error !== undefined) {
    const why = new TextEncoder().encode(done.error.message)
    return { code: -1, stdout: done.stdout ?? EMPTY, stderr: stderr.length > 0 ? stderr : why }
  }
  return { code: done.status ?? -1, stdout: done.stdout ?? EMPTY, stderr }
}

export function gitTextOf(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes).trim()
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
