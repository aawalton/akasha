import { extname } from "node:path"
import type { Named } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import {
  gathered,
  refusing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { claimedIn } from "../../../../modules/page-claiming/page-claiming.module.code.ts"
import { namersIn, pageIn } from "../../../../modules/page-knowing/page-knowing.module.code.ts"
import {
  type Reached,
  reach,
  type World,
} from "../../../../modules/shadow/change-shadow.module.code.ts"

const PARTS = "parts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_FILE_CODE = "change-mechanical/remove-file-code"

const REMOVE_PROPERTY_VALUE = "change-mechanical-file-content/remove-property-value"

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
  const seen = new Set<string>()
  const order: string[] = []
  function put(one: string): undefined {
    if (seen.has(one)) return undefined
    seen.add(one)
    for (const importer of world.index.importersOf(one)) {
      if (held.has(importer)) put(importer)
    }
    order.push(one)
    return undefined
  }
  for (const one of many) put(one)
  return order
}

function ownLast(beside: readonly string[], at: string): readonly string[] {
  return [...beside.filter((one) => one !== at), at]
}

async function unnamingIn(world: World, at: string, parents: readonly Named[]): Promise<Reached> {
  const said = partedIn(at)
  if (said === null) return { said: stating([]), world }
  const qualified = `${said.pageType}/${said.slug}`
  const answers: Answer[] = []
  let seen = world
  for (const parent of parents) {
    const one = await reach(seen, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PARTS,
      value: qualified,
    })
    if (one.said.refused === null) {
      answers.push(one.said)
      seen = one.world
      continue
    }
    const bare = await reach(seen, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PARTS,
      value: said.slug,
    })
    if (bare.said.refused !== null) return { said: one.said, world: seen }
    answers.push(bare.said)
    seen = bare.world
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
  const unnamed = await unnamingIn(world, given.at, parentsOf(world, given.at))
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
