import { git, NETWORK_CEILING_MS } from "../git-capping/git-capping.module.code.ts"

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
    return {
      failed: false,
      line: `push:   pushed to ${remote} (${branch})`,
      remote,
      branch,
      reason: null,
    }
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
