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
import type { Changes } from "../../../runners/pages/change-running/change-running.change-runner.addressed.ts"

const PART_SLUGS = "part-slugs"

const PART_SLUGS_KEY = "partSlugs"

const REMOVE_FILE = "change-mechanical/remove-file"

const REMOVE_CODE_FILE = "change-mechanical/remove-code-file"

const REMOVE_PAGE_FILE = "change-mechanical/remove-page-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical/remove-property-value"

const CODE = new Set([".ts", ".tsx"])

export type RemoveOrdinaryPageAsked = {
  readonly at: string
}

export function parentsOf(world: World, at: string): readonly Named[] {
  return namersIn(world, at, PART_SLUGS)
}

function addressFor(world: World, at: string): keyof Changes {
  if (pageNamed(at, world.index.pageTypesIn())) return REMOVE_PAGE_FILE
  return CODE.has(extname(at)) ? REMOVE_CODE_FILE : REMOVE_FILE
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

export async function removePage(world: World, given: RemoveOrdinaryPageAsked): Promise<Answer> {
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
  for (const one of ownLast(beside, given.at)) {
    const said = await reach(seen, addressFor(world, one), { at: one })
    taken.push(said.said)
    seen = said.world
  }
  return gathered(taken)
}

export async function runChange(world: World, given: RemoveOrdinaryPageAsked): Promise<Answer> {
  return await removePage(world, given)
}
