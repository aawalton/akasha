import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
import type { Items } from "./properties/items.page-property-entry.ts"
import type { Quests } from "./properties/quests.page-property-entry.ts"

export type TemperMine = TemperCharacterThing & {
  items: Items
  quests: Quests
}

export const temperMine = {
  id: "01a05fcd-f557-7231-b2a4-ecded061b740",
  pageTypeSlug: "page-type",
  slug: "temper-mine",
  definition: "one sweep of what the game itself would tell temper about",
  pluralSlug: "temper-mines",
  extendsSlug: "page-type/temper-character-thing",
  partSlugs: [
    "boolean-property/has-on-use-ability",
    "boolean-property/has-set",
    "boolean-property/is-perfected",
    "boolean-property/is-unique",
    "boolean-property/is-unique-equipped",
    "instant-property/mined-at",
    "number-property/ability-cooldown",
    "number-property/armor-rating",
    "number-property/armor-type",
    "number-property/filter-type",
    "number-property/filter-type-specific",
    "number-property/item-quality",
    "number-property/item-style",
    "number-property/item-type",
    "number-property/merchant-value",
    "number-property/num-required",
    "number-property/quest-id",
    "number-property/quest-type",
    "number-property/repeatable-type",
    "number-property/required-cp",
    "number-property/required-level",
    "number-property/set-id",
    "number-property/set-max-equip",
    "number-property/specialized-item-type",
    "number-property/trait-type",
    "number-property/weapon-power",
    "number-property/weapon-type",
    "number-property/zone-id",
    "page-property-entry/items",
    "page-property-entry/quests",
    "record-property/set-bonuses",
    "text-property/ability-description",
    "text-property/ability-header",
    "text-property/enchant-description",
    "text-property/enchant-header",
    "text-property/flavor-text",
    "text-property/set-name",
    "text-property/trait-description",
    "text-property/zone-name",
  ],
  properties: [
    { pagePropertySlug: "items", required: true, many: false },
    { pagePropertySlug: "quests", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file holds every item a sweep read out of the game.",
    },
    {
      invariantKind: "departure",
      statement: "A row a sweep read is judged against the fields its entry shape declares.",
    },
  ],
} as const satisfies PageType
