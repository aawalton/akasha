import { addPropertyValue as addPropertyValueMechanical } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  addressedIn,
  addressedUnder,
  afterIn,
  declaresIn,
  holdsIn,
  listFieldIn,
  type Read,
  readFor,
  singleIn,
  spelledIn,
  typeIn,
} from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_VALUE =
  `${changeMechanicalFileContent.slug}/${addPropertyValueMechanical.slug}` as const

const AT = "at"

const KEY = "key"

const VALUE = "value"

const AFTER = "after"

const WHERE = "where"

const IS = "is"

const FIELD = "field"

const TOGETHER = "`where`, `is` and `field` are stated together or not at all, so nothing is put in"

const PLACED = "`after` places a key rather than a value inside a record, so nothing is put in"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
  readonly where?: string
  readonly is?: string
  readonly field?: string
}

type InRecord = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly where: string
  readonly is: string
  readonly field: string
}

async function addedInRecord(
  world: World,
  read: Extract<Read, { readonly known: unknown }>,
  given: InRecord
): Promise<Answer> {
  const field = listFieldIn(world, read.known, read.value, given.key, given.field)
  if ("refused" in field) return refusing(`${field.refused}, so nothing is put in`)
  const addressed = addressedUnder(read.known, field.propertySlug, given.field, given.value)
  if ("refused" in addressed) return refusing(addressed.refused)
  const valued = { ...given, value: addressed.value }
  const asked = field.holds === null ? valued : { ...valued, holds: field.holds }
  return (await reach(world, ADD_PROPERTY_VALUE, asked)).said
}

export async function addPropertyValue(
  world: World,
  given: AddPropertyValueAsked
): Promise<Answer> {
  const { where, is, field } = given
  const inRecord = where !== undefined && is !== undefined && field !== undefined
  if (!inRecord && (where !== undefined || is !== undefined || field !== undefined)) {
    return refusing(TOGETHER)
  }
  if (inRecord && given.after !== undefined) return refusing(PLACED)
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no value is put in`)
  const stated = typeIn(read.value)
  if (stated !== null && declaresIn(world, read.value, given.key) === false) {
    const named = spelledIn(world, read.value, given.key)
    if (named !== null) {
      return refusing(
        `\`${given.key}\` is a slug, and \`${stated}\` declares that property under the key ` +
          `\`${named}\`, so nothing is put in. Name the key.`
      )
    }
    return refusing(
      `\`${given.key}\` is no property \`${stated}\` declares, so nothing is put in. ` +
        `A list field inside a record is reached with \`where\`, \`is\` and \`field\` under the record's key.`
    )
  }
  if (inRecord) {
    const { at, key, value } = given
    return await addedInRecord(world, read, { at, key, value, where, is, field })
  }
  const addressed = addressedIn(read.known, read.value, given.key, given.value)
  if ("refused" in addressed) return refusing(addressed.refused)
  const single = singleIn(world, read.value, given.key)
  const holds = holdsIn(world, read.value, given.key)
  const placed = given.after ?? afterIn(world, read.value, given.key)
  const valued = { ...given, value: addressed.value }
  const told = single ? { ...valued, single } : valued
  const spelled = holds === null ? told : { ...told, holds }
  const asked = placed === null ? spelled : { ...spelled, after: placed }
  return (await reach(world, ADD_PROPERTY_VALUE, asked)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, KEY, VALUE, AFTER, WHERE, IS, FIELD]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  const asked: Record<string, string> = { at, key, value }
  for (const one of [AFTER, WHERE, IS, FIELD]) {
    const said = given[one]
    if (said !== undefined) asked[one] = said
  }
  return await addPropertyValue(world, asked as AddPropertyValueAsked)
}
