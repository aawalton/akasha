import { addPageProperty } from "akasha/change/mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changePagePagePropertyRelation } from "akasha/change/mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  addressedIn,
  afterIn,
  declaresIn,
  holdsIn,
  type Read,
  readFor,
  singleIn,
  targetsIn,
  typeIn,
} from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  assignedIn,
  literalIn,
  manyIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-spelling/value-spelling.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const CHANGE_PAGE_PROPERTY =
  `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const ADD_PAGE_PROPERTY = `${changeMechanicalFileContent.slug}/${addPageProperty.slug}` as const

const TRAILING_LINES = /\n+$/

const CHANGE_PAGE_PROPERTY_RELATION =
  `${changeMechanicalFileContent.slug}/${changePagePagePropertyRelation.slug}` as const

const AT = "at"

const KEY = "key"

const PLACE = "place"

const TO = "to"

const WHOLE = /^\d+$/

export const takes: readonly string[] = [AT, KEY, PLACE, TO]

export type ChangePagePropertyAsked = {
  readonly at: string
  readonly key: string
  readonly to: string
  readonly place?: string
}

type Known = Extract<Read, { readonly known: unknown }>

function manyRefused(at: string, key: string): string {
  return (
    `\`${key}\` holds many values, so nothing is stated. ` +
    `Put one in with \`add-property-values\`, handing it \`added: ${at} ${key} <value>\`, ` +
    `one line for each value, take one out with \`remove-property-value\`, ` +
    `handing it \`at\`, \`key\` and \`value\`, and state one of them where it sits with ` +
    `\`place\` beside \`at\`, \`key\` and \`to\``
  )
}

function noPlace(said: string): string {
  return `\`place\` names a place counted from 1, and \`${said}\` is no whole number`
}

function oneValue(key: string): string {
  return (
    `\`${key}\` holds one value, so no place names it — state that value whole with ` +
    `\`at\`, \`key\` and \`to\``
  )
}

function aRelation(key: string): string {
  return `\`${key}\` names a relation, and \`place\` names a place in a list of text`
}

function statedIn(at: string, text: string, key: string): boolean {
  const owner = literalIn(parsedAs(at, text))
  return owner !== null && assignedIn(owner, key) !== null
}

async function added(world: World, read: Known, given: ChangePagePropertyAsked): Promise<Answer> {
  if (declaresIn(world, read.value, given.key) === false) {
    const stated = typeIn(read.value) ?? "its page type"
    return refusing(`\`${given.key}\` is no property \`${stated}\` declares, so nothing is stated`)
  }
  const to = given.to.replace(TRAILING_LINES, "")
  const addressed = addressedIn(read.known, read.value, given.key, to)
  if ("refused" in addressed) return refusing(addressed.refused)
  const holds = holdsIn(world, read.value, given.key)
  const value = spelledAs(addressed.value, holds ?? undefined)
  if (value === null) return refusing(`\`${to}\` is no ${holds}, so nothing is stated`)
  const after = afterIn(world, read.value, given.key)
  const asked = { at: given.at, key: given.key, value }
  return (await reach(world, ADD_PAGE_PROPERTY, after === null ? asked : { ...asked, after })).said
}

async function atPlace(
  world: World,
  read: Known,
  given: ChangePagePropertyAsked,
  place: string,
  many: boolean
): Promise<Answer> {
  if (!WHOLE.test(place)) return refusing(noPlace(place))
  if (!many) return refusing(oneValue(given.key))
  if (targetsIn(read.known, read.value, given.key).length > 0) {
    return refusing(aRelation(given.key))
  }
  const holds = holdsIn(world, read.value, given.key)
  const asked = { at: given.at, key: given.key, to: given.to, place: Number(place) }
  return (await reach(world, CHANGE_PAGE_PROPERTY, holds === null ? asked : { ...asked, holds }))
    .said
}

export async function changePageProperty(
  world: World,
  given: ChangePagePropertyAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no property is stated`)
  const text = world.textOf(given.at)
  const declaredMany =
    declaresIn(world, read.value, given.key) === true && !singleIn(world, read.value, given.key)
  const many = declaredMany || (text !== null && manyIn(parsedAs(given.at, text), given.key))
  if (given.place !== undefined) return await atPlace(world, read, given, given.place, many)
  if (many) return refusing(manyRefused(given.at, given.key))
  const absent = text !== null && !statedIn(given.at, text, given.key)
  if (absent && declaresIn(world, read.value, given.key) !== null) {
    return await added(world, read, given)
  }
  if (targetsIn(read.known, read.value, given.key).length > 0) {
    return (await reach(world, CHANGE_PAGE_PROPERTY_RELATION, given)).said
  }
  const holds = holdsIn(world, read.value, given.key)
  const asked = holds === null ? given : { ...given, holds }
  return (await reach(world, CHANGE_PAGE_PROPERTY, asked)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const place = given[PLACE]
  if (place === undefined) return await changePageProperty(world, { at, key, to })
  return await changePageProperty(world, { at, key, to, place })
}
