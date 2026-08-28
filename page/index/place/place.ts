import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Where akasha stands, for the git call this module makes.
 *
 * ANSWERED WHEN ASKED RATHER THAN AT IMPORT. `import.meta.dir` belongs to the runtime, and a
 * bundle that is not ESM carries none — it compiles to `{}`, so resolving it as a top-level
 * const raised `paths[0] must be of type string` while the module was still loading. That threw
 * before any caller asked for anything, and it took the whole editor extension down with it: the
 * extension imports this file's neighbours for other exports and never calls into the index at
 * all. A root worked out when it is wanted costs an importer that never wants it nothing.
 *
 * `AKASHA_ROOT` FIRST, which is how a bundle states where it stands. `readouts/readout-catalog`
 * reads the same pair for the same reason, and this repeats it rather than inventing a second
 * rule for where akasha is.
 */
function akashaStands(): string {
  const stated = process.env.AKASHA_ROOT
  if (stated !== undefined && stated !== "") return stated
  // `import.meta.dir` is bun's and reads undefined under node, which is what the editor's
  // extension host runs; `import.meta.dirname` is node's; `import.meta.url` is carried by both.
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

let held: string | null = null

export function indexRoot(): string {
  if (held !== null) return held
  const dir = execFileSync("git", ["-C", akashaStands(), "rev-parse", "--absolute-git-dir"], {
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
