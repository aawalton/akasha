import { listField } from "../../page/frontmatter.ts"
import { NONE, stringAt } from "../../page/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../frontmatter-at.ts"
import fileNodeProducer from "../node-producer/file.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"
import { slugNamed } from "../../page/page-address.ts"
import { inheritedIn } from "../page-type-above.ts"
import { pagesOfType } from "../page-index.ts"

export const PATH_EDGE = "path"

const PATH_KEY = "path-key"

const DEFINITION_PAGE_TYPE = "page-property-definition"

const FILE = "file"

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, readonly string[]>>()

function declaredIn(ctx: BuildContext): ReadonlyMap<string, readonly string[]> {
  const made = new Map<string, string[]>()
  for (const at of pagesOfType(ctx, DEFINITION_PAGE_TYPE)) {
    const fm = frontmatterAt(ctx, at.repo, at.key)
    if (fm === null) continue
    const stated = (stringAt(fm, "type") ?? "").split("|").map((one) => one.trim())
    if (!stated.includes(FILE)) continue
    const on = slugNamed(stringAt(fm, "defined-on-slug"))
    const key = stringAt(fm, "key")
    if (on === null || key === null) continue
    const keys = made.get(on)
    if (keys === undefined) made.set(on, [key])
    else keys.push(key)
  }
  return made
}

function statedIn(ctx: BuildContext): ReadonlyMap<string, readonly string[]> {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = inheritedIn(ctx, declaredIn(ctx), (one) => one)
  HELD.set(ctx, made)
  return made
}

function reachedBy(ctx: BuildContext, repo: string, named: string): NodeRef | null {
  const cut = named.indexOf(":")
  const ref = cut < 0 ? { repo, key: named } : { repo: named.slice(0, cut), key: named.slice(cut + 1) }
  return fileNodeProducer.at(ctx, ref) === null ? null : ref
}

export const pathEdgeProducer: EdgeProducer = {
  name: "path",
  edgeKinds: () => [PATH_EDGE],
  from: (ctx, file) => {
    const pageType = file.attrs["page-type-slug"]
    if (pageType === null) return []
    const keys = statedIn(ctx).get(pageType) ?? []
    if (keys.length === 0) return []
    const fm = frontmatterAt(ctx, file.repo, file.key)
    if (fm === null) return []
    const edges: EdgeInit[] = []
    for (const key of keys) {
      for (const named of listField(fm, key)) {
        if (named === "" || named === NONE) continue
        const to = reachedBy(ctx, file.repo, named)
        if (to === null) continue
        edges.push({
          kind: PATH_EDGE,
          from: { repo: file.repo, key: file.key },
          to,
          attrs: { [PATH_KEY]: key },
        })
      }
    }
    return edges
  },
}

export default pathEdgeProducer
