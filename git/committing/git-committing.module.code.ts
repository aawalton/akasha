import type { GitResult } from "../git-capping/git-capping.module.code.ts"
import { git } from "../git-capping/git-capping.module.code.ts"
import {
  gitAskingPaths,
  gitIgnoring,
  gitWritingPaths,
  unknownToGit,
} from "../pathspec/git-pathspec.module.code.ts"

function sleepSync(ms: number): undefined {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

export type CommitResult =
  | { readonly ok: true; readonly sha: string | null; readonly nothing: readonly string[] }
  | { readonly ok: false; readonly reason: string; readonly nothing: readonly string[] }

const NAMED_AUTHOR = /^\s*(.*?)\s*<([^>]*)>\s*$/

export function identifyingAs(author: string): readonly string[] {
  const found = NAMED_AUTHOR.exec(author)
  if (found === null) return []
  const name = found[1]
  const email = found[2]
  if (name === undefined || name === "" || email === undefined || email === "") return []
  return ["-c", `user.name=${name}`, "-c", `user.email=${email}`]
}

const INDEX_LOCK_CEILING_MS = 30_000
const INDEX_LOCK_FIRST_WAIT_MS = 100
const INDEX_LOCK_LONGEST_WAIT_MS = 2_000

function heldIndexLock(got: GitResult): boolean {
  const said = got.stderr !== "" ? got.stderr : got.stdout
  return said.includes("index.lock") && said.includes("File exists")
}

export function whileIndexLockClears(
  run: () => GitResult,
  ceilingMs: number = INDEX_LOCK_CEILING_MS
): GitResult {
  const until = Date.now() + ceilingMs
  let wait = INDEX_LOCK_FIRST_WAIT_MS
  let got = run()
  while (got.code !== 0 && heldIndexLock(got)) {
    const left = until - Date.now()
    if (left <= 0) return got
    sleepSync(Math.min(wait, left))
    wait = Math.min(wait * 2, INDEX_LOCK_LONGEST_WAIT_MS)
    got = run()
  }
  return got
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
  const lockUntil = Date.now() + INDEX_LOCK_CEILING_MS
  if (creating.length > 0) {
    const intent = whileIndexLockClears(
      () => gitWritingPaths(root, ["add", "--intent-to-add"], creating),
      lockUntil - Date.now()
    )
    if (intent.code !== 0) {
      return { ok: false, reason: `git add --intent-to-add failed: ${intent.stderr}`, nothing }
    }
  }
  if (gitAskingPaths(root, ["diff", "--quiet", "HEAD"], landing).code === 0) {
    return { ok: true, sha: null, nothing }
  }
  const commit = whileIndexLockClears(
    () =>
      gitWritingPaths(
        root,
        [...identifyingAs(author), "commit", `--author=${author}`, "-m", message],
        landing
      ),
    lockUntil - Date.now()
  )
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
