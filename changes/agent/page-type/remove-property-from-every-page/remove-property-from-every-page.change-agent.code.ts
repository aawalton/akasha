import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_PAGE_PROPERTY = "change-mechanical-file-content/remove-page-property"

const PAGE_TYPE = "page-type"

const KEY = "key"

export type RemovePropertyFromEveryPageAsked = {
  readonly pageType: string
  readonly key: string
}

export async function removePropertyFromEveryPage(
  world: World,
  given: RemovePropertyFromEveryPageAsked
): Promise<Answer> {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return refusing(`\`${given.pageType}\` names no page type`)
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) {
    return refusing(`a \`${given.pageType}\` carries no property under \`${given.key}\``)
  }
  const listed = world.index.everyOfType(given.pageType)
  if (listed.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  for (const one of listed) {
    const reached = await reach(over, REMOVE_PAGE_PROPERTY, { at: one.path, key: given.key })
    if (reached.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${reached.said.refused}`)
    }
    over = reached.world
    answers.push(reached.said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  return await removePropertyFromEveryPage(world, { pageType, key })
}
