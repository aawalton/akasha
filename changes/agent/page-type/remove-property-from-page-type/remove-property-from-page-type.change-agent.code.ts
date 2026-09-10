import { addressIn } from "akasha/pages/address/page-address.module.code.ts"
import { textsAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"

const REMOVE_VALUE = "change-mechanical-file-content/remove-property-value"

const REMOVE_RECORD = "change-mechanical-file-content/remove-property-record"

const PROPERTIES = "properties"

const PARTS = "parts"

const PAGE_PROPERTY = "pageProperty"

const QUALIFIED = "qualified"

const AT = "at"

const PROPERTY = "property"

export type RemovePropertyFromPageTypeAsked = {
  readonly at: string
  readonly property: string
}

export async function removePropertyFromPageType(
  world: World,
  given: RemovePropertyFromPageTypeAsked
): Promise<Answer> {
  const named = addressIn(given.property)
  if (named.kind !== QUALIFIED) return refusing(`\`${given.property}\` names no page property`)
  const listed = world.index.listedAt(named.pageTypeSlug, named.slug)[0]
  if (listed === undefined) return refusing(`\`${given.property}\` names no page property`)
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page type`)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const parted = textsAt(owner, PARTS)
  if (parted?.includes(given.property) === true) {
    const part = await reach(over, REMOVE_VALUE, {
      at: given.at,
      key: PARTS,
      value: given.property,
    })
    if (part.said.refused !== null) return part.said
    over = part.world
    answers.push(part.said)
  }
  const record = await reach(over, REMOVE_RECORD, {
    at: given.at,
    key: PROPERTIES,
    where: PAGE_PROPERTY,
    is: given.property,
  })
  if (record.said.refused !== null) return record.said
  answers.push(record.said)
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  return await removePropertyFromPageType(world, { at, property })
}
