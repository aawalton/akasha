import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

function akashaStands(): string {
  const stated = process.env.AKASHA_ROOT
  if (stated !== undefined && stated !== "") return stated
  const meta: { readonly dir?: string; readonly dirname?: string; readonly url?: string } = import.meta
  const named = meta.dir ?? meta.dirname
  const dir = named ?? (meta.url === undefined ? undefined : dirname(fileURLToPath(meta.url)))
  if (dir === undefined || dir === "") {
    throw new Error(
      "place: nothing here says where this file is, so nothing says where akasha stands — name the akasha root in `AKASHA_ROOT`"
    )
  }
  return resolve(dir, "..", "..", "..")
}

const UNDER = "pages"

const INDEX = "index"

const RELATION = "relation"

const IDENTITY = "identity"

const BUILT_FROM = "built-from.json"

const BUCKET_WIDTH = 2

export const ENDING = ".jsonl"

let held: { readonly from: string; readonly at: string } | null = null

export function indexRoot(): string {
  const from = akashaStands()
  if (held !== null && held.from === from) return held.at
  const dir = execFileSync("git", ["-C", from, "rev-parse", "--absolute-git-dir"], {
    encoding: "utf8",
  }).trim()
  const at = join(dir, UNDER, INDEX)
  held = { from, at }
  return at
}

export function relationsRoot(): string {
  return join(indexRoot(), RELATION)
}

export function relationRoot(relation: string): string {
  return join(relationsRoot(), relation)
}

export function relationFileFor(relation: string, target: string): string {
  return join(relationRoot(relation), `${target}${ENDING}`)
}

export function pageTargetOf(stem: string, type: string): string {
  return `${stem}.${type}`
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
