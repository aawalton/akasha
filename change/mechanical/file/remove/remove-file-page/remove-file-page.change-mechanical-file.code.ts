import { extname } from "node:path"
import {
  gathered,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import { namersIn, pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  carrying,
  type Reached,
  reach,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { valueRemoved } from "akasha/change/modules/value-removing/value-removing.module.code.ts"
import { takenIn } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Named } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"

const PARTS = "parts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_FILE_CODE = "change-mechanical/remove-file-code"

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly at: string
}

export function parentsOf(world: World, at: string): readonly Named[] {
  return namersIn(world, at, PARTS)
}

function addressFor(at: string): typeof REMOVE_FILE_CODE | typeof REMOVE_FILE {
  return CODE.has(extname(at)) ? REMOVE_FILE_CODE : REMOVE_FILE
}

export function importersFirst(world: World, many: readonly string[]): readonly string[] {
  const held = new Set(many)
  const taken = takenIn(importers, many, { index: world.index, through: (one) => held.has(one) })
  const importing = new Map<string, string[]>()
  for (const edge of taken.edges) {
    const found = importing.get(edge.to)
    if (found === undefined) importing.set(edge.to, [edge.from])
    else found.push(edge.from)
  }
  const seen = new Set<string>()
  const order: string[] = []
  function put(one: string): undefined {
    if (seen.has(one)) return undefined
    seen.add(one)
    for (const importer of importing.get(one) ?? []) put(importer)
    order.push(one)
    return undefined
  }
  for (const one of many) put(one)
  return order
}

function ownLast(beside: readonly string[], at: string): readonly string[] {
  return [...beside.filter((one) => one !== at), at]
}

function unnamingIn(world: World, at: string, parents: readonly Named[]): Reached {
  const said = partedIn(at)
  if (said === null) return { said: stating([]), world }
  const qualified = `${said.pageType}/${said.slug}`
  const answers: Answer[] = []
  let seen = world
  for (const parent of parents) {
    const one = valueRemoved(seen, { at: parent.path, key: PARTS, value: qualified })
    if (one.refused === null) {
      answers.push(one)
      seen = carrying(seen, one)
      continue
    }
    const bare = valueRemoved(seen, { at: parent.path, key: PARTS, value: said.slug })
    if (bare.refused !== null) return { said: one, world: seen }
    answers.push(bare)
    seen = carrying(seen, bare)
  }
  return { said: gathered(answers), world: seen }
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  let beside: readonly string[]
  try {
    const value = pageIn(world, given.at)
    if (value === null) return refusing(`\`${given.at}\` names no page, so no page is taken away`)
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so the files beside \`${given.at}\` were not worked out`)
  }
  const unnamed = unnamingIn(world, given.at, parentsOf(world, given.at))
  if (unnamed.said.refused !== null) return unnamed.said
  const taken: Answer[] = [unnamed.said]
  let seen = unnamed.world
  for (const one of ownLast(importersFirst(world, beside), given.at)) {
    const said = await reach(seen, addressFor(one), { at: one })
    taken.push(said.said)
    seen = said.world
  }
  return gathered(taken)
}
