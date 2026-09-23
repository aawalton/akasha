import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerFloor05 = {
  id: "01a0c661-23df-78f0-aa74-5770db658998",
  type: "page-type/game-location",
  slug: "the-tower-floor-05",
  title: "The False Haven",
  game: "game/the-tower",
  depth: 5,
  theme:
    "You climb the last of the dark shaft and the Tower changes its mind about you. The cold updraft warms. The grey seam at the top opens not onto more stone but onto a long, low room lit gold — lamplight, a banked hearth, the smell of bread and woodsmoke after days of dust and grease. A table is laid down its length, plates and a steaming ewer, chairs pushed back as if a meal just paused. Couches and a made bed wait along the warm wall. By the hearth a figure rises — hooded soft, both hands open and empty, a voice like someone glad you finally made it: 'You're hurt. Come in, climber. Sit. You've earned the rest.' After floor four's killing dark, every nerve you own wants to walk in and put the weapon down. And this is only the threshold — the haven runs back and back, room after warm room, deeper than one glance can hold. (Continuity: reached by ASCENDING from floor 4's headworks. Alan ends his action on a QUIET SCOUT from the threshold — he has NOT committed inside. Resolve the scout against scoutReveal in the first room. Do NOT narrate the haven as real or safe in the System voice; the warmth and welcome are the player-facing surface only.)",
  exits: [
    "the haven's 'onward door' is ILLUSORY (part of the false gallery); the REAL ascending stair is behind it and appears only when the haven collapses — i.e. when the Host's true form falls. No honest exit exists until the floor is solved; the floor cannot be walked past.",
  ],
} as const satisfies GameLocation
