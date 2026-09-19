import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changePagePagePropertyRelation } from "akasha/change/mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { readFor, targetsIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { manyIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const CHANGE_PAGE_PROPERTY =
  `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const CHANGE_PAGE_PROPERTY_RELATION =
  `${changeMechanicalFileContent.slug}/${changePagePagePropertyRelation.slug}` as const

const AT = "at"

const KEY = "key"

const TO = "to"

export const takes: readonly string[] = [AT, KEY, TO]

export type ChangePagePropertyAsked = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export async function changePageProperty(
  world: World,
  given: ChangePagePropertyAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no property is stated`)
  const text = world.textOf(given.at)
  if (text !== null && manyIn(parsedAs(given.at, text), given.key)) {
    return refusing(
      `\`${given.key}\` holds many values, which \`add-property-value\` and \`remove-property-value\` change`
    )
  }
  if (targetsIn(read.known, read.value, given.key).length > 0) {
    return (await reach(world, CHANGE_PAGE_PROPERTY_RELATION, given)).said
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
  return await changePageProperty(world, { at, key, to })
}
