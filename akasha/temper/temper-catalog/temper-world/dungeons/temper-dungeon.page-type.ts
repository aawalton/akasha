import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { QuestGiver } from "../properties/quest-giver.relation-property.ts"
import type { RotationPosition } from "../properties/rotation-position.number-property.ts"
import type { SoloDifficulty } from "../properties/solo-difficulty.text-property.ts"

export type TemperDungeon = TemperCatalogThing & {
  questGiver: QuestGiver
  rotationPosition: RotationPosition
  soloDifficulty: SoloDifficulty
}

export const temperDungeon = {
  id: "01a05fc4-7a8e-73b2-936f-9e3b86b17549",
  pageTypeSlug: "page-type",
  slug: "temper-dungeon",
  definition: "a group instance a party fights through together",
  pluralSlug: "temper-dungeons",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: [
    "number-property/rotation-position",
    "relation-property/quest-giver",
    "text-property/solo-difficulty",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "quest-giver", required: true, many: false },
    { pagePropertySlug: "rotation-position", required: true, many: false },
    { pagePropertySlug: "solo-difficulty", required: true, many: false },
  ],
} as const satisfies PageType
