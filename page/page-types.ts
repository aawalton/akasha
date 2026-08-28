import { readdirSync } from "node:fs"
import { matchesGlob, scanGlob } from "./glob/glob.ts"
import { listField, type Frontmatter } from "./frontmatter.ts"
import { ignoresUnanswered, notIgnored } from "../repo/ignored/ignored.ts"
import { AKASHA, REPOS } from "../repo/roots/roots.ts"
import { MARKDOWN, pageFileIn } from "./page-file.ts"
import { pageStemOf, stemOf } from "./name/name.ts"
import { indexWouldAnswer, scannedFromIndex } from "./index/scan/scan.ts"
import { indexReaches, loadPages } from "./index/store/store.ts"
import { onceInCall } from "../during-call/during-call.ts"
import type { Roots } from "./page.ts"
import { blockOf, NONE, stringAt } from "./text/text.ts"
import { pageTypeOf } from "../pages-system/page-type/page-type.ts"

export const PAGES_ROOT = "pages"

export const PAGE_TYPE_GLOBS: readonly string[] = [
  placeOf("page-type"),
  placeOf("rules-engine-rule-set"),
]

/** The page kinds those globs name, taken off the globs so there is one list rather than two. */
export const PAGE_TYPE_KINDS: ReadonlySet<string> = new Set(
  PAGE_TYPE_GLOBS.map((one) => folderIn(one).split("/").pop() ?? "")
)

export const PAGE_BODY_SHAPE_GLOBS: readonly string[] = [placeOf("page-body-shape")]

export const PROPERTY_GLOBS: readonly string[] = [
  placeOf("page-property-definition"),
  placeOf("alan-harness-tracking-field"),
]

/** The page kinds those globs name, taken off the globs so there is one list rather than two. */
export const PROPERTY_KINDS: ReadonlySet<string> = new Set(
  PROPERTY_GLOBS.map((one) => folderIn(one).split("/").pop() ?? "")
)

export const PAGE_GLOBS = [...PAGE_TYPE_GLOBS, ...PAGE_BODY_SHAPE_GLOBS, ...PROPERTY_GLOBS]

export const PAGE_PROPERTY_TYPE_GLOB = placeOf("page-property-type")

export const PAGE_SHAPE_GLOBS = [...PAGE_GLOBS, PAGE_PROPERTY_TYPE_GLOB]

export function matchesAny(relPath: string, globs: readonly string[]): boolean {
  return globs.some((one) => matchesGlob(relPath, one))
}

const LOCATION_FREE = /^\*\*\/\*\.([a-z0-9-]+)\.md$/

export function typeSuffixIn(glob: string): string | null {
  return LOCATION_FREE.exec(glob)?.[1] ?? null
}

export function folderIn(glob: string): string {
  const star = glob.indexOf("*")
  return (star === -1 ? glob : glob.slice(0, star)).replace(/\/+$/, "")
}

export function typeSuffixOf(relPath: string): string {
  const name = relPath.slice(relPath.lastIndexOf("/") + 1)
  const cut = name.length - MARKDOWN.length
  if (cut <= 0 || !name.endsWith(MARKDOWN)) return ""
  const dot = name.lastIndexOf(".", cut - 1)
  return dot < 0 ? "" : name.slice(dot + 1, cut)
}

export const FILES = "files"

export const DEFINED_ON = "defined-on-slug"

export const EXTENDS_SLUG = "extends-slug"

export const DOMAIN_SLUG = "domain"

export const NAMED_FOR = "named-for"

export const SLUG = "slug"

export interface PageType {
  readonly slug: string
  readonly relPath: string
  readonly filed: readonly Filed[]
  readonly extends: string | null
  readonly namedFor: string | null
}

/**
 * The paths under this root matching these globs: off the index where a repository is named, and
 * off the disk where none is.
 *
 * WHICH REPOSITORY THIS ROOT IS HAS TO BE STATED, because that is what decides which of the two is
 * read. It defaulted to `null`, which reads as an argument nobody needed and means an index nobody
 * read: four callers omitted it and walked the disk with nothing anywhere saying so. Where a caller
 * genuinely cannot name the repository, `null` now says that in the open.
 *
 * A ROOT THE INDEX DESCRIBES IS NEVER WALKED BEHIND AN UNNAMED REPOSITORY. Requiring the argument
 * catches this where the types are checked, and `tsc` does not reach `tools/`, where most of these
 * callers stand — so the refusal stands at the moment the walk would have quietly stood in for the
 * index, rather than only in a build that never sees it.
 *
 * A WALK THAT CANNOT LEARN WHAT IS IGNORED REFUSES RATHER THAN HANDING BACK WHAT IT WALKED.
 * `notIgnored` is the only thing keeping `node_modules` and `dist` out of the corpus this returns,
 * so a null from it leaves the list in hand as that corpus with untracked content in it, and there
 * is no shorter list this could honestly hand back instead. Every caller here was written to always
 * receive a list, so this throws where the walk cannot be filtered, as the unnamed-repository
 * refusal above it does.
 */
export function scanIn(
  root: string,
  patterns: readonly string[],
  repo: string | null
): readonly string[] {
  const indexed = scannedFromIndex(root, patterns, repo)
  if (indexed !== null) return indexed
  const unnamed = repo === null ? indexWouldAnswer(root, patterns) : null
  if (unnamed !== null) {
    throw new Error(
      `a scan of ${patterns.join(", ")} named no repository, and the page index describes this root ` +
        `as \`${unnamed}\`. Walking the disk instead answers from a second source that can disagree ` +
        `with the index, and nothing downstream would say which of the two it was handed. Name the ` +
        `repository this root is.`
    )
  }
  const suffixes = new Set<string>()
  const walked: string[] = []
  for (const pattern of patterns) {
    const suffix = typeSuffixIn(pattern)
    if (suffix === null) walked.push(pattern)
    else suffixes.add(suffix)
  }
  const found = walked.flatMap((pattern) => [...scanGlob(pattern, root)])
  if (suffixes.size > 0) {
    for (const at of scanGlob(`**/*${MARKDOWN}`, root)) {
      if (suffixes.has(typeSuffixOf(at))) found.push(at)
    }
  }
  const kept = notIgnored(root, [...new Set(found)])
  if (kept === null) {
    throw new Error(
      `${ignoresUnanswered(root)} Until it can, a scan of ${patterns.join(", ")} here would return ` +
        "ignored files as pages."
    )
  }
  return [...kept].sort()
}

export function scanSpanning(roots: Roots, globs: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const repo of REPOS) {
    const root = roots[repo]
    if (root === undefined) continue
    found.push(...scanIn(root, globs, repo))
  }
  return [...new Set(found)].sort()
}

export interface StatedPageType {
  readonly slug: string
  readonly relPath: string
  readonly stated: readonly Filed[] | null
  readonly extends: string | null
  readonly namedFor: string | null
}

export function pageTypeStatedAt(relPath: string, text: string): StatedPageType | null {
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return {
    slug: stringAt(fm, SLUG) ?? stemOf(relPath),
    relPath,
    stated: filedIn(fm),
    extends: stringAt(fm, EXTENDS_SLUG),
    namedFor: stringAt(fm, NAMED_FOR),
  }
}

/** The registry record for a page type, filling in where its pages stand where it states nothing. */
export function pageTypeRecord(one: StatedPageType, repo: string | null): PageType {
  return {
    slug: one.slug,
    relPath: one.relPath,
    filed: one.stated ?? (repo === null ? [] : [{ repo, place: null }]),
    extends: one.extends,
    namedFor: one.namedFor,
  }
}

export function pageTypeAt(relPath: string, text: string, repo: string | null = null): PageType | null {
  const one = pageTypeStatedAt(relPath, text)
  return one === null ? null : pageTypeRecord(one, repo)
}

export function domainKinds(types: readonly PageType[]): ReadonlySet<string> {
  const above = new Map(types.map((one) => [one.slug, one.extends]))
  const kinds = new Set<string>()
  for (const one of types) {
    const seen = new Set<string>()
    let at: string | null | undefined = one.slug
    while (at !== null && at !== undefined && !seen.has(at)) {
      seen.add(at)
      if (at === DOMAIN_SLUG) {
        kinds.add(one.slug)
        break
      }
      at = above.get(at)
    }
  }
  return kinds
}

/**
 * Whether a path is of a page type that is a kind of domain.
 *
 * THE NAME SETTLES THE PAGE TYPE, so this reads no frontmatter and asks no repository. A page's
 * frontmatter must agree with the kind its name carries rather than decide it, and this read the
 * frontmatter first — two answer sources for a question that has one.
 */
export function domainKindTest(types: readonly PageType[]): (relPath: string) => boolean {
  const kinds = domainKinds(types)
  return (relPath) => {
    const kind = pageTypeOf(relPath)
    return kind !== null && kinds.has(kind)
  }
}

export function placeDirOf(slug: string): string {
  return `${PAGES_ROOT}/${slug}`
}

export function repoPlacings(roots: Roots): ReadonlyMap<string, string> {
  const placed = new Map<string, string>()
  for (const repo of REPOS) {
    let entries
    try {
      entries = readdirSync(`${roots[repo]}/${PAGES_ROOT}`, { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of entries) {
      if (entry.isDirectory() && !placed.has(entry.name)) placed.set(entry.name, repo)
    }
  }
  return placed
}

const PAGE_TYPE = "page-type"

/**
 * Where each page type's own file stands under this root, keyed by its slug and read off the index.
 *
 * A PAGE TYPE NEED NOT STAND IN `pages/page-type/`. The `page-type` page type states a glob naming
 * no folder, and a page type lives where its domain lives, so eleven stand beside their own domains
 * — seven under `graph/` and four under `readouts/`. A listing of one folder cannot see those, and
 * the path composed behind it named a file that is not there rather than saying it had found none.
 *
 * THE FOLDER LISTING ANSWERS FIRST and this is read only where that misses, so the three hundred
 * and eighty standing in `pages/page-type/` still cost one `readdirSync` and nothing more.
 *
 * THE COMPOSED PATH STILL STANDS BEHIND BOTH, for a root the index does not describe: every fixture
 * tree is one, and a page type invented in one has no row anywhere.
 */
function pageTypeFilesIn(root: string): ReadonlyMap<string, string> {
  return onceInCall(`page-type-files:${root}`, () => {
    const made = new Map<string, string>()
    if (!indexReaches(AKASHA, root)) return made
    for (const one of loadPages()) {
      if (one.repo === AKASHA && one.type === PAGE_TYPE) made.set(pageStemOf(one.key), one.key)
    }
    return made
  })
}

export function pageTypePathIn(root: string, slug: string): string {
  const held = pageFileIn(root, placeDirOf(PAGE_TYPE), slug)
  if (held !== null) return held
  return pageTypeFilesIn(root).get(slug) ?? `${placeDirOf(PAGE_TYPE)}/${slug}.${PAGE_TYPE}${MARKDOWN}`
}

export function placeOf(slug: string): string {
  return `${placeDirOf(slug)}/**/*.${slug}${MARKDOWN}`
}

export function globsIn(roots: Roots | undefined, globs: readonly string[]): readonly string[] {
  if (roots === undefined) return globs
  return [...new Set(globs.map((one) => `**/${one.slice(one.lastIndexOf("/") + 1)}`))]
}

export interface Filed {
  readonly repo: string | null
  readonly place: string | null
}

export function filedIn(fm: Frontmatter): readonly Filed[] | null {
  const one = stringAt(fm, FILES)
  const stated = one === null ? listField(fm, FILES) : [one]
  if (stated.length === 0) return null
  const filed: Filed[] = []
  for (const each of stated) {
    const text = each.trim()
    if (text === NONE) return []
    const cut = text.indexOf(":")
    if (cut < 0) return null
    const repo = text.slice(0, cut).trim()
    const place = text.slice(cut + 1).trim()
    if (!REPOS.includes(repo) || place === "") return null
    filed.push({ repo, place })
  }
  return filed
}

export function pagePrefixOf(at: string, slug: string): string | null {
  const dir = placeDirOf(slug)
  return at.startsWith(`${dir}/`) ? `${dir}/` : null
}

export function newPageNameFor(type: PageType, name: string): string {
  return `${name}.${type.slug}${MARKDOWN}`
}

export function pageRelIn(root: string, slug: string, name: string): string {
  const dir = placeDirOf(slug)
  return pageFileIn(root, dir, name) ?? `${dir}/${name}.${slug}${MARKDOWN}`
}

export function placesOf(one: PageType): readonly string[] {
  return [
    ...new Set(one.filed.flatMap((each) => (each.repo === null ? [] : [each.place ?? placeOf(one.slug)]))),
  ]
}

export function reposOf(one: PageType): readonly string[] {
  return one.filed.flatMap((each) => (each.repo === null ? [] : [each.repo]))
}

export function filedIntoAny(one: PageType, repos: readonly string[]): boolean {
  return reposOf(one).some((each) => repos.includes(each))
}

export function soleRepoOf(one: PageType): string | null {
  const repos = reposOf(one)
  return repos.length === 1 ? (repos[0] ?? null) : null
}

export function placesIn(one: PageType, repo: string): readonly string[] {
  return one.filed.flatMap((each) => (each.repo === repo ? [each.place ?? placeOf(one.slug)] : []))
}

export function pagesOf(root: string, one: PageType, repo: string): readonly string[] {
  return scanIn(root, placesIn(one, repo), repo)
}

export type Claim =
  | { readonly slug: string; readonly type: PageType; readonly why: null }
  | { readonly slug: null; readonly type: null; readonly why: string }

/**
 * The page type a file is of, among the page types standing here.
 *
 * THE NAME SETTLES IT, AND NOTHING ELSE IS ASKED. This read the file's own `page-type-slug:` first
 * and fell back to matching the path against each page type's `files:` glob — three answer sources
 * for a question with one. A page's frontmatter must AGREE with the kind its name carries rather
 * than decide it, so a body tells this nothing it does not already hold, and which repository the
 * file stands in settles where a page type's pages are FOUND rather than what this one IS.
 *
 * THE KIND IS LOOKED UP RATHER THAN TRUSTED. `pageTypeOf` reads a name and holds no register, so a
 * name may carry a kind that names no page type here; that is a refusal carrying its reason, which
 * is the half of the answer this adds.
 */
export function claimant(relPath: string, types: readonly PageType[]): Claim {
  const kind = pageTypeOf(relPath)
  if (kind === null)
    return { slug: null, type: null, why: `its name carries no page type, so no page type claims it` }
  const named = types.find((one) => one.slug === kind)
  if (named === undefined)
    return { slug: null, type: null, why: `its name carries \`${kind}\`, which names no page type here` }
  return { slug: named.slug, type: named, why: null }
}
