import type { World } from "../../world.page-type.types.ts"

export const theWanderingInn = {
  id: "01a063d6-4a4b-74c5-ad12-7fe438a5e5a4",
  pageTypeSlug: "world",
  type: "world",
  slug: "the-wandering-inn",
  title: "The Wandering Inn",
  characterReadings: "jsonl",
  mechanicReadings: "jsonl",
} as const satisfies World
