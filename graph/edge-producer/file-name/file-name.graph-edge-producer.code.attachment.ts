import { stringAt } from "../../../page/text/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import { frontmatterAt } from "../../frontmatter-at/frontmatter-at.ts"
import type { BuildContext } from "../../build-context/build-context.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import { saidAt } from "../../../page/page.ts"
import { pagesOfType } from "../../page-index/page-index.ts"
import { claimedAt, fileNameOf } from "../../../page/file-kind/name-pattern.ts"
import { FILE_KIND_EDGE } from "../../edge/file-kind.ts"

const FILE_KIND_PAGE_TYPE = "file-kind-domain"

const PATTERN_KEY = "name-pattern"

type Claim = readonly [string, NodeRef]

const HELD = new WeakMap<BuildContext, readonly Claim[]>()

function claimsIn(ctx: BuildContext): readonly Claim[] {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made: Claim[] = []
  const where = new Map<string, string>()
  for (const at of pagesOfType(ctx, FILE_KIND_PAGE_TYPE)) {
    const fm = frontmatterAt(ctx, at.repo, at.key)
    if (fm === null) continue
    const pattern = stringAt(fm, PATTERN_KEY)
    if (pattern === null) continue
    const already = where.get(pattern)
    if (already !== undefined) {
      throw new Error(
        `two file kinds claim the name pattern \`${pattern}\` — ${already} and ${saidAt(at)} — so nothing says which one a file carrying it is`
      )
    }
    where.set(pattern, saidAt(at))
    made.push([pattern, { repo: at.repo, key: at.key }])
  }
  HELD.set(ctx, made)
  return made
}

export const fileNameEdgeProducer: EdgeProducer = {
  name: "file-name",
  edgeKinds: () => [FILE_KIND_EDGE],
  from: (ctx, file) => {
    const to = claimedAt(fileNameOf(file.key), claimsIn(ctx))
    if (to === null) return []
    const edge: EdgeInit = {
      kind: FILE_KIND_EDGE,
      from: { repo: file.repo, key: file.key },
      to,
      attrs: {},
    }
    return [edge]
  },
}

export default fileNameEdgeProducer
