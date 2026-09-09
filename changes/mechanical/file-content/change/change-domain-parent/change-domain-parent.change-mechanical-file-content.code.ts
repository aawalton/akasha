import { filedById, namesIn, reaches, type Shaped } from "@akasha/indexes/reaching"
import type { Value } from "@akasha/pages/page-value"
import { gathered, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { heldIn, readFor } from "../../../../modules/page-knowing/page-knowing.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const ADD_PROPERTY_VALUE = "change-mechanical-file-content/add-property-value"

const DOMAIN = "domain"

const ONE = 1

const PAGE = "page"

const PARTS = "parts"

const REMOVE_PROPERTY_VALUE = "change-mechanical-file-content/remove-property-value"

const TO = "to"

export type Asked = {
  readonly page: string
  readonly to: string
}

export type Placed = { readonly id: string; readonly path: string }

export type Found = Placed | { readonly refused: string }

export function foundIn(known: Shaped, named: string, key: string): Found {
  const reached = reaches(named, DOMAIN, known)
  if ("refused" in reached) return { refused: `${reached.refused}, so \`${key}\` names no page` }
  const listed = filedById(known, reached.id)
  if (listed === null) return { refused: `\`${named}\` is at no path` }
  return { id: reached.id, path: listed.path }
}

export function parentOf(world: World, known: Shaped, of: Placed, named: string): Found {
  const namers = world.index.idsNaming(of.id, PARTS)
  const first = namers[0]
  if (first === undefined) {
    return {
      refused: `no page names \`${named}\` among its parts, so \`add-property-value\` puts it under one`,
    }
  }
  if (namers.length > ONE) {
    const shown = namers.map((each) => filedById(known, each)?.path ?? each).join("`, `")
    return {
      refused: `\`${named}\` is a part of \`${shown}\`, so which parent goes is not settled`,
    }
  }
  const listed = filedById(known, first)
  if (listed === null) return { refused: `the page naming \`${named}\` is at no path` }
  return { id: first, path: listed.path }
}

export function spelledIn(known: Shaped, value: Value, id: string): string | null {
  for (const one of namesIn(value[PARTS])) {
    const reached = reaches(one, DOMAIN, known)
    if ("id" in reached && reached.id === id) return one
  }
  return null
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const held = heldIn(world)
  if ("refused" in held) return refusing(`${held.refused}, so no parent is changed`)
  const page = foundIn(held.known, given.page, PAGE)
  if ("refused" in page) return refusing(page.refused)
  const to = foundIn(held.known, given.to, TO)
  if ("refused" in to) return refusing(to.refused)
  const from = parentOf(world, held.known, page, given.page)
  if ("refused" in from) return refusing(from.refused)
  if (from.id === to.id) return refusing(`\`${given.page}\` is a part of \`${to.path}\` already`)
  const read = readFor(world, from.path)
  if ("refused" in read) return refusing(`${read.refused}, so no parent is changed`)
  const spelled = spelledIn(read.known, read.value, page.id)
  if (spelled === null) return refusing(`\`${from.path}\` states \`${given.page}\` among no parts`)
  const gaining = readFor(world, to.path)
  if ("refused" in gaining) return refusing(`${gaining.refused}, so no parent gains the page`)
  const taken = await reach(world, REMOVE_PROPERTY_VALUE, {
    at: from.path,
    key: PARTS,
    value: spelled,
  })
  if (taken.said.refused !== null) return taken.said
  const bare = gaining.value[PARTS] === undefined
  const put = await reach(taken.world, bare ? ADD_PAGE_PROPERTY : ADD_PROPERTY_VALUE, {
    at: to.path,
    key: PARTS,
    value: bare ? JSON.stringify([spelled]) : spelled,
  })
  return gathered([taken.said, put.said])
}
