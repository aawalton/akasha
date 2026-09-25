import {
  DOMAIN,
  type Judging,
  THE_WHOLE,
} from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { takenIn } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { parents } from "akasha/graph/predicate/pages/parents/parents.graph-predicate.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

function reasonFor(shown: string): string {
  return (
    `no domain names \`${shown}\` among its parts — every domain but ` +
    `\`${DOMAIN}/${THE_WHOLE}\` is a part of a domain`
  )
}

export function judgingBy(paged: Pick<Paged, "index">): Judging {
  const under = paged.index.kindsUnder(DOMAIN)
  return (id, shown) => {
    const listed = paged.index.listedById(id)
    if (listed === null) return reasonFor(shown)
    const seed = listed.path
    const through = (path: string): boolean => path === seed || namedUnder(path, under) !== null
    const taken = takenIn(parents, [seed], { index: paged.index, through })
    return taken.edges.some((one) => one.to === seed) ? null : reasonFor(shown)
  }
}
