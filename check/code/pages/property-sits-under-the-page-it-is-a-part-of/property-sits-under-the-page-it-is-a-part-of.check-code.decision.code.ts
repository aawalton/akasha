import { dirname } from "node:path"
import { namersOf } from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import { filedById, type Known } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const PROPERTY = "page-property"

const PROPERTIES = "properties"

const ONE = 1

export function foldedFor(owner: string): string {
  return `${dirname(owner)}/${PROPERTIES}`
}

function reasonFor(shown: string, sits: string, wanted: string, owner: string): string {
  return (
    `\`${shown}\` sits in \`${sits}\`, and \`${owner}\` names it a part — a property page ` +
    `sits in \`${wanted}\`, the \`${PROPERTIES}\` folder beside the page naming it`
  )
}

export type Judging = (id: string, shown: string, path: string) => string | null

export function judgingBy(shadow: Shadow, known: Known): Judging {
  return (id, shown, path) => {
    const namers = namersOf(shadow, id)
    if (namers.length !== ONE) return null
    const first = namers[0]
    if (first === undefined) return null
    const owner = filedById(known, first)
    if (owner === null) return null
    const wanted = foldedFor(owner.path)
    const sits = dirname(path)
    return sits === wanted ? null : reasonFor(shown, sits, wanted, owner.path)
  }
}
