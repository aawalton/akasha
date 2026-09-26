import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberBurst = {
  id: "01a0de1f-035b-7bc4-8cec-539b87d20afa",
  type: "page-type/lore",
  slug: "the-tower-ember-burst",
  title: "Ember Burst",
  world: "world/personas",
  about: "tower-skill/the-tower-alan-ember-burst",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Ember Burst discharges Ember from the body all at once, in an outward wave of heat.",
    "It is the area counterpart to Ember Channel, releasing the heat into a zone.",
    "The pulse sears and flings back whatever is close, and is strongest against a clustered swarm.",
    "The burst's heat and its focus cost rise with how much heat is released.",
    "A full burst takes a deep pull of focus.",
    "An uncontrolled all-out discharge risks backlash on the one releasing it.",
    "Water quenches the burst fast.",
    "At journeyman, the burst is a metered pulse onto a lured or massed target from stable ground.",
  ],
} as const satisfies Lore
