import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersAelwyn = {
  id: "01a0c663-0d42-7f6e-9279-0f37d70bb8ec",
  type: "page-type/game-entity",
  slug: "partners-aelwyn",
  title: "Aelwyn",
  game: "game/partners",
  kind: "partner",
  level: 3,
  skills: [
    { name: "Wardship", progress: 0, effect: "none stated" },
    { name: "Woodcraft", progress: 0, effect: "none stated" },
    { name: "Green-keeping", progress: 0, effect: "none stated" },
    { name: "Bow & Stave", progress: 0, effect: "none stated" },
  ],
  revealGate: 1,
  note: "Second sister — Stranger (19). t32: crossed in; heard the WEIGHT of 'with us' and chose not to pull the thread (noted it, let it be warm). Took the at-home offer kindly-and-carefully ('a roof asked to be home is a new one on me'). Asked Amy to start again properly. In the warm seat by the fire. SPENT: the two watched nights (stood in the trees on last patrol as the house took light window by window; came down to learn what woke it, got told to be at home instead — 'strange two days. I find I don't mind them'). House-read tonight: the threshold-weight is a roof around her now — ATTENTIVE, not wary, 'the way a wood goes attentive around something it's decided it likes'; can't read why; stopped needing to, for tonight. BANKED still: her deeper read of Amy; the garden as her favorite forbidden place, now hers; how it truly sits that the FOURTH key turned a door she never had. Wildmarriage: never, unforeshadowed. Voice her ONLY via partners-aelwyn. NEXT: the meal proper — his floor.",
} as const satisfies GameEntity
