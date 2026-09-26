import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberTemperedBody = {
  id: "01a0de1f-035c-7010-ae12-518b0e374de2",
  type: "page-type/lore",
  slug: "the-tower-ember-tempered-body",
  title: "Ember-Tempered Body",
  world: "world/personas",
  about: "world-skill/the-tower-ember-tempered-body",
  facts: [
    {
      fact: "Ember-Tempered Body channels ember into Alan's own flesh to scour out weakness and harden it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Siphoned heat, or heat held past his fill, feeds the temper best.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "A clean temper with a wide margin can permanently raise his vitality, his might or his health.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The lower his vitality, the more each temper harms him.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "A temper without precise control burns without hardening.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Repetition does not train it: every temper costs real essence, real health and real risk.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
