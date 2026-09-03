const PATIENCE_MS = 5_000

export type SessionRename =
  | { readonly kind: "no-session" }
  | { readonly kind: "taken" }
  | { readonly kind: "renamed" }
  | { readonly kind: "failed"; readonly said: string }

interface Ran {
  readonly code: number
  readonly out: string
  readonly err: string
}

function tmux(args: readonly string[]): Ran {
  try {
    const ran = Bun.spawnSync(["tmux", ...args], {
      stdout: "pipe",
      stderr: "pipe",
      timeout: PATIENCE_MS,
    })
    const read = new TextDecoder()
    return {
      code: ran.exitCode ?? 1,
      out: read.decode(ran.stdout).trim(),
      err: read.decode(ran.stderr).trim(),
    }
  } catch (error) {
    return { code: 1, out: "", err: error instanceof Error ? error.message : String(error) }
  }
}

function sessionHolds(name: string): boolean {
  return tmux(["has-session", "-t", `=${name}`]).code === 0
}

export function renameSeatSession(was: string | null, now: string): SessionRename {
  if (was === null || was === "" || was === now) return { kind: "no-session" }
  if (!sessionHolds(was)) return { kind: "no-session" }
  if (sessionHolds(now)) return { kind: "taken" }
  const ran = tmux(["rename-session", "-t", `=${was}`, now])
  if (ran.code !== 0) return { kind: "failed", said: ran.err === "" ? ran.out : ran.err }
  return { kind: "renamed" }
}

export function sessionNote(outcome: SessionRename, was: string | null, now: string): string {
  switch (outcome.kind) {
    case "no-session":
      return ""
    case "renamed":
      return "; its tmux session moved with it"
    case "taken":
      return `; its tmux session is still ${was}, a live session already holding ${now}`
    case "failed":
      return `; its tmux session is still ${was}, tmux refusing the rename: ${outcome.said}`
  }
}
