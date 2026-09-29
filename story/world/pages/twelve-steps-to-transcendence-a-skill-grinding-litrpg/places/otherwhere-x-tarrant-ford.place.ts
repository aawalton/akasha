import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXTarrantFord = {
  id: "01a0ea72-d93f-7f37-91b8-742e0567c0dd",
  type: "page-type/place",
  slug: "otherwhere-x-tarrant-ford",
  title: "Tarrant Ford",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow-vale",
  facts: [
    {
      fact: "Tarrant Ford is where the king's road crosses the river Tarrant, seven miles west of Harrow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Sulon waystation guards the ford: a squat stone tower and a timber palisade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ford runs knee-deep in autumn; a ferry punt serves when the river is up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sergeant Maud Ferrer holds the waystation with eight soldiers and two horses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud Ferrer is forty, weathered and stern, Tier 1, fair but never easy to fool.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud lost a brother at the border camp; she takes the skinwalker rumours seriously.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Corporal Denny Ruck is twenty, loose-tongued, kind to a pretty face and eager for trouble.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The soldiers stop travellers without road tokens and ask their names, homes and business.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The waystation keeps an old assessment tablet locked in the sergeant's strongbox.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tablet is used only on real suspicion, as each use costs the kingdom two gold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One who refuses the tablet is held in irons and sent to Wexley's magistrate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The waystation keeps a mana-reading stone that glows when mana surges nearby.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The stone flared bright at three in the afternoon of day one, toward the east.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Maud sent a rider to the capital on day one's evening to report the surge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On day two at noon Denny Ruck and two soldiers ride east to look for the surge's cause.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The patrol reaches Harrow Mile mid-afternoon of day two and Harrow by evening.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The patrol asks at Harrow about the howling dogs, strange lights, and any stranger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The waystation hires a local to cook and muck out, and pays four copper a day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The waystation can write a road token for anyone who passes the tablet or is vouched for.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-harrow-mile",
      way: "east along the king's road, five miles",
      direction: "east",
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
