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

export function claimant(relPath: string, types: readonly PageType[]): Claim {
  const kind = pageTypeOf(relPath)
  if (kind === null)
    return { slug: null, type: null, why: `its name carries no page type, so no page type claims it` }
  const named = types.find((one) => one.slug === kind)
  if (named === undefined)
    return { slug: null, type: null, why: `its name carries \`${kind}\`, which names no page type here` }
  return { slug: named.slug, type: named, why: null }
}
