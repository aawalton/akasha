import {
  gathered,
  missing,
  refusing,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const ADD_RECORD = "change-mechanical-file-content/add-property-record"

const ADD_VALUE = "change-mechanical-file-content/add-property-value"

const PROPERTIES = "properties"

const PARTS = "parts"

const AT = "at"

const PROPERTY = "property"

const REQUIRED = "required"

const MANY = "many"

const MAX_COUNT = "maxCount"

const TRUE = "true"

const NOTHING = "null"

export type AddPropertyToPageTypeAsked = {
  readonly at: string
  readonly property: string
  readonly required: boolean
  readonly many: boolean
  readonly maxCount?: string
}

export function addressed(property: string): readonly [string, string] | null {
  const cut = property.indexOf("/")
  if (cut <= 0 || cut === property.length - 1) return null
  return [property.slice(0, cut), property.slice(cut + 1)]
}

export function recordFor(given: AddPropertyToPageTypeAsked): string {
  const held = [
    `pageProperty: ${JSON.stringify(given.property)}`,
    `required: ${given.required}`,
    `many: ${given.many}`,
  ]
  if (given.many) held.push(`maxCount: ${given.maxCount ?? NOTHING}`)
  return `{ ${held.join(", ")} }`
}

export async function addPropertyToPageType(
  world: World,
  given: AddPropertyToPageTypeAsked
): Promise<Answer> {
  const named = addressed(given.property)
  if (named === null) return refusing(`\`${given.property}\` names no page property`)
  const listed = world.index.listedAt(named[0], named[1])[0]
  if (listed === undefined) return refusing(`\`${given.property}\` names no page property`)
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page type`)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const record = await reach(over, ADD_RECORD, {
    at: given.at,
    key: PROPERTIES,
    record: recordFor(given),
  })
  if (record.said.refused !== null) return record.said
  over = record.world
  answers.push(record.said)
  const part = await reach(over, ADD_VALUE, {
    at: given.at,
    key: PARTS,
    value: given.property,
  })
  if (part.said.refused !== null) return part.said
  answers.push(part.said)
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  const required = given[REQUIRED]
  if (required === undefined) return refusing(missing(REQUIRED))
  const many = given[MANY]
  if (many === undefined) return refusing(missing(MANY))
  const maxCount = given[MAX_COUNT]
  return await addPropertyToPageType(world, {
    at,
    property,
    required: required === TRUE,
    many: many === TRUE,
    ...(maxCount === undefined ? {} : { maxCount }),
  })
}
