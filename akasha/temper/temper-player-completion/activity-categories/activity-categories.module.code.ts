import type { BadgeVariant } from "@akasha/utils-narrow/badge-variant"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface ActivityCategoryTemplate {
  id: string
  name: string
  badgeVariant: NonNullable<BadgeVariant>
}

export const TEMPER_ACTIVITY_CATEGORIES = {
  "arenas": { id: "arenas", name: "Arenas", badgeVariant: "orange" },
  "characters": { id: "characters", name: "Characters", badgeVariant: "blue" },
  "companions": { id: "companions", name: "Companions", badgeVariant: "blue" },
  "crafting": { id: "crafting", name: "Crafting", badgeVariant: "green" },
  "events": { id: "events", name: "Events", badgeVariant: "yellow" },
  "exploration": { id: "exploration", name: "Exploration", badgeVariant: "purple" },
  "group-dungeons": { id: "group-dungeons", name: "Group Dungeons", badgeVariant: "orange" },
  "housing": { id: "housing", name: "Housing", badgeVariant: "yellow" },
  "other": { id: "other", name: "Other", badgeVariant: "green" },
  "pvp": { id: "pvp", name: "PvP", badgeVariant: "red" },
  "quests": { id: "quests", name: "Quests", badgeVariant: "purple" },
  "trials": { id: "trials", name: "Trials", badgeVariant: "red" },
} as const satisfies Record<string, ActivityCategoryTemplate>

export const ACTIVITY_CATEGORIES = createDataFile<ActivityCategoryTemplate>()(
  TEMPER_ACTIVITY_CATEGORIES
)

export type ActivityCategoryId = (typeof ACTIVITY_CATEGORIES.ids)[number]
