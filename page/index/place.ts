import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { join, resolve } from "node:path"

const AKASHA = resolve(import.meta.dir, "..", "..")

const UNDER = "pages"

const INDEX = "index"

const RELATION = "relation"

const IDENTITY = "identity"

const BUILT_FROM = "built-from.json"

const BUCKET_WIDTH = 2

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

export function relationsRoot(): string {
  return join(indexRoot(), RELATION)
}

export function relationRoot(relation: string): string {
  return join(relationsRoot(), relation)
}

export function fileFor(relation: string, stem: string, type: string): string {
  return join(relationRoot(relation), `${stem}.${type}${ENDING}`)
}

export function identityRoot(): string {
  return join(indexRoot(), IDENTITY)
}

export function bucketOf(at: string): string {
  return createHash("sha1").update(at, "utf8").digest("hex").slice(0, BUCKET_WIDTH)
}

export function identityFile(word: string, at: string): string {
  return join(identityRoot(), word, `${bucketOf(at)}${ENDING}`)
}

export function builtFromAt(): string {
  return join(indexRoot(), BUILT_FROM)
}
