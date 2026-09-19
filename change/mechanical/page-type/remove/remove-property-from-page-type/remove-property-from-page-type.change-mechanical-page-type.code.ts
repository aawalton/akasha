import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  editsFor,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PROPERTIES = "properties"

const PARTS = "parts"

const PAGE_PROPERTY = "pageProperty"

const QUALIFIED = "qualified"

export type Asked = {
  readonly at: string
  readonly property: string
}

export function writtenFor(owner: Value, given: Asked): readonly Written[] {
  const parted = textsAt(owner, PARTS)?.includes(given.property) === true
  const gone: Written = {
    written: "recordGone",
    key: PROPERTIES,
    where: PAGE_PROPERTY,
    is: given.property,
  }
  if (!parted) return [gone]
  return [{ written: "valueGone", key: PARTS, values: [given.property] }, gone]
}

export function removePropertyFromPageType(world: World, given: Asked): Said {
  const named = addressIn(given.property)
  if (named.kind !== QUALIFIED) return refusing(`\`${given.property}\` names no page property`)
  if (world.index.listedAt(named.pageTypeSlug, named.slug)[0] === undefined) {
    return refusing(`\`${given.property}\` names no page property`)
  }
  const owner = pageIn(world, given.at)
  if (owner === null) return refusing(`\`${given.at}\` names no page type`)
  const made = editsFor(world, { path: given.at, written: writtenFor(owner, given) })
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return removePropertyFromPageType(world, given)
}
