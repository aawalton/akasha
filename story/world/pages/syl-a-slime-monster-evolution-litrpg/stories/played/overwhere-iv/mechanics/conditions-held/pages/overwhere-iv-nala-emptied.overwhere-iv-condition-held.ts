import type { OverwhereIvConditionHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/overwhere-iv-condition-held.page-type.types.ts"

export const overwhereIvNalaEmptied = {
  id: "01a0ff6a-9f6e-7289-8160-aa843b0665f0",
  type: "page-type/overwhere-iv-condition-held",
  slug: "overwhere-iv-nala-emptied",
  title: "Emptied",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of one who has spent the last of their mana: an ache behind the eyes.",
  character: "character-player/overwhere-iv-nala",
  condition: "world-condition/overwhere-iv-emptied",
} as const satisfies OverwhereIvConditionHeld
