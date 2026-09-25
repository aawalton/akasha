import { git, PUSH_CEILING_MS } from "akasha/git/modules/capping/git-capping.module.code.ts"

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

export function pushBranch(root: string, ceilingMs: number = PUSH_CEILING_MS): PushOutcome {
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
  if (push.code === 0) return pushedTo(remote, branch, "")
  return notPushed(
    remote,
    branch,
    push.stderr !== "" ? push.stderr : `git push exited ${push.code}`
  )
}

function pushedTo(remote: string, branch: string, how: string): PushOutcome {
  return {
    failed: false,
    line: `push:   pushed to ${remote} (${branch})${how}`,
    remote,
    branch,
    reason: null,
  }
}

function notPushed(remote: string, branch: string, reason: string): PushOutcome {
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

const REPLAY_TRIES = 3

const MOVED_ON = /rejected|non-fast-forward|fetch first/

type Replayed = { readonly outcome: PushOutcome } | { readonly moved: string }

function replayedOnce(root: string, remote: string, branch: string, ceilingMs: number): Replayed {
  const fetched = git(root, ["fetch", "-q", remote, `refs/heads/${branch}`], ceilingMs)
  if (fetched.code !== 0) {
    return {
      outcome: notPushed(remote, branch, fetched.stderr || `git fetch exited ${fetched.code}`),
    }
  }
  const tip = git(root, ["rev-parse", "FETCH_HEAD"]).stdout
  const merged = git(root, ["merge-tree", "--write-tree", "--merge-base=HEAD^", tip, "HEAD"])
  if (merged.code !== 0) {
    const why = `the change HEAD makes does not apply onto the tip of ${branch}: ${merged.stdout}`
    return { outcome: notPushed(remote, branch, why) }
  }
  const tree = merged.stdout.split("\n")[0] ?? ""
  if (tree === git(root, ["rev-parse", `${tip}^{tree}`]).stdout) {
    return { outcome: pushedTo(remote, branch, ", which already held the change HEAD makes") }
  }
  const name = git(root, ["log", "-1", "--format=%an", "HEAD"]).stdout
  const email = git(root, ["log", "-1", "--format=%ae", "HEAD"]).stdout
  const message = git(root, ["log", "-1", "--format=%B", "HEAD"]).stdout
  const who = ["-c", `user.name=${name}`, "-c", `user.email=${email}`]
  const made = git(root, [...who, "commit-tree", tree, "-p", tip, "-m", message]).stdout
  const push = git(root, ["push", remote, `${made}:refs/heads/${branch}`], ceilingMs)
  if (push.code === 0)
    return { outcome: pushedTo(remote, branch, ", onto its tip, as HEAD is on no branch") }
  if (MOVED_ON.test(push.stderr)) return { moved: push.stderr }
  return { outcome: notPushed(remote, branch, push.stderr || `git push exited ${push.code}`) }
}

export function pushedOnto(
  root: string,
  branch: string,
  ceilingMs: number = PUSH_CEILING_MS
): PushOutcome {
  const head = git(root, ["symbolic-ref", "--short", "HEAD"])
  const remote = remoteOf(root)
  if ((head.code === 0 && head.stdout !== "") || remote === null) return pushBranch(root, ceilingMs)
  let moved = ""
  for (let tried = 0; tried < REPLAY_TRIES; tried += 1) {
    const once = replayedOnce(root, remote, branch, ceilingMs)
    if ("outcome" in once) return once.outcome
    moved = once.moved
  }
  return notPushed(remote, branch, `the tip of ${branch} kept moving: ${moved}`)
}
