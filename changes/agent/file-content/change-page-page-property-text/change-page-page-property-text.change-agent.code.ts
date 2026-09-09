import { slugAt } from "@akasha/pages/page-value"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { readFor } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-page-property"

const TEXT_PROPERTY = "text-property"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const AT = "at"

const KEY = "key"

const TO = "to"

export type ChangePagePropertyTextAsked = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export async function changePagePropertyText(
  world: World,
  given: ChangePagePropertyTextAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no wording is stated anew`)
  const pageTypeSlug = slugAt(read.value, PAGE_TYPE) ?? slugAt(read.value, PAGE_TYPE_SLUG)
  if (pageTypeSlug === null) {
    return refusing(`\`${given.at}\` states no page type, so \`${given.key}\` names no property`)
  }
  const carried = world.index.propertiesIfNamed(pageTypeSlug) ?? []
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) {
    return refusing(`a \`${pageTypeSlug}\` carries no property under \`${given.key}\``)
  }
  if (!world.index.kindsUnder(TEXT_PROPERTY).has(held.pageTypeSlug)) {
    return refusing(
      `\`${given.key}\` names a \`${held.pageTypeSlug}\`, and a restatement states a \`${TEXT_PROPERTY}\` anew`
    )
  }
  return (await reach(world, CHANGE_PAGE_PROPERTY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changePagePropertyText(world, { at, key, to })
}
