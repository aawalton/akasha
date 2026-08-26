import { execFileSync } from "node:child_process"
import { join, resolve } from "node:path"

const AKASHA = resolve(import.meta.dir, "..", "..")

const UNDER = "pages"

const INDEX = "index"

const BUILT_FROM = "built-from.json"

export const ENDING = ".jsonl"

let held: string | null = null

export function indexRoot(): string {
  if (held !== null) return held
  const dir = execFileSync("git", ["-C", AKASHA, "rev-parse", "--absolute-git-dir"], {
    encoding: "utf8",
  }).trim()
  held = join(dir, UNDER, INDEX)
  return held
}

export function relationRoot(relation: string): string {
  return join(indexRoot(), relation)
}

export function fileFor(relation: string, stem: string, type: string): string {
  return join(relationRoot(relation), `${stem}.${type}${ENDING}`)
}

export function builtFromAt(): string {
  return join(indexRoot(), BUILT_FROM)
}
