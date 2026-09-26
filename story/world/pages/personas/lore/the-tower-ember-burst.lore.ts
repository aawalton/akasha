import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberBurst = {
  id: "01a0de1f-035b-7bc4-8cec-539b87d20afa",
  type: "page-type/lore",
  slug: "the-tower-ember-burst",
  title: "Ember Burst",
  world: "world/personas",
  about: "world-skill/the-tower-ember-burst",
  facts: [
    {
      fact: "Ember Burst discharges Ember from the body all at once, in an outward wave of heat.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "It is the area counterpart to Ember Channel, releasing the heat into a zone.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The pulse sears and flings back whatever is close, and is strongest against a clustered swarm.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The burst's heat and its focus cost rise with how much heat is released.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "A full burst takes a deep pull of focus.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "An uncontrolled all-out discharge risks backlash on the one releasing it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Water quenches the burst fast.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "At journeyman, the burst is a metered pulse onto a lured or massed target from stable ground.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
