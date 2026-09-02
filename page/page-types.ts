import { readdirSync } from "node:fs"
import { pageTypeOf } from "@akasha/pages-system/markdown-page-type"
import { matchesGlob, scanGlob } from "./glob/glob.ts"
import { listField, type Frontmatter } from "./frontmatter.ts"
import { ignoresUnanswered, notIgnored } from "../repo/ignored/ignored.ts"
import { AKASHA, repos } from "@akasha/pages-system/checkout-roots"
import { MARKDOWN, pageFileIn } from "./page-file.ts"
import { fileStemOf as stemOf } from "@akasha/file-page-identity"
import { pageStemOf } from "@akasha/pages-system/markdown-page-name"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { onceInCall } from "@akasha/command-system/during-call"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { blockOf, NONE, stringAt } from "./text/text.ts"

export const PAGES_ROOT = "pages"

export const PAGE_TYPE_GLOBS: readonly string[] = [
  placeOf("page-type"),
  placeOf("rules-engine-rule-set"),
]

export const PAGE_TYPE_KINDS: ReadonlySet<string> = new Set(
  PAGE_TYPE_GLOBS.map((one) => folderIn(one).split("/").pop() ?? "")
)

export const PAGE_BODY_SHAPE_GLOBS: readonly string[] = [placeOf("page-body-shape")]

export const PROPERTY_GLOBS: readonly string[] = [
  placeOf("page-property-definition"),
  placeOf("alan-harness-tracking-field"),
]

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

// `_repo` is unread. It named the repository the page index was to be asked for, and there is no
// index to ask — every scan now walks the disk under `root`. The argument stands because the caller
// still knows which repository the root is, and the reader that will want it again is being written.
export function scanIn(
  root: string,
  patterns: readonly string[],
  _repo: string | null
): readonly string[] {
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
  for (const repo of repos()) {
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
  for (const repo of repos()) {
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

// Four page-type pages stand outside `pages/page-type/` — the readout ones — so this cannot be an
// exact read of that folder. It walks the tree for the suffix instead, which the index used to save.
function pageTypeFilesIn(root: string): ReadonlyMap<string, string> {
  return onceInCall(`page-type-files:${root}`, () => {
    const made = new Map<string, string>()
    for (const key of scanIn(root, [`**/*.${PAGE_TYPE}${MARKDOWN}`], AKASHA)) {
      made.set(pageStemOf(key), key)
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
    if (!repos().includes(repo) || place === "") return null
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

export function filedIntoAny(one: PageType, named: readonly string[]): boolean {
  return reposOf(one).some((each) => named.includes(each))
}

/**
 * The one repository a page type's pages stand in, or nothing where they stand in several.
 *
 * A type states one `files:` entry for each place its pages stand, and a type part way through a
 * migration states two in the same repository — the markdown half and the akasha half. That is one
 * repository named twice, not two repositories, and a writer that counted the entries rather than
 * the repositories would refuse to write a page it can plainly place.
 */
export function soleRepoOf(one: PageType): string | null {
  const named = [...new Set(reposOf(one))]
  return named.length === 1 ? (named[0] ?? null) : null
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

const AKASHA_HELD = "ts"

/**
 * The page type a file's name carries, on either side of the migration.
 *
 * A page is a markdown file named `<stem>.<page-type>.md` or a TypeScript file named
 * `<slug>.<page-type>.ts`, and only the markdown half was ever asked here. `pageTypeOf` is that
 * half and says so in its own name — its module page is `markdown-page-type`, "the page type a
 * markdown file's name carries" — so the akasha half stands beside it rather than inside it.
 *
 * A `.ts` name carrying anything between the page type and `.ts` names a file standing beside a
 * page rather than a page. `page-beside.module.code.ts` is the code of the `page-beside` module
 * page, and `foo.test.ts` outside `akasha/` is no page at all, so this asks `partedIn` for a name
 * with no sections rather than taking whatever the last section happens to be.
 *
 * What this cannot say is whether the type it names is a page type standing here: no set of types
 * is handed to it. `claimant` below settles that against the types it is given, which is where
 * `page-file-name` puts the same question — whether the page type slot names a page type is
 * answered against the set handed in.
 */
export function typeSlotOf(relPath: string): string | null {
  const said = pageTypeOf(relPath)
  if (said !== null) return said
  const parted = partedIn(relPath)
  if (parted === null || parted.sections.length > 0 || parted.held !== AKASHA_HELD) return null
  return parted.pageType
}

export function claimant(relPath: string, types: readonly PageType[]): Claim {
  const kind = typeSlotOf(relPath)
  if (kind === null)
    return { slug: null, type: null, why: `its name carries no page type, so no page type claims it` }
  const named = types.find((one) => one.slug === kind)
  if (named === undefined)
    return { slug: null, type: null, why: `its name carries \`${kind}\`, which names no page type here` }
  return { slug: named.slug, type: named, why: null }
}
