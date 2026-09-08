import { slugOf, textsAt, valuesOver } from "@akasha/pages/page-value"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const PAGE_TYPE = "pageType"

const FROM = "from"

const KEY = "key"

const AFTER = "after"

export type AddCopiedPropertyToEveryPageAsked = {
  readonly pageType: string
  readonly from: string
  readonly key: string
  readonly after?: string
}

function handed(
  given: AddCopiedPropertyToEveryPageAsked,
  at: string,
  value: string
): Record<string, string> {
  const said = { at, key: given.key, value }
  return given.after === undefined ? said : { ...said, after: given.after }
}

export async function addCopiedPropertyToEveryPage(
  world: World,
  given: AddCopiedPropertyToEveryPageAsked
): Promise<Answer> {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return refusing(`\`${given.pageType}\` names no page type`)
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) {
    return refusing(`a \`${given.pageType}\` carries no property under \`${given.key}\``)
  }
  if (held.many) {
    return refusing(`\`${given.key}\` carries many values, so one value states nothing`)
  }
  const listed = world.index.everyOfType(given.pageType)
  if (listed.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const carriedAt = valuesOver(world.textOf)
  const answers: Answer[] = []
  let over: World = isLedger(world) ? world : ledgerAt(world.root, world.textOf, world.reaching)
  for (const one of listed) {
    const value = carriedAt(one.path)
    const said = value === null ? null : textsAt(value, given.from)
    const only = said !== null && said.length === 1 ? said[0] : undefined
    if (only === undefined) {
      return refusing(`\`${one.path}\` carries other than one value under \`${given.from}\``)
    }
    const reached = await reach(over, ADD_PAGE_PROPERTY, handed(given, one.path, slugOf(only)))
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
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const after = given[AFTER]
  return await addCopiedPropertyToEveryPage(
    world,
    after === undefined ? { pageType, from, key } : { pageType, from, key, after }
  )
}
