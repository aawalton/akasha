import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { QueryRow } from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import {
  genericKindOf,
  kindOf,
  ownNameOf,
  type Skill,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

export const EXPERIENCE_KEY = "experience"

export const ATTRIBUTE_KEY = "attribute"

const CHARACTER_KEY = "character"

const PARTED = "/"

export function attributeOf(
  row: QueryRow,
  titles: ReadonlyMap<string, string>
): string | undefined {
  const address = addressIn(textIn(row.values[ATTRIBUTE_KEY]) ?? "")
  if (address.kind !== "qualified") return undefined
  const type = address.pageTypeSlug
  const title = titles.get(`${type}${PARTED}${address.slug}`)
  const named = { values: { ...row.values, title, slug: address.slug } }
  const kind = genericKindOf(type) ?? kindOf(type, textIn(row.values[CHARACTER_KEY]))
  return (ownNameOf(named) ?? kind).toUpperCase()
}

export function skillMoreOf(
  titles: ReadonlyMap<string, string>
): (row: QueryRow) => Partial<Skill> {
  return (row) => {
    const earned = parseNumber(row.values[EXPERIENCE_KEY])
    const attribute = attributeOf(row, titles)
    return {
      ...(earned === undefined ? {} : { experience: earned }),
      ...(attribute === undefined ? {} : { attribute }),
    }
  }
}
