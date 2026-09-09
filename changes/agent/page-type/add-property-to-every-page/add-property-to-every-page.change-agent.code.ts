import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const PAGE_TYPE = "page-type"

const KEY = "key"

const VALUE = "value"

const AFTER = "after"

export type AddPropertyToEveryPageAsked = {
  readonly pageType: string
  readonly key: string
  readonly value: string
  readonly after?: string
}

function asking(given: AddPropertyToEveryPageAsked, at: string): Record<string, string> {
  const held = { at, key: given.key, value: given.value }
  return given.after === undefined ? held : { ...held, after: given.after }
}

export async function addPropertyToEveryPage(
  world: World,
  given: AddPropertyToEveryPageAsked
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
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  for (const one of listed) {
    const reached = await reach(over, ADD_PAGE_PROPERTY, asking(given, one.path))
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
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  const after = given[AFTER]
  return await addPropertyToEveryPage(
    world,
    after === undefined ? { pageType, key, value } : { pageType, key, value, after }
  )
}
