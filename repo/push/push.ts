import { spawn } from "node:child_process"
import {
  accessSync,
  constants,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { git, remoteOf } from "../git/git.ts"
import { holderProcessRuns } from "../holder/holder.ts"
import { akashaRoot } from "../roots/roots.ts"

const STATE_DIR = "harness-push"

export interface PushState {
  readonly at: string
  readonly sha: string | null
  readonly ok: boolean
  readonly reason: string | null
  readonly remote: string | null
}

function commonDir(root: string): string | null {
  const found = git(root, ["rev-parse", "--git-common-dir"])
  if (found.code !== 0) return null
  const dir = found.stdout
  return dir.startsWith("/") ? dir : join(root, dir)
}

function branchOf(root: string): string {
  const head = git(root, ["symbolic-ref", "--short", "HEAD"])
  return head.code === 0 && head.stdout !== "" ? head.stdout : "HEAD"
}

function pathFor(root: string, suffix: string): string | null {
  const dir = commonDir(root)
  if (dir === null) return null
  return join(dir, STATE_DIR, `${branchOf(root)}.${suffix}`)
}

export function pushStatePath(root: string): string | null {
  return pathFor(root, "state")
}

export function pushLockPath(root: string): string | null {
  return pathFor(root, "lock")
}

export function readPushState(root: string): PushState | null {
  const path = pushStatePath(root)
  if (path === null || !existsSync(path)) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"))
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null
  const held = parsed as Record<string, unknown>
  if (typeof held["at"] !== "string" || typeof held["ok"] !== "boolean") return null
  return {
    at: held["at"],
    ok: held["ok"],
    sha: typeof held["sha"] === "string" ? held["sha"] : null,
    reason: typeof held["reason"] === "string" ? held["reason"] : null,
    remote: typeof held["remote"] === "string" ? held["remote"] : null,
  }
}

export function writePushState(root: string, state: PushState): void {
  const path = pushStatePath(root)
  if (path === null) return
  try {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, `${JSON.stringify(state)}\n`, "utf8")
  } catch {
  }
}

export function takePushLock(root: string): boolean {
  const path = pushLockPath(root)
  if (path === null) return false
  try {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, `${process.pid}\n`, { flag: "wx" })
    return true
  } catch (thrown) {
    if ((thrown as NodeJS.ErrnoException).code !== "EEXIST") return false
  }
  if (holderProcessRuns(path)) return false
  try {
    rmSync(path)
    writeFileSync(path, `${process.pid}\n`, { flag: "wx" })
    return true
  } catch {
    return false
  }
}

export function releasePushLock(root: string): void {
  const path = pushLockPath(root)
  if (path === null) return
  try {
    unlinkSync(path)
  } catch {
  }
}

function onPath(name: string): string | null {
  for (const dir of (process.env["PATH"] ?? "").split(":")) {
    if (dir === "") continue
    const at = join(dir, name)
    try {
      accessSync(at, constants.X_OK)
      return at
    } catch {
    }
  }
  return null
}

function pusherHere(): string {
  return join(akashaRoot(), "repo", "push", "push-repo.ts")
}

export function handOffPush(root: string): string {
  const pusher = pusherHere()
  const remote = remoteOf(root)
  if (remote === null) return "push:   NO REMOTE — nothing holds a second copy of this commit"
  const runner = onPath("bun")
  if (runner === null) {
    return (
      `push:   NOT HANDED OFF to ${remote} — no \`bun\` stands on PATH\n` +
      `        the commit stands here and nothing carries it. Run \`bun ${pusher} --root ${root}\` yourself.`
    )
  }
  const session = onPath("setsid")
  const command = session ?? runner
  const argv =
    session === null ? [pusher, "--root", root] : [runner, pusher, "--root", root]
  try {
    const proc = spawn(command, argv, { cwd: root, stdio: "ignore", detached: true })
    proc.on("error", () => {})
    proc.unref()
  } catch (err) {
    return (
      `push:   NOT HANDED OFF to ${remote} — ${err instanceof Error ? err.message : String(err)}\n` +
      `        the commit stands here and nothing carries it. Run \`bun ${pusher} --root ${root}\` yourself.`
    )
  }
  return `push:   handed off to ${remote} — this write is durable at its commit`
}

export function pushStandingLines(root: string): readonly string[] {
  const state = readPushState(root)
  if (state === null || state.ok) return []
  const counted =
    state.sha === null ? null : git(root, ["rev-list", "--count", `${state.sha}~1..HEAD`])
  const ahead = counted === null || counted.code !== 0 ? null : counted.stdout
  const where = state.remote ?? "the remote"
  return [
    `push:   ${where.toUpperCase()} IS BEHIND ON ${branchOf(root)} — ` +
      `the push that ran at ${state.at} failed: ${state.reason ?? "no reason recorded"}`,
    `        ${ahead === null ? "commits stand" : `${ahead} commit(s) stand`} here that ${where} does not hold. ` +
      "Every write since is durable locally and none of them is a second copy.",
  ]
}
