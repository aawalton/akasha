import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerTheHostsSeat = {
  id: "01a0c661-244a-7931-bf83-a63f18712026",
  type: "page-type/game-location",
  slug: "the-tower-the-hosts-seat",
  title: "The Host's Seat",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-05",
  depth: 5,
  description:
    "The gold gathers itself for one last, best lie: a high-backed chair at the head of the long table, and in it the Host — the gracious one, hands folded, smiling like he has all the time in the world and is pleased you came so far. This is the loom of the whole haven. When you raise a weapon he does not flinch — he MULTIPLIES: five of him around the table, then seven, every one identical, every one casting a shadow, every one warm, every one reflected, every one saying come, sit, you've earned it. Strike the wrong one and the others are still smiling while you bleed. And the note said it: kill it twice.",
  exits: ["the real ascending stair ahead (on clearing); the den behind"],
  conditions: [
    {
      name: "light",
      note: "False gold thickest here (the Host is its source) through phase 1; then it DIES with the true form, leaving only Alan's Ember and the dim honest stone for phases 2-3. Light-discipline is the through-line of the back half.",
    },
    { name: "water", note: "NONE." },
  ],
  things: [
    {
      name: "The Host (at the head of the table) and his ring of decoys",
      use: "the floor boss — STAGED (see encounters the-host-01 phase 1 + the-host-trueform-02 phase 2). A confirmed true-Host strike ×3 doesn't kill it — it CRACKS the haven.",
      note: "phase 1 = the hardest read on the floor (all tells faked at once). The Ember-flare + cross-reference is the intended solve; the note ('bring your own fire', 'kill it twice') primes both.",
    },
    {
      name: "the Host's TRUE FORM (revealed when the haven cracks)",
      use: "PHASE 2 — the ×3 true-strike doesn't end it; it tears the gracious mask off and the thing under all the faces stands up: a fast, lean predator (see the-host-trueform-02). The gold dies; the room goes to real cold stone. He must keep it lit and finish fast.",
      note: "phase 2 = the difficulty ramp — a real kill-risk fight, not a puzzle. Reading won phase 1; survival + light-discipline win phase 2.",
    },
    {
      name: "the failing haven / the chamber's hidden edges (PHASE 3)",
      use: "PHASE 3 — when the true form falls, the whole illusion dies AT ONCE (the journal warned it): the gold peels away, and with it the painted-over floor — the real den's edges and the drop at the chamber's lip (hidden by the lie this whole time) are suddenly live.",
      note: "phase 3 = staged climax, not a third enemy: a short environmental escape compounding floor-4's falling onto floor-5's deception. Heeding the journal ('be near the stair') trivializes it; ignoring it risks a fall on the win.",
      status: "real stair revealed on clearing",
    },
  ],
} as const satisfies GameLocation
