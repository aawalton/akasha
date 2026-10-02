import type { OverwhereIvConditionHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/overwhere-iv-condition-held.page-type.types.ts"

export const overwhereIvNalaDrained = {
  id: "01a0ff04-4741-79a8-9e5c-ae85f1e1db6a",
  type: "page-type/overwhere-iv-condition-held",
  slug: "overwhere-iv-nala-drained",
  title: "Drained",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of one whose mana runs low: a dull headache and heavy limbs.",
  character: "character-player/overwhere-iv-nala",
  condition: "world-condition/overwhere-iv-drained",
} as const satisfies OverwhereIvConditionHeld
