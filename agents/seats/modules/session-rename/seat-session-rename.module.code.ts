import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

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
    const done = ran(["tmux", ...args], { timeout: PATIENCE_MS })
    return { code: done.code, out: done.out.trim(), err: done.err.trim() }
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
  const done = tmux(["rename-session", "-t", `=${was}`, now])
  if (done.code !== 0) return { kind: "failed", said: done.err === "" ? done.out : done.err }
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
    default:
      return assertNever(outcome)
  }
}
