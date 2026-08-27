import {
  collapsed,
  headingSlugs,
  type Link,
  LINK_RELATION,
  linksIn,
} from "../../../page/index/link/link.ts"
import { sourcesAt } from "../../../page/index/store/store.ts"
import { mortalPagesAt } from "../../../page/mortal/mortal.ts"
import { textAt } from "../../../page/text/text.ts"
import { locate, rootsHere } from "../../../repo/roots/roots.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const MARKDOWN = ".md"

const JOIN = "/"

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

export function judgeLinks(
  staged: ReadonlyMap<string, Held>,
  bodyOf: (address: string) => string | null,
  sourcesOf: Sources,
  mortal: Mortal = NEVER_MORTAL
): readonly CheckFailure[] {
  const failures: CheckFailure[] = []
  for (const [address, held] of staged) {
    if (held.body === null || mortal(address)) continue
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
      if (mortal(from)) continue
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
    return judgeLinks(
      staged,
      (address) => {
        const held = staged.get(address)
        if (held !== undefined) return held.body
        const root = roots[repoIn(address)]
        return root === undefined ? null : textAt(root, keyIn(address))
      },
      (target) => [...sourcesAt(LINK_RELATION, target)],
      (address) => mortalPagesAt(keyIn(address))
    )
  },
}

export default linksResolve
