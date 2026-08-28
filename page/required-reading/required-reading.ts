import { existsSync, readFileSync } from "node:fs"
import type { AddressIndex } from "./address-index/address-index.ts"
import { ENDING_WORD, EXTENSION_WORD, HEADING_WORD } from "../index/identity/identity.ts"
import { fileTargetOf } from "../index/relation/relation.ts"
import { listField } from "../frontmatter.ts"
import type { PageAt } from "../page.ts"
import { NONE, stringAt } from "../text/text.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"

const REQUIRED_KEY = "required-reading-slugs"

const EXTENDS_KEY = "extends-slug"

const REPO_ENDING = "-repo"

const REPO_TYPE = "repo"

const PACKAGE_TYPE = "package"

const PACKAGE_REPO_KEY = "repo"

const INSTRUCTIONS = "instructions"

const MANIFEST = "package.json"

const DIRTY = "dirty/"

const DOT = "."

const PART = "/"

const REGISTRY_DIRS: readonly string[] = ["pages/page-type/", "pages/rules-engine-rule-set/"]

function saidAt(at: PageAt): string {
  return `${at.repo}:${at.key}`
}

function extensionOf(relPath: string): string | null {
  const name = relPath.slice(relPath.lastIndexOf("/") + 1)
  const dot = name.lastIndexOf(DOT)
  return dot <= 0 ? null : name.slice(dot + 1)
}

function endingsOf(relPath: string): readonly string[] {
  const name = relPath.slice(relPath.lastIndexOf(PART) + 1)
  const parts = name.split(DOT)
  const found: string[] = []
  for (let at = parts.length - 2; at >= 1; at--) found.push(parts.slice(at).join(DOT))
  return found
}

function pointing(at: PageAt, key: string, index: AddressIndex): readonly PageAt[] {
  const fm = index.frontmatterOf(at)
  if (fm === null) return []
  const found: PageAt[] = []
  for (const address of listField(fm, key)) {
    const reached = index.domainAt(address)
    if (reached === null) {
      throw new Error(
        `\`${saidAt(at)}\` names \`${address}\` under \`${key}\`, and no page carries that address — ` +
          "a reading named and never reached is one the agent is never handed, so it is refused here " +
          "rather than dropped"
      )
    }
    found.push(reached)
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
  const page = index.domainAt(slug, PACKAGE_TYPE)
  if (page === null) return null
  const fm = index.frontmatterOf(page)
  if (fm === null) return null
  return stringAt(fm, PACKAGE_REPO_KEY) === at.repo ? page : null
}

export function pageTypeChainOf(at: PageAt, index: AddressIndex): readonly PageAt[] {
  if (at.repo === INSTRUCTIONS && REGISTRY_DIRS.some((one) => at.key.startsWith(one))) return []
  const kind = pageTypeOf(at.key)
  if (kind === null) return []
  let stem: string = kind
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
  naming: readonly string[],
  rootOfRepo: (repo: string) => string | undefined
): readonly PageAt[] {
  if (at.repo === INSTRUCTIONS && at.key.startsWith(DIRTY)) return []

  const seeds: PageAt[] = []
  seeds.push(...closedOver(pointing(at, REQUIRED_KEY, index), (one) => pointing(one, REQUIRED_KEY, index)))
  const standsIn = index.domainAt(`${at.repo}${REPO_ENDING}`, REPO_TYPE)
  if (standsIn !== null) seeds.push(standsIn)
  const declaredBy = packageFor(at, rootOfRepo(at.repo), index)
  if (declaredBy !== null) seeds.push(declaredBy)
  const extension = extensionOf(at.key)
  const kind = extension === null ? null : index.pageNamed(EXTENSION_WORD, extension)
  if (kind !== null) seeds.push(kind)
  for (const ending of endingsOf(at.key)) {
    const page = index.pageNamed(ENDING_WORD, ending)
    if (page !== null) seeds.push(page)
  }
  const target = fileTargetOf(`${at.repo}:${at.key}`, at.repo)
  for (const relation of naming) seeds.push(...index.pagesFrom(relation, target))
  for (const heading of sectionsIn(text)) {
    const page = index.pageNamed(HEADING_WORD, heading)
    if (page !== null) seeds.push(page)
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
