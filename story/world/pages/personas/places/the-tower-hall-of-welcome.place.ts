import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerHallOfWelcome = {
  id: "01a0d440-ecf3-7031-a418-b1c78fe675b7",
  type: "page-type/place",
  slug: "the-tower-hall-of-welcome",
  title: "The Hall of Welcome",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-05",
  depth: 5,
  description:
    "Past the threshold the haven wraps around you — warmth on all sides, the table at your elbow, soft couches and a made bed pulling at days of exhaustion. A figure waits here, nearer and warmer than the first: a fellow climber by the look — or unsettlingly like a face you'd be glad to see — with a flask, a clean cloth, and real concern. 'You're bleeding. Let me. Sit down, just for a moment.' Every word is the thing you most want to hear. And the tells from the threshold are quieter here — this figure DOES throw a shadow.",
  exits: [
    { to: "place/the-tower-haven-threshold", way: "back to the threshold (and down to floor 4)" },
    { to: "place/the-tower-the-long-gallery", way: "forward to the Long Gallery" },
  ],
  facts: [
    "The Hall of Welcome's gold light is false.",
    "The Hall of Welcome offers no honest water.",
  ],
} as const satisfies Place
