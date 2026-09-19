import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { pageIn, sortedKey } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import {
  editsFor,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { typeSlugIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { identityOf } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PROPERTIES = "properties"

const PARTS = "parts"

const QUALIFIED = "qualified"

const NOTHING = "null"

const ONE = "one"

const MANY = "many"

const HOLDS_THE_SAME =
  "and a property holds the same on every page type declaring it, so `change-property-on-page-type` turns what it holds and carries every page to match"

export type Asked = {
  readonly at: string
  readonly property: string
  readonly required: boolean
  readonly many: boolean
  readonly maxCount?: string
}

export function recordFor(given: Asked): string {
  const held = [
    `pageProperty: ${JSON.stringify(given.property)}`,
    `required: ${given.required}`,
    `many: ${given.many}`,
  ]
  if (given.many) held.push(`maxCount: ${given.maxCount ?? NOTHING}`)
  return `{ ${held.join(", ")} }`
}

export function writtenFor(world: World, given: Asked): readonly Written[] {
  return [
    { written: "recorded", key: PROPERTIES, record: recordFor(given) },
    {
      written: "listed",
      key: PARTS,
      value: JSON.stringify(given.property),
      sorted: sortedKey(world.index.shapesAt().values(), PARTS),
    },
  ]
}

function clashingIn(world: World, given: Asked): readonly string[] {
  const own = typeSlugIn(given.at)
  const found: string[] = []
  for (const slug of world.index.pageTypesIn()) {
    if (slug === own) continue
    const holds = world.index
      .propertiesOf(slug)
      .some(
        (one) =>
          one.declaredBy === slug && identityOf(one) === given.property && one.many !== given.many
      )
    if (holds) found.push(slug)
  }
  return found
}

function clashedOver(found: readonly string[], given: Asked): string {
  const naming = found.map((one) => `\`${one}\``).join(" and ")
  const says = found.length === 1 ? "declares" : "declare"
  const held = given.many ? ONE : MANY
  return `${naming} ${says} \`${given.property}\` holding ${held}, ${HOLDS_THE_SAME}`
}

export function addPropertyToPageType(world: World, given: Asked): Said {
  const named = addressIn(given.property)
  if (named.kind !== QUALIFIED) return refusing(`\`${given.property}\` names no page property`)
  if (world.index.listedAt(named.pageTypeSlug, named.slug)[0] === undefined) {
    return refusing(`\`${given.property}\` names no page property`)
  }
  const clashing = clashingIn(world, given)
  if (clashing.length > 0) return refusing(clashedOver(clashing, given))
  if (pageIn(world, given.at) === null) return refusing(`\`${given.at}\` names no page type`)
  const made = editsFor(world, { path: given.at, written: writtenFor(world, given) })
  return typeof made === "string" ? refusing(made) : stating(made)
}

export function runChange(world: World, given: Asked): Said {
  return addPropertyToPageType(world, given)
}
