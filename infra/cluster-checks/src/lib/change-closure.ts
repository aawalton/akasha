import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

export const CHANGED_FILES_MANIFEST = ".ci/changed-files.txt"

export type ChangeClosure =
  | { readonly kind: "whole-tree"; readonly reason: string }
  | { readonly kind: "changed-files"; readonly files: ReadonlySet<string> }

export type WideningPath = string

function matchesWidening(rel: string, widening: readonly WideningPath[]): boolean {
  return widening.some((p) => (p.endsWith("/") ? rel.startsWith(p) : rel === p))
}

function readManifest(repoRoot: string): readonly string[] | undefined {
  const path = join(repoRoot, CHANGED_FILES_MANIFEST)
  if (!existsSync(path)) return undefined
  const raw = z.string().parse(readFileSync(path, "utf8"))
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
}

export function resolveChangeClosure(params: {
  readonly repoRoot: string
  readonly widening: readonly WideningPath[]
}): ChangeClosure {
  const { repoRoot, widening } = params

  const changed = readManifest(repoRoot)
  if (changed === undefined) {
    return {
      kind: "whole-tree",
      reason: `no ${CHANGED_FILES_MANIFEST} — nothing states the candidate change, so the whole tree is the closure`,
    }
  }

  const trigger = changed.find((rel) => matchesWidening(rel, widening))
  if (trigger !== undefined) {
    return {
      kind: "whole-tree",
      reason: `the change touches ${trigger}, which decides what every other file is measured against`,
    }
  }

  return { kind: "changed-files", files: new Set(changed) }
}

export function describeClosure(closure: ChangeClosure): string {
  if (closure.kind === "whole-tree") return `the whole tree (${closure.reason})`
  return `the ${closure.files.size.toLocaleString()} file(s) this change touched`
}
