import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerHallOfWelcome = {
  id: "01a0c661-2404-7718-b2c9-e58f605a73a5",
  type: "page-type/game-location",
  slug: "the-tower-hall-of-welcome",
  title: "The Hall of Welcome",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-05",
  depth: 5,
  description:
    "Past the threshold the haven wraps around you — warmth on all sides, the table at your elbow, soft couches and a made bed pulling at days of exhaustion. A figure waits here, nearer and warmer than the first: a fellow climber by the look — or unsettlingly like a face you'd be glad to see — with a flask, a clean cloth, and real concern. 'You're bleeding. Let me. Sit down, just for a moment.' Every word is the thing you most want to hear. And the tells from the threshold are quieter here — this figure DOES throw a shadow.",
  exits: ["back to the threshold (and down to floor 4); forward to the Long Gallery"],
  conditions: [
    {
      name: "light",
      note: "False gold; the Welcomer now casts a (faked) shadow. Alan's Ember held to it gives the heat-shadow tell that the plain shadow no longer can.",
    },
    { name: "water", note: "NONE honest (the Welcomer's flask is lure)." },
  ],
  things: [
    {
      name: "The Welcomer (offering aid/rest)",
      use: "the lesser warden (see encounter the-welcomer-01) — bait wearing kindness. Its 'aid' (letting it tend you, taking its flask, sitting) is the kill: at full-dropped guard it strikes intimate and lethal. Presents harmless, READS harmless to PER.",
      note: "the floor's 'front-loaded lethality' beat (Stalker-equivalent) — through TRUST, and now also the first proof that the verification ladder ESCALATES (shadow defeated → Ember heat-shadow). A reader who relied on plain shadows must climb a rung.",
    },
    {
      name: "the rest-couches and the made bed",
      use: "THE lure, pre-decided as a kill. Lying down = you do not wake (the haven feeds on a guard fully dropped to sleep). NO real rest / HP-recovery on this floor. 'Can I heal up here?' = NO; trying is the trap.",
      note: "decided fail-state, not recovery. Do not narrate genuine rest.",
      status: "INTACT — untriggered",
    },
    {
      name: "a previous climber's remains (behind the couches)",
      use: "weak-PER COMPENSATION (the floor-3 wall-note / floor-4 corpse-note pattern). Hands a reader the verification-ladder logic, the lures, where the Host is, AND the staged-boss warning ('kill it twice') — fair pay for weak PER.",
      note: "Reaching it requires having come inside past the Welcomer's offer.",
      status: "INTACT",
    },
    {
      name: "a scrawled note",
      use: "The note, scratched into the floorboard: 'DON'T EAT. DON'T SLEEP. DON'T LET THE KIND ONES TOUCH YOU. THEY LEARN YOUR TRICKS — IT FAKES THE SHADOWS NOW, IT'LL FAKE MORE. ONLY YOUR OWN FIRE STAYS HONEST. THE REAL ONE IS DEEP IN, AT THE HEAD OF THE TABLE. KILL IT TWICE.'",
      note: "the lore-gate; names the compounding deception and the two-phase boss plainly.",
      status: "INTACT",
    },
  ],
} as const satisfies GameLocation
