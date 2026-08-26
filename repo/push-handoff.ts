import { existsSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { git, remoteOf } from "./git.ts"

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

function holderAlive(path: string): boolean {
  let held: number
  try {
    held = Number(readFileSync(path, "utf8").trim())
  } catch {
    return false
  }
  if (!Number.isFinite(held) || held <= 0) return false
  try {
    process.kill(held, 0)
    return true
  } catch (thrown) {
    return (thrown as NodeJS.ErrnoException).code !== "ESRCH"
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
  if (holderAlive(path)) return false
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

export function handOffPush(root: string, pusher: string): string {
  const remote = remoteOf(root)
  if (remote === null) return "push:   NO REMOTE — nothing holds a second copy of this commit"
  const argv = ["bun", pusher, "--root", root]
  const session = Bun.which("setsid")
  try {
    const proc = Bun.spawn(session === null ? argv : [session, ...argv], {
      cwd: root,
      stdin: "ignore",
      stdout: "ignore",
      stderr: "ignore",
    })
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
