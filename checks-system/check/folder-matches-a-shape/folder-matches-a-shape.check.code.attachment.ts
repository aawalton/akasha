import { resolve } from "node:path"
import { type Held, foldersHere, named, namedFew } from "../../../file-structure/folder/folder.ts"
import { diskFileTree } from "../../../page/file-tree.ts"
import { claimant, type PageType } from "../../../page/page-types.ts"
import { registryOf } from "../../../page/property/registry.ts"
import { pageOfSidecar } from "../../../page/sidecar/sidecar.ts"
import { rootsHere } from "../../../repo/roots/roots.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const MOST = 6

const DECLARATION = ".d.ts"

const APART = Number.POSITIVE_INFINITY

type Enters = (folder: string, key: string) => boolean

/** How far a folder is from one shape: `off` is 0 where it matches and `APART` where the shape is not in play. */
type Verdict = {
  readonly shape: string
  readonly ok: boolean
  readonly off: number
  readonly why: string
}

/**
 * The code files among these, which is every one that is not a type declaration.
 *
 * A DECLARATION FILE IS NOT A CODE FILE TO THIS SHAPE ALONE. `pages-of-one-type` still counts it
 * among the files sitting in a folder, so this narrowing belongs here rather than in `foldersHere`.
 */
function running(keys: readonly string[]): readonly string[] {
  return keys.filter((key) => !key.endsWith(DECLARATION))
}

/**
 * SINGLE ENTRANCE — one code file in the folder is imported from outside it, and no other code
 * file anywhere beneath the folder is. `deep` is every code file under a subfolder, so a door
 * one level down disqualifies the folder as surely as a second door beside the first. A type
 * declaration file counts as neither the entry nor a second one.
 */
function singleEntrance(folder: string, one: Held, enters: Enters): Verdict {
  const shape = "single-entrance"
  const here = running(one.code)
  const beneath = running(one.deep)
  const doors = here.filter((key) => enters(folder, key))
  const under = beneath.filter((key) => enters(folder, key))
  if (doors.length === 1 && under.length === 0) return { shape, ok: true, off: 0, why: "" }
  const code = here.length + beneath.length
  if (code === 0) return { shape, ok: false, off: APART, why: "it holds no code file at all" }
  if (doors.length === 0 && under.length === 0) {
    return { shape, ok: false, off: 1, why: `nothing outside it imports any of its ${code} code files` }
  }
  if (doors.length === 0) {
    return {
      shape,
      ok: false,
      off: under.length + 1,
      why: `no code file in it is imported from outside, and ${under.length} under its subfolders are: ${namedFew(folder, under, MOST)}`,
    }
  }
  if (doors.length === 1) {
    return {
      shape,
      ok: false,
      off: under.length,
      why: `its one door ${named(folder, doors)} is right, and ${under.length} code files under its subfolders are imported from outside too: ${namedFew(folder, under, MOST)}`,
    }
  }
  const tail = under.length === 0 ? "" : `, beside ${under.length} more under its subfolders`
  return {
    shape,
    ok: false,
    off: doors.length - 1 + under.length,
    why: `${doors.length} code files in it are imported from outside${tail}: ${namedFew(folder, doors, MOST)}`,
  }
}

/**
 * PAGES OF ONE TYPE — every file sitting in the folder is a page of one single page type, or a
 * sidecar of such a page. Subfolders are not looked at: each is a folder in its own right and is
 * judged on its own account. A folder holding no file at all is not this shape but `subfolders-only`.
 */
function pagesOfOneType(folder: string, one: Held, types: readonly PageType[]): Verdict {
  const shape = "pages-of-one-type"
  if (one.files.length === 0) return { shape, ok: false, off: APART, why: "it holds no file at all" }
  const kinds = new Set<string>()
  const pages = new Set<string>()
  const sidecars: string[] = []
  const strays: string[] = []
  for (const key of one.files) {
    const owner = claimant(key, types).type
    if (owner !== null) {
      kinds.add(owner.slug)
      pages.add(key)
      continue
    }
    if (pageOfSidecar(key) !== null) sidecars.push(key)
    else strays.push(key)
  }
  const loose = sidecars.filter((key) => !pages.has(pageOfSidecar(key) as string))
  const spare = kinds.size > 1 ? kinds.size - 1 : 0
  const off = strays.length + loose.length + spare
  if (off === 0) return { shape, ok: true, off: 0, why: "" }
  const said: string[] = []
  if (strays.length > 0) {
    said.push(
      `${strays.length} of its ${one.files.length} files are neither a page nor a page's sidecar: ${namedFew(folder, strays, MOST)}`
    )
  }
  if (loose.length > 0) {
    said.push(`${loose.length} sidecar files stand beside no page here: ${namedFew(folder, loose, MOST)}`)
  }
  if (spare > 0) said.push(`its pages are of ${kinds.size} types: ${[...kinds].sort().join(", ")}`)
  return { shape, ok: false, off, why: said.join(", and ") }
}

export const folderMatchesAShape = {
  slug: "folder-matches-a-shape",
  needs: "tree",
  cached: false,
  run: ({ root }) => {
    const { held, enters } = foldersHere()
    const types = registryOf(diskFileTree(rootsHere()))
    const failures: CheckFailure[] = []
    for (const folder of [...held.keys()].sort()) {
      const one = held.get(folder) as Held
      if (one.files.length === 0) continue
      const verdicts = [singleEntrance(folder, one, enters), pagesOfOneType(folder, one, types)]
      if (verdicts.some((each) => each.ok)) continue
      const [near, far] = [...verdicts].sort((a, b) => a.off - b.off) as [Verdict, Verdict]
      failures.push({
        path: resolve(root, folder),
        reason: `matches no shape — as ${near.shape}, ${near.why}; as ${far.shape}, ${far.why}`,
      })
    }
    return failures
  },
} satisfies Check

export default folderMatchesAShape
