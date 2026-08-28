import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { holderProcessRuns } from "../holder/holder.ts"

export interface GitResult {
  readonly code: number
  readonly stdout: string
  readonly stderr: string
}

const NETWORK_SUBCOMMANDS = new Set(["push", "fetch", "ls-remote"])

export interface GitBytes {
  readonly code: number
  readonly stdout: Uint8Array
  readonly stderr: string
}

export const NETWORK_CEILING_MS = 10_000

const OUTPUT_CEILING = 256 * 1024 * 1024

const EMPTY = new Uint8Array()

interface Ran {
  readonly code: number
  readonly stdout: Uint8Array
  readonly stderr: Uint8Array
}

function ran(
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

function text(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes).trim()
}

function sleepSync(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

export function gitBytes(
  root: string,
  args: readonly string[],
  ceilingMs: number = NETWORK_CEILING_MS
): GitBytes {
  const network = NETWORK_SUBCOMMANDS.has(args[0] ?? "")
  const proc = ran(root, args, network ? { ceilingMs } : {})
  return { code: proc.code, stdout: proc.stdout, stderr: text(proc.stderr) }
}

export function git(
  root: string,
  args: readonly string[],
  ceilingMs: number = NETWORK_CEILING_MS
): GitResult {
  const raw = gitBytes(root, args, ceilingMs)
  return { code: raw.code, stdout: new TextDecoder().decode(raw.stdout).trim(), stderr: raw.stderr }
}

export const CAPPED_CEILING_MS = 10_000

export function gitCapped(
  root: string,
  args: readonly string[],
  ceilingMs: number = CAPPED_CEILING_MS
): GitResult {
  const proc = ran(root, args, { ceilingMs })
  return { code: proc.code, stdout: text(proc.stdout), stderr: text(proc.stderr) }
}

const LANDING_LOCK = "harness-landing.lock"

export const LANDING_CEILING_MS = 120_000
const LANDING_POLL_MS = 250

export type LandingOutcome<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: string }

function landingLockPath(root: string): string | null {
  const found = git(root, ["rev-parse", "--git-common-dir"])
  if (found.code !== 0) return null
  const dir = found.stdout
  return join(dir.startsWith("/") ? dir : join(root, dir), LANDING_LOCK)
}

export function whileHoldingLanding<T>(
  root: string,
  land: () => T,
  ceilingMs: number = LANDING_CEILING_MS
): LandingOutcome<T> {
  const path = landingLockPath(root)
  if (path === null) {
    return {
      ok: false,
      reason: `${root} is not a git checkout, so there is no landing to serialise — nothing was committed.`,
    }
  }
  const until = Date.now() + ceilingMs
  for (;;) {
    try {
      writeFileSync(path, `${process.pid}\n`, { flag: "wx" })
      break
    } catch (thrown) {
      const code = (thrown as NodeJS.ErrnoException).code
      if (code !== undefined && code !== "EEXIST") {
        return {
          ok: false,
          reason:
            `the landing lock at ${path} could not be taken (${code}), so this landing never ran — ` +
            "nothing was committed. This is the lock path failing rather than another writer holding it.",
        }
      }
      if (!holderProcessRuns(path)) {
        try {
          rmSync(path)
        } catch {
        }
      }
      const left = until - Date.now()
      if (left <= 0) {
        return {
          ok: false,
          reason:
            `another writer has held ${path} for ${ceilingMs / 1000}s, so this landing never ran — ` +
            "nothing was committed. Whoever holds it is alive and stuck mid-landing; read that process before clearing the file.",
        }
      }
      sleepSync(Math.min(LANDING_POLL_MS, left))
    }
  }
  try {
    return { ok: true, value: land() }
  } finally {
    try {
      if (readFileSync(path, "utf8").trim() === String(process.pid)) rmSync(path)
    } catch {
    }
  }
}

const PATHSPEC_CEILING = 100_000

function overCeiling(paths: readonly string[]): boolean {
  let held = 0
  for (const one of paths) {
    held += one.length + 1
    if (held > PATHSPEC_CEILING) return true
  }
  return false
}

function inBatches(paths: readonly string[]): readonly (readonly string[])[] {
  const batches: string[][] = []
  let batch: string[] = []
  let held = 0
  for (const one of paths) {
    if (held + one.length + 1 > PATHSPEC_CEILING && batch.length > 0) {
      batches.push(batch)
      batch = []
      held = 0
    }
    batch.push(one)
    held += one.length + 1
  }
  if (batch.length > 0) batches.push(batch)
  return batches
}

export function gitWritingPaths(
  root: string,
  args: readonly string[],
  paths: readonly string[]
): GitResult {
  if (!overCeiling(paths)) return git(root, [...args, "--", ...paths])
  const proc = ran(root, [...args, "--pathspec-from-file=-", "--pathspec-file-nul"], {
    input: new TextEncoder().encode(paths.join("\0")),
  })
  return { code: proc.code, stdout: text(proc.stdout), stderr: text(proc.stderr) }
}

export function gitAskingPaths(
  root: string,
  args: readonly string[],
  paths: readonly string[]
): GitResult {
  const said: string[] = []
  for (const some of inBatches(paths)) {
    const got = git(root, [...args, "--", ...some])
    if (got.code !== 0) return got
    if (got.stdout !== "") said.push(got.stdout)
  }
  return { code: 0, stdout: said.join("\0"), stderr: "" }
}

export function gitIgnoring(root: string, paths: readonly string[]): ReadonlySet<string> | null {
  if (paths.length === 0) return new Set()
  const proc = ran(root, ["check-ignore", "--stdin", "-z"], {
    input: new TextEncoder().encode(paths.join("\0")),
  })
  if (proc.code !== 0 && proc.code !== 1) return null
  return new Set(
    new TextDecoder()
      .decode(proc.stdout)
      .split("\0")
      .filter((one) => one !== "")
  )
}

export type CommitResult =
  | { readonly ok: true; readonly sha: string | null; readonly nothing: readonly string[] }
  | { readonly ok: false; readonly reason: string; readonly nothing: readonly string[] }

export function heldByRepo(root: string, paths: readonly string[]): ReadonlySet<string> {
  const held = new Set(paths.filter((one) => existsSync(join(root, one))))
  const missing = paths.filter((one) => !held.has(one))
  if (missing.length === 0) return held
  for (const args of [
    ["ls-files", "--cached", "-z"],
    ["ls-tree", "-r", "--name-only", "-z", "HEAD"],
  ]) {
    const got = gitAskingPaths(root, args, missing)
    if (got.code !== 0) continue
    for (const name of got.stdout.split("\0")) if (name !== "") held.add(name)
  }
  return held
}

export function unknownToGit(root: string, paths: readonly string[]): readonly string[] {
  const missing = paths.filter((one) => !existsSync(join(root, one)))
  if (missing.length === 0) return []
  const known = new Set<string>()
  for (const args of [
    ["ls-files", "--cached", "-z"],
    ["ls-tree", "-r", "--name-only", "-z", "HEAD"],
  ]) {
    const got = gitAskingPaths(root, args, missing)
    if (got.code !== 0) return []
    for (const name of got.stdout.split("\0")) if (name !== "") known.add(name)
  }
  return missing.filter((one) => !known.has(one))
}

export function commitPaths(
  root: string,
  paths: readonly string[],
  message: string,
  author: string
): CommitResult {
  const nothing = unknownToGit(root, paths)
  const known = nothing.length === 0 ? paths : paths.filter((one) => !nothing.includes(one))
  const ignored = gitIgnoring(root, known)
  const landing =
    ignored === null || ignored.size === 0 ? known : known.filter((one) => !ignored.has(one))
  if (landing.length === 0) return { ok: true, sha: null, nothing }
  const others = gitAskingPaths(root, ["ls-files", "--others", "-z"], landing)
  if (others.code !== 0) {
    return { ok: false, reason: `git ls-files failed: ${others.stderr}`, nothing }
  }
  const creating = others.stdout.split("\0").filter((name) => name !== "")
  if (creating.length > 0) {
    const intent = gitWritingPaths(root, ["add", "--intent-to-add"], creating)
    if (intent.code !== 0) {
      return { ok: false, reason: `git add --intent-to-add failed: ${intent.stderr}`, nothing }
    }
  }
  if (gitAskingPaths(root, ["diff", "--quiet", "HEAD"], landing).code === 0) {
    return { ok: true, sha: null, nothing }
  }
  const commit = gitWritingPaths(root, ["commit", `--author=${author}`, "-m", message], landing)
  if (commit.code !== 0) {
    if (creating.length > 0) gitWritingPaths(root, ["reset", "--quiet"], creating)
    return {
      ok: false,
      reason: `git commit failed: ${commit.stderr !== "" ? commit.stderr : commit.stdout}`,
      nothing,
    }
  }
  const sha = git(root, ["rev-parse", "HEAD"])
  if (sha.code !== 0) {
    return { ok: false, reason: `could not read the resulting commit: ${sha.stderr}`, nothing }
  }
  return { ok: true, sha: sha.stdout, nothing }
}

export interface PushOutcome {
  readonly failed: boolean
  readonly line: string
  readonly remote: string | null
  readonly branch: string | null
  readonly reason: string | null
}

export function remoteOf(root: string): string | null {
  const head = git(root, ["symbolic-ref", "--short", "HEAD"])
  if (head.code === 0 && head.stdout !== "") {
    const tracking = git(root, ["config", "--get", `branch.${head.stdout}.remote`])
    if (tracking.code === 0 && tracking.stdout !== "") return tracking.stdout
  }
  const remotes = git(root, ["remote"])
  if (remotes.code !== 0) return null
  const first = remotes.stdout.split("\n")[0] ?? ""
  return first === "" ? null : first
}

export function pushBranch(root: string, ceilingMs: number = NETWORK_CEILING_MS): PushOutcome {
  const remote = remoteOf(root)
  if (remote === null) {
    return {
      failed: false,
      line: "push:   NO REMOTE — nothing holds a second copy of this commit",
      remote: null,
      branch: null,
      reason: null,
    }
  }
  const head = git(root, ["symbolic-ref", "--short", "HEAD"])
  if (head.code !== 0 || head.stdout === "") {
    return {
      failed: true,
      line: "push:   NOT PUSHED — HEAD is not on a branch, so there is nothing to push it as",
      remote,
      branch: null,
      reason: "detached HEAD",
    }
  }
  const branch = head.stdout
  const push = git(root, ["push", remote, `HEAD:refs/heads/${branch}`], ceilingMs)
  if (push.code === 0) {
    return { failed: false, line: `push:   pushed to ${remote} (${branch})`, remote, branch, reason: null }
  }
  const reason = push.stderr !== "" ? push.stderr : `git push exited ${push.code}`
  return {
    failed: true,
    line:
      `push:   NOT PUSHED to ${remote} (${branch}) — ${reason}\n` +
      "        the write is already made and durable locally; only the second copy is missing. " +
      "Do not re-run this command — push the branch that is already committed.",
    remote,
    branch,
    reason,
  }
}

const OBJECT_ID = /^[0-9a-f]{40}$/

export function blobId(content: Uint8Array): string {
  return createHash("sha1").update(`blob ${content.length}\0`).update(content).digest("hex")
}

export function readBlob(root: string, oid: string): Uint8Array | null {
  if (!OBJECT_ID.test(oid)) return null
  const raw = gitBytes(root, ["cat-file", "blob", oid])
  return raw.code === 0 ? raw.stdout : null
}
