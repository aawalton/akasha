import type { FileTree } from "../../../page/file-tree.ts"
import {
  collapsed,
  headingSlugs,
  type Link,
  LINK_RELATION,
  linksIn,
} from "../../../page/index/link/link.ts"
import { sourcesAt } from "../../../page/index/store/store.ts"
import { mortalPagesAt } from "../../../page/mortal/mortal.ts"
import { pageStemOf } from "../../../page/name/name.ts"
import { claimant, type PageType } from "../../../page/page-types.ts"
import { chainOf } from "../../../page/property/frontmatter.ts"
import { registryOf } from "../../../page/property/registry.ts"
import { textAt } from "../../../page/text/text.ts"
import { locate, rootsHere } from "../../../repo/roots/roots.ts"
import { refusalText } from "../../../refusal/refusal.ts"
import type { Check, CheckFailure } from "../check-shape.ts"
import { treeOver } from "../page-holds-to-its-type/staged-tree.ts"

const MARKDOWN = ".md"

const JOIN = "/"

const DIRTY_DIR = /(^|\/)dirty\//

const FROM_ELSEWHERE = "story-chapter-read"

export type Held = {
  readonly path: string
  readonly body: string | null
}

function repoIn(address: string): string {
  return address.slice(0, address.indexOf(JOIN))
}

function keyIn(address: string): string {
  return address.slice(address.indexOf(JOIN) + 1)
}

function brokenBy(link: Link, where: string, resolved: string, body: string | null): string | null {
  const href = link.href
  if (body === null) return refusalText("link-target-absent", { where, href, resolved })
  if (link.quote !== null && !collapsed(body).includes(collapsed(link.quote))) {
    return refusalText("link-quote-absent", { where, href, resolved })
  }
  if (link.anchor === null) return null
  if (headingSlugs(body).has(link.anchor.toLowerCase())) return null
  return refusalText("link-anchor-absent", { where, href, resolved, anchor: link.anchor })
}

export type Sources = (target: string) => readonly { repo: string; key: string }[]

export type Mortal = (address: string) => boolean

const NEVER_MORTAL: Mortal = () => false

export type Unjudged = (address: string) => boolean

const NEVER_UNJUDGED: Unjudged = () => false

export function underDirty(address: string): boolean {
  return DIRTY_DIR.test(keyIn(address))
}

/**
 * Whether a page's body came from elsewhere, so the links it holds are nobody here's to have got
 * right.
 *
 * THE PAGE TYPE SAYS IT AND NO PROPERTY DOES. `story-chapter-read` states that a read chapter's
 * source is the page type it is, so this is ancestry over `extends-slug` rather than a flag on a
 * page: a type filed below `story-chapter-read` later is covered with nobody updating a list.
 *
 * A CHAIN RETURNING ON ITSELF IS JUDGED. `chainOf` stops at the slug a cycle comes back to and
 * answers `relPaths: null`, which is read here as reaching nothing — so a looped page type is
 * judged as any other page is, rather than passed or walked forever.
 */
export function fromElsewhereIn(defs: FileTree, types: readonly PageType[]): Unjudged {
  const said = new Map<string, boolean>()
  return (address) => {
    const claim = claimant(keyIn(address), types)
    if (claim.type === null) return false
    const standing = said.get(claim.type.relPath)
    if (standing !== undefined) return standing
    const { relPaths } = chainOf(claim.type, defs)
    const made = relPaths !== null && relPaths.some((at) => pageStemOf(at) === FROM_ELSEWHERE)
    said.set(claim.type.relPath, made)
    return made
  }
}

/** Every ground on which a file holding a link is passed over rather than judged. */
export function unjudgedIn(defs: FileTree, types: readonly PageType[]): Unjudged {
  const elsewhere = fromElsewhereIn(defs, types)
  return (address) => underDirty(address) || elsewhere(address)
}

export function judgeLinks(
  staged: ReadonlyMap<string, Held>,
  bodyOf: (address: string) => string | null,
  sourcesOf: Sources,
  mortal: Mortal = NEVER_MORTAL,
  unjudged: Unjudged = NEVER_UNJUDGED
): readonly CheckFailure[] {
  const failures: CheckFailure[] = []
  for (const [address, held] of staged) {
    if (held.body === null || mortal(address) || unjudged(address)) continue
    for (const link of linksIn(repoIn(address), keyIn(address), held.body)) {
      if (link.target === null || mortal(link.target)) continue
      const reason = brokenBy(link, `${address}:${link.line}`, link.target, bodyOf(link.target))
      if (reason !== null) failures.push({ path: held.path, reason })
    }
  }
  for (const [address, held] of staged) {
    if (mortal(address)) continue
    for (const source of sourcesOf(address)) {
      const from = `${source.repo}${JOIN}${source.key}`
      if (staged.has(from)) continue
      const text = bodyOf(from)
      if (text === null) continue
      if (mortal(from) || unjudged(from)) continue
      for (const link of linksIn(source.repo, source.key, text)) {
        if (link.target !== address) continue
        const reason = brokenBy(link, `${from}:${link.line}`, address, held.body)
        if (reason !== null) failures.push({ path: held.path, reason })
      }
    }
  }
  return failures
}

export const linksResolve: Check = {
  slug: "links-resolve",
  needs: "tree",
  run: (batch) => {
    const staged = new Map<string, Held>()
    for (const path of batch.paths) {
      if (!path.endsWith(MARKDOWN)) continue
      const at = locate(path)
      if (at === null) continue
      const held = batch.tree.at(path)
      staged.set(`${at.repo}${JOIN}${at.relPath}`, {
        path,
        body: held === null ? null : held.toString("utf8"),
      })
    }
    if (staged.size === 0) return []
    const roots = rootsHere()
    const defs = treeOver(batch)
    return judgeLinks(
      staged,
      (address) => {
        const held = staged.get(address)
        if (held !== undefined) return held.body
        const root = roots[repoIn(address)]
        return root === undefined ? null : textAt(root, keyIn(address))
      },
      (target) => [...sourcesAt(LINK_RELATION, target)],
      (address) => mortalPagesAt(keyIn(address)),
      defs === null ? underDirty : unjudgedIn(defs, registryOf(defs))
    )
  },
}

export default linksResolve
