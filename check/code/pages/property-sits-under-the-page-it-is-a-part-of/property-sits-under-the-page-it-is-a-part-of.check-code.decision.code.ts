import { dirname, join } from "node:path"
import { namersOf } from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { filedById, type Known } from "akasha/page/index/modules/reaching/reaching.module.code.ts"

export const PROPERTY = "page-property"

const PROPERTIES = "properties"

const ONE = 1

export function foldedFor(owner: string): string {
  return join(dirname(owner), PROPERTIES)
}

export function heldIn(sits: string, wanted: string): boolean {
  return sits === wanted || dirname(sits) === wanted
}

function reasonFor(shown: string, sits: string, wanted: string, owner: string): string {
  return (
    `\`${shown}\` sits in \`${sits}\`, and \`${owner}\` names it a part — a property page ` +
    `sits in \`${wanted}\` or heads a folder in it, the \`${PROPERTIES}\` folder ` +
    `beside the page naming it`
  )
}

export type Judging = (id: string, shown: string, path: string) => string | null

export function judgingBy(paged: Paged, known: Known): Judging {
  return (id, shown, path) => {
    const namers = namersOf(paged, id)
    if (namers.length !== ONE) return null
    const first = namers[0]
    if (first === undefined) return null
    const owner = filedById(known, first)
    if (owner === null) return null
    const wanted = foldedFor(owner.path)
    const sits = dirname(path)
    return heldIn(sits, wanted) ? null : reasonFor(shown, sits, wanted, owner.path)
  }
}
