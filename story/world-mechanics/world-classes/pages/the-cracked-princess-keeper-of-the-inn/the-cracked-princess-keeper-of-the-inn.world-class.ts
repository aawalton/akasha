import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const theCrackedPrincessKeeperOfTheInn = {
  id: "01a0657e-0269-7342-b1ac-0546d777b154",
  type: "world-class",
  slug: "the-cracked-princess-keeper-of-the-inn",
  title: "The Cracked Princess, Keeper of the Inn",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["princess-of-the-inn"],
  references: "jsonl",
} as const satisfies WorldClass
