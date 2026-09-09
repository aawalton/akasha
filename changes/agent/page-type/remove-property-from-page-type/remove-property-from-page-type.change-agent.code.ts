import { addressIn } from "@akasha/pages/page-address"
import { exportedAs, typedAs } from "@akasha/pages/page-export-name"
import { textAt } from "@akasha/pages/page-value-reading"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const REMOVE_MEMBER = "change-mechanical-file-content/remove-type-member"

const REMOVE_VALUE = "change-mechanical-file-content/remove-property-value"

const REMOVE_RECORD = "change-mechanical-file-content/remove-property-record"

const PROPERTIES = "properties"

const PART_SLUGS = "part-slugs"

const PROPERTY_SLUG = "property-slug"

const PAGE_PROPERTY = "pageProperty"

const SLUG = "slug"

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
  const held = pageIn(world, listed.path)
  if (held === null) return refusing(`\`${listed.path}\` names no page property`)
  const key = textAt(held, exportedAs(PROPERTY_SLUG))
  if (key === null) return refusing(`\`${given.property}\` states no property slug`)
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page type`)
  const owning = textAt(owner, SLUG)
  if (owning === null) return refusing(`\`${given.at}\` states no slug`)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const member = await reach(over, REMOVE_MEMBER, {
    at: given.at,
    type: typedAs(owning),
    key: exportedAs(key),
  })
  if (member.said.refused !== null) return member.said
  over = member.world
  answers.push(member.said)
  const part = await reach(over, REMOVE_VALUE, {
    at: given.at,
    key: exportedAs(PART_SLUGS),
    value: given.property,
  })
  if (part.said.refused !== null) return part.said
  over = part.world
  answers.push(part.said)
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
