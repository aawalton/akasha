import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

export const WORKED_AT = "workedAt"

export type Beating =
  | { readonly beat: "none" }
  | { readonly beat: "unreadable"; readonly at: string }
  | { readonly beat: "behind"; readonly at: string; readonly agedMs: number }
  | { readonly beat: "kept"; readonly at: string; readonly agedMs: number }

export function keepBeat(root: string, page: string, at: Date): undefined {
  mergeUncommitted(root, page, { [WORKED_AT]: at.toISOString() })
}

export function beatOn(values: Readonly<Record<string, unknown>> | null): string | null {
  if (values === null) return null
  const held = values[WORKED_AT]
  return typeof held === "string" ? held : null
}

export function beatKept(root: string, page: string): string | null {
  return beatOn(uncommittedIn(root, page))
}

export function windowMsIn(seconds: unknown): number | null {
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds <= 0) return null
  return seconds * 1000
}

export function beating(at: string | null, now: Date, withinMs: number): Beating {
  if (at === null) return { beat: "none" }
  const took = Date.parse(at)
  if (Number.isNaN(took)) return { beat: "unreadable", at }
  const agedMs = now.getTime() - took
  if (agedMs >= withinMs) return { beat: "behind", at, agedMs }
  return { beat: "kept", at, agedMs }
}
