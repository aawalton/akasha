import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerFloor05 = {
  id: "01a0d441-2f78-7b03-a48f-36ae94912610",
  type: "page-type/place",
  slug: "the-tower-floor-05",
  title: "The False Haven",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  depth: 5,
  description:
    "You climb the last of the dark shaft and the Tower changes its mind about you. The cold updraft warms. The grey seam at the top opens not onto more stone but onto a long, low room lit gold — lamplight, a banked hearth, the smell of bread and woodsmoke after days of dust and grease. A table is laid down its length, plates and a steaming ewer, chairs pushed back as if a meal just paused. Couches and a made bed wait along the warm wall. By the hearth a figure rises — hooded soft, both hands open and empty, a voice like someone glad you finally made it: 'You're hurt. Come in, climber. Sit. You've earned the rest.' After floor four's killing dark, every nerve you own wants to walk in and put the weapon down. And this is only the threshold — the haven runs back and back, room after warm room, deeper than one glance can hold.",
  exits: [
    {
      way: "the REAL ascending stair behind the haven's illusory 'onward door', which appears only when the haven collapses — when the Host's true form falls",
    },
  ],
} as const satisfies Place
