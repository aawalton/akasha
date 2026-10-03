import type { OverwhereIvConditionHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/overwhere-iv-condition-held.page-type.types.ts"

export const overwhereIvNalaHealthy = {
  id: "01a0ff42-681c-7702-9e10-8c1be41a7632",
  type: "page-type/overwhere-iv-condition-held",
  slug: "overwhere-iv-nala-healthy",
  title: "Healthy",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body with no wound, sickness or affliction upon it.",
  character: "character-player/overwhere-iv-nala",
  condition: "world-condition/overwhere-iv-healthy",
} as const satisfies OverwhereIvConditionHeld
