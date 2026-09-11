import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lesserDragonbreathArrowLightning = {
  id: "01a06575-9822-7627-bd56-f578b9959188",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lesser-dragonbreath-arrow-lightning",
  title: "Lesser Dragonbreath Arrow (Lightning)",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["swallow-s-arrow"],
  references: "jsonl",
} as const satisfies WorldSkill
