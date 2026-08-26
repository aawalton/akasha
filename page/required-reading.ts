import { existsSync, readFileSync } from "node:fs"
import type { AddressIndex } from "./address-index.ts"
import { listField } from "./frontmatter.ts"
import type { PageAt } from "./page-at.ts"
import { NONE, PAGE_TYPE_SLUG, stringAt } from "./text.ts"

const REQUIRED_KEY = "required-reading-slugs"

const EXTENDS_KEY = "extends-slug"

const REPO_ENDING = "-repo"

const EXTENSION_KEY = "extension"

const ENDING_KEY = "ending"

const HEADING_KEY = "heading"

const PACKAGE_REPO_KEY = "repo"

const INSTRUCTIONS = "instructions"

const MANIFEST = "package.json"

const DIRTY = "dirty/"

const DOT = "."

const REGISTRY_DIRS: readonly string[] = ["pages/page-type/", "page-types/", "pages/rules-engine-rule-set/"]

const FILE_KEY_TYPE = "file"

const TYPE_KEY = "type"

const KEY_KEY = "key"

const REPO_MARK = /^([a-z][a-z0-9-]*):(\S)/

export interface Seeding {
  readonly kinds: ReadonlyMap<string, PageAt>
  readonly endings: ReadonlyMap<string, PageAt>
  readonly headings: ReadonlyMap<string, PageAt>
  readonly named: ReadonlyMap<string, PageAt>
}

export function seedingOver(lending: readonly PageAt[], index: AddressIndex): Seeding {
  const kinds = new Map<string, PageAt>()
  const endings = new Map<string, PageAt>()
  const headings = new Map<string, PageAt>()
  const fileKeys = new Set<string>()
  const ordered = [...lending].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
  for (const at of ordered) {
    const fm = index.frontmatterOf(at)
    if (fm === null) continue
    const extension = stringAt(fm, EXTENSION_KEY)
    if (extension !== null) kinds.set(extension, at)
    const ending = stringAt(fm, ENDING_KEY)
    if (ending !== null) endings.set(ending, at)
    const heading = stringAt(fm, HEADING_KEY)
    if (heading !== null) headings.set(heading, at)
    if (stringAt(fm, TYPE_KEY) !== FILE_KEY_TYPE) continue
    const key = stringAt(fm, KEY_KEY)
    if (key !== null) fileKeys.add(key)
  }
  const named = new Map<string, PageAt>()
  for (const at of ordered) {
    const fm = index.frontmatterOf(at)
    if (fm === null) continue
    for (const key of fileKeys) {
      const stated = stringAt(fm, key)
      if (stated === null) continue
      const marked = REPO_MARK.exec(stated)
      const claim =
        marked === null
          ? `${INSTRUCTIONS}:${stated}`
          : `${marked[1] as string}:${stated.slice((marked[1] as string).length + 1)}`
      named.set(claim, at)
    }
  }
  return { kinds, endings, headings, named }
}

function saidAt(at: PageAt): string {
  return `${at.repo}:${at.key}`
}

function extensionOf(relPath: string): string | null {
  const name = relPath.slice(relPath.lastIndexOf("/") + 1)
  const dot = name.lastIndexOf(DOT)
  return dot <= 0 ? null : name.slice(dot + 1)
}

function pointing(at: PageAt, key: string, index: AddressIndex): readonly PageAt[] {
  const fm = index.frontmatterOf(at)
  if (fm === null) return []
  const found: PageAt[] = []
  for (const address of listField(fm, key)) {
    const reached = index.domainAt(address)
    if (reached !== null) found.push(reached)
  }
  return found
}

function closedOver(from: readonly PageAt[], next: (at: PageAt) => readonly PageAt[]): PageAt[] {
  const seen = new Map<string, PageAt>()
  const queue = [...from]
  while (queue.length > 0) {
    const at = queue.shift()
    if (at === undefined) continue
    const said = saidAt(at)
    if (seen.has(said)) continue
    seen.set(said, at)
    for (const one of next(at)) queue.push(one)
  }
  return [...seen.values()]
}

function packageSlugFor(root: string, relPath: string): string | null {
  let at = relPath
  for (;;) {
    const cut = at.lastIndexOf("/")
    at = cut === -1 ? "" : at.slice(0, cut)
    const manifest = at === "" ? `${root}/${MANIFEST}` : `${root}/${at}/${MANIFEST}`
    if (existsSync(manifest)) {
      try {
        const named = (JSON.parse(readFileSync(manifest, "utf8")) as { name?: unknown }).name
        if (typeof named === "string" && named !== "") {
          return named.replace(/^@/, "").replaceAll("/", "-")
        }
      } catch {
        return null
      }
      return null
    }
    if (at === "") return null
  }
}

function packageFor(
  at: PageAt,
  root: string | undefined,
  index: AddressIndex
): PageAt | null {
  if (root === undefined) return null
  const slug = packageSlugFor(root, at.key)
  if (slug === null) return null
  const page = index.domainAt(slug)
  if (page === null) return null
  const fm = index.frontmatterOf(page)
  if (fm === null) return null
  return stringAt(fm, PACKAGE_REPO_KEY) === at.repo ? page : null
}

export function pageTypeChainOf(at: PageAt, index: AddressIndex): readonly PageAt[] {
  const fm = index.frontmatterOf(at)
  if (at.repo === INSTRUCTIONS && REGISTRY_DIRS.some((one) => at.key.startsWith(one))) return []
  const stated = fm === null ? null : stringAt(fm, PAGE_TYPE_SLUG)
  let stem = stated ?? at.type
  if (stem === "") return []
  const found: PageAt[] = []
  const walked = new Set<string>()
  for (;;) {
    if (walked.has(stem)) return []
    walked.add(stem)
    const typePage = index.pageTypeNamed(stem)
    if (typePage === null) return []
    found.push(typePage)
    const typeFm = index.frontmatterOf(typePage)
    if (typeFm === null) return []
    const above = stringAt(typeFm, EXTENDS_KEY)
    if (above === null) return []
    if (above === NONE) return found
    stem = above
  }
}

const SECTION = /^#[ \t]+(.+?)[ \t]*$/gm

export function sectionsIn(text: string | null): readonly string[] {
  if (text === null) return []
  const found: string[] = []
  SECTION.lastIndex = 0
  for (const match of text.matchAll(SECTION)) {
    const heading = match[1]
    if (heading !== undefined) found.push(heading)
  }
  return found
}

export function requiredReadingFor(
  at: PageAt,
  text: string | null,
  index: AddressIndex,
  seeding: Seeding,
  rootOfRepo: (repo: string) => string | undefined
): readonly PageAt[] {
  if (at.repo === INSTRUCTIONS && at.key.startsWith(DIRTY)) return []

  const seeds: PageAt[] = []
  seeds.push(...closedOver(pointing(at, REQUIRED_KEY, index), (one) => pointing(one, REQUIRED_KEY, index)))
  const standsIn = index.domainAt(`${at.repo}${REPO_ENDING}`)
  if (standsIn !== null) seeds.push(standsIn)
  const declaredBy = packageFor(at, rootOfRepo(at.repo), index)
  if (declaredBy !== null) seeds.push(declaredBy)
  const extension = extensionOf(at.key)
  const kind = extension === null ? undefined : seeding.kinds.get(extension)
  if (kind !== undefined) seeds.push(kind)
  for (const [ending, page] of seeding.endings) {
    if (at.key.endsWith(`${DOT}${ending}`)) seeds.push(page)
  }
  const names = seeding.named.get(`${at.repo}:${at.key}`)
  if (names !== undefined) seeds.push(names)
  for (const heading of sectionsIn(text)) {
    const page = seeding.headings.get(heading)
    if (page !== undefined) seeds.push(page)
  }

  const whole = closedOver(seeds, (one) =>
    closedOver(pointing(one, REQUIRED_KEY, index), (two) => pointing(two, REQUIRED_KEY, index))
  )

  const reached = new Map<string, PageAt>()
  for (const one of [...whole].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))) {
    reached.set(saidAt(one), one)
  }
  for (const one of pageTypeChainOf(at, index)) reached.set(saidAt(one), one)
  reached.delete(saidAt(at))
  return [...reached.values()]
}
