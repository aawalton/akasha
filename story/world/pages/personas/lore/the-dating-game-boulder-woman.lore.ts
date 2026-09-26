import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameBoulderWoman = {
  id: "01a0de94-e377-7dc4-863b-ddaeafa531a5",
  type: "page-type/lore",
  slug: "the-dating-game-boulder-woman",
  title: "The Woman on the Boulder",
  world: "world/personas",
  about: "character-other/the-dating-game-echo",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "A climber's shout of \"Take!\" echoed twice, then a third time, late and close, in a woman's voice.",
    "None of the climbers reacted to the third echo.",
    "She sat on the car-sized boulder by the creek, knees drawn up, head tilted toward the walls.",
    "She looks mid-twenties, with long wind-knotted dark brown hair and thick freckles.",
    "She has grey-green eyes, like the creek stones.",
    "She wore a rock-grey canvas jacket over something pale.",
    "Black-and-gold headphones rest at her collarbones, the cable running down her back to nothing seen.",
    'She met Alan\'s eyes, said "Take" quietly, and smiled.',
    "Alan does not know her name.",
  ],
} as const satisfies Lore
