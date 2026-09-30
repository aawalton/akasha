import type { CharacterClass } from "akasha/story/world/mechanics/classes/character-class/character-class.page-type.types.ts"

export const overwhereIvNalaSpellblade = {
  id: "01a0f3d1-8f22-705e-9df9-c455a480ae06",
  type: "page-type/character-class",
  slug: "overwhere-iv-nala-spellblade",
  title: "Spellblade",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "An intermediate class that fights with both spell and blade.",
  character: "character-player/overwhere-iv-nala",
  class: "world-class/overwhere-iv-spellblade",
} as const satisfies CharacterClass
