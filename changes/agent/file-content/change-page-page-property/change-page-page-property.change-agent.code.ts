import {
  missing,
  refusing,
  untaken,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { readFor, targetsIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import { manyIn } from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-page-property"

const CHANGE_PAGE_PROPERTY_RELATION =
  "change-mechanical-file-content/change-page-page-property-relation"

const AT = "at"

const KEY = "key"

const TO = "to"

const TAKEN: ReadonlySet<string> = new Set([AT, KEY, TO])

const WHOLE = "and `to` states the whole value anew"

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
  for (const said of Object.keys(given)) {
    if (!TAKEN.has(said)) return refusing(`${untaken(said)}, ${WHOLE}`)
  }
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changePageProperty(world, { at, key, to })
}
