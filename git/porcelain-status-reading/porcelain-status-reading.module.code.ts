import { runGitRaw } from "../git-answering/git-answering.module.code.ts"
import {
  PORCELAIN_STATUS_ARGS,
  type PorcelainEntry,
  parsePorcelainStatusZ,
} from "../porcelain-status/porcelain-status.module.code.ts"

export type PorcelainStatusResult =
  | { readonly ok: true; readonly entries: readonly PorcelainEntry[] }
  | { readonly ok: false; readonly error: string }

export interface PorcelainStatusOptions {
  readonly untrackedFiles?: "no" | "normal" | "all"
  readonly pathspec?: readonly string[]
  readonly timeoutMs?: number
}

export async function readPorcelainStatus(
  root: string,
  options?: PorcelainStatusOptions
): Promise<PorcelainStatusResult> {
  const args = [...PORCELAIN_STATUS_ARGS]
  if (options?.untrackedFiles !== undefined) {
    args.push(`--untracked-files=${options.untrackedFiles}`)
  }
  if (options?.pathspec !== undefined && options.pathspec.length > 0) {
    args.push("--", ...options.pathspec)
  }

  const result = await runGitRaw(args, root, { timeoutMs: options?.timeoutMs })
  if (!result.ok) {
    return { ok: false, error: `git status failed in ${root}: ${result.stderr.trim()}` }
  }

  const parsed = parsePorcelainStatusZ(result.stdout)
  if (!parsed.ok) return { ok: false, error: `git status in ${root}: ${parsed.error}` }
  return { ok: true, entries: parsed.entries }
}
