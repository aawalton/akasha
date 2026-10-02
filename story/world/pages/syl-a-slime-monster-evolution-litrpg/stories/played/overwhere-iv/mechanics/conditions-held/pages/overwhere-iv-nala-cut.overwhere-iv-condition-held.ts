import type { OverwhereIvConditionHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/overwhere-iv-condition-held.page-type.types.ts"

export const overwhereIvNalaCut = {
  id: "01a0ff04-4741-7e6c-aeea-af0a10232e50",
  type: "page-type/overwhere-iv-condition-held",
  slug: "overwhere-iv-nala-cut",
  title: "Cut",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body with an open cut that stings and bleeds until bound.",
  character: "character-player/overwhere-iv-nala",
  condition: "world-condition/overwhere-iv-cut",
} as const satisfies OverwhereIvConditionHeld
