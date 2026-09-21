import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerTheLongGallery = {
  id: "01a0c65d-1ffe-7907-b6eb-10f6f62f5b45",
  type: "page-type/game-location",
  slug: "the-tower-the-long-gallery",
  title: "The Long Gallery",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-05",
  depth: 5,
  description:
    "The haven opens into a long mirrored gallery — silvered glass down both walls, a second table, more hearths, and TWO welcoming figures this time, moving to either side of you with the same warm concern: one pressing a cup, one circling to your back 'to look at that wound.' The warmth here has WEIGHT — you'd swear you feel the hearth's heat on your skin now. The tells are getting harder to keep.",
  exits: ["back to the Hall of Welcome; forward (following the cold) to the Deep Den"],
  conditions: [
    {
      name: "light",
      note: "False gold WITH faked heat now (he feels it). Only the mirrors and his own fire stay honest. A thrown Ember flare reflects truly in the glass; the figures cast no reflection in it.",
    },
    { name: "water", note: "NONE honest." },
  ],
  things: [
    {
      name: "the two Welcomers (one fronting with aid, one circling behind)",
      use: "a COORDINATED PAIR (multi-threat — see encounter the-welcomers-pair-01). One holds his attention with the offer; the other flanks for the intimate kill. TIER-3 TELL: the Ember heat-shadow tell now FAILS too — the gallery fakes heat (you feel the hearth; the figures feel warm). The honest tell becomes the MIRRORS: a real body throws a reflection; the woven figures do NOT. He must read the silvered glass, not his senses.",
      note: "the ladder's second escalation (heat defeated → reflection) AND the threat ramp: two predators that sandwich him is meaningfully harder than floor 4's lone Stalker. A reader keeps his back to a mirror or a wall and refuses to be flanked.",
    },
    {
      name: "the silvered gallery mirrors (both walls)",
      use: "the TIER-3 verification tool. Real presences reflect; glamours don't. Catching a figure in the glass is a clean real-vs-projected test that bypasses his fooled senses — and lets him see a flanker coming (countering his weak PER with reasoning + geometry).",
      note: "give a reader who uses the mirrors an honest edge against the pair and forward into the den/boss. Also foreshadows the reflection-faking of the next room.",
    },
    {
      name: "a cold draft seam (low on one mirrored wall)",
      use: "a real, faint cold draft from BEHIND the illusion — the only honestly cold thing on a floor of fake warmth. Following it (INT to trust the cold over the fake heat) leads truer-inward than the looping 'onward door' — a navigation tell that the real structure is colder and barer than the gold haven pretends.",
      note: "the honest cold = the real den bleeding through. Rewards trusting a tell over comfort; threads toward the deep den / boss.",
    },
  ],
} as const satisfies GameLocation
