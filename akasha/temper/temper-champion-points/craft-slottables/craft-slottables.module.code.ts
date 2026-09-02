import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { ChampionPointTemplate } from "../champion-point-source/champion-point-source.module.code.ts"

const CRAFT_SLOTTABLE_CHAMPION_POINTS = {
  "no-craft-star": {
    id: "no-craft-star" as const,
    esoChampionSkillId: 0,
    name: "No Craft Star",
    description: "No craft star slotted",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "friends-in-low-places": {
    id: "friends-in-low-places" as const,
    esoChampionSkillId: 76,
    name: "Friends in Low Places",
    description:
      "Removes 1000 gold from your bounty once per day when committing a crime where bounty is added. You must be level 50 for this passive to activate, and your current bounty must be at or greater than 1000 gold",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "fade-away": {
    id: "fade-away" as const,
    esoChampionSkillId: 84,
    name: "Fade Away",
    description: "Escaping from a Guard wipes 25% of your current Heat, but not Bounty",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  shadowstrike: {
    id: "shadowstrike" as const,
    esoChampionSkillId: 80,
    name: "Shadowstrike",
    description:
      "When you kill an enemy with Blade of Woe, you become invisible for 5 seconds after a short delay while distracting nearby enemies or potential witnesses. While under this effect you can cast Blade of Woe",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "master-gatherer": {
    id: "master-gatherer" as const,
    esoChampionSkillId: 78,
    name: "Master Gatherer",
    description: "Reduces the time it takes to harvest by 50%",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "anglers-instincts": {
    id: "anglers-instincts" as const,
    esoChampionSkillId: 89,
    name: "Angler's Instincts",
    description:
      "Increases your chance of catching higher quality fish, akin to fishing with another player. This effect can stack with other similar bonuses",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "reel-technique": {
    id: "reel-technique" as const,
    esoChampionSkillId: 88,
    name: "Reel Technique",
    description: "Decreases the time it takes for a fish to bite by 25%",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "war-mount": {
    id: "war-mount" as const,
    esoChampionSkillId: 82,
    name: "War Mount",
    description:
      "Improves your mastery with mounts, removing all mount Stamina costs outside of combat",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "gifted-rider": {
    id: "gifted-rider" as const,
    esoChampionSkillId: 92,
    name: "Gifted Rider",
    description: "Increases your Mount Speed by 10%",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [],
  },
  "sustaining-shadows": {
    id: "sustaining-shadows" as const,
    esoChampionSkillId: 65,
    name: "Sustaining Shadows",
    description: "Reduces the cost of Sneak by 50%",
    categoryId: "champion-points" as const,
    subcategoryId: "craft-slottables" as const,
    isSlottable: true,
    effects: [
      {
        metricId: "sneak-cost" as const,
        effectType: "fractional-change" as const,
        effectValue: -0.5,
      },
    ],
  },
} satisfies Record<string, ChampionPointTemplate>

export const craftSlottables = createDataFile<ChampionPointTemplate>()(
  CRAFT_SLOTTABLE_CHAMPION_POINTS
)
