import type { RaceId as RacePageSlug } from "akasha/temper/catalog/world/temper-race/modules/race-ids/race-ids.data-table.code.ts"
import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const races = tableView(() => skillCatalog().races)

export type RaceId = RacePageSlug
