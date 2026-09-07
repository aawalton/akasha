import { extname } from "node:path"
import type { Named } from "@akasha/indexes"
import { pageNamed, partedIn } from "@akasha/pages/page-file-name"
import {
  answered,
  gathered,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  type Reached,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { namersIn, pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const PART_SLUGS = "part-slugs"

const PART_SLUGS_KEY = "partSlugs"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_CODE_FILE = "change-mechanical-file/remove-code-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical-data/remove-property-value"

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly at: string
}

export function parentsOf(world: World, at: string): readonly Named[] {
  return namersIn(world, at, PART_SLUGS)
}

function addressFor(at: string): typeof REMOVE_CODE_FILE | typeof REMOVE_FILE {
  return CODE.has(extname(at)) ? REMOVE_CODE_FILE : REMOVE_FILE
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
  if (said === null) return { said: answered([]), world }
  const qualified = `${said.pageType}/${said.slug}`
  const answers: Answer[] = []
  let seen = world
  for (const parent of parents) {
    const one = await reach(seen, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: qualified,
    })
    if (one.said.refused === null) {
      answers.push(one.said)
      seen = one.world
      continue
    }
    const bare = await reach(seen, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: said.slug,
    })
    if (bare.said.refused !== null) return { said: one.said, world: seen }
    answers.push(bare.said)
    seen = bare.world
  }
  return { said: gathered(answers), world: seen }
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!pageNamed(given.at, world.index.pageTypesIn())) {
    return refusing(`\`${given.at}\` is under no page name, so this change takes nothing away`)
  }
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
