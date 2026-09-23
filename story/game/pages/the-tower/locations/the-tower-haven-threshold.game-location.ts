import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerHavenThreshold = {
  id: "01a0c661-23f2-78df-aa5a-b105684e812e",
  type: "page-type/game-location",
  slug: "the-tower-haven-threshold",
  title: "The Threshold",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-05",
  depth: 5,
  description:
    "The mouth of the haven, where the exit-stair from the dark shaft gives onto warm gold light. From here — without stepping in — you can see the near length of the long room: the laid table, the banked hearth across it, soft furniture along the warm wall, the hooded figure rising by the fire. Beyond it the haven continues — a second warmer hall, and more past that, the gold light receding back further than seems possible for a single floor. It is everything floor four was not: warm, lit, safe, kind. That is exactly the problem, if you let yourself think it.",
  exits: [
    "back DOWN to floor 4's headworks (open — retreat possible); FORWARD into the Hall of Welcome",
  ],
  conditions: [
    {
      name: "light",
      note: "Abundant, GOLD, FALSE. Hearth and lamps light warmly but sourceless — no heat, no honest shadows. Inverts floor 4 (there real light was scarce vs dark; here false light is everywhere and Alan's ONE REAL FLAME — Ember / a spark / Burning Anger's banked core — is the only TRUE light, thus the verification tool). This matters MORE the deeper he goes, as the haven fakes the cheaper tells and only real fire stays honest.",
    },
    {
      name: "water",
      note: "The ewer offers what looks like clear water/wine — PART OF THE LURE (illusory sustenance; 'drinking' lowers guard, not hydration). NO honest potable water on this floor — pre-decided contrast with floor 2 (real water). Do not confabulate a seep; the comfort is all surface.",
    },
  ],
  things: [
    {
      name: "the hooded host-figure by the hearth (rising to greet)",
      use: "an echo / projection of the floor's warden. Open empty hands, warm voice, no weapon. TIER-1 TELL: casts no honest shadow, gesture repeats, warmth is sourceless. Reasoning about it (INT) or holding real flame to it (Ember) reveals it as image.",
      note: "the scout centerpiece. A reader reads WHY the figure is wrong; he does not swing at a projection from the door.",
    },
    {
      name: "the long laid table (steaming ewer, plates, pushed-back chairs)",
      use: "the lure's set-dressing. Food LOOKS fresh, never steams right, never cools, never depletes. Under the cloth: old bones. EATING/DRINKING here is the trap — accepting the haven (lowers guard, deepens the hold). No honest sustenance.",
      note: "pre-decided: the meal is bait. 'Is the food real?' = no, and taking it is the wrong move.",
    },
    {
      name: "the banked hearth (across the room)",
      use: "THE personalized tell. Glows warm, lights the room, radiates NO heat — an Ember-attuned reader feels the absence acutely (a fire that gives nothing screams wrongness to a heat-sense). Casts no shadow. The clearest single proof, keyed to ALAN — his build is the floor's lie-detector.",
      note: "his Ember = the verification instrument for the whole floor (like floor 2's brazier / floor 4's lantern). It is also the FIRST rung of the verification ladder the deeper floor will keep raising.",
    },
    {
      name: "the threshold floor — dust, and what casts a shadow",
      use: "the honest read-surface. Real things displace dust and throw a shadow in the gold light; woven images do neither.",
      note: "rewards INT/method over PER/noticing. NOTE for the coordinator: this tell WORKS at the threshold and the hall, then the haven learns to fake shadows — see the verification ladder in designerNotes.",
    },
    {
      name: "the 'onward door' far down the haven (warm light beyond it)",
      use: "an ILLUSORY exit — part of the gallery. Promises an easy way up past the meal; walking 'through' it loops back. The REAL ascending stair is behind it and appears only when the Host's true form falls. The floor cannot be skipped.",
      note: "the bypass-trap: the floor must be solved, not passed.",
      status: "ILLUSORY — resolves to real stair only on clearing",
    },
  ],
} as const satisfies GameLocation
