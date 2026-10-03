import type { OverwhereIvConditionHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/overwhere-iv-condition-held.page-type.types.ts"

export const overwhereIvNalaBruised = {
  id: "01a101f5-3ec9-7f48-8794-90e8766cb4ed",
  type: "page-type/overwhere-iv-condition-held",
  slug: "overwhere-iv-nala-bruised",
  title: "Bruised",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A deep bruise high on the left shoulder, where a sling stone struck; it aches when the arm is lifted.",
  character: "character-player/overwhere-iv-nala",
  condition: "world-condition/overwhere-iv-bruised",
} as const satisfies OverwhereIvConditionHeld
