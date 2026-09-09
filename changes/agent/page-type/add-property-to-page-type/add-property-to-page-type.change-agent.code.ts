import { dirname } from "node:path"
import { manifestsIn, reachingOf } from "@akasha/indexes/package-reaching"
import { importedFrom } from "@akasha/pages/page-body"
import { exportedAs, typedAs } from "@akasha/pages/page-export-name"
import { textAt } from "@akasha/pages/page-value-reading"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const ADD_RECORD = "change-mechanical-file-content/add-property-record"

const ADD_VALUE = "change-mechanical-file-content/add-property-value"

const ADD_MEMBER = "change-mechanical-file-content/add-type-member"

const PROPERTIES = "properties"

const PARTS = "parts"

const PROPERTY_SLUG = "property-slug"

const SLUG = "slug"

const OUTSIDE = ".."

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

export function reachedBy(world: World, path: string): string | null {
  const naming = reachingOf(
    manifestsIn(world.index.everyPath(), world.index.fileKeysAt()),
    world.textOf
  )
  const found: string[] = []
  for (const [specifier, at] of naming) {
    if (at === path) found.push(specifier)
  }
  return found.sort()[0] ?? null
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
  const held = pageIn(world, listed.path)
  if (held === null) return refusing(`\`${listed.path}\` names no page property`)
  const key = textAt(held, exportedAs(PROPERTY_SLUG))
  if (key === null) return refusing(`\`${given.property}\` states no property slug`)
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page type`)
  const owning = textAt(owner, SLUG)
  if (owning === null) return refusing(`\`${given.at}\` states no slug`)
  const beside = importedFrom(given.at, listed.path)
  const from = beside.startsWith(OUTSIDE) ? reachedBy(world, listed.path) : beside
  if (from === null) {
    return refusing(
      `\`${listed.path}\` sits outside \`${dirname(given.at)}\` and no package names it, so no import is spelled`
    )
  }
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
  over = part.world
  answers.push(part.said)
  const member = await reach(over, ADD_MEMBER, {
    at: given.at,
    type: typedAs(owning),
    key: exportedAs(key),
    held: typedAs(named[1]),
    from,
    optional: !given.required,
  })
  if (member.said.refused !== null) return member.said
  answers.push(member.said)
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
