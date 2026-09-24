import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyValue as removePropertyValueMechanical } from "akasha/change/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  listFieldIn,
  readFor,
} from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { filesClaimedIn } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const REMOVE_PROPERTY_VALUE =
  `${changeMechanicalFileContent.slug}/${removePropertyValueMechanical.slug}` as const

const REMOVE_FILE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const PAGE_TYPE_SLUG = "pageTypeSlug"

const AT = "at"

const KEY = "key"

const VALUE = "value"

const WHERE = "where"

const IS = "is"

const FIELD = "field"

const TOGETHER =
  "`where`, `is` and `field` are stated together or not at all, so no value is taken out"

export type RemovePropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly where?: string
  readonly is?: string
  readonly field?: string
}

function absent(path: string): string {
  return `\`${path}\` holds no body, so the value is taken out and no file is taken away`
}

export function filesNamedIn(
  world: World,
  at: string,
  page: Value,
  key: string,
  value: string
): readonly string[] {
  const only: Value = { [PAGE_TYPE_SLUG]: typeIn(page), [key]: value }
  const claimed = filesClaimedIn(
    only,
    at,
    world.root,
    world.index.filePropertiesAt(),
    world.index.uncommittedFiledAt(),
    (one) => world.bodyOf(one) !== null
  )
  return claimed.slice(1).map((one) => one.at)
}

async function filesTakenAway(
  world: World,
  given: RemovePropertyValueAsked,
  named: readonly string[]
): Promise<Answer> {
  const taken = await reach(world, REMOVE_PROPERTY_VALUE, given)
  if (taken.said.refused !== null) return taken.said
  const held = named.filter((one) => world.bodyOf(one) !== null)
  if (held.length === 0) return telling(taken.said, named.map(absent))
  const answers: Answer[] = [taken.said]
  let seen = taken.world
  for (const one of held) {
    const gone = await reach(seen, REMOVE_FILE, { at: one })
    answers.push(gone.said)
    seen = gone.world
  }
  return gathered(answers)
}

export async function removePropertyValue(
  world: World,
  given: RemovePropertyValueAsked
): Promise<Answer> {
  const { where, is, field } = given
  const inRecord = where !== undefined && is !== undefined && field !== undefined
  if (!inRecord && (where !== undefined || is !== undefined || field !== undefined)) {
    return refusing(TOGETHER)
  }
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no value is taken out`)
  if (inRecord) {
    const found = listFieldIn(world, read.known, read.value, given.key, field)
    if ("refused" in found) return refusing(`${found.refused}, so no value is taken out`)
    return (await reach(world, REMOVE_PROPERTY_VALUE, given)).said
  }
  const named = filesNamedIn(world, given.at, read.value, given.key, given.value)
  if (named.length === 0) return (await reach(world, REMOVE_PROPERTY_VALUE, given)).said
  return await filesTakenAway(world, given, named)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, KEY, VALUE, WHERE, IS, FIELD]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  const asked: Record<string, string> = { at, key, value }
  for (const one of [WHERE, IS, FIELD]) {
    const said = given[one]
    if (said !== undefined) asked[one] = said
  }
  return await removePropertyValue(world, asked as RemovePropertyValueAsked)
}
