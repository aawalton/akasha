import {
  gathered,
  missing,
  refusing,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const PAGE_TYPE = "page-type"

const AT_MOST = "at-most"

export type RemoveEveryPageOfATypeAsked = {
  readonly pageType: string
  readonly atMost?: number
}

export async function removeEveryPageOfAType(
  world: World,
  given: RemoveEveryPageOfATypeAsked
): Promise<Answer> {
  const atMost = given.atMost
  const read = atMost === undefined ? null : atMostIn(String(atMost))
  if (typeof read === "string") return refusing(read)
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const named = world.index.everyOfType(given.pageType)
  if (named.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const listed = atMost === undefined ? named : named.slice(0, atMost)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  for (const one of listed) {
    const reached = await reach(over, REMOVE_FILE_PAGE, { at: one.path })
    if (reached.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${reached.said.refused}`)
    }
    over = reached.world
    answers.push(reached.said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  if (atMost === null) return await removeEveryPageOfAType(world, { pageType })
  return await removeEveryPageOfAType(world, { pageType, atMost })
}
