import { runChange as changeValue } from "../../../mechanical/pages/change-page-property/change-page-property.change-mechanical.code.ts"
import {
  changePagePropertyRelation,
  readFor,
  targetsIn,
} from "../../../mechanical/pages/change-page-property-relation/change-page-property-relation.change-mechanical.code.ts"
import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const KEY = "key"

const TO = "to"

export type ChangePagePropertyAsked = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export function changePageProperty(world: World, given: ChangePagePropertyAsked): Answer {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no property is stated`)
  if (targetsIn(read.known, read.value, given.key).length > 0) {
    return changePagePropertyRelation(world, given)
  }
  return changeValue(world, given)
}

export type Asked = Readonly<Record<string, string>>

export function runChange(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return changePageProperty(world, { at, key, to })
}
