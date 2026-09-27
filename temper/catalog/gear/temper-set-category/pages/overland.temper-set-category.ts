import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const overland = {
  id: "019e46b5-0dbf-7661-8c66-ab1322c9f506",
  type: "page-type/temper-set-category",
  slug: "overland",
  title: "Overland",
  key: "overland",
  displayOrder: 4,
  activity: "temper-activity-category/exploration",
  esoCategoryNames: [
    "Aldmeri Dominion",
    "Daggerfall Covenant",
    "Ebonheart Pact",
    "DLC Zones",
    "Miscellaneous",
    "Season of the Worm Cult Part 1",
  ],
} as const satisfies TemperSetCategory
