import type { OverwhereIvConditionHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/overwhere-iv-condition-held.page-type.types.ts"

export const overwhereIvNalaBruised = {
  id: "01a0ff04-4740-736c-85d8-962f6834e5d1",
  type: "page-type/overwhere-iv-condition-held",
  slug: "overwhere-iv-nala-bruised",
  title: "Bruised",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body knocked hard: sore and stiff where it struck, but unbroken.",
  character: "character-player/overwhere-iv-nala",
  condition: "world-condition/overwhere-iv-bruised",
} as const satisfies OverwhereIvConditionHeld
